/*
 * @Author: dingfeng
 * @Description: 
 * 该文件为所有html页面入口的vue文件import
 * 该文件由主干和交付定制开发人员共同维护：
 * 1、主干：在T信主干代码该文件下的引入路径都是src/xxx
 * 2、定制：将对应需要定制的页面vue文件import进来，覆盖主干的vue页面，达到定制主干代码的效果
 * @FilePath: \bosspay\bankConfig\pageConfig.js
 */
const pageConfig = {};

// 测试老板付 页面入口
pageConfig['PaymentTestPage'] = '@/App.vue'; // @/App.vue

module.exports = function (importName) {
   return pageConfig[importName];
};