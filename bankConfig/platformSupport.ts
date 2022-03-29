/*
 * @Autor: miaoju
 * @Description: 平台支持类, 主要是 浏览器Jsbridge、网络请求支持, 用于处理mPaaS、tmf等不同平台兼容支持
 * @FilePath: \bosspay\bankConfig\platformSupport.ts
 */
const { BridgeAdapter, MPaaSJSBridgeImpl } = require('../src/lib/adapter')
const { NetAdapter, MPaaSNetImpl } = require('../src/lib/netAdapter')
import commonConfig from "./commonConfig";
import { ismPaaS } from '../src/utils/uaUtil';
class PlatformSupport {

    /**
     * 安装jsbridge平台支持
     */
    installJsBridgeImpl() {
        // 安装mPaaS 的jsbridge
        if (ismPaaS()) {
            BridgeAdapter.setJsBridgeImpl(new MPaaSJSBridgeImpl())
        }

    }

    /**
     * 安装网络请求平台支持
     */
    installNetImpl() {
        // 安装mPaaS 的NetApi
        if (ismPaaS()) {
            NetAdapter.setNetImpl(new MPaaSNetImpl())
        }
    }

    /**
     * 安装通用配置
     */
    installConfig() {
        return commonConfig.initConfig().then(() => {
            console.log(`Common_Config is loaded!`)
        });
    }
}
const platformSupport = new PlatformSupport();
export default platformSupport;