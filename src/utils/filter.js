/*
 * @Author: caohui
 * @Date: 2020-12-08 16:44:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-07 09:02:48
 * @Description: VUE过滤器
 * @FilePath: \bosspay\src\utils\filter.js
 */

import Vue from "vue";
import {
    getLocalTime,
    moneyStringFixTwo,
    stringFixTwoWithType
} from "./commonUtil";
/***************************VUE过滤器 start**************************************/

/**
 * 对金额格式化
 */
Vue.filter("moneyFrt", function (value, frtZeroFlag, formatStr) {
    if (!value || 0 == value) {
        if (frtZeroFlag) {
            return "0.00元";
        }
        return "0元";
    }

    if (-1 == value) {
        if (frtZeroFlag) {
            return formatStr || `无限额`;
        } else {
            return "无金额";
        }
    }
    return moneyStringFixTwo(value);
});
/**
 * 对订单时间格式化
 */
Vue.filter("orderTimeFrt", function (value) {
    value += ""; //转化为字符串
    let year = value.substring(0, 4);
    let month = value.substring(4, 6);
    let day = value.substring(6, 8);
    let hour = value.substring(8, 10);
    let min = value.substring(10, 12);
    let sec = value.substring(12, 14);
    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
});

/**
 * 对有单位数据格式化
 * @param pointlength 组件中小数点的长度
 * @param pointlength 单位
 */
Vue.filter("unitsFrt", function (value, unit, pointlength) {
    if (pointlength == 2) {
        value = stringFixTwoWithType(value, "");
    }
    if (pointlength == 1) {
        value = value / 10;
    }
    if (unit) {
        if (!value) return "0" + unit;
        return value + unit;
    } else {
        return value;
    }
});

/**
 * 数据格式化
 * @param str 替换字符
 * @param begin 开始位置
 * @param end 结束位置
 */
Vue.filter("replaceChar", function (value, str, begin, end) {
    value = value + "";
    let fstStr = value.substring(0, begin);
    let scdStr = value.substring(begin, end);
    let lstStr = value.substring(end, value.length);
    return fstStr + scdStr.replace(/\w/g, str) + lstStr;
});

/**
 * 对有单选框数据转换
 */
Vue.filter("radioFrt", function (value, radioList) {
    let text = "";
    if (!value && 0 != value) return text;
    let reg = new RegExp("^[0-9]*$");
    if (reg.test(value)) {
        //数字
        if (radioList) {
            radioList.forEach(function (item) {
                if (value == item.id) {
                    text = item.text;
                }
            });
        }
    } else {
        //非数字  兼容历史数据有“是”“否”的表单
        text = value;
    }
    return text;
});

/**
 * 对有下拉库框数据转换
 */
Vue.filter("selectFrt", function (value, selectList, textFlag) {
    let text = "";
    if (textFlag) return value; //如果textFlag为true，则说明下拉框的这个值不需要再处理，直接返回value
    if (!value && 0 != value) return text;
    if (selectList) {
        selectList.forEach(function (item) {
            //{"title":"定期存款","dispValue":"定期存款","value":1}
            if (value == item.value) {
                text = item.dispValue;
            }
        });
    }
    //兼容模板中如果有输入框，后来变成了下拉框，输入框的历史数据兼容处理，比如出差模板中的所属项目字段  zc
    if (text == "" && value) {
        return value;
    }
    return text;
});

/**
 * 对时间格式的转换
 */
Vue.filter("dateFrt", function (value, formatDate) {
    let text = "";
    if (formatDate.serverFormat == "timestamp") {
        let dateVelue = Number(value);
        if (isNaN(dateVelue)) {
            text = value; //兼容差旅二级明细中的历史数据是字符串“2017/12/25”的问题
        } else {
            text = new Date(dateVelue * 1000).format(formatDate.format);
        }
    } else if (formatDate.serverFormat == "YYYYMMDD") {
        let dataStr =
            value.substring(0, 4) +
            "-" +
            value.substring(4, 6) +
            "-" +
            value.substring(6, 8);
        text = new Date(dataStr).format(formatDate.format);
    } else {
        let dateVelue = Number(value);
        if (isNaN(dateVelue)) {
            text = value; //兼容差旅二级明细中的历史数据是字符串“2017/12/25”的问题
        } else {
            text = new Date(dateVelue * 1000).format(formatDate);
        }
    }
    return text;
});
/**
 * 计算字符串的真实长度汉字1，字符0.5，向上取整
 * str  传入的字符串
 */
Vue.filter("strTrueLength", function (str) {
    let re = /[\u4E00-\u9FA5]/g; //中文字符的正则
    let tempL = str.length;
    let tempCL = 0;
    if ("" == str.match(re) || null == str.match(re)) {
        tempCL = 0;
    } else {
        tempCL = str.match(re).length;
    }
    let tempTL = Math.ceil((tempL - tempCL) * 0.5 + tempCL);
    return tempTL; //返回字符串真实长度汉字1，字符0.5，向上取整
});

/**
 * 时间格式化
 */
Vue.filter("timeTransform", function (value) {
    return getLocalTime(4, value * 1000);
});

/***************************VUE过滤器 end**************************************/
