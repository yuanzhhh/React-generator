const loaders = require('./loaders');
const plugins = require('./plugins')('basePlugins');
const config = require('./config');

const { SERVICE_STATE, path: configPath } = config

const devtool = SERVICE_STATE.__DEV__ ? 'cheap-module-eval-source-map' : 'cheap-module-source-map';

plugins.push(new loaders.prep.ExtractTextPlugin({
    filename: 'assets/css/[name].style.css',
    allChunks: true,
    disable: SERVICE_STATE.__DEV__ && SERVICE_STATE.__BUILD_TYPE__ === 'client',
}));

module.exports = {
    devtool,

    resolve: {
        // 自动解析确定的扩展
        extensions: [".js", ".jsx", ".json"],

        // 根目录别名
        alias: {
            "@": configPath.srcPath
        }
    },

    module: {
        rules: loaders.rules,
    },

    plugins,
}