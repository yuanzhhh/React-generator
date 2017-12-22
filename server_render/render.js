const path = require('path');

const createMemoryHistory = require('history').createMemoryHistory;
const ReactDOM = require('react-dom/server');
const minify = require('html-minifier').minify;
const matchRoutes = require('react-router-config').matchRoutes;

const readFile = require('./readFile');
const ssrModule = require(path.resolve(__dirname, '..', 'dist', 'server', 'server.bundle'));

const htmlPath = path.resolve(__dirname, '..', 'dist', 'client', 'index.html');

module.exports = async (ctx, next) => {
    
    const matchRoute = matchRoutes(ssrModule.routers, ctx.originalUrl);
    
    if (!matchRoute.length) return;

    const store = ssrModule.createStore();

    const renderReact = ssrModule.createApp(createMemoryHistory({
        initialEntries: [
            ctx.originalUrl
        ],
    }), store);

    const renderReactStr = ReactDOM.renderToString(renderReact());

    const initStateStr = JSON.stringify(store.getState());

    const readHtmlStr = await readFile(htmlPath);

    const renderHtml = readHtmlStr
    .replace(/<!--initState-->/g, `<script>window.__INIT_STATE__ = ${initStateStr}</script>`)
    .replace(/<!--reactRenderContent-->/g, renderReactStr);
    
    const miniHtml = minify(renderHtml, {
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
    });

    ctx.set('Content-Type', 'text/html');
    ctx.type = 'charset=utf-8';
    ctx.body = miniHtml;
}