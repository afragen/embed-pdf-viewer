<?php
/**
 * Plugin Name:       Embed PDF Viewer
 * Plugin URI:        https://github.com/afragen/embed-pdf-viewer
 * Description:       Embed a PDF from the Media Library or elsewhere via oEmbed into an `object` tag or Google Doc Viewer as fallback.
 * Author:            Andy Fragen
 * Author URI:        https://github.com/afragen
 * Version:           1.5.1
 * License:           GPLv2+
 * Domain Path:       /languages
 * Text Domain:       embed-pdf-viewer
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.html
 * GitHub Plugin URI: https://github.com/afragen/embed-pdf-viewer
 * Requires PHP:      5.3
 * Requires WP:       4.0
 */

/**
 * Exit if called directly.
 */
if ( ! defined( 'WPINC' ) ) {
	die;
}

add_filter( 'media_send_to_editor', array( Embed_PDF_Viewer::instance(), 'embed_pdf_media_editor' ), 20, 2 );
wp_embed_register_handler( 'oembed_pdf_viewer', '#(^(https?)\:\/\/.+\.pdf$)#i', array(
	Embed_PDF_Viewer::instance(),
	'oembed_pdf_viewer',
) );

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
	 * @param array  $matches
	 * @param array  $atts array of media height/width.
	 * @param string $url  URI for media file.
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
	 * @param \WP_Post     $post
	 * @param array|string $atts    array of media height/width or
	 *                              href to media library asset.
	 *
	 * @return bool|string
	 */
	private function create_output( WP_Post $post, $atts = array() ) {
		if ( 'application/pdf' !== $post->post_mime_type ) {
			return $atts;
		}

		$default = array(
			'height' => 500,
			'width'  => 800,
			'title'  => $post->post_title,
		);

		/*
		 * Ensure $atts isn't the href.
		 */
		$atts = is_array( $atts ) ? $atts : array();

		if ( isset( $atts['height'] ) ) {
			$atts['height'] = ( $atts['height'] / 2 );
		}
		$atts = array_merge( $default, $atts );

		// Fix title or create from filename.
		$atts['title'] = empty( $atts['title'] )
			? ucwords( preg_replace( '/(-|_)/', ' ', $post->post_name ) )
			: ucwords( preg_replace( '/(-|_)/', ' ', $atts['title'] ) );

		$iframe_fallback = '<iframe class="embed-pdf-viewer" src="https://docs.google.com/viewer?url=' . urlencode( $post->guid );
		$iframe_fallback .= '&amp;embedded=true" frameborder="0" ';
		$iframe_fallback .= 'style="height:' . $atts['height'] . 'px;width:' . $atts['width'] . 'px;" ';
		$iframe_fallback .= 'title="' . $atts['title'] . '"></iframe>' . "\n";

		/*
		 * Because <object> doesn't scroll in iOS
		 * Hide <object> in iOS and hide <iframe> in not iOS
		 */
		$style = '<style>
		@media only screen and (max-device-width: 1024px) {
			object.embed-pdf-viewer { display:none; }
		}
		@media only screen and (min-device-width : 1024px) {
			iframe.embed-pdf-viewer { display:none; }
			object iframe.embed-pdf-viewer { display:block; }
		}
		</style>';

		$object = '<object class="embed-pdf-viewer" data="' . $post->guid;
		$object .= '#scrollbar=1&toolbar=1"';
		$object .= 'type="application/pdf" ';
		$object .= 'height=' . $atts['height'] . ' width=' . $atts['width'] . ' > ';
		$object .= $iframe_fallback;
		$object .= '</object>';

		$embed = $object;
		$embed .= $style . $iframe_fallback;
		$embed .= '<a href="' . $post->guid . '">' . $atts['title'] . '</a>';

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
