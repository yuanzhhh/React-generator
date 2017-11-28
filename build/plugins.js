const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const config = require('./config');
const env = process.env.NODE_ENV.trim();

const plugins = {
    // 公用
    basePlugins: state => [
        // 🌈 进度条
        new NyanProgressPlugin(),

        // 全局变量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: env,
            },
            ...state
        }),
    ],

    // 开发模式下
    devPlugins: state => [
        // 启用 HMR
        new webpack.HotModuleReplacementPlugin(),

        // 跳过错误输出
        new webpack.NoEmitOnErrorsPlugin(),

        // 更新组件时在控制台输出组件的路径而不是数字ID
        new webpack.NamedModulesPlugin(),

        new webpack.DllReferencePlugin({
            manifest: `${config.path.dllPath}/manifest.json`,
        }),

        new BrowserSyncPlugin({
            host: config.host,
            port: config.proxyPort,
            proxy: `http://${config.host}:${config.port}`,
            logConnections: false,
            notify: false,
        }, {
            reload: false,
        })
    ],
}

module.exports = (state, pluginsType) => plugins[pluginsType](state);