const Koa = require('koa');

const router = require('./router.js');

const app = new Koa();

if (process.env.NODE_ENV === 'development') {

  const path = require('path');

  const clientPath = path.resolve(__dirname, '..' , 'dist' , 'client');

  app.use(require('koa-static')(clientPath));
}

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.env.PORT || 3000);


module.exports = app;