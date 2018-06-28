const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = merge(common, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new CleanWebpackPlugin(['dist'])
    ]
});

const glob = require('glob');
const files = glob.sync(process.cwd() + '/src/*.html');
files.forEach(file => {
    config.plugins.push(new HtmlWebpackPlugin({
        filename: path.basename(file),
        template: file,
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            conservativeCollapse: true
        }
    }))
});

module.exports = config;