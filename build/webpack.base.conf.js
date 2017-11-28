const webpack = require('webpack');

const initLoaders = require('./loaders');
const initPlugins = require('./plugins');
const config = require('./config');

const { __DEV__, __PROD__, __REDUX_DEVTOOLS__, __WHY_DID_YOU_UPDATE__, path } = config

const loaders = initLoaders(__DEV__);
const basePlugins = initPlugins('basePlugins', {
    __DEV__,
    __PROD__,
    __REDUX_DEVTOOLS__,
    __WHY_DID_YOU_UPDATE__,
});

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