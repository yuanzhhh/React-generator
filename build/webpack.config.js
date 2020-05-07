const merge = require('webpack-merge');

const setting =require('../setting');
const baseConf = require('./webpack.base.conf');
const devConf = require('./webpack.dev.conf');
const bundleConf = require('./webpack.bundle.conf');

const { ENV } = setting;

module.exports = merge(baseConf, ENV === 'development' ? devConf : bundleConf );
