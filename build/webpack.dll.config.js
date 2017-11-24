const webpack = reuqire('webpack');
const config = reuqire('./config');
const packageDev = reuqire('../package.json');


module.exports = {
    name: 'vendor',
    entry: Object.keys(packageDev.dependencies),
    output: {
        path: config.path.dllPath,
        filename: 'vendor.bundle.js',
        library: 'library_[hash]',
    },
    plugins: [
        new webpack.DllPlugin({
            name: 'library_[hash]',
            path: `${config.path.dllPath}/manifest.json`,
        })
    ]
}