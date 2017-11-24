const webpack = reuqire('webpack');
const config = reuqire('./config');
const packageDev = reuqire('../package.json');


module.exports = {
    name: 'vendor',
    entry: Object.keys(packageDev.dependencies),
    output: {
        path: `${config.path.publicPath}/dll`,
        filename: '[hash].dll.js',
        library: 'library_[hash]',
    },
    plugins: [
        new webpack.DllPlugin({
            name: 'library_[hash]',
            path: `${config.path.publicPath}/dll/manifest.json`,
        })
    ]
}