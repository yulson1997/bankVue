const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const utils = require('./utils');
const entry = require('./webpack.entry.config')
const config = require('../config');
const customTheme = require("./custom-theme");
let plugins = [
    // copy custom static assets
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': config.webpack.env
    }),
    new VueLoaderPlugin()
];

Object.keys(entry).forEach(item => {
    console.log('item', item)
    let h = new htmlWebpackPlugin({
        template: utils.resolve('src/index.html'),
        filename: `pages/${item}.html`,
        inject: true,            // js插入位置
        hash: true,
        minify: {
            collapseWhitespace: true, //去除空格
            removecomments: true //去除注释
        },
        chunks: [`manifest`, `sinosun_vendor`, `sinosun_common`, `${item}`]//引入entry里面的哪一个chunk
    })
    plugins.push(h)
})

module.exports = {
    entry: entry,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js'),
        publicPath: config.webpack.envPro
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.jsx', '.ts', '.tsx'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            'bankConfig': utils.resolve('bankConfig'),
            'customSrc': utils.resolve('customSrc'),
            'mock': utils.resolve('mock'),
            '@': utils.resolve('src'),
            'resource': utils.resolve('src/resource'),
            'sslib': utils.resolve('src/lib'),
            'sscomp': utils.resolve('src/comp'),
            'assets': utils.resolve('assets'),
            'components': utils.resolve('src/components'),
            'config': utils.resolve('src/config'),
            'model': utils.resolve('src/model'),
            'utils': utils.resolve('src/utils')
        },
    },
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,// 正则表达式，指明要处理的文件类型
            use: [config.webpack.envDev ? `style-loader` : {
                loader: MiniCssExtractPlugin.loader, options: {
                    publicPath: '../../'
                }
            },
                'css-loader', 'postcss-loader', 'sass-loader'], // 处理资源所使用的loader, 处理顺序为从右向左
        },
        {
            test: /\.styl$/,// 正则表达式，指明要处理的文件类型
            use: [config.webpack.envDev ? `style-loader` : {
                loader: MiniCssExtractPlugin.loader, options: {
                    publicPath: '../../'
                }
            },
                'css-loader', 'postcss-loader', 'stylus-loader'], // 处理资源所使用的loader, 处理顺序为从右向左
        }, {
            test: /\.less$/,// 正则表达式，指明要处理的文件类型
            use: [config.webpack.envDev ? `style-loader` : {
                loader: MiniCssExtractPlugin.loader, options: {
                    publicPath: '../../'
                }
            },
                'css-loader', 'postcss-loader', {
                loader: 'less-loader',
                options: {
                    modifyVars: customTheme
                }
            }, {
                loader: 'sass-resources-loader',
                options: {
                    resources: [
                        utils.resolve('node_modules/sinosun-ui/lib/style/themes/default.less'),
                        utils.resolve('node_modules/sinosun-ui/lib/style/mixins/hairLine.less'),
                    ]
                }
            }], // 处理资源所使用的loader, 处理顺序为从右向左
        },
        {
            test: /\.vue$/,
            loader: `vue-loader`,
            options: {
                loaders: utils.styleLoaders({
                    sourceMap: config.webpack.envPro
                        ? config.build.productionSourceMap
                        : config.dev.cssSourceMap,
                    extract: config.webpack.envPro,
                    usePostCSS: config.webpack.envPro
                })
            }
        },
        {
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            include: [utils.resolve('src')],
            options: {
                formatter: require('eslint-friendly-formatter')
            }
        },
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            enforce: 'pre',
            use: [
                {
                    loader: 'tslint-loader',
                    options: {
                        configFile: 'tslint.json'
                    }
                }
            ]
        }, {
            test: /\.tsx?$/,
            use: [
                'babel-loader',
                {
                    loader: "ts-loader",
                    options: { appendTsxSuffixTo: [/\.vue$/] }
                }
            ]
        }, {
            test: /\.(jsx|js)$/,
            loader: 'babel-loader',
            include: [utils.resolve('src'), utils.resolve('bankConfig'), utils.resolve('customSrc')]
        }, {
            test: /\.(png|jpe?g|gif)(\?.*)?$/,
            exclude: [utils.resolve('node_modules')],
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    esModule: false,
                    name: 'assets/img/[name].[hash:8].[ext]'
                }
            }]
        }, {
            test: /\.svg$/,
            loader: 'svg-sprite-loader',
            options: {
                symbolId: '[name]'
            },
            include: [utils.resolve('node_modules'), utils.resolve('assets')]
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: 'assets/fonts/[name].[ext]'
            }
        }]
    },
    plugins
}