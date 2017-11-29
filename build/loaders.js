const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const config = require('./config');

const eslint = {
    enforce: 'pre',
    test: /\.(js|jsx)$/,
    use: ['happypack/loader?id=eslint-scripts'],
    include: config.path.srcPath,
    exclude: /(node_modules)/,
};

const scripts = {
    enforce: 'pre',
    test: /\.(js|jsx)$/,
    use: ['happypack/loader?id=scripts'],
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

const styles = __DEV__ => [{
        test: /\.(scss|sass)$/,
        use: __DEV__ ?
        ['style-loader', 'happypack/loader?id=styles_sass', postCSSLoader] :
        ExtractTextPlugin.extract({
            use: ['happypack/loader?id=styles_sass', postCSSLoader]
        })
    },
    {
        test: /\.css$/,
        loader: __DEV__ ? 
        ['style-loader', 'happypack/loader?id=styles', postCSSLoader] :
        ExtractTextPlugin.extract({
            use: ['happypack/loader?id=styles', postCSSLoader]
        })
    }
]

const json = {
    test: /\.json$/,
    loader: 'json-loader'
}


const assets = () => [{
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
    scripts,
    eslint,
    ...(styles(__DEV__)),
    ...(assets()),
]