/*
 * @Author: caohui
 * @Date: 2020-12-08 16:44:26
 * @LastEditors: caohui
 * @LastEditTime: 2020-12-08 17:28:49
 * @Description: 
 * @FilePath: \bosspay\src\pages\paymentTest\paymentTest.js
 */


import Vue from "vue";
import { PaymentTestRouter } from "routerConfig";
import { PaymentTestPage } from "pageConfig";
import Router from "vue-router";
import "@/router/baseRouter.js";

const router = new Router({ routes: PaymentTestRouter }); PaymentTestPage

router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面title */
	console.log(`routerChange ------> `, to, from);
	if (to.meta.title) {
		BrowserApi.setTitle({ title: to.meta.title });
	}
	next();
});

const EventBus = new Vue();
// 混合全局控制 进行后退按钮控制 内部路由的事件监听必须放在created之后
Vue.mixin({
	created() {
		this.$EventBus = EventBus;
	}
});

new Vue({
	router,
	render: h => h(PaymentTestPage)
}).$mount("#app");