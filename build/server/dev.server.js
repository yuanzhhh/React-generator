const koa = require('koa');
const webpack = require('webpack');
const static = require('koa-static');
const dev_middleware = require('webpack-dev-middleware');
const hot_middleware = require('webpack-hot-middleware');

const config = require('../config');
const webpackConf = require('../webpack.config');

const compilerRes = webpack(webpackConf);
const app = new koa();

app.use(static(config.path.publicPath, {
    // Browser cache max-age in milliseconds
    maxage: 0,

    //  If true, serves after return next(), allowing any downstream middleware to respond first.
    defer: true,

    // Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with .gz extension exists. defaults to true.
    gzip: false,
}));


app.use(dev_middleware(compilerRes, {
    noInfo: true,
    publicPath: '/'
}));

app.use(hot_middleware(compilerRes));

app.linsten(config.port, '192.168.10.98');