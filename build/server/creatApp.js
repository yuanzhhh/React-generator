const Koa = require('koa');
const http = require('http');

module.exports = middleware => {
    const app = new Koa();

    app.use(middleware);

    http.createServer(app.callback()).listen(8080);
}
