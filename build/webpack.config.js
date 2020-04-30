const merge = require('webpack-merge');

require('../setting');
const { ENV } = process.env.SETTING;
const baseConf = require('./webpack.base.conf');
const devConf = require('./webpack.dev.conf');
const bundleConf = require('./webpack.bundle.conf');

module.exports = merge(baseConf, ENV === 'development' ? devConf : bundleConf );
