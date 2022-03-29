const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const config = require('../config');

let devConfig = {
    mode: 'development',
    devtool: 'module-eval-source-map',
    devServer: {
        // 启动的服务端口
        port: config.dev.port,
        host: config.dev.host,
        // 若编译过程中有错误，显示到网页上,便于定位错误
        overlay: true,
        // 实时刷新
        inline: true,
        //热加载
        hot: true,
        progress: true,
        stats: `errors-only`, // To show only errors in your bundle
        //指定浏览器打开的页面
        openPage: `pages/singlePage.html`,
        proxy: config.dev.proxyTable
    },
    plugins: [
        // 启动热更新功能插件
        new webpack.HotModuleReplacementPlugin(),
        // 帮助减少不需要的信息展示
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin()
    ]
}

module.exports = merge(baseConfig, devConfig);