/*
 * @Author: caohui
 * @Date: 2020-12-08 16:44:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-21 13:49:01
 * @Description:
 * @FilePath: \bosspay\src\utils\commonUtil.js
 */

import {
    getStorage,
    setStorage,
} from "utils/storageUtil.js";

/**
 * 获取类型名称
 * @param {Object} object
 * __getClass(5); // => "Number"
 * __getClass({}); // => "Object"
 * __getClass(/foo/); // => "RegExp"
 * __getClass(''); // => "String"
 * __getClass(true); // => "Boolean"
 * __getClass([]); // => "Array"
 * __getClass(undefined); // => "Window"
 * __getClass(Element); // => "Constructor"
 *
 */
export function getClass(object) {
    return Object.prototype.toString
        .call(object)
        .match(/^\[object\s(.*)\]$/)[1];
}

/**
 * 获取当前url的参数
 */
export function getUrlParams() {
    let url = window.location.href;
    let regexP = /[^#&?]+=[^#&?]*/gi,
        res = {};
    let ms = url.match(regexP);
    if (ms) {
        for (let i = 0; i < ms.length; i++) {
            let arr = ms[i].split("=");
            // 解码汉字处理 @符号
            res[arr[0]] = decodeURIComponent(arr[1]);
        }
    }
    return res;
}

/**
 * 获取当前函数的节流函数(就是在xx毫秒内只能触发一次func)
 *
 * @param {any} func
 * @param {any} context func的上下文环境
 * @param {any} times  毫秒 默认为1000
 */
export function throttle(func, context, times) {
    if (throttle.ready) {
        try {
            throttle.ready = false;
            func.call(context);
            window.setTimeout(function () {
                throttle.ready = true;
            }, times || 1000);
        } catch (e) {
            console.log("call " + func + " 方法 error");
            throttle.ready = true;
        }
    }
}
throttle.ready = true;

/**
 * 判断对象是否为空，为空返回true，否则返回false
 * @param {Object} e
 */
export function isEmptyObject(e) {
    for (var t in e) {
        return !1;
    }
    return !0
}

/**
 * 判断是否PC端
 */
export function isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
}

/**
 * 格式化数据   100-->1.00元   
 * 能否换成正则.toString().replace(/(\d{2})(?!\d)/g, ",$1").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
 * @param {Object} ms
 */
export function moneyStringFixTwo(ms) {
    var moneyDis = "";
    ms = ms + "";
    ms = ms.replace(/[^\d]/g, '');
    if (ms.length < 3) {//小数
        ms = pad(ms, 3);
    }
    moneyDis = insert_flg(ms, ".", (ms.length - 2));
    var l = moneyDis.split(".")[0].split("").reverse(),
        r = moneyDis.split(".")[1],
        t = "";
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    var moneyDisBig = t.split("").reverse().join("") + "." + r + "元";
    return moneyDisBig;
}

/**
 * 插入特定位置的字符串
 * @param str 原字符串
 * @param flg 插入字符
 * @param sn  插入位置
 * @returns {String}
 */
export function insert_flg(str, flg, sn) {
    var newstr = "";

    if (3 > str.length) { //如果sn为负数
        str = pad(str, 3);
        sn = 1;
    }

    var arr = str.split("");

    for (var i = 0; i < arr.length; i++) {
        if (i == sn) {
            newstr += flg;
        }
        newstr += arr[i];
    }

    return newstr;
}

//数组补位
export function pad(num, n) {
    var len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}

export const getHostUrl = async (
    domainUrlKey = window.DOMAIN_URL_KEY || `YQT_DOMAIN`,
    productName = window.PRODUCT_NAME || `bizmate`
) => {
    const nodeEnv = process.env['NODE_ENV'];
    // 开发环境不做处理
    if (nodeEnv === `development`) {
        window.COMPLETE_URL = ``;
        return ``;
    }
    let completeUrl = window.COMPLETE_URL || getStorage(`CONFIG.COMPLETE_URL`);
    let hostUrl = ``;
    let pathPrefix = ``;
    if (completeUrl) {
        window.COMPLETE_URL = completeUrl;
        return completeUrl;
    } else {
        let resData = await BrowserApi.getHost({ hostKey: domainUrlKey });
        if (resData.ret === 0 || resData.retCode === 0) {
            const responseData = resData.responseData;
            hostUrl = (responseData || {}).host || ``;
            pathPrefix = (responseData || {}).pathPrefix || ``;
            completeUrl = pathPrefix ? `${hostUrl}/${pathPrefix}` : `${hostUrl}`;
        } else {
            let url = window.location.href || ``;
            let prefixSplit = url.split(`/${productName}/`);
            completeUrl = prefixSplit[0];
        }
    }
    setStorage(`CONFIG.COMPLETE_URL`, completeUrl);
    window.COMPLETE_URL = completeUrl;
    return completeUrl;
};

/**
 * 动态加载js
 */
export const loadScript = (url) => {
    return new Promise((resolve, reject) => {
        let script = document.createElement("script")
        script.type = "text/javascript";
        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    resolve();
                }
            };
        } else { //Others
            script.onload = function () {
                resolve();
            };
        }
        script.onerror = function () {
            reject();
        };
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    })
}

export function scrollThrottle(fn, delay) {
    let last; // 上次执行的时间
    let timer; // 定时器
    delay || (delay = 250); // 默认间隔为250ms
    return function () {
        let context = this;
        let args = arguments;
        let now = +new Date(); // 现在的时间
        if (last && now < last + delay) {
            // 当前距离上次执行的时间小于设置的时间间隔
            clearTimeout(timer); // 清除定时器
            timer = setTimeout(function () {
                // delay时间后，执行函数
                last = now;
                fn.apply(context, args);
            }, delay);
        } else {
            // 当前距离上次执行的时间大于等于设置的时间，直接执行函数
            last = now;
            fn.apply(context, args);
        }
    };
}