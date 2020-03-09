<?php
/**
 * Embed PDF Viewer
 *
 * @author  Andy Fragen
 * @license GPL-2.0+
 * @link    https://github.com/afragen/embed-pdf-viewer
 * @package embed-pdf-viewer
 */

/**
 * Plugin Name:       Embed PDF Viewer
 * Plugin URI:        https://github.com/afragen/embed-pdf-viewer
 * Description:       Embed a PDF from the Media Library or elsewhere via oEmbed or as a block into an `object` tag or Google Doc Viewer as fallback.
 * Author:            Andy Fragen
 * Author URI:        https://github.com/afragen
 * Version:           2.0.5
 * License:           GPLv2+
 * Domain Path:       /languages
 * Text Domain:       embed-pdf-viewer
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.html
 * GitHub Plugin URI: https://github.com/afragen/embed-pdf-viewer
 * Requires PHP:      5.6
 * Requires at least: 4.6
 */

/**
 * Exit if called directly.
 */
if ( ! defined( 'WPINC' ) ) {
	die;
}

add_filter( 'media_send_to_editor', [ Embed_PDF_Viewer::instance(), 'embed_pdf_media_editor' ], 20, 2 );
wp_embed_register_handler(
	'oembed_pdf_viewer',
	'#(^(https?)\:\/\/.+\.pdf$)#i',
	[
		Embed_PDF_Viewer::instance(),
		'oembed_pdf_viewer',
	]
);
add_action(
	'init',
	function () {
		load_plugin_textdomain( 'embed_pdf_viewer' );

		wp_enqueue_style(
			'embed-pdf-viewer',
			plugins_url( 'css/embed-pdf-viewer.css', __FILE__ ),
			[],
			false,
			'screen'
		);
	}
);
add_action( 'init', [ Embed_PDF_Viewer::instance(), 'register_block' ] );

/**
 * Class Embed_PDF_Viewer
 */
class Embed_PDF_Viewer {
	/**
	 * For singleton.
	 *
	 * @var bool
	 */
	private static $instance = false;

	/**
	 * Create singleton.
	 *
	 * @return bool
	 */
	public static function instance() {
		if ( false === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Register block.
	 *
	 * @return void
	 */
	public function register_block() {
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		wp_register_script(
			'embed-pdf-viewer',
			plugins_url( 'blocks/index.build.js', __FILE__ ),
			[ 'wp-blocks', 'wp-element' ],
			false,
			true
		);

		register_block_type(
			'embed-pdf-viewer/index',
			[
				'editor_script' => 'embed-pdf-viewer',
			]
		);
	}

	/**
	 * Insert URL to PDF from Media Library, then render as oEmbed.
	 *
	 * @param string  $html an href link to the media.
	 * @param integer $id   post_id.
	 *
	 * @return string
	 */
	public function embed_pdf_media_editor( $html, $id ) {
		$post = get_post( $id );
		if ( 'application/pdf' !== $post->post_mime_type ) {
			return $html;
		}

		return $post->guid . "\n\n";
	}

	/**
	 * Create oEmbed code.
	 *
	 * @param array  $matches Regex matches.
	 * @param array  $atts    array of media height/width.
	 * @param string $url     URI for media file.
	 *
	 * @return string
	 */
	public function oembed_pdf_viewer( $matches, $atts, $url ) {
		$attachment_id = $this->get_attachment_id_by_url( $url );
		if ( ! empty( $attachment_id ) ) {
			$post = get_post( $this->get_attachment_id_by_url( $url ) );
		} else {
			/*
			 * URL is from outside of the Media Library.
			 */
			$post                 = new WP_Post( new stdClass() );
			$post->guid           = $matches[0];
			$post->post_mime_type = 'application/pdf';
			$post->post_name      = preg_replace( '/\.pdf$/', '', basename( $matches[0] ) );
		}

		return $this->create_output( $post, $atts );
	}

	/**
	 * Create output for Google Doc Viewer and href link to file.
	 *
	 * @param \WP_Post     $post Current post.
	 * @param array|string $atts array of media height/width or
	 *                           href to media library asset.
	 *
	 * @return bool|string
	 */
	private function create_output( WP_Post $post, $atts = [] ) {
		if ( 'application/pdf' !== $post->post_mime_type ) {
			return $atts;
		}

		$default = [
			'height' => 500,
			'width'  => 800,
			'title'  => $post->post_title,
		];

		/*
		 * Ensure $atts isn't the href.
		 */
		$atts = is_array( $atts ) ? $atts : [];

		if ( isset( $atts['height'] ) ) {
			$atts['height'] = ( $atts['height'] / 2 );
		}
		$atts = array_merge( $default, $atts );

		/**
		 * Filter PDF attributes.
		 *
		 * @since 1.6.0
		 * @param  array $atts Array of PDF attributes.
		 * @return array $atts
		 */
		$atts = apply_filters( 'embed_pdf_viewer_pdf_attributes', $atts );

		// Fix title or create from filename.
		$atts['title'] = empty( $atts['title'] )
			? ucwords( preg_replace( '/(-|_)/', ' ', $post->post_name ) )
			: ucwords( preg_replace( '/(-|_)/', ' ', $atts['title'] ) );

		$iframe_fallback  = '<iframe class="embed-pdf-viewer" src="https://docs.google.com/viewer?url=' . rawurlencode( $post->guid );
		$iframe_fallback .= '&amp;embedded=true" frameborder="0" ';
		$iframe_fallback .= 'style="height:' . $atts['height'] . 'px;width:' . $atts['width'] . 'px;" ';
		$iframe_fallback .= 'title="' . $atts['title'] . '"></iframe>' . "\n";

		$object  = '<object class="embed-pdf-viewer" data="' . $post->guid;
		$object .= '#scrollbar=1&toolbar=1"';
		$object .= 'type="application/pdf" ';
		$object .= 'height=' . $atts['height'] . ' width=' . $atts['width'] . ' > ';
		$object .= '</object>';

		$style = '<style>
			@media only screen and (min-device-width: 1024px) {
				iframe.embed-pdf-viewer { display:none; }
				object.embed-pdf-viewer { display:block; }
			}
		</style>';

		$embed  = $object;
		$embed .= $style . $iframe_fallback;
		$embed .= '<p><a href="' . $post->guid . '">' . $atts['title'] . '</a></p>';

		return $embed;
	}

	/**
	 * Get attachment id by url. Thanks Pippin.
	 *
	 * @link  https://pippinsplugins.com/retrieve-attachment-id-from-image-url/
	 *
	 * @param string $url URI of attachment.
	 *
	 * @return mixed
	 */
	private function get_attachment_id_by_url( $url ) {
		global $wpdb;
		$attachment = $wpdb->get_col( $wpdb->prepare( "SELECT ID FROM $wpdb->posts WHERE guid='%s';", $url ) );

		if ( empty( $attachment ) ) {
			return null;
		}

		return $attachment[0];
	}
}
