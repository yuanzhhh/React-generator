const webpack = require('webpack');
const config = require('./config');
const packageDev = require('../package.json');


module.exports = {
    name: 'vendor',
    entry: Object.keys(packageDev.dependencies),
    output: {
        path: config.path.dllPath,
        filename: 'vendor.dll.bundle.js',
        library: 'library_[hash]',
    },
    node: {
        fs: 'empty',
        net: 'empty',
    },
    plugins: [
        new webpack.DllPlugin({
            name: 'library_[hash]',
            path: `${config.path.dllPath}/manifest.json`,
        })
    ]
}