const path = require('path');

const root = path.resolve(__dirname, './');

module.exports = {
    ENV: process.env.NODE_ENV,
    SERVER: {
        http: {
            port: 8000,
        },
        https: {
            port: 8001,
        },
    },
    PATH: {
        root,
        dist: path.join(root, 'dist'),
        src: path.join(root, 'src'),
        dll: path.join(root, 'dll'),
        entryIndex: path.join(root, 'src/main.tsx'),
    }
}
