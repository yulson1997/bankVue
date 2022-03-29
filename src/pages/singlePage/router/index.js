/*
 * @Autor: yinfujun
 * @Description: 单页demo路由
 * @Date: 2020-06-29 18:48:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-15 09:11:56
 * @FilePath: \bosspay\src\pages\singlePage\router\index.js
 */
import Vue from 'vue';
import Router from 'vue-router';
import Transition from '../components/transition';
// 404
import Page404 from "@/comp/404";
// 订单测试首页
const Home = r => require.ensure([], () => r(require(`@/pages/singlePage/components/home`)), `singlePage_home`);
//数据校验
const ValidatorPage = r => require.ensure([], () => r(require('@/pages/singlePage/components/validator/validatorpage')), 'singlePage_validator');
//jsBridge页面
const JsBridgePage = r => require.ensure([], () => r(require('@/pages/singlePage/components/jsBrigde/jsbridgepage')), 'singlePage_jsBrigde');
//日志打印页面
const PrintErrorLog = r => require.ensure([], () => r(require('@/pages/singlePage/components/jsBrigde/printerrorlog')), 'singlePage_printerrorlog');
//日期格式化
const DateFormat = r => require.ensure([], () => r(require('@/pages/singlePage/components/utils/dateFormat')), 'singlePage_dateFormat');
//excel解析
const ExcelToJson = r => require.ensure([], () => r(require('@/pages/singlePage/components/utils/exceltojson')), 'singlePage_exceltojson');
//金额转大写
const ToUpperCase = r => require.ensure([], () => r(require('@/pages/singlePage/components/utils/toUpperCase')), 'singlePage_toUpperCase');
//金额格式化
const FormatToMoney = r => require.ensure([], () => r(require('@/pages/singlePage/components/utils/formatToMoney')), 'singlePage_formatToMoney');
//基础组件-懒加载
const BaseComponentDemoPage = r => require.ensure([], () => r(require('@/pages/singlePage/components/basecomponentdemo/basecomponentdemopage')), 'singlePage_basecomponentdemopage');
//业务组件
const TransferBranch = r => require.ensure([], () => r(require('@/pages/singlePage/components/transferbranch/index')), 'singlePage_transferbranch');
//票据贴现页面
const BillDiscount = r => require.ensure([], () => r(require('@/pages/singlePage/components/billDiscount/billDiscount')), 'singlePage_billDiscount');
//票据贴现详情页面
const BillDiscountDetail = r => require.ensure([], () => r(require('@/pages/singlePage/components/billDiscount/detail')), 'singlePage_detail');
//弹窗
const Popup = r => require.ensure([], () => r(require('@/pages/singlePage/components/utils/popup')), 'singlePage_popup');
//筛选
const Screen = r => require.ensure([], () => r(require('@/pages/singlePage/components/utils/screen')), 'singlePage_Screen');
//收款银行
const Collection = r => require.ensure([], () => r(require('@/pages/singlePage/components/utils/collection')), 'singlePage_Collection');


import customTheme from '../../../../build/custom-theme.js'

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
        }, {
            path: 'validatorpage',
            name: 'validatorpage',
            component: ValidatorPage,
            meta: {
                title: `格式校验`,
                entry: true,
            }
        }, {
            path: 'jsbridgepage',
            name: 'jsbridgepage',
            component: JsBridgePage,
            meta: {
                title: `设置title栏颜色`,
                entry: true,
                titleBarConfig: {
                    backgroundColor: customTheme['theme-color'],
                    themeMode: 'light'
                }
            }
        }, {
            path: 'printerrorlog',
            name: 'printerrorlog',
            component: PrintErrorLog,
            meta: {
                title: `日志打印`,
            }
        }, {
            path: 'dateFormat',
            name: 'dateFormat',
            component: DateFormat,
            meta: {
                title: `日期格式化`,
                entry: true,
            }
        }, {
            path: 'exceltojson',
            name: 'exceltojson',
            component: ExcelToJson,
            meta: {
                title: `excel解析`,
                entry: true,
            }
        }, {
            path: 'toUpperCase',
            name: 'toUpperCase',
            component: ToUpperCase,
            meta: {
                title: `金额转大写`,
                entry: true,
            }
        }, {
            path: 'formatToMoney',
            name: 'formatToMoney',
            component: FormatToMoney,
            meta: {
                title: `金额格式化`,
                entry: true,
            }
        }, {
            path: 'basecomponentdemopage',
            name: 'basecomponentdemopage',
            component: BaseComponentDemoPage,
            meta: {
                title: `页面懒加载`,
            }
        }, {
            path: 'transferbranch',
            name: 'transferbranch',
            component: TransferBranch,
            meta: {
                title: `省市联动`,
            }
        },
        {
            path: 'billDiscount',
            name: 'billDiscount',
            component: BillDiscount,
            meta: {
                title: `票据贴现`,
            }
        },{
            path: 'billDiscount/detail',
            name: 'billDiscount_detail',
            component: BillDiscountDetail,
            meta: {
                title: `票据贴现详情`,
            }
        },{
            path: 'popup',
            name: 'popup',
            component: Popup,
            meta: {
                title: `弹窗`,
            }
        },{
            path: 'screen',
            name: 'screen',
            component: Screen,
            meta: {
                title: `筛选`,
            }
        },
        {
            path: 'collection',
            name: 'collection',
            component: Collection,
            meta: {
                title: `收款银行`,
            }
        }, {
            path: '*',
            name: 'page404',
            component: Page404,
            meta: {
                title: `页面不见了`,
                entry: true,
            }
        }]
    }],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return { x: 0, y: 0 };
    }
});
export default router;

