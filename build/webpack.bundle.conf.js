const config = require('./config');
const {
    bundleClientPlugins,
    bundleSsrPlugins
} = require('./plugins');

const {
    path: configPath,
    SERVICE_STATE
} = config

module.exports = {
    entry: {
        app: [
            'eventsource-polyfill',
            'babel-polyfill',
            'viewport-units-buggyfill',
            configPath.entryPath,
        ],
    },

    output: {
        path: configPath.bundlePath,
        publicPath: configPath.publicPath,
        filename: 'assets/[name].bundle.js',
        chunkFilename: 'assets/[id].[name].bundle.js',
    },

    plugins: SERVICE_STATE.__BUILD_TYPE__ === 'client' ? bundleClientPlugins : bundleSsrPlugins,
}