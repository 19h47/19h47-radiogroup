/**
 *
 * @file webpack.production.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyPlugin = require('copy-webpack-plugin');

const resolve = require('./webpack.utils');

module.exports = merge(common, {
	mode: 'production',
	devtool: false,
	watch: false,
	plugins: [
		new CopyPlugin({
			patterns: [{ from: resolve('radio-button.png'), to: resolve('docs') }],
		}),
	],
});
