const koaWebpack = require('koa-webpack');
const webpack = require('webpack');

const webpackConfig = require('./webpack.config');

const compiler = webpack(webpackConfig);

module.exports = (creatApp) =>
    koaWebpack({
        compiler,
        devMiddleware: {
            quiet: true,
            noInfo: true,
            logger: {
                info: () => {},
                error: () => {},
                warn: () => {},
            },
            publicPath: webpackConfig.output.publicPath,
        },
    }).then(creatApp);
