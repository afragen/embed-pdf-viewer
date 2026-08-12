/**
 * Embed PDF Viewer block.
 */

import { registerBlockType } from '@wordpress/blocks';
import {
	InspectorControls,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	ResizableBox,
	TextControl,
	TextareaControl,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import { Fragment, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { isBlobURL } from '@wordpress/blob';
import { pencil as editIcon } from '@wordpress/icons';
import './style.css';
import icons from './icons';

const isExternalPDF = ( id, url ) => url && ! id && ! isBlobURL( url );

const renderEmbed = ( props ) => {
	const {
		attributes: { title, description, url, width, height },
	} = props;
	const isChrome =
		navigator &&
		navigator.userAgent &&
		navigator.userAgent.toLowerCase().includes( 'chrome' );
	const src = isChrome
		? 'https://docs.google.com/viewer?url=' +
		  encodeURIComponent( url ) +
		  '&embedded=true'
		: encodeURI( url );

	if ( ! url ) {
		return null;
	}

	return (
		<iframe
			className="embed-pdf-viewer"
			src={ src }
			height={ height }
			width={ width }
			title={ title || description }
			{ ...( isChrome && { frameBorder: '0' } ) }
		/>
	);
};

const Edit = ( props ) => {
	const {
		attributes: { id, title, description, url, width, height, align },
		setAttributes,
	} = props;
	const [ isEditing, setIsEditing ] = useState( false );
	const [ hasError, setHasError ] = useState( false );
	const { createErrorNotice } = useDispatch( noticesStore );
	const { toggleSelection } = useDispatch( 'core/block-editor' );
	const isRTL = useSelect( ( select ) => {
		const { getSettings, __experimentalGetSettings } =
			select( 'core/block-editor' );
		const settings = getSettings
			? getSettings()
			: __experimentalGetSettings();
		return settings.isRTL;
	}, [] );
	const blockProps = useBlockProps( {
		className: isBlobURL( url ) ? 'is-transient' : undefined,
	} );

	const isExternal = isExternalPDF( id, url );

	const updateAttribute = ( key ) => ( value ) => {
		setAttributes( { [ key ]: value } );
	};

	const onSelectFile = ( media ) => {
		if ( media && media.url ) {
			setHasError( false );
			setAttributes( {
				url: media.url,
				id: media.id,
				title: media.title,
				description: media.description,
			} );
		}
	};

	const toggleIsEditing = () => setIsEditing( ! isEditing );

	if ( ! url || hasError || isEditing ) {
		return (
			<MediaPlaceholder
				icon={ icons.pdf }
				labels={ {
					title: __( 'PDF', 'embed-pdf-viewer' ),
					instructions: __(
						'Drag a PDF, upload a new one or select a PDF from your library.',
						'embed-pdf-viewer'
					),
				} }
				onSelect={ onSelectFile }
				onSelectURL={ updateAttribute( 'url' ) }
				onError={ createErrorNotice }
				accept="application/pdf"
				allowedTypes={ [ 'application/pdf' ] }
			/>
		);
	}

	let showRightHandle = false;
	let showLeftHandle = false;

	// See block-library/src/image/edit.js
	if ( align === 'center' ) {
		// When the image is centered, show both handles.
		showRightHandle = true;
		showLeftHandle = true;
	} else if ( isRTL ) {
		// In RTL mode the image is on the right by default.
		// Show the right handle and hide the left handle only when it is aligned left.
		// Otherwise always show the left handle.
		showRightHandle = align === 'left';
		showLeftHandle = align !== 'left';
	} else {
		// Show the left handle and hide the right handle only when the image is aligned right.
		// Otherwise always show the right handle.
		showLeftHandle = align === 'right';
		showRightHandle = align !== 'right';
	}

	const embedProps = { ...props };

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={ __( 'Embed PDF Viewer', 'embed-pdf-viewer' ) }
					initialOpen={ true }
				>
					<TextareaControl
						label={ __(
							'Long Description (optional)',
							'embed-pdf-viewer'
						) }
						value={
							undefined === description ? title : description
						}
						onChange={ updateAttribute( 'description' ) }
						help={ __(
							'Long Description used for `title` tag and accessibility.',
							'embed-pdf-viewer'
						) }
					/>
					<TextControl
						type="number"
						min={ 20 }
						label={ __( 'Width', 'embed-pdf-viewer' ) }
						value={ undefined === width ? '600' : width }
						onChange={ updateAttribute( 'width' ) }
					/>
					<TextControl
						type="number"
						label={ __( 'Height', 'embed-pdf-viewer' ) }
						value={ undefined === height ? '600' : height }
						min={ 1 }
						onChange={ updateAttribute( 'height' ) }
					/>
				</PanelBody>
			</InspectorControls>

			<ToolbarGroup>
				{ isExternal && (
					<ToolbarButton
						label={ __( 'Edit PDF', 'embed-pdf-viewer' ) }
						onClick={ toggleIsEditing }
						icon={ editIcon }
					/>
				) }
				{ ! isExternal && (
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectFile }
							value={ id }
							render={ ( { open } ) => (
								<Button
									label={ __(
										'Edit PDF',
										'embed-pdf-viewer'
									) }
									onClick={ open }
									icon={ editIcon }
								/>
							) }
						/>
					</MediaUploadCheck>
				) }
			</ToolbarGroup>

			<div { ...blockProps }>
				<ResizableBox
					size={ width && height ? { width, height } : undefined }
					lockAspectRatio
					enable={ {
						top: false,
						right: showRightHandle,
						bottom: true,
						left: showLeftHandle,
					} }
					onResizeStart={ () => toggleSelection( false ) }
					onResizeStop={ ( event, direction, elt, delta ) => {
						setAttributes( {
							width: parseInt( width + delta.width, 10 ),
							height: parseInt( height + delta.height, 10 ),
						} );
						toggleSelection( true );
					} }
				>
					{ renderEmbed( embedProps ) }
				</ResizableBox>
			</div>
		</Fragment>
	);
};

registerBlockType( 'embed-pdf-viewer/pdf', {
	icon: icons.pdf,
	edit: Edit,
	save: () => null,
} );
