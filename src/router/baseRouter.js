/*
 * @Author: caohui
 * @Date: 2020-12-08 16:44:26
 * @LastEditors: caohui
 * @LastEditTime: 2020-12-08 17:28:43
 * @Description: 
 * @FilePath: \bosspay\src\router\baseRouter.js
 */

import Vue from "vue";
import Router from "vue-router";
Router.prototype.goBack = function () {
	this.isBack = true;
	// 走app的返回
	window.history.go(-1);
};
Vue.use(Router);
