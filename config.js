const path = require('path');
const env = process.env;

/**
 * 方便对于单独控制 devtool 或 whyDidYouUpdate 
 */
const __DEV__ = (env.NODE_ENV === 'development');
const __PROD__ = (env.NODE_ENV === 'production');
const __BUILD_TYPE__ = env.BUILD_TYPE;
const __BUILD_PATH__ = env.BUILD_PATH;

const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.join(ROOT_PATH, 'src');
const ENTRY_PATH = path.join(ROOT_PATH, 'src', 'main.js');
const STATIC_PATH = path.join(ROOT_PATH, 'static');
const DIST_PATH = path.join(ROOT_PATH, 'dist');
const BUNDLE_PATH = path.join(ROOT_PATH, 'bundle');
const SSR_CODE_PATH = path.join(ROOT_PATH, 'src', 'ssrModule.js');
const CLIENT_DIST_PATH = path.join(ROOT_PATH, 'dist', 'client');
const SSR_DIST_PATH = path.join(ROOT_PATH, 'dist', 'ssr_modules');
const SSR_BUNDLE_PATH = path.join(ROOT_PATH, 'bundle', 'ssr_modules');

const PUBLIC_PATH = '/';

module.exports = {

    // 设计稿宽度
    viewportWidth: 750,

    // 设计稿高度
    viewportHeight: 1334,

    // 基准值
    viewportBaseline: 10,

    // 端口
    port: 9090,

    // 代理端口
    proxyPort: 9000,

    host: env.HOST || '0.0.0.0',

    //服务状态
    SERVICE_STATE: {
        __DEV__,

        __PROD__,

        __BUILD_TYPE__,

        __BUILD_PATH__,
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

        // bundle
        bundlePath: BUNDLE_PATH,

        // webpack dll路径
        dllPath: `${ROOT_PATH}/dll`,

        // static
        static: STATIC_PATH,

        // ssr
        ssrCodePath: SSR_CODE_PATH,

        // dist ssr
        ssrDist: SSR_DIST_PATH,

        // bundle ssr
        ssrBundle: SSR_BUNDLE_PATH,

        // dist client 
        clientDist: CLIENT_DIST_PATH,
    },
}