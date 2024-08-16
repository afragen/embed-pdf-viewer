# Embed PDF Viewer

* Contributors: afragen, akirk, costdev
* Tags: pdf, embed, oembed, viewer, block
* Requires at least: 6.0
* Requires PHP: 7.4
* Stable tag: master
* License: GPL v2+
* License URI: <https://www.gnu.org/licenses/gpl-2.0.html>

Embed a PDF from the Media Library or elsewhere via oEmbed or as a block into an `iframe` tag.

## Description
Embed a PDF from the Media Library or elsewhere via oEmbed or as a block into an `iframe` tag. The URL only has to be world reachable link. Chrome uses Google Doc Viewer as Chrome seems to automatically rendered embedded JS in PDFs automatically. Uses Google Doc Viewer with mobile.

Inspired by [Embed PDF](https://wordpress.org/plugins/dirtysuds-embed-pdf/) and [RV Embed PDF](https://wordpress.org/plugins/rv-embed-pdf/).

Many thanks to [Alex Kirk](https://github.com/akirk) for making Embed PDF Viewer compatible with the new block editor.

Pull requests are welcome against the `develop` branch.

### Known Issues
Occasionally Google Doc Viewer will not correctly load the PDF. Reloading the page should correct the issue, though this may need to be done several times.

## Screenshots
![Embed PDF Viewer block](./.wordpress-org/screenshot-1.png "Embed PDF Viewer block")

Embed PDF Viewer block

![Select PDF](./.wordpress-org/screenshot-2.png "Select PDF")

Select PDF


![PDF block and attributes](./.wordpress-org/screenshot-3.png "PDF block and attributes")

PDF block and attributes
