const Koa = require('koa');
const Loadable = require('react-loadable');

const router = require('./router.js');

const app = new Koa();

if (process.env.NODE_ENV === 'development') {
  const path = require('path');

  const clientPath = path.resolve(__dirname, '..' , 'dist');

  app.use(require('koa-static')(clientPath, {
    index: false,
  }));
}

app
  .use(router.routes())
  .use(router.allowedMethods());

Loadable.preloadAll().then(() => {
  app.listen(process.env.PORT || 3000);
});

module.exports = app;