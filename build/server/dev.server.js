const Koa = require('koa');
const middleware = require('koa-webpack');
const webpack = require('webpack');
const config = require('../config');
const webpackConf = require('../webpack.config');

const compilerRes = webpack(webpackConf);

const app = new Koa();

app.use(require('koa-static')(config.path.static), {
    gzip: false,
})

app.use(middleware({
    compiler: compilerRes,
    dev: {
        noInfo: true,
        publicPath: config.path.publicPath,
    }
}));

app.listen(config.port);