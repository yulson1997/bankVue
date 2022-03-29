import { PrintErrorLogFunction } from "./jsBridgeUtils.js";
/**
 * 日志打印
 * 必填参数：log：日志； type: 日志级; uploadFlag: 日志是否上传统计
 * log: {
 *      content: 日志内容，
 *      logpath： 日志发生位置,
 * }
 * type： normal: 1 业务打印； warn 2 警告级别  error： 3 错误级别
 * 
 * 之后根据具体业务进行日志区分操纵
 */

export function log(log, type, uploadFlag = false) {
    if (type === 1) {
        console.log(`以下是${log.logpath}发生的业务日志记录`)
        console.log(log.content)
    } else if (type === 2) {
        console.warn(`以下${log.logpath}发生的警告日志记录`)
        console.warn(log.content)
    } else if (type === 3) {
        console.error(`以下${log.logpath}发生的错误日志记录`)
        console.error(log.content)
        PrintErrorLogFunction({
            inputData: JSON.stringify(log),
        }).then(function () { });
    }
    if (uploadFlag) {
        // 通知native进行H5错误日志统计
    }
}

