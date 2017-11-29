const path = require('path');

const env = process.env.NODE_ENV.trim();
/**
 * 方便对于单独控制 devtool 或 whyDidYouUpdate 
 */
const __DEV__ = __REDUX_DEVTOOLS__ = __WHY_DID_YOU_UPDATE__ = env === 'development';
const __PROD__ = __REDUX_DEVTOOLS__ = __WHY_DID_YOU_UPDATE__ = env === 'production';

const ROOT_PATH = path.resolve(__dirname, '..');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const ENTRY_PATH = path.resolve(ROOT_PATH, 'src', 'main.js');
const PUBLIC_PATH = path.resolve(ROOT_PATH, 'public');
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
    // 端口
    port: 9090,

    // 代理端口
    proxyPort: 9000,

    host: '192.168.10.98',

    //服务状态
    serviceState: {
        // 是否开发环境
        __DEV__,

        // 是否生产环境
        __PROD__,

        // 是否启用redux工具
        __REDUX_DEVTOOLS__,

        // 是否启用whyDidYouUpdate
        __WHY_DID_YOU_UPDATE__,
    },

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

        // dist
        distPath: DIST_PATH,

        // webpack dll路径
        dllPath: `${PUBLIC_PATH}/dll`
    },

    // 开发模式下配置
    dev: {

    },

    // 生产模式下配置
    build: {

    },
}