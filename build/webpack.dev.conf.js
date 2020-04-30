const path = require('path');
const config = require('../config');
const setting = require('../setting');

const { PATH } = setting;

const {
    devClientPlugins,
    devSsrClientPlugins
} = require('./plugins');

const {
    path: configPath,
    SERVICE_STATE
} = config;


const webpack = require('webpack');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        }
    },
    entry: {
        app: [
            'eventsource-polyfill',
            'viewport-units-buggyfill',
        ].concat(
            SERVICE_STATE.__BUILD_TYPE__ === 'client' ? [
                'react-hot-loader/patch',
                'webpack/hot/only-dev-server',
                configPath.entryPath
            ] : [configPath.entryPath]
        )
    },
    output: {
        path: configPath.distPath,
        publicPath: configPath.publicPath,
        filename: 'assets/[name].bundle.js',
        chunkFilename: 'assets/[id].[name].bundle.js',
    },

    // plugins: SERVICE_STATE.__BUILD_TYPE__ === 'client' ? devClientPlugins : devSsrClientPlugins,

    plugins: [
        new NyanProgressPlugin(),
        new webpack.ProgressPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin({
            async: true,
            tsconfig: path.join(PATH.root, 'tsconfig.json'),
            checkSyntacticErrors: true,
            memoryLimit: 4096,
            silent: false,
        }),
        new ForkTsCheckerNotifierWebpackPlugin({
            excludeWarnings: true,
            skipSuccessful: true,
        }),
        new HtmlWebpackPlugin({
            title: '开发 || 调试',
            filename: `index.html`,
            template: `${config.path.srcpath}/index.html`,
            inject: 'body',
            hash: true,
            // 错误反馈至页面
            showerrors: true,
        }),
        new AddAssetHtmlPlugin({
            filepath: path.join(PATH.dll, 'vendor.dll.bundle.js'),
            hash: true,
            includeSourcemap: false,
        }),
        new webpack.DllReferencePlugin({
            manifest: path.join(PATH.dll, 'manifest.json'),
            context: PATH.dll,
        }),
        new webpack.NamedModulesPlugin(),
    ]
};
