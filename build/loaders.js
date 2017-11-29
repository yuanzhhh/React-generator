const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const config = require('./config');

const jsx = {
    test: /\.(js|jsx)$/,
    enforce: 'pre',
    use: ['babel-loader'],
    include: config.path.srcPath,
    exclude: /node_modules/
};

const eslint = {
    enforce: 'pre',
    test: /\.(js|jsx)$/,
    use: ['eslint-loader'],
    include: config.path.srcPath,
    exclude: /(node_modules)/,
};

const postCSSLoader = {
    loader: 'postcss-loader',
    options: {
        sourceMap: true,
        plugins: [
            autoprefixer({
                browsers: ['Safari > 1']
            }),
        ],
    }
};

const styles = __DEV__ => [
    {
        test: /\.(scss|sass)$/,
        use: __DEV__ ? ['style-loader', 'css-loader', postCSSLoader, 'sass-loader'] : ExtractTextPlugin.extract({
            use: ['css-loader', postCSSLoader, 'sass-loader']
        })
    },
    {
        test: /\.css$/,
        loader: __DEV__ ? ['style-loader', 'css-loader'] : ExtractTextPlugin.extract({
            use: ['css-loader', postCSSLoader]
        })
    }
]

const json = {
    test: /\.json$/,
    loader: 'json-loader'
}


const assets = () => [
    {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
            limit: 8192, // 10KB 以下使用 base64
            name: 'asset/img/[name]-[hash].[ext]'
        }
    },
    {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'url-loader',
        query: {
            limit: 8192, // 10KB 以下使用 base64
            name: 'asset/fonts/[name]-[hash].[ext]'
        }
    }
]

module.exports = __DEV__ => [
    json,
    jsx,
    eslint,
    ...(styles(__DEV__)),
    ...(assets()),
]