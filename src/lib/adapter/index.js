//浏览器适配器
const BridgeAdapter = require('@sinosun/lib/api/BridgeAdapter');

//mPaaS插件
const MPaaSJSBridgeImpl = require('@sinosun/lib/src/AppApi/Bridge/impl/MPaaSJSBridgeImpl').default;

//安全硬件接口api
const SSPayApi = require('@sinosun/lib/api/SSPayApi');

//app交互api
const NativeSupportApi = require('@sinosun/lib/api/NativeSupportApi');

//浏览器api
const BrowserApi = require('@sinosun/lib/api/BrowserApi');


//暴露window
window.NativeSupportApi = NativeSupportApi;
window.SSPayApi = SSPayApi;
window.BrowserApi = BrowserApi;



//导出使用
module.exports = {
    BridgeAdapter,
    MPaaSJSBridgeImpl
}

