const merge = require('webpack-merge');

const __DEV__ = require('./config').SERVICE_STATE.__DEV__;
const baseConf = require('./webpack.base.conf');
const devConf = require('./webpack.dev.conf');
const prodConf = require('./webpack.prod.conf');

module.exports = merge(baseConf, __DEV__ ? devConf : prodConf );