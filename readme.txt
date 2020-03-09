# Embed PDF Viewer

Contributors: afragen, akirk
Tags: pdf, embed, oembed, viewer, block
Requires at least: 4.6
Tested up to: 5.4
Requires PHP: 5.6
Stable tag: 2.0.5
License: GPL v2+
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Embed a PDF from the Media Library or elsewhere via oEmbed or as a block into an `object` tag or Google Doc Viewer as fallback.

## Description
Embed a PDF from the Media Library or elsewhere via oEmbed or as a block into an `object` tag or Google Doc Viewer as fallback. The URL only has to be world reachable link.

Inspired by [Embed PDF](https://wordpress.org/plugins/dirtysuds-embed-pdf/) and [RV Embed PDF](https://wordpress.org/plugins/rv-embed-pdf/).

Many thanks to [Alex Kirk](https://github.com/akirk) for making Embed PDF Viewer compatible with the new block editor.

Development on [GitHub](https://github.com/afragen/embed-pdf-viewer). Pull requests are welcome against the `develop` branch.

## Changelog

#### 2.0.5 / 2020-03-09
* minor updates to plugin structure on GitHub
* update tested to

#### 2.0.4 / 2019-10-05
* fixed [PDF upload within block](https://wordpress.org/support/topic/uploading-from-within-block-doesnt-work/)

#### 2.0.3 / 2019-04-25
* move block registration to it's own function and hook
* WPCS updates

#### 2.0.2 / 2019-02-03
* update WordPress requirements

#### 2.0.1 / 2019-01-11
* added `composer.json` and automatically create POT with `composer update`
* added check for `register_block_type()` for WP 4.9.x and below

#### 2.0.0 / 2018-12-20 🎂
* a proper PDF block was added with much help from [Alex Kirk](https://github.com/akirk), many thanks

#### 1.6.1 / 2018-11-25
* properly initialize `load_plugin_textdomain()`

#### 1.6.0 / 2018-07-22
* added filter `embed_pdf_viewer_pdf_attributes`
* updated `readme.txt` to include `Requires PHP` header
* added paragraph tag around link to PDF

#### 1.5.0 / 2016-12-17
* added CSS to fallback to `iframe` on iOS as `object` isn't scrollable :P

#### 1.4.0
* switch to using `object` tag, with `iframe` as fallback display method

#### 1.3.0
* inserting anything other than PDF from Media Library now works as expected.

#### 1.2.1
* fixed a couple of PHP warnings

#### 1.2.0
* inserting a PDF from the Media Library now simply inserts the URL for oEmbed
* oEmbed a PDF from any source

#### 1.1.2
* simplify `instance()` just a little more

#### 1.1.1
* rename instance variable to `$instance` and make private
* update DocBlocks
* ensure `$atts` is an array

#### 1.1
* bugfix for not returning media item when not PDF, Bad Andy :(

#### 1.0.1
* add to DocBlocks

= 1.0 =
* refactor to put embed code in one function
* add assets

= 0.1 =
* initial commit
