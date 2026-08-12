const { configs } = require( '@wordpress/eslint-plugin' );

module.exports = [
	...configs.recommended,
	{
		ignores: [ 'src/icons.js' ],
	},
];
