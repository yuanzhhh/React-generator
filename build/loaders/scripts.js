const path = require('path');
const threadLoader = require('thread-loader');

const infoConf = require('../../infoConf');
const env = process.env.SETTING.ENV;
const osSize = require('os').cpus().length;

const threadLoaderOpts = {
    workers:  env === 'production' ? osSize : osSize - 1,
    workerParallelJobs: 50,
    workerNodeArgs: ['--max-old-space-size=1024'],
    poolRespawn: false,
    poolTimeout: env === 'production' ? 500 : Infinity,
    poolParallelJobs: 50,
    name: "tsx-pool",
};

threadLoader.warmup(threadLoaderOpts, [
    'babel-loader',
    'ts-loader',
    'css-loader',
    'less-loader',
    'style-loader',
    'postcss-loader',
    'file-loader',
    'url-loader',
]);

module.exports = [{
    test: [/\.(ts|tsx)$/],
    use: [
        ...(env === 'development' ? [{
            loader: 'cache-loader',
        }] : []),
        {
            loader: "thread-loader",
            options: threadLoaderOpts,
        },
        {
            loader: 'babel-loader',
            options: Object.assign(
                {
                    cacheDirectory: true,
                    babelrc: false,
                },
                infoConf.BABELRC
            ),
        },
        {
            loader: 'ts-loader',
            options: {
                transpileOnly: env === 'development',
                happyPackMode: true,
                ignoreDiagnostics: [],
            },
        },
    ],
    include: infoConf.PATH.src,
    exclude: path.join(infoConf.PATH.root, 'node_modules'),
}, {
    test: [/\.(js|jsx)$/],
    use: {
        loader: 'babel-loader?cacheDirectory=true',
        options: Object.assign(
            {
                cacheDirectory: true,
                babelrc: false,
            },
            infoConf.BABELRC
        ),
    },
    include: infoConf.PATH.src,
    exclude: path.join(infoConf.PATH.root, 'node_modules'),
}];
