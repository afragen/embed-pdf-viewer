# Embed PDF Viewer

Contributors: afragen, akirk, costdev
Tags: pdf, embed, oembed, viewer, block
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 7.4
Stable tag: 2.4.6
License: GPL v2+
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Embed a PDF from the Media Library or elsewhere via oEmbed or as a block into an `iframe` tag.

## Description
Embed a PDF from the Media Library or elsewhere via oEmbed or as a block into an `iframe` tag. The URL only has to be world reachable link. Chrome uses Google Doc Viewer as Chrome seems to automatically rendered embedded JS in PDFs automatically. Uses Google Doc Viewer with mobile.

Inspired by [Embed PDF](https://wordpress.org/plugins/dirtysuds-embed-pdf/) and [RV Embed PDF](https://wordpress.org/plugins/rv-embed-pdf/).

Many thanks to [Alex Kirk](https://github.com/akirk) for making Embed PDF Viewer compatible with the new block editor.

Development on [GitHub](https://github.com/afragen/embed-pdf-viewer). Pull requests are welcome against the `develop` branch.

### Known Issues
Occasionally Google Doc Viewer will not correctly load the PDF. Reloading the page should correct the issue, though this may need to be done several times.

## Screenshots
1. Embed PDF Viewer block
2. Select PDF
3. PDF block and attributes

## Changelog

#### 2.4.6 / 2024-11-01
* remove `load_plugin_textdomain()`

#### 2.4.5 / 2024-10-7
* escape block parameters

#### 2.4.4 / 2024-08-16
* refactor `$description` in `dynamic_render_callback()`, who knew the title attribute could be not set
* update requirements, PHP 7.4+, WP 6.0

#### 2.4.1 - 2.4.3 / 2024-08-08
* more sanitizing of URL
* fix typos and update readme
* use media file description for title if present
* escape description in render

#### 2.4.0 / 2024-08-06
* convert to only use `iframe`
* use Google Doc Viewer for Chrome and mobile
* dynamically render `iframe` in block based on browser
* mitigate [Chromium issue](https://issues.chromium.org/issues/40063550) by rendering PDF with Google Doc Viewer
* thanks to @costdev for helping with dynamic block rendering

#### 2.3.1 / 2023-09-10
* update GA
* update tested to

#### 2.3.0 / 2021-07-07
* add @10up GitHub Actions integration for WordPress SVN

#### 2.2.0 / 2021-03-05
* update Toolbar to ToolbarGroup and ToolbarButton
* add limited support for block alignment toolbar
* fixes for i18n in block
* exclude `/build` from `make-pot` in `composer.json`, doesn't work with minimized JS

#### 2.1.2 / 2020-09-15
* use same _block name_ for oembed
* add additional dependencies to enqueue

### 2.1.1 / 2020-07-20
* update block for deprecated items and minor errors
* update media selector for only PDFs

#### 2.1.0 / 2020-07-20
* update block build process
* add title and description attributes for a11y
* add PDF svg for block

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
