/**
 *
 * @file webpack.production.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
 */

console.log('[Webpack] webpack.production.js');

const CopyPlugin = require('copy-webpack-plugin');

const resolve = require('./webpack.utils');

module.exports = {
	mode: 'production',
	devtool: false,
	watch: false,
	plugins: [
		new CopyPlugin({
			patterns: [{ from: resolve('radio-button.png'), to: resolve('docs/') }],
		}),
	],
};
