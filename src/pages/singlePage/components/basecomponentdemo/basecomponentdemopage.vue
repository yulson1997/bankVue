<template>
    <div class="page-baseComponentdemo" style="background:#f6f9fd">
        <div class="scroll-box">
            <SnList
                v-model="loading"
                class="refresh-area"
                :finished="finished"
                @load="onLoad"
            >
                <div v-if="acctInfoList.length > 0" class="bill-list">
                    <div v-for="(item, index) in acctInfoList" :key="index" class="bill-list-item" :class="index==acctInfoList.length-1?'bill-list-item-bottom':''">
                        <div class="list-item-header">
                            <div class="list-item-header-detail">
                                <div class="list-item-header-detail-title">账号</div>
                                <div class="list-item-header-detail-content">{{ item.acctRight }}</div>
                            </div>
                            <div class="list-item-header-detail">
                                <div class="list-item-header-detail-title">开户人名称</div>
                                <div class="list-item-header-detail-content">{{ item.acctName }}</div>
                            </div>
                            <div class="list-item-header-detail">
                                <div class="list-item-header-detail-title">企业名称</div>
                                <div class="list-item-header-detail-content">{{ item.aliasName }}</div>
                            </div>
                            <div class="list-item-header-detail">
                                <div class="list-item-header-detail-title">开户行</div>
                                <div class="list-item-header-detail-content">{{ item.deptAlias }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </SnList>
        </div>
    </div>
</template>

<script>
import { SnToast, SnList } from "sinosun-ui";
import SinglePageService from "@/service/singlePage.ts";
import { setStorage, getStorage, deleteStorage } from "utils/storageUtil.js";
import { mapMutations, mapGetters } from "vuex";
import baseRouter from "@/baseView/baseRouter";
export default {
    extends: baseRouter,
    components: {
        SnList,
    },
    data() {
        return {
            finished: false, //是否显示已经加载完成
            loading: true, //显示loading
            acctInfoList: [],
            totalNum: 0,
            page: {
                totalCount: 0,
            },
        };
    },
    computed: {
        ...mapGetters(["getAcctInfoList"]),
    },
    mounted() {
        this.onLoad();
    },
    methods: {
        ...mapMutations(["setAcctInfoList"]),

        onLoad() {
            let _this = this;
            SnToast("开始加载");
            if (
                _this.totalNum > 0 &&
                _this.totalNum === _this.page.totalCount
            ) {
                _this.finished = true; // 上拉加载更多停止工作
            } else {
                SinglePageService.queryData({
                    pageIndex: 10,
                    pageNumber: 5,
                }).then((res) => {
                    if (res.code === 0) {
                        let acctInfoListTemp = res.acctInfoList || [];
                        if (acctInfoListTemp.length > 0) {
                            _this.acctInfoList = _this.acctInfoList.concat(
                                acctInfoListTemp
                            );
                            _this.setAcctInfoList(
                                JSON.parse(JSON.stringify(_this.acctInfoList))
                            );
                            setStorage("acctInfoList", _this.acctInfoList);
                            console.log(
                                "storage存储数据===",
                                getStorage("acctInfoList")
                            );
                            console.log(
                                "VUEX存储数据===",
                                JSON.parse(
                                    JSON.stringify(_this.getAcctInfoList)
                                )
                            );
                            deleteStorage("acctInfoList");
                            _this.page.totalCount = Number(res.totalNum);
                            _this.totalNum = _this.acctInfoList.length;
                            _this.loading = false;
                        } else {
                            if (_this.acctInfoList.length == 0) {
                                _this.loading = false;
                            }
                        }
                        console.log("数据返回===", JSON.stringify(res));
                    } else {
                        if (_this.acctInfoList.length == 0) {
                            _this.loading = false;
                        }
                    }
                });
            }
        },
    },
};
</script>
<style scoped lang="less">
.scroll-box {
    height: 100%;
    overflow-y: scroll;
    .refresh-area {
        height: 100%;
    }
}

.bill-list {
    .bill-list-item {
        margin: 0.2rem 0.2rem 0;
        background-color: #ffffff;
        border-radius: 0.12rem;

        .list-item-header {
            padding: 0.3rem 0.3rem 0.1rem;

            .list-item-header-detail {
                font-size: 0.28rem;
                font-weight: 400;
                padding-bottom: 0.2rem;
                display: flex;
                align-items: center;

                .list-item-header-detail-title {
                    display: inline-block;
                    width: 1.4rem;
                    margin-right: 0.2rem;
                    color: #999999;
                }

                .list-item-header-detail-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex: 1;
                    word-wrap: break-word;
                    word-break: break-all;
                    overflow-wrap: break-word;
                    color: #333333;
                }
            }
        }
    }
}
</style>