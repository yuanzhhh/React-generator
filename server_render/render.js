
const path = require('path');
const fs = require('fs');
const createMemoryHistory = require('history').createMemoryHistory;
const ReactDOM = require('react-dom/server');

const ssrModule = require(path.resolve(__dirname, '..', 'dist', 'server', 'server.bundle'));
const htmlPath = path.resolve(__dirname, '..', 'dist', 'client', 'index.html');

module.exports = (ctx, next) => {
    const store = ssrModule.default.createStore.default();

    const renderReact = ssrModule.default.createApp.default(createMemoryHistory({
        initialEntries: [
            ctx.originalUrl
        ],
    }), store);
    
    const renderStr = ReactDOM.renderToString(renderReact());
    const initState = store.getState();

    return new Promise((resolve, reject) => {
        fs.readFile(htmlPath, (err, data) => {
            if (err) reject(err);

            resolve(data);
        });
    }).then(data => {
        ctx.set('Content-Type', 'text/html');

        ctx.body = data;
    }, err => {
        throw err;
    });
}