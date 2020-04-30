const webpack = require('webpack');

const loaders = require('./loaders');
const config = require('../config');

const { SERVICE_STATE, path: configPath } = config;

const devtool = SERVICE_STATE.__DEV__ ? 'cheap-module-eval-source-map' : 'cheap-module-source-map';

module.exports = {
    devtool,

    resolve: {
        // 自动解析确定的扩展
        extensions: [
            '.js',
            '.jsx',
            '.json',
            '.ts',
            '.tsx',
            '.css',
            '.less',
        ],

        // 根目录别名
        alias: {
            "@": configPath.srcPath
        }
    },

    module: {
        rules: loaders,
    },

    plugins:[
        new webpack.IgnorePlugin(/\.\/locale/, /moment/),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
    ],
};
