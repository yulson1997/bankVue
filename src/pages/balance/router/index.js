/*
 * @Autor: wuyiwei
 * @Description: 单页demo路由
 * @Date: 2021-12-07 18:48:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-15 09:11:56
 * @FilePath: \bosspay\src\pages\balance\router\index.js
 */
import Vue from 'vue';
import Router from 'vue-router';
import Transition from '../components/transition';
// 404
// 订单测试首页
const Home = r => require.ensure([], () => r(require(`@/pages/balance/components/home`)), `balance_home`);
//对账申请页面
const checkOrderApply = r => require.ensure([], () => r(require(`@/pages/balance/components/checkOrderApply`)),'checkOrderApply')
//不符明细
const unknownDetail = r => require.ensure([], () => r(require(`@/pages/balance/components/unknownDetail`)),'unknownDetail')
//对账申请详情
const checkApplyDetail = r => require.ensure([], () => r(require(`@/pages/balance/components/checkApplyDetail`)),'checkApplyDetail')
//证书
const certificate = r => require.ensure([], () => r(require(`@/pages/balance/components/certificate`)),'certificate')




Router.prototype.goBack = function () {
    this.isBack = true;
    window.history.go(-1);
}

Vue.use(Router);
const router = new Router({
    routes: [{
        path: '/',
        component: Transition,
        children: [{
            path: '',
            name: 'home',
            component: Home,
            meta: {
                title: `单页DEMO首页`,
                entry: true,
            }
        },
            {
            path:'/checkOrderApply',
            name:'checkOrderApply',
            component:checkOrderApply,
            meta:{
                title:`对账申请`,
                entry:true,
            }
            },
            {
            path:'/unknownDetail',
            name:'unknownDetail',
            component:unknownDetail,
            meta:{
                title:`不符明细`,
                entry:true,
            }
            },  
            {
            path:'/checkApplyDetail',
            name:'checkApplyDetail',
            component:checkApplyDetail,
            meta:{
                title:`对账申请详情`,
                entry:true,
            }
        },  
        {
            path:'/certificate',
            name:'certificate',
            component:certificate,
            meta:{
                title:`证书`,
                entry:true,
            }
        },  
    ]
    }],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return { x: 0, y: 0 };
    }
});
export default router;

