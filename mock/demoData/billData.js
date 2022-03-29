
import { returnResData } from './commonDemo.js';

const billDataDemo = (params = {}) => {
    let res = {};
    res.data = {
        "acctInfoList": [{ "acctRight": '1345212338076743531650212345', 'acctName': '殷福军', 'time': '2019-08-22', 'isflag': true,'ischeck':false,'money':'100000','issubmit':false },
        { "acctRight": '9769637576774325316542434222', 'acctName': '曹辉', 'time': '2017-02-02', 'isflag': false,'ischeck':false,'money':'100000','issubmit':false },
        { "acctRight": '6754378076774325316526135321', 'acctName': '张爱龙', 'time': '2020-05-09', 'isflag': false,'ischeck':false,'money':'10000','issubmit':false },
        { "acctRight": '5686543678652490084321754532', 'acctName': '童靖', 'time': '2013-09-18', 'isflag': false,'ischeck':false,'money':'100000','issubmit':false },
        { "acctRight": '8765433267896256643214389006', 'acctName': '聂昌', 'time': '2015-01-21', 'isflag': false,'ischeck':false,'money':'100000','issubmit':false },
        { "acctRight": '8777765333342567541234744489', 'acctName': '汪晟', 'time': '2019-03-14', 'isflag': false,'ischeck':false,'money':'10000','issubmit':false }],
        "monitorId": "172.16.18.5null15722725993371WYOizz",
        "transGlobalFlow": "TBM01201910280000013600",
        "code": 0,
        'totalNum': 30
    };
    return returnResData(res.data);
}

export default {
    billDataDemo
}