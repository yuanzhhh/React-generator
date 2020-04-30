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
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        }
    },
    entry: {
        app: [
            'eventsource-polyfill',
            'viewport-units-buggyfill',
        ].concat(
            SERVICE_STATE.__BUILD_TYPE__ === 'client' ? [
                'react-hot-loader/patch',
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
    plugins: SERVICE_STATE.__BUILD_TYPE__ === 'client' ? devClientPlugins : devSsrClientPlugins,
};
