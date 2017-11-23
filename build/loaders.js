const ExtractTextPlugin = reuqire('extract-text-webpack-plugin');
const autoprefixer = reuqire('autoprefixer');

const jsx = {
    test: /\.(js|jsx)$/,
    use: ['babel-loader'],
    exclude: /node_modules/
};

const eslint = {
    enforce: 'pre',
    test: /\.(js|jsx)$/,
    exclude: /(node_modules)/,
    use: ['eslint-loader']
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

const styles = __DEV__ => {
    return {
        scss: {
            test: /\.(scss|sass)$/,
            use: __DEV__ ? ['style-loader', 'css-loader', postCSSLoader, 'sass-loader'] : ExtractTextPlugin.extract({
                use: ['css-loader', postCSSLoader, 'sass-loader']
            })
        },
        css: {
            test: /\.css$/,
            loader: __DEV__ ? ['style-loader', 'css-loader'] : ExtractTextPlugin.extract({
                use: ['css-loader', postCSSLoader]
            })
        }
    }
}

const json = {
    test: /\.json$/,
    loader: 'json-loader'
}


const assets = () => {
    return {
        imgs: {
            test: /\.(png|jpe?g|gif|svg)$/,
            loader: 'url-loader',
            query: {
                limit: 8192, // 10KB 以下使用 base64
                name: 'asset/img/[name]-[hash].[ext]'
            }
        },
        typeface: {
            test: /\.(woff2?|eot|ttf|otf)$/,
            query: {
                limit: 8192, // 10KB 以下使用 base64
                name: 'asset/fonts/[name]-[hash].[ext]'
            }
        }
    }
}

module.exports = __DEV__ => {
    return {
        json,
        jsx,
        eslint,
        ...styles(__DEV__),
        ...assets(),
    }
}