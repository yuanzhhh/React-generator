const path = require('path');

const createMemoryHistory = require('history').createMemoryHistory;
const ReactDOM = require('react-dom/server');
const minify = require('html-minifier').minify

const readFile = require('./readFile');

const ssrModule = require(path.resolve(__dirname, '..', 'dist', 'server', 'server.bundle'));
const htmlPath = path.resolve(__dirname, '..', 'dist', 'client', 'index.html');

module.exports = async(ctx, next) => {
    const store = ssrModule.default.createStore.default();

    const renderReact = ssrModule.default.createApp.default(createMemoryHistory({
        initialEntries: [
            ctx.originalUrl
        ],
    }), store);

    const renderStr = ReactDOM.renderToString(renderReact());
    const initState = JSON.stringify(store.getState());
    const readHtmlStr = await readFile(htmlPath);

    const renderHtml = readHtmlStr
        .replace(/<!--initState-->/g, `<script>window.__INIT_STATE__ = ${initState}</script>`)
        .replace(/<!--reactRenderContent-->/g, renderStr);

    ctx.set('Content-Type', 'text/html');
    ctx.type = 'charset=utf-8';
    ctx.body = minify(renderHtml, {
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
    });
}