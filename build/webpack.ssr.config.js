const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseConf = require('./webpack.base.conf');
const config = require('./config');
const plugins = require('./plugins')();

const {
    path: configPath
} = config;

module.exports = merge(baseConf, {
    entry: {
        ssr_modules: configPath.ssrCodePath,
    },

    devtool: 'source-map',

    output: {
        path: configPath.ssrDist,
        publicPath: configPath.publicPath,
        filename: '[name].bundle.js',
        libraryTarget: 'commonjs2',
    },

    // 清除webpack打包后的node modules
    externals: [
        nodeExternals()
    ],

    target: 'node',

    plugins,
});