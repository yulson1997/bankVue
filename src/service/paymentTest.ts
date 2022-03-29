/*
 * @Author: caohui
 * @Date: 2020-12-08 16:44:41
 * @LastEditors: caohui
 * @LastEditTime: 2020-12-08 17:28:23
 * @Description: 
 * @FilePath: \bosspay\src\service\paymentTest.ts
 */


import Api from "./Api";
class PaymentTestService extends Api {
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
}

export default new PaymentTestService();
