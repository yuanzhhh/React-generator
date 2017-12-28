const webpack = require('webpack');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const I18nPlugin = require('i18n-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const os = require('os');
const { ReactLoadablePlugin } = require('react-loadable/webpack');

const cnJson = require("./languages/cn.json");
const config = require('./config');

const HappyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length,
});

// 客户端使用的插件
const windowPlugin = [
    new HtmlWebpackPlugin({
        title: '开发 || 调试',
        filename: `index.html`,
        template: `${config.path.srcPath}/index.html`,
        inject: 'body',
        hash: true,
        // 错误反馈至页面
        showErrors: true,
    }),
]

const nyanCatSaysList = [
    '完成！',
    'Done！',
    '来呀，加班啊，反正有大把头发！',
    '对自己好点！',
    '总写 bug ，你好意思吗？',
    '急急如令令，bug 去！',
    '不要为了这一个 bug 那么苦恼，说不定还有很多个呢',
    '警告：已经预测到涛美要过来改需求啦！',
    '警告：已经预测到杨森要过来改需求啦！',
    '大喊一句 腊肉最帅，你这个bug就改好了，而另外十几个 bug 就铺天盖地的过来了',
    '生活不止眼前的 bug，还有后端的 bug',
    '上班别看小电影，你会被妒忌的',
    '涛仔～涛仔～涛仔（请模仿涛美娇嫩细腻的语气喊出来）',
    '易拆的鼠标垫，带劲儿😊',
    '还在写 bug 呐，你单身你好意思吗',
    '梓航其实一直认为：肥胖，是一种工伤',
    '应该立法：单身，应纳入五险一金的福利条款行列，各单位需分配人员解决该问题',
    '如果你申请和 易拆 结队编程，你这个 bug 应该很久解决了',
    '不要写了，不要在想了，你需要静静（静静qq：635113146，我只能帮你到这了）',
    '还没搞好？你这个 bug 让娇娇很难过，她灰常伤心，因为她又发现了一个...',
    '认真的男人很帅；海疆，注意！司帅正用色眯眯的膀胱在偷瞄你',
    '王钊，其实也喜欢吃点泡菜的',
    '加班吗？你真好，给你个大拇指，另外加班完了去看看禅道吧，小林 指派了十几个问题给你，辛苦了😊',
    '注意啦，这个bug你再改不完，斌总会让你列个文档来大家讨论啦',
    '串串，带把菜刀来公司吧，放桌上，可能就没什么bug了，很灵验的',
    '边边，如果有一天串串带了把刀来上班，不要害怕，他只是想震慑一下测试和产品',
    '小怪兽，如果有一天串串带了把刀来上班，不要着急，你可以叫他把淘宝地址发给你也来一把',
    '需求还没写完吗，茅总现在你背后，写完了吗',
    '来自王小林的一条消息：这么多bug，但其实是可以商量的，你如何看待潜规则这种情况？',
    '小波的驾照考了很多次都还没拿下来，所以你该谨慎考虑以后要不要坐他副驾了吧？',
    '小波的科目四一直没有达标，他忘记了党和人民的教育，这就是堕落！',
    '有问题？找恒君！不懂？找恒君！又有 bug ？找恒君！',
];

const baseDevPlugins = [
    // 🌈 进度条
    new NyanProgressPlugin({
        nyanCatSays: progress => progress === 1 && nyanCatSaysList[Math.floor(Math.random() * nyanCatSaysList.length)]
    }),

    // 跳过错误输出
    new webpack.NoEmitOnErrorsPlugin(),
]

const basePlugins = [
    // 编译进度
    new webpack.ProgressPlugin(),

    // 友好报错信息
    new FriendlyErrorsWebpackPlugin(),

    // 全局变量
    new webpack.DefinePlugin({
        'process.env': {
            // 因为使用热加载，所以在开发状态下可能传入的环境变量为空
            NODE_ENV: JSON.stringify(config.SERVICE_STATE.__DEV__ ? 'development' : 'production'),
            PORT: process.env.PORT || config.port,
        },
        SERVICE_STATE: JSON.stringify(config.SERVICE_STATE),
    }),

    new I18nPlugin(cnJson),

    // HappyPack
    new HappyPack({
        id: 'scripts',
        threadPool: HappyThreadPool,
        loaders: ['babel-loader']
    }),

    new HappyPack({
        id: 'eslint-scripts',
        threadPool: HappyThreadPool,
        loaders: ['eslint-loader']
    }),

    new HappyPack({
        id: 'styles-sass',
        threadPool: HappyThreadPool,
        loaders: ['css-loader', 'sass-loader']
    }),

    new HappyPack({
        id: 'styles',
        threadPool: HappyThreadPool,
        loaders: ['css-loader']
    }),
]

const windowDev = [
    ...basePlugins,

    ...baseDevPlugins,

    ...windowPlugin,
]

exports.devClientPlugins = [
    // HMR
    new webpack.HotModuleReplacementPlugin(),

    ...windowDev,

    // html 导入 dll js
    new AddAssetHtmlPlugin({
        filepath: `${config.path.dllPath}/vendor.dll.bundle.js`,
        hash: true,

        // 默认为true，但dll没有map文件
        includeSourcemap: false,
    }),

    new webpack.DllReferencePlugin({
        manifest: `${config.path.dllPath}/manifest.json`,
        context: config.path.dllPath,
    }),

    // 更新组件时在控制台输出组件的路径而不是数字ID
    new webpack.NamedModulesPlugin(),

    new BrowserSyncPlugin({
        host: config.host,
        port: config.proxyPort,
        proxy: `http://${config.host}:${config.port}`,
        logConnections: false,
        notify: false,
    }, {
        reload: false,
    }),
]

exports.devSsrClientPlugins = [
    ...windowDev,

    new ReactLoadablePlugin({
        filename: `${config.path.distPath}/react-loadable.json`,
    }),
]

exports.devSsrServerPlugins = [
    ...basePlugins,

    ...baseDevPlugins,
]