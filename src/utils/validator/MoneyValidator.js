/*
 * @Author: caohui
 * @Date: 2020-12-08 16:44:26
 * @LastEditors: caohui
 * @LastEditTime: 2020-12-08 17:28:17
 * @Description: 
 * @FilePath: \bosspay\src\utils\validator\MoneyValidator.js
 */


/**
 * 金额校验器
 */
import { moneyStringFixTwo } from '@/utils/commonUtil';

const INTEGERLENGTH = 14;
const DECIMALLENGTH = 2;

const moneyFrtMap = {
	integerLength: INTEGERLENGTH,
	decimalLength: DECIMALLENGTH
};

let MoneyValidator = function () {

};

MoneyValidator.prototype = {
	/**
	 * 格式化金额数据   最大支持14.2
	 * @param {Object} value
	 * @param {Object} integerLength  整数最大长度
	 * @param {Object} decimalLength  小数最大长度
	 */
	parse: function (value, integerLength, decimalLength) {
		value = (value + '').replace(/[^\d.]/g, "").replace(/\.{2,}/g, ".").replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");//去掉非数字字符

		integerLength = integerLength || moneyFrtMap.integerLength;//整数长度
		decimalLength = decimalLength || moneyFrtMap.decimalLength;//小数长度
		let maxLength = integerLength + decimalLength + 1;//最大长度为整数长度+小数长度+1

		if (value.split(".")[0].indexOf("0") == 0) {
			let a = value.split(".")[0];
			let inter = a.replace(/\b(0+)/gi, "");//如果第一位是0,则替换前面的0为空
			if (inter == "") {
				inter = "0"
			}

			if (value.split(".").length == 1) {
				value = inter;
			} else if (value.split(".").length == 2) {
				value = inter + "." + value.split(".")[1]
			}
		}

		if (0 > value.indexOf(".")) {//整数
			maxLength = integerLength;
		} else if (value.split(".")[1].length > decimalLength) {//小数
			value = (value).slice(0, value.indexOf(".") + (decimalLength + 1))
		}
		if (value.length > maxLength) {
			value = (value).slice(0, maxLength)
		}

		return value;
	},
	/**
	 * 格式化金额 1400010格式化为1,400,010.00 0.1格式化为0.10 
	 * @param {Object} value
	 */
	format: function (value, decimalLength) {
		value = value + '';
		decimalLength = decimalLength || moneyFrtMap.decimalLength;
		let index = value.indexOf('.');
		let padZeroNum = 0;
		let padZeroStr = '';
		if (0 > index) {//整数
			padZeroNum = decimalLength;
		} else {//小数
			padZeroNum = decimalLength + 1 - (value.length - index);
		}
		for (let i = 0; i < padZeroNum; i++) {//补零个数
			padZeroStr = padZeroStr + '0';
		}
		value = value.replace(/\./g, '') + padZeroStr;//补零
		return moneyStringFixTwo(value);
	},

}

export default new MoneyValidator();