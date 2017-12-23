const config = require('./config');
const plugins = require('./plugins')();

const {
    path: configPath,
    SERVICE_STATE
} = config

module.exports = {
    entry: {
        app: [
            'eventsource-polyfill',
            'babel-polyfill',
        ].concat(
            SERVICE_STATE.__BUILD_TYPE__ === 'client' ? [
                'react-hot-loader/patch',
                'webpack-hot-middleware/client?reload=true',
                'webpack/hot/only-dev-server',
                configPath.entryPath
            ] :
            [configPath.entryPath]
        )
    },

    output: {
        path: configPath.distPath,
        publicPath: configPath.publicPath,
        filename: 'assets/[name].[hash].bundle.js',
        chunkFilename: 'assets/[id].[name].[hash].bundle.js',
    },

    plugins,
}