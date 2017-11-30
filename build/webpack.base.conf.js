const initLoaders = require('./loaders');
const initPlugins = require('./plugins');
const config = require('./config');

const { SERVICE_STATE, path } = config

const loaders = initLoaders(SERVICE_STATE.__DEV__);
const basePlugins = initPlugins('basePlugins');

module.exports = {
    resolve: {
        // 自动解析确定的扩展
        extensions: [".js", ".jsx", ".json"],

        // 根目录别名
        alias: {
            "@": path.srcPath
        }
    },

    module: {
        rules: loaders,
    },

    plugins: basePlugins,

    target: "web"
}