import classnames from 'classnames';

const { __ } = wp.i18n;
const { registerBlockType, getBlockDefaultClassName } = wp.blocks;
const { RichText, MediaPlaceholder, MediaUpload, InspectorControls, BlockControls, BlockAlignmentToolbar } = wp.editor;
const { Fragment } = wp.element;
const { withNotices, IconButton, TextControl, PanelBody, Toolbar, ResizableBox } = wp.components;
const { withState } = wp.compose;
const { isBlobURL } = wp.blob;

const isExternalPDF = (id, url) => url && !id && !isBlobURL(url);

const renderEmbed = (props) => {
	const { attributes: { url, width, height } } = props;
	const style = { width, height };
	const myClassName = getBlockDefaultClassName('embed-pdf-viewer/embed-pdf-viewer');

	if (undefined === url || !url) {
		return null;
	}
	return (
		<figure className={`${myClassName}__content-wrapper`}>
			<object
				className="embed-pdf-viewer"
				data={url + '#scrollbar=1&toolbar=1'}
				type="application/pdf"
				height={style.height}
				width={style.width}
			>
			</object>
			<iframe
				className="embed-pdf-viewer"
				src={'https://docs.google.com/viewer?url=' + encodeURIComponent(url) + '&embedded=true'}
				frameBorder="0"
				height={style.height}
				width={style.width}
			>
			</iframe>
		</figure>
	);
}

const renderEdit = (props) => {
	const { attributes: { id, url, width, height, align }, setAttributes, isEditing, hasError, setState, className, media, noticeUI, noticeOperations, toggleSelection, isRTL } = props;
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
				icon="media-document"
				labels={{
					title: __('PDF'),
					instructions: __('Drag a PDF, upload a new one or select a PDF from your library.'),
				}}
				onSelect={onSelectFile}
				onSelectURL={updateAttribute('url')}
				notices={props.noticeUI}
				onError={props.noticeOperations.createErrorNotice}
				accept="application/pdf"
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
				<PanelBody title={__('Embed size')} initialOpen={true}>
					<div>
						<TextControl
							type="number"
							min={20}
							label={__('Width')}
							value={undefined === width ? defaultWidth : width}
							onChange={updateAttribute('width')}
						/>
						<TextControl
							type="number"
							label={__('Height')}
							value={undefined === height ? defaultHeight : height}
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
				/>
				<Toolbar>
					{isExternal && (
						<IconButton
							className="components-icon-button components-toolbar__control"
							label={__('Edit PDF')}
							onClick={toggleIsEditing}
							icon="edit"
						/>
					)}
					{!isExternal && (
						<MediaUpload
							onSelect={onSelectFile}
							value={id}
							render={({ open }) => (
								<IconButton
									className="components-toolbar__control"
									label={__('Edit PDF')}
									onClick={open}
									icon="edit"
								/>
							)}
						/>
					)}
				</Toolbar>
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
							width: parseInt(currentWidth + delta.width, 10),
							height: parseInt(currentHeight + delta.height, 10),
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

registerBlockType('embed-pdf-viewer/embed-pdf-viewer', {
	title: __('PDF'),
	icon: 'media-document',
	category: 'embed',
	attributes: {
		id: { type: 'number', },
		url: { type: 'string', },
		width: {
			type: 'string',
			default: 600,
		},
		height: {
			type: 'string',
			default: 400,
		},
		align: { type: 'string', },
	},

	getEditWrapperProps(attributes) {
		const { align, width } = attributes;
		if ('left' === align || 'center' === align || 'right' === align) {
			return { 'data-align': align, 'data-resized': !!width };
		}
	},

	edit: withNotices(withState({ isEditing: false, hasError: false })(renderEdit)),
	save: renderEmbed,
});
