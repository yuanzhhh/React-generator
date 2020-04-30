const webpack = require('webpack');

const loaders = require('./loaders');
const config = require('../config');

const { path: configPath } = config;

module.exports = {
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
        alias: {
            "@": configPath.srcPath
        },
        modules: [configPath.srcPath, 'node_modules'],
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
