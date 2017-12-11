const config = require('./config');
const initPlugins = require('./plugins');
const devPlugins = initPlugins();

module.exports = {
    devtool: 'source-map',
    entry: {
        app: [
            'eventsource-polyfill',
            'babel-polyfill',
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?reload=true',
            'webpack/hot/only-dev-server',
            config.path.entryPath
        ]
    },

    output: {
        path: config.path.distPath,
        publicPath: config.path.publicPath,
        filename: '[name].bundle.js'
    },

    plugins: devPlugins,
}