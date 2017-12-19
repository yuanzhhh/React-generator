const KoaRouter = require('koa-router');

const render = require('./render');

const router = new KoaRouter();

router.get('*', render);

module.exports = router;