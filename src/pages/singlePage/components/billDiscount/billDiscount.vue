<template>
    <div class="page-baseComponentdemo" style="background:#EBEBEB">
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
                            <div class="list-item-header-title">
                                <div class="list-item-header-detail-title-btn">
                                    <span :class="item.isflag?'btn_active':''">{{item.isflag?'银城':'商城'}}</span>
                                </div>
                                <div class="" style="flex:1" @click="detailFn(item)">{{ item.acctRight }}</div>
                                <div class="icon_d"><SnIcon type="right" /></div>
                            </div>
                            <div class="list-item-header-detail">
                                <div class="list-item-header-detail-title">金额</div>
                                <div class="list-item-header-detail-content detail-money">{{ transformatToMoneyInput(item.money) }}</div>
                            </div>
                            <div class="list-item-header-detail">
                                <div class="list-item-header-detail-title">开票人</div>
                                <div class="list-item-header-detail-content">{{ item.acctName }}</div>
                            </div>
                            <div class="list-item-header-detail">
                                <div class="list-item-header-detail-title">到期日</div>
                                <div class="list-item-header-detail-content">{{ item.time }}
                                    <div v-if="item.issubmit" class="submit-det">提交待审核</div>
                                    <div v-else>
                                        <SnCheckbox v-model="item.ischeck" @change="checkFn(item)"></SnCheckbox>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer" v-if="acctInfoList.length > 0">
                    <div class="footer_sum">
                        已选中（<span>{{sum}}</span>）
                    </div>
                    <div class="footer_btn" @click="discountFun">
                        贴现申请
                    </div>
                </div>
            </SnList>
        </div>
    </div>
</template>

<script>
import { SnToast, SnList, SnCheckbox ,SnIcon} from "sinosun-ui";
import SinglePageService from "@/service/singlePage.ts";
import { setStorage, getStorage, deleteStorage } from "utils/storageUtil.js";
import { mapMutations, mapGetters } from "vuex";
import baseRouter from "@/baseView/baseRouter";
import { moneyFormat as formatToMoney } from "utils/moneyUtils";
export default {
    extends: baseRouter,
    components: {
        SnList,
        SnCheckbox,
        SnIcon
    },
    data() {
        return {
            finished: false, //是否显示已经加载完成
            loading: true, //显示loading
            acctInfoList: [],
            checkbox1:false,
            totalNum: 0,
            sum:0,
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
                SinglePageService.billData({
                    pageIndex: 10,
                    pageNumber: 5,
                }).then((res) => {
                    if (res.code === 0) {
                        console.log(res)
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
                        let sum=0
                        _this.acctInfoList.forEach(item=>{
                            if(item.ischeck){
                                sum++
                            }
                        })
                        _this.sum=sum
                    } else {
                        if (_this.acctInfoList.length == 0) {
                            _this.loading = false;
                        }
                    }
                });
            }
            
        },
        //跳转详情
        detailFn(item){
            this.$router.push({path:'/billDiscount/detail', query:item})
            console.log(item)
        },
        // 金额格式化
        transformatToMoneyInput(value) {
            return formatToMoney(value);
        },
        checkFn(item){
            console.log(item)
            console.log(this.acctInfoList)
            let sum=0
            this.acctInfoList.forEach(item=>{
                if(item.ischeck){
                    sum++
                }
            })
            this.sum=sum
        },
        discountFun(){
            this.acctInfoList.forEach(item=>{
                if(item.ischeck){
                    item.issubmit=true
                    item.ischeck=false
                    this.sum=0
                }
            })
        }
    },
};
</script>
<style lang="less">
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
.sn-list-finished-text{
    margin-bottom:0.9rem;
}
.footer{
    width:100%;
    height:0.92rem;
    position:absolute;
    left:0;
    bottom:0;
    background:#AB2029;
    display:flex;
}
.footer_sum{
    flex:4;
    display:flex;
    justify-content:center;
    align-items: center;
    background: #fff;
    font-size: 0.32rem;
    color: #999999;
}
.footer_btn{
    flex:6;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size: 0.32rem;
    color: #fff;
}
.list-item-header-title{
    display: flex;
    border-bottom: 1px dotted #ccc;
    padding-bottom: 0.1rem;
    margin-bottom: 0.1rem;
    font-size: 0.28rem;
}
.list-item-header-detail-title-btn{
    width: 1.6rem;
}
.page-baseComponentdemo{
    position: relative;
}
.list-item-header-detail-title-btn span{
    width: 0.9rem;
    background: #FF8449;
    height: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.26rem;
    color: #fff;
    border-radius: 0.05rem;
}
.list-item-header-detail-title-btn .btn_active{
    background: #C84727;
}
.detail-money{
    color: #AB2029 !important;
}
.submit-det{
    color: #586AE4;
    font-size: 0.28rem;
}
.icon_d{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ccc;
}
</style>