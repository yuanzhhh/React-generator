const webpack = require('webpack');

const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HappyPack = require('happypack');

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
                NODE_ENV: JSON.stringify(config.serviceState.__DEV__ ? 'development' : 'production'),
            },
            serviceState: config.serviceState
        }),
        new HappyPack({
            id: 'scripts',
            loaders: ['babel-loader']
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

        new webpack.NamedModulesPlugin(),

        // 启用 HMR
        new webpack.HotModuleReplacementPlugin(),

        new webpack.optimize.OccurrenceOrderPlugin(),

        // 跳过错误输出
        new webpack.NoEmitOnErrorsPlugin(),

        // 更新组件时在控制台输出组件的路径而不是数字ID
        new webpack.NamedModulesPlugin(),

        new webpack.DllReferencePlugin({
            manifest: `${config.path.dllPath}/manifest.json`,
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