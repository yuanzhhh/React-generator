const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseConf = require('./webpack.base.conf');
const config = require('./config');
const { devSsrServerPlugins } = require('./plugins');

const {
    ssrCodePath,
    ssrDist,
    publicPath,
} = config.path;

module.exports = merge(baseConf, {
    entry: {
        ssr_modules: ssrCodePath,
    },

    devtool: 'source-map',

    output: {
        path: ssrDist,
        publicPath,
        filename: '[name].bundle.js',
        libraryTarget: 'commonjs2',
    },

    // 清除webpack打包后的node modules
    externals: [
        nodeExternals()
    ],

    target: 'node',

    plugins: devSsrServerPlugins,
});