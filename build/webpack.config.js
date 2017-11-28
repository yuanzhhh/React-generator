const merge = require('webpack-merge');

const __DEV__ = require('./config').__DEV__;
const baseConf = require('./webpack.base.conf');
const devConf = require('./webpack.dev.con');
const prodConf = require('./webpack.prod.conf');

module.exports = merge(baseConf, __DEV__ ? devConf : prodConf );