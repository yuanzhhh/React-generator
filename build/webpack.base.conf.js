const loaders = require('./loaders');
const basePlugins = require('./plugins')('basePlugins');
const config = require('./config');

const { SERVICE_STATE, path } = config

const buildType = SERVICE_STATE.__BUILD_TYPE__ === 'client' ? 'web' : 'node'

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
    
    target: buildType,
}