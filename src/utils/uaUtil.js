/*
 * @Author: caohui
 * @Date: 2020-12-08 16:44:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-19 10:45:06
 * @Description: 
 * @FilePath: \bosspay\src\utils\uaUtil.js
 */

const User_Agent = window.navigator.userAgent;
export const getDeviceBarFn = () => {
    // 根据userAgent 获取titleBar高度和statusBar 高度 （px）ios 设置高度延时 初始化获取不到
    const BrowserList = window.navigator.userAgent.split(`/`);
    const len = BrowserList.length;
    // 获取自己浏览器的配置
    const curBrowserList = BrowserList[len - 1].split(` `);
    // 物理像素比
    const devicePixelRatio = window.devicePixelRatio;
    let statusBarHeight = parseInt(curBrowserList[3]) / devicePixelRatio;
    window.STATUSBARHEIGHT = isNaN(statusBarHeight) ? 0 : statusBarHeight;


    let titleBarHeight = parseInt(curBrowserList[4]) / devicePixelRatio;
    window.TITLEBARHEIGHT = isNaN(titleBarHeight) ? 0 : titleBarHeight;
}


export const ismPaaS = () => {
    return User_Agent.indexOf(`mPaaS`) !== -1 || User_Agent.indexOf(`mpaas`) !== -1;
}

