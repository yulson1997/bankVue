/**
 * 通用校验器
 */
import { getClass, isEmptyObject } from '../commonUtil';

var CommonValidator = function () {

};


CommonValidator.prototype = {
    /**
     * 非空
     * @param {Object} value  验证的数据
     */
    notEmpty: function (value) {
        if ('Object' == getClass(value) && !isEmptyObject(value)) {//对象
            return true;
        } else if ('Array' == getClass(value) && 0 < value.length) {//数组
            return true;
        } else if (value.trim()) {//其他数据
            return true;
        }
        return false;
    },

    /**
     * 最小长度校验
     * @param {Object} value  被校验值
     * @param {Object} min    最小长度
     */
    checkMinLength: function (value, min) {
        return ((value + '').length >= min);
    },

    /**
    * 手机号的规则验证 （onblur）
    * @param {} ele
    */
    checkCellPhone: function (value) {
        if (!!value && value != "") {
            var reg = /^1[0-9]{10}$/; //验证规则
            if (!reg.test(value)) {
                return false;
            }
        } else {
            return false;
        }
        return true;
    },

    /**
     * 邮箱的规则验证 （onblur）
     * @param {} ele
     */
    checkEmail: function (value) {
        if (!!value && value != "") {
            //邮箱规则  
            //eslint-disable-next-line
            var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            var websiteCheck = reg.test(value);
            if (!websiteCheck) {
                return false;
            }
        } else {
            return false;
        }
        return true;
    },

    /**
     * 网址的规则验证 （onblur）
     * @param {} ele
     */
    checkWebsite: function (value) {
        if (!!value && value != "") {
            //eslint-disable-next-line
            var reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;
            if (!reg.test(value)) {
                return false;
            }
        } else {
            return false;
        }
        return true;
    }
}

export default new CommonValidator();