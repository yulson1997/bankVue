/*
 * @Author: caohui
 * @Date: 2020-12-08 16:44:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-08 16:40:33
 * @Description: 单个应用的所有请求接口汇总文件
 * @FilePath: \bosspay\src\service\singlePage.ts
 */


import Api from "./Api";
import RequestParam from '../model/requestParam';

class SinglePageService extends Api {
    constructor() {
        super();
    } 

    /**
     * 重写BaseApi里面的转换服务器result业务数据到本地的 model对象
     * @override
     */
    tranferResultModel(result: any): object {
        return (result as any).result || {};
    }

    // 获取支付单号
    createPayOrder(params = {}) {
        const url = `/bizmate/bosspay/v1/createPayOrder`;
        const errorMessage = `获取支付单号失败`;
        return this.dealResultPromise(url, params, `Post`, errorMessage);
    }

    //懒加载接口
    queryData(param: object) {
        const requestParam = new RequestParam(param);
        const url = `standard.queryData`;
        const errorMessage = `获取懒加载数据失败`;
        return this.dealResultPromise(url, requestParam, `Get`, errorMessage);
    }
    //票据贴现
    billData(param: object) {
        const requestParam = new RequestParam(param);
        const url = `standard.billData`;
        const errorMessage = `获取票据贴现数据失败`;
        return this.dealResultPromise(url, requestParam, `Get`, errorMessage);
    }
}

export default new SinglePageService();
