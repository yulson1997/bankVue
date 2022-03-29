/*
 * @Author: caohui
 * @Date: 2020-12-08 16:44:26
 * @LastEditTime: 2020-12-08 16:50:02
 * @Description: 
 * 1、主干：在T信主干代码该文件下的引入路径都是src/xxx
 * 2、定制：将对应需要定制的页面router文件import进来，覆盖主干的vue页面，达到定制主干代码的效果
 * @FilePath: \bosspay\bankConfig\routerConfig\index.js
 */

const routerConfig = {};
// 测试老板付 路由地址
routerConfig['PaymentTestRouter'] = 'bankConfig/routerConfig/router/paymentTest.js'; // @/pages/attendance/router/index.js

module.exports = function (importName) {
    return routerConfig[importName];
};