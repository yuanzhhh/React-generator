const Koa = require('koa');
const app = new Koa();

console.log(process.env.NODE_ENV, '@@@@');
// const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
app.listen(PORT);


export default app;