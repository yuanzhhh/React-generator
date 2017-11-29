const express = require('express');
const webpack = require('webpack');
const dev_middleware = require('webpack-dev-middleware');
const hot_middleware = require('webpack-hot-middleware');

const config = require('../config');
const webpackConf = require('../webpack.config');

const compilerRes = webpack(webpackConf);
const app = express()

app.use(dev_middleware(compilerRes, {
    noInfo: true,
    publicPath: '/',
}));

app.use(hot_middleware(compilerRes));

app.use('/', express.static(config.path.publicPath))

app.listen(config.port, config.host, (err) => {
    err && console.log(err);
});