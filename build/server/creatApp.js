const Koa = require('koa');
const http = require('http');
const path = require('path');

const config = require('../../config');
const webpackConf = require('../webpack.config');

const {
    path: configPath,
} = config;

module.exports = middleware => {
    const app = new Koa();

    app.use(middleware);

    app.use(async (ctx) => {
        const filename = path.resolve(webpackConf.output.path, 'index.html');

        ctx.response.type = 'html';
        ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(filename);
    });

    http.createServer(app.callback()).listen(8080);
}
