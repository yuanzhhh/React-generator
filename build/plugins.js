const webpack = require('webpack');

const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const config = require('./config');

const plugins = {
    // 公用
    basePlugins: [
        // 🌈 进度条
        new NyanProgressPlugin(),

        // 全局变量
        new webpack.DefinePlugin({
            'process.env': {
                // 因为使用热加载，所以在开发状态下可能传入的环境变量为空
                NODE_ENV: JSON.stringify(config.SERVICE_STATE.__DEV__ ? 'development' : 'production'),
            },
            SERVICE_STATE: config.SERVICE_STATE,
        }),

        // HappyPack
        new HappyPack({
            id: 'scripts',
            loaders: ['babel-loader']
        }),
        new HappyPack({
            id: 'eslint-scripts',
            loaders: ['eslint-loader']
        }),
        new HappyPack({
            id: 'styles_sass',
            loaders: ['css-loader', 'sass-loader']
        }),
        new HappyPack({
            id: 'styles',
            loaders: ['css-loader']
        }),
    ],

    // 开发模式下
    devPlugins: [
        // HMR
        new webpack.HotModuleReplacementPlugin(),

        new webpack.optimize.OccurrenceOrderPlugin(),

        // 跳过错误输出
        new webpack.NoEmitOnErrorsPlugin(),

        // 更新组件时在控制台输出组件的路径而不是数字ID
        new webpack.NamedModulesPlugin(),

        new webpack.DllReferencePlugin({
            manifest: `${config.path.dllPath}/manifest.json`,
            context: config.path.dllPath,
        }),

        new HtmlWebpackPlugin({
            title: '开发 || 调试',
            filename: `index.html`,
            template: `${config.path.srcPath}/index.html`,
            inject: 'body',
            hash: true,
            // 错误反馈至页面
            showErrors: true,
        }),
        
        // html 导入 dll
        new AddAssetHtmlPlugin({
            filepath: `${config.path.dllPath}/vendor.dll.bundle.js`,
            hash: true,

            // 默认为true，但dll没有map文件
            includeSourcemap: false,
        }),

        new BrowserSyncPlugin({
            host: config.host,
            port: config.port,
            proxy: `http://${config.host}:${config.proxyPort}`,
            logConnections: false,
            notify: false,
        }, {
            reload: false,
        })
    ],
}

module.exports = (pluginsType) => plugins[pluginsType];