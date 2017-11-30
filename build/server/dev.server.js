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
    // config.path.publicPath 为 webpack 构建后的资源文件的引入地址
    publicPath: config.path.publicPath,
}));

app.use(hot_middleware(compilerRes));

// 拦截所有 publicPath 下的访问
app.use(config.path.publicPath, express.static(config.path.publicPath))

app.listen(config.port, config.host, err => (err && console.log(err)));