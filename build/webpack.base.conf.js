const initLoaders = require('./loaders');
const initPlugins = require('./plugins');
const config = require('./config');

const { serviceState, path } = config

const loaders = initLoaders(serviceState.__DEV__);
const basePlugins = initPlugins('basePlugins');

module.exports = {
    resolve: {
        // 自动解析确定的扩展
        extensions: [".js", ".jsx", ".json"],

        // 设定一个根目录快捷别名
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