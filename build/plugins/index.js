const webpack = require('webpack');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const I18nPlugin = require('i18n-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const os = require('os');
const { ReactLoadablePlugin } = require('react-loadable/webpack');

const cnJson = require("./languages/cn.json");
const config = require('../../config');

const HappyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length,
});

// 客户端使用的插件
const windowPlugin = [
    new HtmlWebpackPlugin({
        title: '开发 || 调试',
        filename: `index.html`,
        template: `${config.path.srcPath}/index.html`,
        inject: 'body',
        hash: true,
        // 错误反馈至页面
        showErrors: true,
    }),
]

const nyanCatSaysList = require('./nyanCatSaysList');

const baseDevPlugins = [
    // 🌈 进度条
    new NyanProgressPlugin({
        nyanCatSays: progress => progress === 1 && nyanCatSaysList[Math.floor(Math.random() * nyanCatSaysList.length)],
        debounceInterval: 100,
    }),

    // 跳过错误输出
    new webpack.NoEmitOnErrorsPlugin(),
]

const basePlugins = [
    // 编译进度
    new webpack.ProgressPlugin(),

    // 友好报错信息
    new FriendlyErrorsWebpackPlugin(),

    // 全局变量
    new webpack.DefinePlugin({
        'process.env': {
            // 因为使用热加载，所以在开发状态下可能传入的环境变量为空
            NODE_ENV: JSON.stringify(config.SERVICE_STATE.__DEV__ ? 'development' : 'production'),
            PORT: process.env.PORT || config.port,
        },
        SERVICE_STATE: JSON.stringify(config.SERVICE_STATE),
        // 基准值
        VIEWPORT_BASELINE: config.viewportBaseline,
    }),

    new I18nPlugin(cnJson),

    // HappyPack
    new HappyPack({
        id: 'scripts',
        threadPool: HappyThreadPool,
        loaders: ['babel-loader']
    }),

    new HappyPack({
        id: 'eslint-scripts',
        threadPool: HappyThreadPool,
        loaders: ['eslint-loader']
    }),

    new HappyPack({
        id: 'styles-sass',
        threadPool: HappyThreadPool,
        loaders: ['css-loader', 'sass-loader']
    }),

    new HappyPack({
        id: 'styles',
        threadPool: HappyThreadPool,
        loaders: ['css-loader']
    }),
]

const windowDev = [
    ...basePlugins,

    ...baseDevPlugins,

    ...windowPlugin,
]

exports.devClientPlugins = [
    // HMR
    new webpack.HotModuleReplacementPlugin(),

    ...windowDev,

    // html 导入 dll js
    new AddAssetHtmlPlugin({
        filepath: `${config.path.dllPath}/vendor.dll.bundle.js`,
        hash: true,

        // 默认为true，但dll没有map文件
        includeSourcemap: false,
    }),

    new webpack.DllReferencePlugin({
        manifest: `${config.path.dllPath}/manifest.json`,
        context: config.path.dllPath,
    }),

    // 更新组件时在控制台输出组件的路径而不是数字ID
    new webpack.NamedModulesPlugin(),

    new BrowserSyncPlugin({
        host: config.host,
        port: config.proxyPort,
        proxy: `http://${config.host}:${config.port}`,
        logConnections: false,
        notify: false,
    }, {
        reload: false,
    }),
]

exports.devSsrClientPlugins = [
    ...windowDev,

    new ReactLoadablePlugin({
        filename: `${config.path.distPath}/react-loadable.json`,
    }),
]

exports.devSsrServerPlugins = [
    ...basePlugins,

    ...baseDevPlugins,
]

exports.bundleSsrServerPlugins = [
    ...basePlugins,
]

exports.bundleClientPlugins = [
    ...basePlugins,

    ...windowPlugin,

    // 作用域提升
    new webpack.optimize.ModuleConcatenationPlugin(),

    new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: {
          warnings: false,
          collapse_vars: true,
          reduce_vars: true
        }
    }),

    new ReactLoadablePlugin({
        filename: `${config.path.bundlePath}/react-loadable.json`,
    }),
]

exports.bundleSsrPlugins = [
    ...basePlugins,

    ...windowPlugin,

    // 作用域提升
    new webpack.optimize.ModuleConcatenationPlugin(),

    new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: {
          warnings: false,
          collapse_vars: true,
          reduce_vars: true
        }
    }),

    new ReactLoadablePlugin({
        filename: `${config.path.bundlePath}/react-loadable.json`,
    }),
]