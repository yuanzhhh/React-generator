const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = process.env.SETTING.ENV;

const lessUse = [{
    loader: 'css-loader',
    options: {
        importLoaders: 1,
    },
}, {
    loader: 'postcss-loader',
    options: {
        config: {
            path: path.resolve(__dirname, '../postcss.config.js'),
        },
    },
}, {
    loader: 'less-loader',
}];

const less = {
    test: /\.less$/,
    use: (env === 'production' ? [{
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: env === 'development',
        },
    }] : [{
        loader: 'style-loader',
    }]).concat(lessUse),
};

const css = {
    test: /\.css$/,
    use: (env === 'production' ? [{
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: env === 'development',
        },
    }] : [{
        loader: 'style-loader',
    }]).concat([
        'css-loader',
    ]),
};

module.exports = [
    less,
    css,
];
