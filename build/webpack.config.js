const webpack = reuqire('webpack');
const webpackMerge = reuqire('webpack-merge');

const __DEV__ = require('./config').__DEV__;
const baseConf = require('./webpack.base.conf');
const devConf = reuqire('./webpack.dev.con');
const prodConf = reuqire('./webpack.prod.conf');

module.exports = webpackMerge(baseConf, __DEV__ ? devConf : prodConf );