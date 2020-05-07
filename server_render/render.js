const createMemoryHistory = require('history').createMemoryHistory;
const ReactDOM = require('react-dom/server');
const minify = require('html-minifier').minify;
const matchRoutes = require('react-router-config').matchRoutes;
const { getBundles } = require('react-loadable/webpack');

const config = require('../config');
const readFile = require('./readFile');
const execute = require('./execute');

const NODE_ENV = process.env.NODE_ENV;

const ssrModule = require(`${config.path.ssrDist}/ssr_modules.bundle`);
const stats = require(`${NODE_ENV === 'development' ? config.path.distPath : config.path.bundlePath}/react-loadable.json`);

const htmlPath = `${NODE_ENV === 'development' ? config.path.distPath : config.path.bundlePath}/index.html`;

module.exports = async ctx => {
    const matchRoute = matchRoutes(ssrModule.routers, ctx.originalUrl);

    if (!matchRoute.length) return;

    const store = ssrModule.createStore();

    const { initType, initList } = matchRoute[0].route;

    if (initList) {
        const initPipe = execute(initType, ...initList);

        await initPipe(store.dispatch);
    }

    const modules = [];

    const history = createMemoryHistory({
        initialEntries: [
            ctx.originalUrl
        ],
    });

    const renderReact = ssrModule.createApp(history, store, modules);

    const renderReactStr = ReactDOM.renderToString(renderReact());

    const bundles = getBundles(stats, modules);

    const initStateStr = JSON.stringify(store.getState());

    const readHtmlStr = await readFile(htmlPath);

    const renderHtml = readHtmlStr
    .replace(/<!--initState-->/g, `<script> window.__INIT_STATE__ = ${initStateStr} </script>`)
    .replace(/<!--reactRenderContent-->/g, renderReactStr)
    .replace(/<\/body>/g, `
        ${bundles.map(bundle => `<script src="/${bundle.file}"></script>`).join('\n')}
        <script> window.main(); </script>
        </body>
    `);

    const miniHtml = minify(renderHtml, {
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
    });

    ctx.set('Content-Type', 'text/html');
    ctx.type = 'charset=utf-8';
    ctx.body = miniHtml;
}
