!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t){!function(){e.exports=this.wp.element}()},function(e,t,n){var r;!function(){"use strict";var n={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=typeof r;if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)&&r.length){var l=i.apply(null,r);l&&e.push(l)}else if("object"===o)for(var a in r)n.call(r,a)&&r[a]&&e.push(a)}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):void 0===(r=function(){return i}.apply(t,[]))||(e.exports=r)}()},function(e,t,n){"use strict";n.r(t);var r=n(0),i=n(1),o=n.n(i),l={};l.pdf=Object(r.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},Object(r.createElement)("rect",{x:"0",fill:"none",width:"20",height:"20"}),Object(r.createElement)("g",null,Object(r.createElement)("style",null,".st0","fill-rule:evenodd;clip-rule:evenodd;"),Object(r.createElement)("path",{d:"M5.8 14H5v1h.8c.3 0 .5-.2.5-.5s-.2-.5-.5-.5zM11 2H3v16h13V7l-5-5zM7.2 14.6c0 .8-.6 1.4-1.4 1.4H5v1H4v-4h1.8c.8 0 1.4.6 1.4 1.4v.2zm4.1.5c0 1-.8 1.9-1.9 1.9H8v-4h1.4c1 0 1.9.8 1.9 1.9v.2zM15 14h-2v1h1.5v1H13v1h-1v-4h3v1zm0-2H4V3h7v4h4v5zm-5.6 2H9v2h.4c.6 0 1-.4 1-1s-.5-1-1-1z"})));var a=l,c=wp.i18n.__,s=wp.blocks,u=s.registerBlockType,d=s.getBlockDefaultClassName,p=wp.blockEditor,h=(p.RichText,p.MediaPlaceholder),f=p.MediaUpload,b=p.InspectorControls,m=p.BlockControls,g=p.BlockAlignmentToolbar,v=wp.element.Fragment,w=wp.components,E=w.withNotices,y=w.Button,O=w.TextControl,j=w.TextareaControl,x=w.PanelBody,P=w.ToolbarGroup,S=w.ToolbarButton,z=w.ResizableBox,C=wp.compose.withState,_=wp.blob.isBlobURL,B=function(e){var t=e.attributes,n=(t.title,t.description),i=t.url,o=t.width,l=t.height,a=t.align,c={width:o,height:l},s=d("embed-pdf-viewer/pdf");return void 0!==i&&i?Object(r.createElement)("figure",{className:"".concat(s,"__content-wrapper align").concat(a)},Object(r.createElement)("object",{className:"embed-pdf-viewer",data:i+"#scrollbar=1&toolbar=1",type:"application/pdf",height:c.height,width:c.width,title:n}),Object(r.createElement)("iframe",{className:"embed-pdf-viewer",src:"https://docs.google.com/viewer?url="+encodeURIComponent(i)+"&embedded=true",frameBorder:"0",height:c.height,width:c.width,title:n})):null},D=u("embed-pdf-viewer/pdf",{title:c("PDF"),icon:a.pdf,category:"embed",attributes:{id:{type:"number"},title:{type:"string"},description:{type:"string",default:""},url:{type:"string"},width:{type:"string",default:600},height:{type:"string",default:600},align:{type:"string"},supports:{align:!0}},getEditWrapperProps:function(e){var t=e.align,n=e.width;if("left"===t||"center"===t||"right"===t)return{"data-align":t,"data-resized":!!n}},edit:E(C({isEditing:!1,hasError:!1})((function(e){var t=e.attributes,n=t.id,i=(t.title,t.description),l=t.url,s=t.width,u=t.height,d=t.align,p=e.setAttributes,w=e.isEditing,E=e.hasError,C=e.setState,T=e.className,M=(e.media,e.noticeUI,e.noticeOperations,e.toggleSelection),N=e.isRTL,k=function(e,t){return t&&!e&&!_(t)}(n,l);function H(e){return function(t){var n={};n[e]=t,p(n)}}function R(e){e&&e.url&&(C({hasError:!1}),p({url:e.url,id:e.id,title:e.title,description:e.description}))}if(void 0===l||!l||E||w)return Object(r.createElement)(h,{icon:a.pdf,labels:{title:c("PDF"),instructions:c("Drag a PDF, upload a new one or select a PDF from your library.")},onSelect:R,onSelectURL:H("url"),notices:e.noticeUI,onError:e.noticeOperations.createErrorNotice,accept:"application/pdf",allowedTypes:["application/pdf"]});var F=o()(T,{"is-transient":_(l)}),I=!1,U=!1;return"center"===d?(I=!0,U=!0):N?"left"===d?I=!0:U=!0:"right"===d?U=!0:I=!0,Object(r.createElement)(v,null,Object(r.createElement)(b,null,Object(r.createElement)(x,{title:c("Embed PDF Viewer"),initialOpen:!0},Object(r.createElement)("div",null,Object(r.createElement)(j,{label:c("Long Description (optional)"),value:void 0===i?"":i,onChange:H("description"),help:c("Long Description used for `title` tag and accessibility.")}),Object(r.createElement)(O,{type:"number",min:20,label:c("Width"),value:void 0===s?D.attributes.width.default:s,onChange:H("width")}),Object(r.createElement)(O,{type:"number",label:c("Height"),value:void 0===u?D.attributes.height.default:u,min:1,onChange:H("height")})))),Object(r.createElement)(m,null,Object(r.createElement)(g,{value:d,onChange:H("align")}),Object(r.createElement)(P,null,k&&Object(r.createElement)(S,{className:"components-icon-button",label:c("Edit PDF"),onClick:function(){C({isEditing:!w})},icon:"edit"}),!k&&Object(r.createElement)(f,{onSelect:R,value:n,render:function(e){var t=e.open;return Object(r.createElement)(y,{className:"components-toolbar__control",label:c("Edit PDF"),onClick:t,icon:"edit"})}}))),Object(r.createElement)("div",{className:F},Object(r.createElement)(z,{size:s&&u?{width:s,height:u}:void 0,lockAspectRatio:!0,enable:{top:!1,right:I,bottom:!0,left:U},onResizeStart:function(){M(!1)},onResizeStop:function(e,t,n,r){p({width:parseInt(s+r.width,10),height:parseInt(u+r.height,10)}),M(!0)}},B(e))))}))),save:B})}]);