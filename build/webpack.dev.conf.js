const config = require('./config');
const plugins = require('./plugins')();

const { path: configPath } = config

module.exports = {
    entry: {
        app: [
            'eventsource-polyfill',
            'babel-polyfill',
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?reload=true',
            'webpack/hot/only-dev-server',
            configPath.entryPath
        ]
    },

    output: {
        path: configPath.distPath,
        publicPath: configPath.publicPath,
        filename: '[name].bundle.js',
    },

    plugins,
}