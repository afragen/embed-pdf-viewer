/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./src/icons.js":
/*!**********************!*\
  !*** ./src/icons.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

var icons = {};
icons.pdf = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20"
}, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("rect", {
  x: "0",
  fill: "none",
  width: "20",
  height: "20"
}), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("g", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", null, ".st0", "fill-rule:evenodd;clip-rule:evenodd;"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
  d: "M5.8 14H5v1h.8c.3 0 .5-.2.5-.5s-.2-.5-.5-.5zM11 2H3v16h13V7l-5-5zM7.2 14.6c0 .8-.6 1.4-1.4 1.4H5v1H4v-4h1.8c.8 0 1.4.6 1.4 1.4v.2zm4.1.5c0 1-.8 1.9-1.9 1.9H8v-4h1.4c1 0 1.9.8 1.9 1.9v.2zM15 14h-2v1h1.5v1H13v1h-1v-4h3v1zm0-2H4V3h7v4h4v5zm-5.6 2H9v2h.4c.6 0 1-.4 1-1s-.5-1-1-1z"
})));
/* harmony default export */ __webpack_exports__["default"] = (icons);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _icons_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./icons.js */ "./src/icons.js");



var __ = wp.i18n.__;
var _wp$blocks = wp.blocks,
    registerBlockType = _wp$blocks.registerBlockType,
    getBlockDefaultClassName = _wp$blocks.getBlockDefaultClassName;
var _wp$blockEditor = wp.blockEditor,
    RichText = _wp$blockEditor.RichText,
    MediaPlaceholder = _wp$blockEditor.MediaPlaceholder,
    MediaUpload = _wp$blockEditor.MediaUpload,
    InspectorControls = _wp$blockEditor.InspectorControls,
    BlockControls = _wp$blockEditor.BlockControls,
    BlockAlignmentToolbar = _wp$blockEditor.BlockAlignmentToolbar;
var Fragment = wp.element.Fragment;
var _wp$components = wp.components,
    withNotices = _wp$components.withNotices,
    Button = _wp$components.Button,
    TextControl = _wp$components.TextControl,
    TextareaControl = _wp$components.TextareaControl,
    PanelBody = _wp$components.PanelBody,
    ToolbarGroup = _wp$components.ToolbarGroup,
    ToolbarButton = _wp$components.ToolbarButton,
    ResizableBox = _wp$components.ResizableBox;
var withState = wp.compose.withState;
var isBlobURL = wp.blob.isBlobURL;

var isExternalPDF = function isExternalPDF(id, url) {
  return url && !id && !isBlobURL(url);
};

var renderEmbed = function renderEmbed(props) {
  var _props$attributes = props.attributes,
      title = _props$attributes.title,
      description = _props$attributes.description,
      url = _props$attributes.url,
      width = _props$attributes.width,
      height = _props$attributes.height,
      align = _props$attributes.align;
  var style = {
    width: width,
    height: height
  };
  var myClassName = getBlockDefaultClassName('embed-pdf-viewer/pdf');

  if (undefined === url || !url) {
    return null;
  }

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("figure", {
    className: "".concat(myClassName, "__content-wrapper align").concat(align)
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("object", {
    className: "embed-pdf-viewer",
    data: url + '#scrollbar=1&toolbar=1',
    type: "application/pdf",
    height: style.height,
    width: style.width,
    title: description
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("iframe", {
    className: "embed-pdf-viewer",
    src: 'https://docs.google.com/viewer?url=' + encodeURIComponent(url) + '&embedded=true',
    frameBorder: "0",
    height: style.height,
    width: style.width,
    title: description
  }));
};

var renderEdit = function renderEdit(props) {
  var _props$attributes2 = props.attributes,
      id = _props$attributes2.id,
      title = _props$attributes2.title,
      description = _props$attributes2.description,
      url = _props$attributes2.url,
      width = _props$attributes2.width,
      height = _props$attributes2.height,
      align = _props$attributes2.align,
      setAttributes = props.setAttributes,
      isEditing = props.isEditing,
      hasError = props.hasError,
      setState = props.setState,
      className = props.className,
      media = props.media,
      noticeUI = props.noticeUI,
      noticeOperations = props.noticeOperations,
      toggleSelection = props.toggleSelection,
      isRTL = props.isRTL;
  var isExternal = isExternalPDF(id, url);

  function updateAttribute(key) {
    return function (value) {
      var attr = {};
      attr[key] = value;
      setAttributes(attr);
    };
  }

  function onSelectFile(media) {
    if (media && media.url) {
      setState({
        hasError: false
      });
      setAttributes({
        url: media.url,
        id: media.id,
        title: media.title,
        description: media.description
      });
    }
  }

  function toggleIsEditing() {
    setState({
      isEditing: !isEditing
    });
  }

  if (undefined === url || !url || hasError || isEditing) {
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(MediaPlaceholder, {
      icon: _icons_js__WEBPACK_IMPORTED_MODULE_2__["default"].pdf,
      labels: {
        title: __('PDF', 'embed-pdf-viewer'),
        instructions: __('Drag a PDF, upload a new one or select a PDF from your library.', 'embed-pdf-viewer')
      },
      onSelect: onSelectFile,
      onSelectURL: updateAttribute('url'),
      notices: props.noticeUI,
      onError: props.noticeOperations.createErrorNotice,
      accept: "application/pdf",
      allowedTypes: ['application/pdf']
    });
  }

  var classes = classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, {
    'is-transient': isBlobURL(url)
  });
  var showRightHandle = false;
  var showLeftHandle = false; // See block-library/src/image/edit.js

  if (align === 'center') {
    // When the image is centered, show both handles.
    showRightHandle = true;
    showLeftHandle = true;
  } else if (isRTL) {
    // In RTL mode the image is on the right by default.
    // Show the right handle and hide the left handle only when it is aligned left.
    // Otherwise always show the left handle.
    if (align === 'left') {
      showRightHandle = true;
    } else {
      showLeftHandle = true;
    }
  } else {
    // Show the left handle and hide the right handle only when the image is aligned right.
    // Otherwise always show the right handle.
    if (align === 'right') {
      showLeftHandle = true;
    } else {
      showRightHandle = true;
    }
  }

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(Fragment, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(InspectorControls, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelBody, {
    title: __('Embed PDF Viewer', 'embed-pdf-viewer'),
    initialOpen: true
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(TextareaControl, {
    label: __('Long Description (optional)', 'embed-pdf-viewer'),
    value: undefined === description ? '' : description,
    onChange: updateAttribute('description'),
    help: __('Long Description used for `title` tag and accessibility.', 'embed-pdf-viewer')
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(TextControl, {
    type: "number",
    min: 20,
    label: __('Width', 'embed-pdf-viewer'),
    value: undefined === width ? embedPDFViewer.attributes.width.default : width,
    onChange: updateAttribute('width')
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(TextControl, {
    type: "number",
    label: __('Height', 'embed-pdf-viewer'),
    value: undefined === height ? embedPDFViewer.attributes.height.default : height,
    min: 1,
    onChange: updateAttribute('height')
  })))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(BlockControls, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(BlockAlignmentToolbar, {
    value: align,
    onChange: updateAttribute('align'),
    controls: ['left', 'center', 'right']
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(ToolbarGroup, null, isExternal && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(ToolbarButton, {
    className: "components-icon-button",
    label: __('Edit PDF', 'embed-pdf-viewer'),
    onClick: toggleIsEditing,
    icon: "edit"
  }), !isExternal && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(MediaUpload, {
    onSelect: onSelectFile,
    value: id,
    render: function render(_ref) {
      var open = _ref.open;
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(Button, {
        className: "components-toolbar__control",
        label: __('Edit PDF', 'embed-pdf-viewer'),
        onClick: open,
        icon: "edit"
      });
    }
  }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: classes
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(ResizableBox, {
    size: width && height ? {
      width: width,
      height: height
    } : undefined,
    lockAspectRatio: true,
    enable: {
      top: false,
      right: showRightHandle,
      bottom: true,
      left: showLeftHandle
    },
    onResizeStart: function onResizeStart() {
      toggleSelection(false);
    },
    onResizeStop: function onResizeStop(event, direction, elt, delta) {
      setAttributes({
        width: parseInt(width + delta.width, 10),
        height: parseInt(height + delta.height, 10)
      });
      toggleSelection(true);
    }
  }, renderEmbed(props))));
};

var embedPDFViewer = registerBlockType('embed-pdf-viewer/pdf', {
  title: __('PDF', 'embed-pdf-viewer'),
  icon: _icons_js__WEBPACK_IMPORTED_MODULE_2__["default"].pdf,
  category: 'embed',
  attributes: {
    id: {
      type: 'number'
    },
    title: {
      type: 'string'
    },
    description: {
      type: 'string',
      default: ''
    },
    url: {
      type: 'string'
    },
    width: {
      type: 'string',
      default: 600
    },
    height: {
      type: 'string',
      default: 600
    },
    align: {
      type: 'string',
      default: 'center'
    },
    supports: {
      align: ['left', 'center', 'right']
    }
  },
  getEditWrapperProps: function getEditWrapperProps(attributes) {
    var align = attributes.align,
        width = attributes.width;

    if ('left' === align || 'center' === align || 'right' === align) {
      return {
        'data-align': align,
        'data-resized': !!width
      };
    }
  },
  edit: withNotices(withState({
    isEditing: false,
    hasError: false
  })(renderEdit)),
  save: renderEmbed
});

/***/ }),

/***/ "@wordpress/element":
/*!******************************************!*\
  !*** external {"this":["wp","element"]} ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["element"]; }());

/***/ })

/******/ });
//# sourceMappingURL=index.js.map