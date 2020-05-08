const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const setting = require('../../setting');
const env = setting.ENV;

const lessUse = [{
    loader: 'postcss-loader',
    options: {
        config: {
            path: path.resolve(__dirname, './postcss.config.js'),
        },
    },
}];

const less = {
    test: /\.less$/,
    use: (env === 'production' ? [{
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: env === 'development',
        },
    }] : [
        // 'style-loader',
        'isomorphic-style-loader',
        {
            loader: 'css-loader',
            options: {
                importLoaders: 1,
            },
        },
        ...lessUse,
        'less-loader',
    ]),
};

const css = {
    test: /\.css$/,
    use: (env === 'production' ? [{
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: env === 'development',
        },
    }] : [
        'style-loader',
        'css-loader',
        ...lessUse,
    ]),
};

module.exports = [
    less,
    css,
];
