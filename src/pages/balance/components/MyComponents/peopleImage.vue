<template>
  <div>
      <div class="outer">
            <div class="topContainer">
                <div class="top">
                    <div class="approvalImage"></div>
                    <div class="rightContainer">
                        <div class="right">
                            <div class="right_L">
                                <div>{{userData.name}}</div>
                                <div class="softDepartment">{{userData.department}}</div>
                            </div>
                            <div class="right_R">
                                No.{{userData.employeeNumber}}
                            </div>
                        </div>   
                    </div>
 
                </div>
            </div>
            <div class="mid">
                <div class="container">
                    <SnListItem  title="账期" :label-number="5" :value=userData.orderData value-position="left" right-icon="user-add" :border='false'>
                        <span slot="right-icon" style="color: #262DD9;">明细对账单</span>
                    </SnListItem>
                    <SnListItem  title="账单生成日期" :label-number="5" :value=userData.createData value-position="left">
                    </SnListItem>
                </div>
                <div class="listContainer">
                    <SnCollapse  v-model="list">
                        <SnCollapsePanel class="orderTitle" :name="index" title=账号1 value-style="font-size:.3rem;font-weight: 500;">
                            <SnListItem  title="账号" :label-number="5" value=62244123412341234 value-position="left" :border='false'>
                            </SnListItem>
                            <SnListItem  title="账户名称" :label-number="5" value=深圳某某某有限责任公司 value-position="left" :border='false'>
                            </SnListItem>
                            <SnListItem  title="开户行" :label-number="5" value=深圳分行营业部 value-position="left" :border='false'>
                            </SnListItem>
                            <SnListItem  title="余额日期" :label-number="5" value=20200630 value-position="left" :border='false'>
                            </SnListItem>
                            <SnListItem  title="账户余额" :label-number="5" value=12000 value-position="left" :border='false'>
                            </SnListItem>
                            <SnListItem  title="币种" :label-number="5" value=人民币 value-position="left" :border='false'>
                            </SnListItem>
                            <SnListItem  title="对账结果" :label-number="5" value=相符 value-position="left" :border='false'>
                            </SnListItem>

                            <SnCollapse v-model="list1" class="notSameCheck">
                                <SnCollapsePanel class="checkResult" :name="index" title=对账结果 value=不相符 value-position='left' title-style="font-size:.3rem;font-weight: 500;">
                                    <div class="moveContainer">
                                        <div class="backgroundColor">
                                            <SnListItem title="不相符明细" :border='false' title-style="font-size:.28rem;font-weight:500 ;background-0:'#f6f9fd' ">
                                            </SnListItem>
                                            <SnListItem  title="账号" :label-number="5" value='6222 1245 1356 1233' value-position="left" :border='false' title-style="font-size:.28rem;font-weight: 00;color: #999999;" value-style="font-size:.28rem;font-weight: 00;color: #333333;">
                                            </SnListItem>
                                            <SnListItem  title="发生日期" :label-number="5" value='2020/09/10' value-position="left" :border='false' title-style="font-size:.28rem;font-weight: 00;color: #999999;" value-style="font-size:.28rem;font-weight: 00;color: #333333;">
                                            </SnListItem>
                                            <SnListItem  title="凭证号" :label-number="5" value='14252563' value-position="left" :border='false' title-style="font-size:.28rem;font-weight: 00;color: #999999;" value-style="font-size:.28rem;font-weight: 00;color: #333333;">
                                            </SnListItem> 
                                            <SnListItem  title="项目类型" :label-number="5" value='你行账无以下款项' value-position="left" :border='false' title-style="font-size:.28rem;font-weight: 00;color: #999999;" value-style="font-size:.28rem;font-weight: 00;color: #333333;">
                                            </SnListItem>
                                            <SnListItem  title="借方" :label-number="5" value='232123.00元' value-position="left" :border='false' title-style="font-size:.28rem;font-weight: 00;color: #999999;" value-style="font-size:.28rem;font-weight: 00;color: #333333;">
                                            </SnListItem>
                                            <SnListItem  title="贷方" :label-number="5" value='--' value-position="left" :border='false' title-style="font-size:.28rem;font-weight: 00;color: #999999;" value-style="font-size:.28rem;font-weight: 00;color: #333333;">
                                            </SnListItem>
                                        </div>
                                    </div>                                                                                                                               
                                </SnCollapsePanel>
                            </SnCollapse>
                        </SnCollapsePanel>
                    </SnCollapse>
                </div>
                <div class="buttonContainer">
                    <div class="detailButton">
                    <SnButton inline  shape='round' size='small'>展开详情</SnButton>
                    </div>
                </div>
            </div>
            <div class="down">
            </div>
      </div>
  </div>
</template>

<script>
import {SnListItem,
        SnCollapse,
        SnCollapsePanel,
        SnButton} from 'sinosun-ui'

export default {
    components:{
        SnListItem,
        SnCollapse,
        SnCollapsePanel,
        SnButton,
    },
    data(){
        return {
            userData:{
                name:'李思思',
                department:'软件部',
                employeeNumber:'020349',
                orderData:'20210622',
                createData:20120211
            },
            index:{
                type:Number,
                default:0
            },
            list:[1],
            list1:[1],
            RecycleList:[1,2]

        }
    }
}
</script>

<style lang="less" scoped>
/deep/.sn-collapse-panel-content{
    padding: 0;
    }
/deep/.sn-list-item{
        padding: 0;
    }
/deep/.sn-list-item-title{
    font-weight: 500;
}
/deep/.sn-list-item-title.sn-list-item-label-number-5{
        font-size: .32rem;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #666666;
        line-height: .44rem;
}
/deep/.sn-list-item-value.sn-list-item-value-position-left{
        font-size: .32rem;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #222222;
        line-height: .44rem;
}

.outer{
    border-radius: .2rem;
    background: #ffffff;
    box-shadow: 0 .06rem .2rem 0 rgba(101,112,242,0.12); 
    .topContainer{
        padding: .3rem .44rem 0  .42rem ;
        .top{
            display: flex;
            padding-bottom: .25rem;
            border-bottom: 0.01rem dashed #c2c2c2;
            .approvalImage{
                height: 1.14rem;
                width: 1.14rem;
                background-color: rgb(214, 78, 78);
                margin-right: .27rem;
            }
            .rightContainer{
                padding-top: .2rem ;
                flex:1;
                .right{
                    display: flex;
                    flex: 1;
                    justify-content: space-between;
                    .right_L{
                        font-size: .36rem;
                        font-weight: 500;
                        color: #333333;
                        .softDepartment{
                            margin-top: .14rem;
                            font-size: .26rem;
                            font-weight: 400;
                            color: #666666;
                        }
                    }
                    .right_R{
                        padding-top: .08rem;
                        font-size: .24rem;
                        font-weight: 400;
                        color: #999999;
                    }
                }
            }

         }
    }
    .mid{
        background-color:#ffffff;
        .listContainer{
            .orderTitle{
                padding: 0 .44rem .29rem .44rem;
                .sn-list-item{
                    padding: .2rem 0 0 0;
                }
            }
        }

        .container{
            padding: .31rem .44rem .31rem .44rem;
            .sn-list-item{
                padding: 0 0 .2rem 0;
            }
        }

        .buttonContainer{
            .detailButton{
                display: flex;
                justify-content: center;
                padding: .3rem 0 .3rem 0;
            }
        }
        .checkResult{
            /deep/.sn-list-item-title{
                
                width: 1.76rem;
                flex:unset;
        }
        /deep/.sn-list-item{
            padding: .2rem 0 0 0
        }
        .moveContainer{
            padding: .2rem .3rem;
            .backgroundColor{
                background-color: #1b58a8;
            }
    }

        }
    }
    .down{
        margin-top: .5rem;
    }
}   
</style>