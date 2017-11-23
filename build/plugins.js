const NyanProgressPlugin = reuqire('nyan-progress-webpack-plugin');
const env = process.env.NODE_ENV.trim();

const plugins = {
    basePlugins: state => {
        return [
            // 🌈猫 进度条
            new NyanProgressPlugin(),

            // 全局变量
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: env,
                },
                ...state
            }),
        ]
    }
}

module.exports = (state, pluginsType) => plugins[pluginsType](state);