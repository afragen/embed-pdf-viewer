#### [unreleased]

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

#### 1.4.0 / 2016-12-16
* switch to using `object` tag, with `iframe` as fallback display method

#### 1.3.0 / 2016-08-13
* bugfix for not returning non-PDF file from Media Library
* added textdomain for translating title etc

#### 1.2.1 / 2016-07-11
* fixed a couple of PHP warnings

#### 1.2.0 / 2016-07-10
* inserting a PDF from the Media Library now simply inserts the URL for oEmbed
* oEmbed a PDF from any source

#### 1.1.2 / 2016-07-03
* simplify `instance()` just a little more

#### 1.1.1 / 2016-06-14
* rename instance variable to `$instance` and make private
* update DocBlocks
* ensure `$atts` is an array

#### 1.1 / 2016-06-11
* bugfix for not returning media item when not PDF, Bad Andy :(

#### 1.0.1 / 2016-06-01
* add to DocBlocks

#### 1.0 / 2016-05-09
* refactor to put embed code in one function
* add assets

#### 0.1
* initial commit
