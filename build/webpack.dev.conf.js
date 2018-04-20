const config = require('../config');
const {
    devClientPlugins,
    devSsrClientPlugins
} = require('./plugins');

const {
    path: configPath,
    SERVICE_STATE
} = config;

module.exports = {
    entry: {
        app: [
            'eventsource-polyfill',
            'babel-polyfill',
            'viewport-units-buggyfill',
        ].concat(
            SERVICE_STATE.__BUILD_TYPE__ === 'client' ? [
                'react-hot-loader/patch',
                'webpack-hot-middleware/client?reload=true',
                'webpack/hot/only-dev-server',
                configPath.entryPath
            ] : [configPath.entryPath]
        )
    },

    output: {
        path: configPath.distPath,
        publicPath: configPath.publicPath,
        filename: 'assets/[name].bundle.js',
        chunkFilename: 'assets/[id].[name].bundle.js',
    },

    mode: 'development',

    plugins: SERVICE_STATE.__BUILD_TYPE__ === 'client' ? devClientPlugins : devSsrClientPlugins,
};