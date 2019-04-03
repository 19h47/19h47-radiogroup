/**
 *
 * @file   webpack.production.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
 */

 const glob = require('glob');
 const path = require('path');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(
    common,
    {
        output: {
            filename: 'main.js'
        },
        mode: 'production',
        devtool: false,
        watch: false
    },
);
