/*
 * @Author: caohui
 * @Date: 2020-12-08 16:44:41
 * @LastEditTime: 2020-12-08 17:11:46
 * @Description: 
 */

// 404
import Page404 from "@/comp/404";
// 订单测试首页
const Home = r => require.ensure([], () => r(require(`@/pages/paymentTest/components/home`)), `paymentTest_home`);
const routes = [{
    path: `/`,
    name: `home`,
    component: Home,
    meta: {
        title: `支付订单测试`,
        entry: true
    }
},
{
    path: `*`,
    component: Page404,
    meta: {
        title: `页面不见了`
    }
}];
export default routes