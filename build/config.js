const path = require('path');

const env = process.env.NODE_ENV.trim();
/**
 * 方便对于单独控制 devtool 或 whyDidYouUpdate 
 */
const __DEV__ = (env === 'development');
const __PROD__ = (env === 'production');

const ROOT_PATH = path.resolve(__dirname, '..');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const ENTRY_PATH = path.resolve(ROOT_PATH, 'src', 'main.js');
const STATIC_PATH = path.resolve(ROOT_PATH, 'static');
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');

const PUBLIC_PATH = '/';

module.exports = {
    // 端口
    port: 9090,

    // 代理端口
    proxyPort: 9000,

    host: '0.0.0.0',

    //服务状态
    SERVICE_STATE: {
        // 是否开发环境
        __DEV__,

        // 是否生产环境
        __PROD__,
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
        dllPath: `${STATIC_PATH}/dll`
    },

    // 开发模式下配置
    dev: {

    },

    // 生产模式下配置
    build: {

    },
}