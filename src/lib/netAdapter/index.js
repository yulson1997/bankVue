/*
 * @Author: caohui
 * @Date: 2020-12-08 16:44:26
 * @LastEditors: caohui
 * @LastEditTime: 2020-12-08 17:29:27
 * @Description: 
 * @FilePath: \bosspay\src\lib\netAdapter\index.js
 */

// 接口适配器
const NetAdapter = require('@sinosun/lib/api/NetAdapter');

// mPaaS接口适配
const MPaaSNetImpl = require('@sinosun/lib/src/NetApi/impl/MPaaSNetImpl').default;

// 基础服务
const NetApi = require('@sinosun/lib/api/NetApi');

//导出使用
module.exports = {
    NetAdapter,
    MPaaSNetImpl,
    NetApi
}