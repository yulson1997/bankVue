/*
 * @Autor: dingfeng
 * @Description: 授权书相关接口mock数据
 * @Date: 2020-06-23 21:05:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-08 16:37:41
 * @FilePath: \wealthmarket\mock\index.js
 */

import { STANDARD_URL,BILLDATA_URL } from '@/service/ApiUrl';
import {
    queryDataDemo,
    billDataDemo,
} from "./demoData";



const getSuccess = (data = {}) => {
    return {
        resultCode: 0,
        resultMessage: "ok",
        result: data
    }
}

// 获取懒加载数据
const QUERYDATAMOCKFN = (params = {}) => {
    console.log(`QUERYDATAMOCKFN @@params ------>`, params)
    let queryDataMock = queryDataDemo.queryDataDemo(params);
    return getSuccess(queryDataMock);
}



// 获取懒票据贴现数据
const BILLDATAMOCKFN = (params = {}) => {
    console.log(`QUERYDATAMOCKFN @@params ------>`, params)
    let billDataMock = billDataDemo.billDataDemo(params);
    return getSuccess(billDataMock);
}

const apiList = {
    [STANDARD_URL.GET_QUERY_DATA]: QUERYDATAMOCKFN,
    [BILLDATA_URL.GET_BILL_DATA]: BILLDATAMOCKFN,
}


export default (apiKey, params = {}) => {
    if (typeof apiList[apiKey] === `function`) {
        return apiList[apiKey](params);
    }
    return apiList[apiKey] || {};
}