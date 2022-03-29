/*
 * @Author: caohui
 * @Date: 2020-12-08 16:44:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-11 11:25:09
 * @Description: 
 * @FilePath: \bosspay\config\index.js
 */


"use strict";
const path = require("path");
const webpackEnv =
    process.env.NODE_ENV === `development` ? `development` : `production`;
const profixPath = ``;
let protocol = `http`;
let ip = `localhost`;
let port = `8082`;
if (webpackEnv === `development`) {
    const internalIp = require(`internal-ip`);
    ip = internalIp.v4.sync() || `localhost`;
}
const host = `${protocol}://${ip}`;
const hostPort = `${host}:${port}`;

module.exports = {
    webpack: {
        //【views】，默认为views，修改这里的配置的同时，也要同时重命名/src/views的这个文件夹名称
        moduleName: "pages",
        // 本地起的webpack服务地址
        hostPort: hostPort,
        env: JSON.stringify(webpackEnv),
        envPro: webpackEnv === `production`,
        envDev: webpackEnv === `development`
    },
    build: {
        env: webpackEnv,
        index: path.resolve(__dirname, "../dist/index.html"),
        assetsRoot: path.resolve(__dirname, `../dist/SWP-Standard-Client`),
        assetsSubDirectory: "static",
        assetsPublicPath: "../",
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ["js", "css"],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: webpackEnv,
        host: ip,
        port: port,
        autoOpenBrowser: true,
        assetsSubDirectory: "static",
        assetsPublicPath: "/",
        proxyTable: {
            "/bizmate": {
                target: `https://bizmatesit.sinosun.com:17380${profixPath ? `/${profixPath}` : ``}`,
                changeOrigin: true
            }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
};
