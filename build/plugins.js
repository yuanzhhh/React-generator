const webpack = require('webpack');

const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const I18nPlugin = require('i18n-webpack-plugin');
const vConsolePlugin = require('vconsole-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const cnJson = require("./languages/cn.json");
const utils = require('./utils');
const config = require('./config');

const addPushPlugins = (pluginsList, ...newPlugins) => newPlugins.forEach(element => pluginsList.push(element));

// 初始化plugins对象
const plugins = (() => {
    const basePlugins = utils.objectSet({}, 'basePlugins', []);
    const devPlugins = utils.objectSet(basePlugins, 'devPlugins', []);
    const prodPlugin = utils.objectSet(devPlugins, 'prodPlugin', []);

    return prodPlugin;
})();

// 公共
addPushPlugins(plugins['basePlugins'],
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
    }),

    new I18nPlugin(cnJson),

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
);

if (config.SERVICE_STATE.__BUILD_TYPE__ === 'client') {
    addPushPlugins(plugins['devPlugins'],
        // HMR
        new webpack.HotModuleReplacementPlugin(),

        new webpack.DllReferencePlugin({
            manifest: `${config.path.dllPath}/manifest.json`,
            context: config.path.dllPath,
        }),

        // 更新组件时在控制台输出组件的路径而不是数字ID
        new webpack.NamedModulesPlugin(),

        new HtmlWebpackPlugin({
            title: '开发 || 调试',
            filename: `index.html`,
            template: `${config.path.srcPath}/index.html`,
            inject: 'body',
            hash: true,
            // 错误反馈至页面
            showErrors: true,
        }),

        // html 导入 dll js
        new AddAssetHtmlPlugin({
            filepath: `${config.path.dllPath}/vendor.dll.bundle.js`,
            hash: true,

            // 默认为true，但dll没有map文件
            includeSourcemap: false,
        }),

        new BrowserSyncPlugin({
            host: config.host,
            port: config.proxyPort,
            proxy: `http://${config.host}:${config.port}`,
            logConnections: false,
            notify: false,
        }, {
            reload: false,
        }),
    );
}

if (config.SERVICE_STATE.__BUILD_TYPE__ === 'ssr') {
    addPushPlugins(plugins['devPlugins'],
        // HMR
        // new webpack.HotModuleReplacementPlugin(),

        // 生成构建清单json
        new ManifestPlugin(),

        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     filename: 'vendor.bundle.js',
        //     // 通过获取入口依赖的所有module来匹配 是否 存在于node_modules
        //     minChunks: module => module.resource &&
        //         /\.js$/.test(module.resource) &&
        //         module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0,
        // }),
    );
}

// 基础开发模式
addPushPlugins(plugins['devPlugins'],
    // 🌈 进度条
    new NyanProgressPlugin(),

    // 跳过错误输出
    new webpack.NoEmitOnErrorsPlugin(),

    new vConsolePlugin({
        enable: false,
    }),
);

// 生产
addPushPlugins(plugins['prodPlugin'],
    new BundleAnalyzerPlugin(),
);

module.exports = (pluginsType = (config.SERVICE_STATE.__DEV__ ? 'devPlugins' : 'prodPlugin')) => plugins[pluginsType];