/*
 * @Author: caohui
 * @Date: 2020-12-08 16:44:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-08 14:51:36
 * @Description: 
 * @FilePath: \bosspay\bankConfig\commonConfig.js
 */

import { setStorage, getStorage } from "utils/storageUtil.js";
import { loadScript, getHostUrl } from "@/utils/commonUtil";
window.DOMAIN_URL_KEY = `YQT_DOMAIN`;
window.PRODUCT_NAME = `bizmate`;
class CommonConfig {
    constructor() {
        this.completeUrl = ``;
    }

    initConfig() {
        return this.getHost();
    }
    // 获取真实地址
    async getHost() {
        this.completeUrl = await getHostUrl();
        return this.loadConfig();
    }

    // 加载配置
    loadConfig() {
        return Promise.all([this.loadBankConfig(), this.loadCommonConfig()]).then(() => {
            console.log(`loadBankConfig/loadCommonConfig @@Success`)
        }).catch(err => {
            console.log(`loadBankConfig/loadCommonConfig @@Error ------>`, err)
        })
    }

    // 加载银行配置
    async loadBankConfig() {
        let storageConfig = getStorage(`PAGE_BANK_CONFIG`);
        if (storageConfig) {
            window.BANK_CONFIG = JSON.parse(storageConfig) || {};
            return;
        } else {
            let bankConfigUrl = `${this.completeUrl}/bizmate/static/frontconfig/config/bank_config.js`;
            return loadScript(bankConfigUrl).then(() => {
                setStorage(`PAGE_BANK_CONFIG`, JSON.stringify(window.BANK_CONFIG || {}));
            })
        }
    }

    // 加载公共配置
    async loadCommonConfig() {
        if (window.Common_Config) {
            return;
        } else {
            let commonConfigUrl = `${this.completeUrl}/bizmate/static/frontconfig/config/common_config.js`;
            return loadScript(commonConfigUrl);
        }
    }

}
const commonConfig = new CommonConfig();
export default commonConfig;