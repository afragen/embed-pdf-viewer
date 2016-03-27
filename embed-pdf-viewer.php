<?php
/**
 * Plugin Name:       Embed PDF Viewer
 * Plugin URI:        https://github.com/afragen/embed-pdf-viewer
 * Description:       Embed a PDF from the Media Library or via oEmbed in a Google Doc Viewer.
 * Author:            Andy Fragen
 * Author URI:        https://github.com/afragen
 * Version:           0.1
 * License:           GPLv2+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.html
 * GitHub Plugin URI: https://github.com/afragen/embed-pdf-viewer
 * GitHub Branch:     develop
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
	protected static $object = false;

	/**
	 * Create singleton.
	 *
	 * @return bool
	 */
	public static function instance() {
		$class = __CLASS__;
		if ( false === self::$object ) {
			self::$object = new $class();
		}

		return self::$object;
	}

	/**
	 * Create media library insertion code.
	 *
	 * @param $html
	 * @param $id
	 *
	 * @return string
	 */
	public function embed_pdf_media_editor( $html, $id ) {
		$attachment = get_post( $id );
		$out        = "";
		if ( 'application/pdf' === $attachment->post_mime_type ) {
			$out .= '<iframe src="https://docs.google.com/gview?url=' . urlencode( $attachment->guid ) . '&embedded=true" style="width:100%; height:500px;" frameborder="0"></iframe>';
		}

		return $out . $html . "\n\n";
	}

	/**
	 * Create oEmbed code.
	 *
	 * @param $matches
	 * @param $atts
	 * @param $url
	 *
	 * @return string
	 */
	public function oembed_pdf_viewer( $matches, $atts, $url ) {
		$default = array(
			'height' => 600,
			'width'  => 800,
			'title'  => null,
			'class'  => 'pdf',
		);

		$atts = array_merge( $default, $atts );

		if ( empty( $atts['title'] ) ) {
			$parsed_url    = parse_url( $url, PHP_URL_PATH );
			$filename      = pathinfo( $parsed_url );
			$atts['title'] = preg_replace( '/(-|_)/', ' ', $filename['filename'] );
		}

		$embed = '<iframe src="https://docs.google.com/viewer?url=' . urlencode( $url ) . '&amp;embedded=true" class="' . $atts['class'] . '"';
		$embed .= ' frameborder="0"';
		$embed .= ' style="height:' . $atts['height'] . 'px;width:' . $atts['width'] . 'px;"';
		$embed .= ' title="' . $atts['title'] . '"></iframe>';
		$embed .= '<a href="' . $url . '">' . $atts['title'] . '</a>';

		return $embed;
	}

}
