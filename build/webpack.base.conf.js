const loaders = require('./loaders');
const plugins = require('./plugins')('basePlugins');
const config = require('./config');

const { SERVICE_STATE, path: configPath } = config

const target = SERVICE_STATE.__BUILD_TYPE__ === 'client' ? 'web' : 'node';
const devtool = SERVICE_STATE.__DEV__ ? 'cheap-module-eval-source-map' : 'cheap-module-source-map';

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
        rules: loaders,
    },

    plugins,

    target,
}