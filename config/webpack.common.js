/**
 *
 * @file   webpack.common.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
 */

// Node modules
const path = require('path');

// Plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

/**
 * Resolve
 *
 * @param {str} dir Dir.
 * @return {str} Dir.
 */
function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	devServer: {
		contentBase: resolve('dist'),
		compress: true,
		port: 9000,
		inline: true,
	},
	output: {
		library: 'Radios',
		libraryTarget: 'umd',
		filename: '../main.js'
	},
	resolve: {
		alias: {
			'@': resolve('src'),
		}
	},
	module: {
		rules: [{
			enforce: 'pre',
			test: /\.js$/,
			exclude: [/node_modules/, /vendors/],
			loader: 'eslint-loader'
		},
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}]
	},
	plugins: [
        new CleanWebpackPlugin({
                root: resolve(''),
				verbose: false,
            }
        ),
		new WebpackNotifierPlugin({
            title: 'Webpack',
            excludeWarnings: true,
            alwaysNotify: true
        }),
	],
};
