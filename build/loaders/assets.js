const path = require('path');

const infoConf = require('../../setting');

module.exports = [{
    test: [/\.bmp$/, /\.jpe?g$/, /\.png$/],
    loader: 'url-loader',
    options: {
        limit: 10000,
        name: 'static/media/[name].[hash:8].[ext]',
    },
    include: infoConf.PATH.src,
    exclude: path.join(infoConf.PATH.root, 'node_modules'),
}, {
    exclude: [
        /\.html$/,
        /\.(js|jsx)(\?.*)?$/,
        /\.(ts|tsx)(\?.*)?$/,
        /\.css$/,
        /\.less$/,
        /\.json$/,
        /\.bmp$/,
        /\.jpe?g$/,
        /\.png$/,
        /\.handlebars$/,
    ],
    loader: 'file-loader',
    options: {
        name: 'static/media/[name].[hash:8].[ext]',
    },
}, {
    test: /\.handlebars$/,
    loader: 'handlebars-loader',
    options: {
        helperDirs: path.join(infoConf.PATH.src, 'helper'),
        inlineRequires: '/imgs/',
    },
}];
