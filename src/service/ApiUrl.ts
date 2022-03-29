/*
 * @Author: caohui
 * @Date: 2020-12-08 16:44:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-08 16:29:58
 * @Description: 
 * @FilePath: \bosspay\src\service\ApiUrl.ts
 */

const bosspayBaseUrl = `/bizmate/bosspay/v1`;
const userBaseUrl = `/bizmate/user/v1`;
export const QUICKPAYMENT_API_URL = {
    // 下载企业组织结构 
    DOWNLOAD_CPY_ORGANIZATION: `${userBaseUrl}/getDepartmentTree`,
};

export const PAYPASSWORD_API_URL = {
    // 检查支付密码是否设置
    CHECK_PAYMENT_PWD: `${bosspayBaseUrl}/checkPaymentPwd`,
};

export const STANDARD_URL = {
    // 获取懒加载数据
    GET_QUERY_DATA: `standard.queryData`,
}

export const BILLDATA_URL = {
    // 获取票据贴现数据
    GET_BILL_DATA: `standard.billData`,
}