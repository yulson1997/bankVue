/**
 * 日期转换工具函数
 * @param {*} date 
 *  参数1： 时间转换值； 参数2：时间转换格式
 *  返回值： 按照规定形式生产的时间格式
 *  例子
 * 日期默认是带有年月日时分秒模式： YYYY-MM-DD HH:mm:ss
    Fri Oct 09 2020 12:43:38 GMT+0800 (中国标准时间)  ---> 2020-10-09 12:44:29
    1602218694150  ----> 2020-10-09 12:44:29
       根据业务可以灵活修改模式：
            YYYY-MM 年月模式
            YYYY-MM-DD 年月日模式
            YYYY-MM-DD HH:mm 年月日时分模式
 */

export function dateFormat(date) {
    var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD HH:mm:ss';

    if (date === null || date === undefined) {
        return
    }
    if (date instanceof Date) {
        let _self = date
        date = _self
    } else if (date instanceof String) {
        date = date.replace(/-/g, '/')
        date = new Date(date);
    } else if (new Number(date) instanceof Number) {
        date = new Date(date);
    } else {
        console.error("[sinosun-ui] dateFormat 参数不是有效的时间格式。");
        return;
    }
    var o = {
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
    }
    var week = {
        '0': '\u65E5',
        '1': '\u4E00',
        '2': '\u4E8C',
        '3': '\u4E09',
        '4': '\u56DB',
        '5': '\u4E94',
        '6': '\u516D'
    }
    if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? '\u661F\u671F' : '\u5468' : '') + week[date.getDay() + '']);
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return fmt;
}
