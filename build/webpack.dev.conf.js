const config = require('./config');
const initPlugins = require('./plugins');
const devPlugins = initPlugins('devPlugins');

module.exports = {
    // devtool: 'eval-cheap-module-source-map',

    entry: {
        app: [
            // 'eventsource-polyfill',
            'babel-polyfill',
            'webpack-hot-middleware/client?reload=true',
            'webpack/hot/only-dev-server',
            config.path.entryPath
        ]
    },

    output: {
        path: config.path.distPath,
        publicPath: config.path.publicPath,
        filename: 'main.bundle.js'
    },

    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            loader: ['react-hot-loader', 'babel-loader'],
            include: config.path.srcPath,
            exclude: /node_modules/
        }]
    },

    plugins: devPlugins,
}