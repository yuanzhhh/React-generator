const config = require('./config');

module.exports = {
    devtool: 'eval-cheap-module-source-map',

    entry: {
        app: [
            'eventsource-polyfill',
            'babel-polyfill',
            'webpack-hot-middleware/client?reload=true',
            'webpack/hot/only-dev-server',
            config.path.entryPath
        ]
    },

    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: ['react-hot-loader/webpack'],
            exclude: /(node_modules)/,
        }]
    },
}