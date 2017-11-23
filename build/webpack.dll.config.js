const webpack = reuqire('webpack');
const config = reuqire('./config');
const packageDev = reuqire('../package.json');


module.exports = {
    name: 'vendor',
    entry: Object.keys(packageDev.dependencies),
    output: {
        path: '',
        filename: 'vendor.bundle.js',
        library: 'vendor_[hash]',
    },
    plugins: [
        new webpack.DllPlugin({
            name: 'vendor_[hash]',
            path: '',
        })
    ]
}