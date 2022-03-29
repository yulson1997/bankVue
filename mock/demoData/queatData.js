
import { returnResData } from './commonDemo.js';

const queryDataDemo = (params = {}) => {
    let res = {};
    res.data = {
        "acctInfoList": [{ "acctRight": 6228480059052545578, 'acctName': '殷福军', 'aliasName': '武汉融云', 'deptAlias': '中国银行' },
        { "acctRight": 6228480059052541123, 'acctName': '曹辉', 'aliasName': '武汉融云', 'deptAlias': '平安银行' },
        { "acctRight": 6228480059052543456, 'acctName': '张爱龙', 'aliasName': '武汉融云', 'deptAlias': '招商银行' },
        { "acctRight": 6228480059052546666, 'acctName': '童靖', 'aliasName': '武汉融云', 'deptAlias': '农业银行' },
        { "acctRight": 6228480059052547777, 'acctName': '聂昌', 'aliasName': '武汉融云', 'deptAlias': '交通银行' },
        { "acctRight": 6228480059052548888, 'acctName': '汪晟', 'aliasName': '武汉融云', 'deptAlias': '建设银行' }],
        "monitorId": "172.16.18.5null15722725993371WYOizz",
        "transGlobalFlow": "TBM01201910280000013600",
        "code": 0,
        'totalNum': 18
    };
    
    return returnResData(res.data);
}

export default {
    queryDataDemo
}