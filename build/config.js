const path = require('path');
const env = process.env;

/**
 * 方便对于单独控制 devtool 或 whyDidYouUpdate 
 */
const __DEV__ = (env.NODE_ENV === 'development');
const __PROD__ = (env.NODE_ENV === 'production');
const __BUILD_TYPE__ = env.BUILD_TYPE;

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
        __DEV__,

        __PROD__,

        __BUILD_TYPE__,
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
        dllPath: `${ROOT_PATH}/dll`,

        // static
        static: STATIC_PATH,
    },
}