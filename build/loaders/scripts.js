const path = require('path');
const threadLoader = require('thread-loader');

const babelrc = require('./bebelrc');
const setting = require('../../setting');
const osSize = require('os').cpus().length;

const { ENV: env, PATH } = setting;

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
                babelrc
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
    include: PATH.src,
    exclude: path.join(PATH.root, 'node_modules'),
}, {
    test: [/\.(js|jsx)$/],
    use: {
        loader: 'babel-loader?cacheDirectory=true',
        options: Object.assign(
            {
                cacheDirectory: true,
                babelrc: false,
            },
            babelrc
        ),
    },
    include: PATH.src,
    exclude: path.join(PATH.root, 'node_modules'),
}];
