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
 * Description:       Embed a PDF from the Media Library or elsewhere via oEmbed or as a block into an `iframe` tag.
 * Author:            Andy Fragen
 * Author URI:        https://github.com/afragen
 * Version:           2.4.6
 * License:           GPLv2+
 * Domain Path:       /languages
 * Text Domain:       embed-pdf-viewer
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.html
 * GitHub Plugin URI: https://github.com/afragen/embed-pdf-viewer
 * Requires PHP:      7.4
 * Requires at least: 6.0
 */

/**
 * Exit if called directly.
 */
if ( ! defined( 'WPINC' ) ) {
	die;
}

$epd_version = get_file_data( __FILE__, [ 'Version' => 'version' ] )['Version'];
add_filter( 'media_send_to_editor', [ Embed_PDF_Viewer::instance( $epd_version ), 'embed_pdf_media_editor' ], 20, 2 );
wp_embed_register_handler(
	'oembed_pdf_viewer',
	'#(^(https?)\:\/\/.+\.pdf$)#i',
	[
		Embed_PDF_Viewer::instance( $epd_version ),
		'oembed_pdf_viewer',
	]
);
add_action(
	'init',
	function () use ( $epd_version ) {
		wp_set_script_translations( 'embed-pdf-viewer-scripts', 'embed-pdf-viewer' );

		// phpcs:ignore WordPress.WP.EnqueuedResourceParameters.NoExplicitVersion
		wp_enqueue_style(
			'embed-pdf-viewer',
			plugins_url( 'css/embed-pdf-viewer.css', __FILE__ ),
			[],
			$epd_version,
			'screen'
		);
	}
);
add_action( 'init', [ Embed_PDF_Viewer::instance( $epd_version ), 'register_block' ] );

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
	 * Plugin version number.
	 *
	 * @var string
	 */
	private static $version = '';

	/**
	 * Create singleton.
	 *
	 * @param string $version Plugin version number.
	 * @return bool
	 */
	public static function instance( $version ) {
		static::$version = $version;
		if ( false === static::$instance ) {
			static::$instance = new self( $version );
		}

		return static::$instance;
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

		// phpcs:ignore WordPress.WP.EnqueuedResourceParameters.NoExplicitVersion
		wp_register_script(
			'embed-pdf-viewer',
			plugins_url( 'blocks/build/index.js', __FILE__ ),
			[ 'wp-i18n', 'wp-blocks', 'wp-block-editor', 'wp-element', 'wp-components', 'wp-compose', 'wp-blob' ],
			static::$version,
			true
		);

		register_block_type(
			'embed-pdf-viewer/pdf',
			[
				'editor_script'   => 'embed-pdf-viewer',
				'render_callback' => [ static::$instance, 'dynamic_render_callback' ],
			]
		);
	}

	/**
	 * Dynamically render callback based on browser.
	 *
	 * @global bool $is_chrome Tests for Chrome browser.
	 *
	 * @param array $attributes Array of attributes.
	 *
	 * @return string
	 */
	public function dynamic_render_callback( $attributes ) {
		global $is_chrome;

		$url = $attributes['url'] ?? null;
		if ( ! $url ) {
			return '';
		}

		$classes     = 'embed-pdf-viewer';
		$src         = $is_chrome || wp_is_mobile() ? 'https://docs.google.com/viewer?url=' . rawurlencode( $url ) . '&embedded=true' : $url;
		$description = $attributes['title'] ?? '';
		$description = $attributes['description'] ?? $description;
		$width       = $attributes['width'] ?? '600';
		$height      = $attributes['height'] ?? '600';
		return sprintf(
			'<iframe class="%1$s" src="%2$s" height="%3$s" width="%4$s" title="%5$s"%6$s></iframe>',
			$classes,
			sanitize_url( $src ),
			esc_attr( $width ),
			esc_attr( $height ),
			esc_attr( $description ),
			$is_chrome || wp_is_mobile() ? ' frameborder="0"' : ''
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
	 * @return string|WP_Error
	 */
	public function oembed_pdf_viewer( $matches, $atts, $url ) {
		$attachment_id = $this->get_attachment_id_by_url( $url );
		if ( ! empty( $attachment_id ) ) {
			$post = get_post( $this->get_attachment_id_by_url( $url ) );
		} else {
			/*
			 * URL is from outside of the Media Library.
			 */
			$response = wp_remote_get( $url );
			if ( is_wp_error( $response ) ) {
				return $response;
			}
			$post                 = new WP_Post( new stdClass() );
			$post->guid           = $matches[0];
			$post->post_mime_type = wp_remote_retrieve_header( $response, 'content-type' );
			$post->post_name      = preg_replace( '/\.pdf$/', '', basename( $matches[0] ) );
		}

		return $this->create_output( $post, $atts );
	}

	/**
	 * Create output for iframe and/or Google Doc Viewer and href link to file.
	 *
	 * @param \WP_Post     $post Current post.
	 * @param array|string $atts array of media height/width or
	 *                           href to media library asset.
	 *
	 * @return bool|string
	 */
	private function create_output( WP_Post $post, $atts = [] ) {
		global $is_chrome;

		if ( 'application/pdf' !== $post->post_mime_type ) {
			return $atts;
		}

		$default = [
			'height'      => 500,
			'width'       => 800,
			'title'       => $post->post_title,
			'description' => $post->post_content,
		];

		/*
		 * Ensure $atts isn't the href.
		 */
		$atts = is_array( $atts ) ? $atts : [];

		if ( isset( $atts['width'] ) ) {
			$atts['width'] = '100%';
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

		$description   = ! empty( $atts['description'] ) ? $atts['description'] : $atts['title'];
		$sanitized_url = sanitize_url( $post->guid );

		if ( $is_chrome || wp_is_mobile() ) {
			$iframe  = '<iframe class="embed-pdf-viewer" src="https://docs.google.com/viewer?url=' . rawurlencode( $sanitized_url );
			$iframe .= '&amp;embedded=true" frameborder="0" ';
		} else {
			$iframe = '<iframe class="embed-pdf-viewer" src="' . $sanitized_url . '" ';
		}
		$iframe .= 'height="' . esc_attr( $atts['height'] ) . '" width="' . esc_attr( $atts['width'] ) . '" ';
		$iframe .= 'title="' . esc_attr( $description ) . '"></iframe>' . "\n";

		$embed  = '<div>';
		$embed .= $iframe;
		$embed .= '<p><a href="' . $sanitized_url . '" title="' . esc_attr( $description ) . '">' . esc_html( $description ) . '</a></p>';
		$embed .= '</div>';

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
		// phpcs:ignore WordPress.DB
		$attachment = $wpdb->get_col( $wpdb->prepare( "SELECT ID FROM $wpdb->posts WHERE guid='%s';", $url ) );

		if ( empty( $attachment ) ) {
			return null;
		}

		return $attachment[0];
	}
}
