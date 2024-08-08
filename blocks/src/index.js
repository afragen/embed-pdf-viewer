import classnames from 'classnames';
import icons from './icons.js';

const { __ } = wp.i18n;
const { registerBlockType, getBlockDefaultClassName } = wp.blocks;
const { RichText, MediaPlaceholder, MediaUpload, MediaUploadCheck, InspectorControls, BlockControls, BlockAlignmentToolbar } = wp.blockEditor;
const { Fragment } = wp.element;
const { withNotices, Button, TextControl, TextareaControl, PanelBody, ToolbarGroup, ToolbarButton, ResizableBox } = wp.components;
const { withState } = wp.compose;
const { isBlobURL } = wp.blob;

const isExternalPDF = (id, url) => url && !id && !isBlobURL(url);

const renderEmbed = (props) => {
	const { attributes: { title, description, url, width, height, align } } = props;
	const style = { width, height };
	const myClassName = getBlockDefaultClassName('embed-pdf-viewer/pdf');
	const isChrome = navigator && navigator?.userAgent && navigator.userAgent.toLowerCase().includes('chrome');
	const classNames = "embed-pdf-viewer";
	const src = isChrome && 'https://docs.google.com/viewer?url=' + encodeURIComponent(url) + '&embedded=true' || encodeURI(url);

	if (undefined === url || !url) {
		return null;
	}

	return (
		<div className={`${myClassName}__content-wrapper align${align}`}>
			<iframe
				className={classNames}
				src={src}
				height={style.height}
				width={style.width}
				title={title}
				{...(isChrome && { frameBorder: "0" })}
			>
			</iframe>
		</div>
	);
};

const renderEdit = (props) => {
	const { attributes: { id, title, description, url, width, height, align }, setAttributes, isEditing, hasError, setState, className, media, noticeUI, noticeOperations, toggleSelection, isRTL } = props;
	const isExternal = isExternalPDF(id, url);

	function updateAttribute(key) {
		return function (value) {
			const attr = {};
			attr[key] = value;
			setAttributes(attr);
		}
	}

	function onSelectFile(media) {
		if (media && media.url) {
			setState({
				hasError: false,
			});
			setAttributes({
				url: media.url,
				id: media.id,
				title: media.title,
				description: media.description,
			});
		}
	}

	function toggleIsEditing() {
		setState({
			isEditing: !isEditing,
		});
	}

	if (undefined === url || !url || hasError || isEditing) {
		return (
			<MediaPlaceholder
				icon={icons.pdf}
				labels={{
					title: __('PDF', 'embed-pdf-viewer'),
					instructions: __('Drag a PDF, upload a new one or select a PDF from your library.', 'embed-pdf-viewer'),
				}}
				onSelect={onSelectFile}
				onSelectURL={updateAttribute('url')}
				notices={props.noticeUI}
				onError={props.noticeOperations.createErrorNotice}
				accept='application/pdf'
				allowedTypes={['application/pdf']}
			/>
		);
	}


	const classes = classnames(className, {
		'is-transient': isBlobURL(url),
	});


	let showRightHandle = false;
	let showLeftHandle = false;

	// See block-library/src/image/edit.js
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

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Embed PDF Viewer', 'embed-pdf-viewer')} initialOpen={true}>
					<div>
						<TextareaControl
							label={__('Long Description (optional)', 'embed-pdf-viewer')}
							value={undefined === description ? title : description}
							onChange={updateAttribute('description')}
							help={__('Long Description used for `title` tag and accessibility.', 'embed-pdf-viewer')}
						/>
						<TextControl
							type="number"
							min={20}
							label={__('Width', 'embed-pdf-viewer')}
							value={undefined === width ? embedPDFViewer.attributes.width.default : width}
							onChange={updateAttribute('width')}
						/>
						<TextControl
							type="number"
							label={__('Height', 'embed-pdf-viewer')}
							value={undefined === height ? embedPDFViewer.attributes.height.default : height}
							min={1}
							onChange={updateAttribute('height')}
						/>
					</div>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<BlockAlignmentToolbar
					value={align}
					onChange={updateAttribute('align')}
					controls={['left', 'center', 'right']}
				/>
				<ToolbarGroup>
					{isExternal && (
						<ToolbarButton
							className="components-icon-button"
							label={__('Edit PDF', 'embed-pdf-viewer')}
							onClick={toggleIsEditing}
							icon="edit"
						/>
					)}
					{!isExternal && (
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onSelectFile}
								value={id}
								render={({ open }) => (
									<Button
										className="components-toolbar__control"
										label={__('Edit PDF', 'embed-pdf-viewer')}
										onClick={open}
										icon="edit"
									/>
								)}
							/>
						</MediaUploadCheck>
					)}
				</ToolbarGroup>
			</BlockControls>

			<div className={classes}>
				<ResizableBox
					size={
						width && height ? {
							width,
							height,
						} : undefined
					}
					lockAspectRatio
					enable={{
						top: false,
						right: showRightHandle,
						bottom: true,
						left: showLeftHandle,
					}}
					onResizeStart={() => {
						toggleSelection(false);
					}}
					onResizeStop={(event, direction, elt, delta) => {
						setAttributes({
							width: parseInt(width + delta.width, 10),
							height: parseInt(height + delta.height, 10),
						});
						toggleSelection(true);
					}}
				>
					{renderEmbed(props)}
				</ResizableBox>
			</div>
		</Fragment>
	);
};

let embedPDFViewer = registerBlockType('embed-pdf-viewer/pdf', {
	title: __('PDF', 'embed-pdf-viewer'),
	icon: icons.pdf,
	category: 'embed',
	attributes: {
		id: { type: 'number', },
		title: { type: 'string' },
		description: {
			type: 'string',
			default: '',
		},
		url: { type: 'string', },
		width: {
			type: 'string',
			default: 600,
		},
		height: {
			type: 'string',
			default: 600,
		},
		align: {
			type: 'string',
			default: 'center',
		},
		supports: {
			align: ['left', 'center', 'right'],
		},
	},

	getEditWrapperProps(attributes) {
		const { align, width } = attributes;
		if ('left' === align || 'center' === align || 'right' === align) {
			return { 'data-align': align, 'data-resized': !!width };
		}
	},

	edit: withNotices(withState({ isEditing: false, hasError: false })(renderEdit)),
	// save: renderEmbed,
});
