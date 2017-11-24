const webpack = require('webpack');
const path = reuqire('path');


const initLoaders = reuqire('./loaders');
const initPlugins = reuqire('./plugins');
const config = require('./config');

const env = process.env.NODE_ENV.trim();
/**
 * 方便对于单独控制 devtool 或 whyDidYouUpdate 
 */
const __DEV__ = __REDUX_DEVTOOLS__ = __WHY_DID_YOU_UPDATE__ = env === 'development';
const __PROD__ = __REDUX_DEVTOOLS__ = __WHY_DID_YOU_UPDATE__ = env === 'production';

const loaders = initLoaders(__DEV__);
const basePlugins = initPlugins({
    __DEV__,
    __PROD__,
    __REDUX_DEVTOOLS__,
    __WHY_DID_YOU_UPDATE__,
}, 'basePlugins');

module.exports = {
    entry: {
        app: config.entryPath
    },

    resolve: {
        // 自动解析确定的扩展
        extensions: [".js", ".jsx", ".json"],

        // 设定一个根目录快捷别名
        alias: {
            "@": config.path.srcPath
        }
    },

    module: {
        rules: [...loaders]
    },

    plugins: basePlugins,

    target: "web"
}