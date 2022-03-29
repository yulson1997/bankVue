import Mock from "mockjs";

const returnResData = data => {
    return data;
};

const getPaging = (params, num = 3) => {
    let { pageNum, pageSize } = params;
    let paging = { pageNum, pageSize };
    paging.pages = num; // 返回数据的总页数
    return paging;
};

const GetAuthorizedInfosMockData = (params = {}) => {
    let dataListStr = `data|${params.pageSize}`;
    let mockInfo = {};
    mockInfo[dataListStr] = [
        {
            // 必选字段
            // 授权凭证编号
            authorizedNo: Mock.Random.integer(300000, 400000),
            "authedAmount|1": [
                "-1",
                Mock.Random.integer(160000, 200000),
                Mock.Random.integer(300000, 400000),
                Mock.Random.integer(500000, 700000)
            ],
            // 授权额度（-1:表示无限额）
            "amount|1": [
                "-1",
                Mock.Random.integer(160000, 200000),
                Mock.Random.integer(300000, 400000),
                Mock.Random.integer(500000, 700000)
            ],
            // 可用额度
            availableAmount: Mock.Random.integer(130000, 160000),
            sTime: function () {
                let nowTime = +new Date();
                let timeNum = Math.ceil(Math.random() * 600 + 60);
                let sTime = nowTime - timeNum * 24 * 60 * 60 * 1000;
                return sTime;
            },
            // 授权开始时间
            startTime: function () {
                return new Date(this.sTime).getTime() / 1000;
            },
            // 授权结束时间
            endTime: function () {
                let nowTime = +new Date();
                let timeNum = Math.ceil(Math.random() * 600 + 60);
                let eTime =
                    this.startTime * 1000 + timeNum * 24 * 60 * 60 * 1000;
                let cNow =
                    nowTime -
                    Math.ceil(Math.random() * 60) * 24 * 60 * 60 * 1000;
                return eTime > nowTime ? cNow / 1000 : eTime / 1000;
            },
            // 用途 备注
            purpose: "@cparagraph(1)",
            // 授权书状态。1：生效中，2：已过期，3：未生效，4：已撤销
            "status|1": [1, 1, 2, 3, 4],
            //  可选字段
            // 被授权用户Id
            authedUserId: "@string('lower', 5, 20)",
            // 流程单号Id
            "flowId|1": [
                "",
                Mock.Random.integer(13000, 15000),
                Mock.Random.integer(15000, 20000)
            ]
        }
    ];
    // 20条数据
    let mockData = Mock.mock(mockInfo);
    return mockData.data;
};

const CommonDemoGetAuthorizedInfos = (params = {}) => {
    let res = {
        code: 0
    };
    let paging = Object.assign({}, params, getPaging(params));
    let curPage =
        paging.pageSize / 20 > paging.pages
            ? paging.pages
            : paging.pageSize / 20;
    paging.pageSize = curPage * 20;
    let mockData = [];
    if (paging.pageNum <= paging.pages) {
        mockData = GetAuthorizedInfosMockData(paging);
    }
    res = Object.assign({}, paging);
    res.authorizedInfoEntityList = mockData;
    return returnResData(res);
};

const CommonDownloadCpyOrganization = (params = {}) => {
    let res = {
        code: 0,
        orgList: [
            {
                pOrgId: -1,
                orgName: "银企通2018",
                rankNumber: 0,
                cOrgIdList: [
                    2680,
                    2681,
                    14667,
                    32047,
                    44678,
                    45219,
                    45258,
                    45709,
                    45713,
                    45714,
                    45715,
                    45719,
                    45896
                ],
                orgId: 2679
            },
            {
                pOrgId: 2679,
                orgName: "rffg",
                rankNumber: 0,
                cOrgIdList: [45712, 45718, 45720, 45721, 45722],
                orgId: 2680
            },
            {
                pOrgId: 2679,
                orgName: "市场部",
                rankNumber: 0,
                cOrgIdList: [45707],
                orgId: 2681
            },
            {
                pOrgId: 2679,
                orgName: "测试部",
                rankNumber: 0,
                orgId: 14667
            },
            {
                pOrgId: 14667,
                orgName: "测试三部",
                rankNumber: 0,
                orgId: 14668
            },
            {
                pOrgId: 2679,
                orgName: "SELECT+LastName%2cFirstName+FR",
                rankNumber: 0,
                cOrgIdList: [32049],
                orgId: 32047
            },
            {
                pOrgId: 32047,
                orgName: "!",
                rankNumber: 0,
                orgId: 32049
            },
            {
                pOrgId: 14667,
                orgName: "测试二部",
                rankNumber: 0,
                orgId: 39711
            },
            {
                pOrgId: 2679,
                orgName: "0",
                rankNumber: 0,
                cOrgIdList: [45240],
                orgId: 44678
            },
            {
                pOrgId: 2679,
                orgName: "董事会",
                rankNumber: 0,
                orgId: 45219
            },
            {
                pOrgId: 44678,
                orgName: "1",
                rankNumber: 0,
                orgId: 45240
            },
            {
                pOrgId: 2679,
                orgName: "125",
                rankNumber: 0,
                cOrgIdList: [45259],
                orgId: 45258
            },
            {
                pOrgId: 45258,
                orgName: "456",
                rankNumber: 0,
                orgId: 45259
            },
            {
                pOrgId: 2680,
                orgName: "好感动",
                rankNumber: 0,
                orgId: 45701
            },
            {
                pOrgId: 2680,
                orgName: "国防大厦",
                rankNumber: 0,
                orgId: 45702
            },
            {
                pOrgId: 45702,
                orgName: "好感动",
                rankNumber: 0,
                orgId: 45703
            },
            {
                pOrgId: 2680,
                orgName: "很时尚",
                rankNumber: 0,
                orgId: 45704
            },
            {
                pOrgId: 2681,
                orgName: "Hh",
                rankNumber: 0,
                cOrgIdList: [45708],
                orgId: 45707
            },
            {
                pOrgId: 45707,
                orgName: "Gff",
                rankNumber: 0,
                orgId: 45708
            },
            {
                pOrgId: 2679,
                orgName: "High",
                rankNumber: 0,
                cOrgIdList: [45710],
                orgId: 45709
            },
            {
                pOrgId: 45709,
                orgName: "Hf",
                rankNumber: 0,
                cOrgIdList: [45711],
                orgId: 45710
            },
            {
                pOrgId: 45710,
                orgName: "Ggf",
                rankNumber: 0,
                orgId: 45711
            },
            {
                pOrgId: 2680,
                orgName: "芜湖市",
                rankNumber: 0,
                orgId: 45712
            },
            {
                pOrgId: 2679,
                orgName: "观复嘟嘟",
                rankNumber: 0,
                orgId: 45713
            },
            {
                pOrgId: 2679,
                orgName: "哥粉粉的",
                rankNumber: 0,
                orgId: 45714
            },
            {
                pOrgId: 2679,
                orgName:
                    "宝贝哈哈哈哈好吧哈哈哈哈哈哈哈好哥哥哥哥哥哥哥哥哥哥哥哥过生",
                rankNumber: 0,
                orgId: 45715
            },
            {
                pOrgId: 2680,
                orgName: "冯新柱",
                rankNumber: 0,
                orgId: 45718
            },
            {
                pOrgId: 2679,
                orgName: "格德斯",
                rankNumber: 0,
                orgId: 45719
            },
            {
                pOrgId: 2680,
                orgName: "疯疯癫癫",
                rankNumber: 0,
                orgId: 45720
            },
            {
                pOrgId: 2680,
                orgName: "沪深股市",
                rankNumber: 0,
                orgId: 45721
            },
            {
                pOrgId: 2680,
                orgName: "疯疯",
                rankNumber: 0,
                orgId: 45722
            },
            {
                pOrgId: 2679,
                orgName: "管理技术了",
                rankNumber: 0,
                orgId: 45896
            }
        ]
    };
    return returnResData(res);
};

export {
    getPaging,
    returnResData,
    GetAuthorizedInfosMockData,
    CommonDemoGetAuthorizedInfos,
    CommonDownloadCpyOrganization
};
