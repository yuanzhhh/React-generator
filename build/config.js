const path = require('path');

const SRC_PATH = path.resolve(__dirname, '..', 'src');
const ROOT_PATH = path.resolve(__dirname, '..');
const ENTRY_PATH = path.resolve(__dirname, '..', 'src', 'main.js');
const PUBLIC_PATH = path.resolve(__dirname, '..', 'public');

module.exports = {

    port: 9090,

    proxyPort: 9000,

    host: '127.0.0.1',

    // 路径集
    path: {
        // root
        rootPath: ROOT_PATH,

        // src
        srcPath: SRC_PATH,

        // public
        publicPath: PUBLIC_PATH,

        // 入口文件
        entryPath: ENTRY_PATH,
    },

    // 开发模式下配置
    dev: {

    },

    // 生产模式下配置
    build: {

    },
}