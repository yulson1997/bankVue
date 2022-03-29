<template>
    <div>
        <div class="out">
            <div class="up">
                <div>NO.{{userData.orderNumber}}</div>
            </div>
            <div class="mid">
                <SnListItem  title="账期" :label-number="5" :value=userData.orderData value-position="left" right-icon="user-add">
                    <span slot="right-icon" style="color: #262DD9;">明细对账单</span>
                </SnListItem>
                <SnListItem  title="账单生成日期" :label-number="5" :value=userData.createData value-position="left" :border='false'>
            
                </SnListItem>
            </div>
            <div class="down">
                <SnCollapse  v-model="list">
                    <SnCollapsePanel class="orderTitle" :name="index" title=2019年06月对账单>
                        <SnListItem  title="账号" :label-number="5" :value=userData.accountNumber value-position="left">
                        </SnListItem>
                        <SnListItem  title="账户名称" :label-number="5" :value=userData.accountName value-position="left">
                        </SnListItem>
                        <SnListItem  title="开户行" :label-number="5" :value=userData.openAccountBand value-position="left">
                        </SnListItem>
                        <SnListItem  title="余额日期" :label-number="5" :value=userData.balanceDate value-position="left">
                        </SnListItem>
                        <SnListItem  title="账户余额" :label-number="5" :value=userData.accountBalance value-position="left" value-style="color:#f49939">
                        </SnListItem>
                        <SnListItem  title="币种" :label-number="5" :value=userData.createData value-position="left">
                        </SnListItem>
                        <SnListItem  title="对账结果" :label-number="5" :value=userData.createData value-position="left">
                        </SnListItem>
                        <SnListItem  title="对账结果" :label-number="5"  value-position="left" :border='false'>
                            <SnRadioGroup v-model='radio2'>
                                <SnRadio name="1" shape='check'>相符</SnRadio>
                                <SnRadio name="1" shape='check'>不相符</SnRadio>
                            </SnRadioGroup>
                        </SnListItem>
                    </SnCollapsePanel>
                </SnCollapse>
                <div class="tipContainer">
                    <div class="tip">
                        <SnIcon type='clamation-circle'  class="img"/>
                        对账不符是指经过未达账项调节后余额仍不相符，若经过未账项调节后企业与银行余额一致，则应认定为对账相符。
                    </div>
                </div>
                <SnCollapse  v-model="list">
                    <SnListItem class="unknownDetail" :name="index1" title=不符明细 value='明细（0）' value-position="left" @click="goToUnknownDetail" :border='false'>
                     </SnListItem>
                </SnCollapse>
            </div>
            <div class="bottom">
                <div class="tellMate">
                    <SnListItem  title="提交给" :label-number="5" value="处理人（不选择则结束流程）" value-position="left" right-icon="user-add"/>
                    <SnListItem title="知会给" :label-number="5" value="只会人（可多选）" value-position="left" right-icon="user-add" :border='false' />
                </div>
                <div class="buttonContainer">
                    <SnButton inline type="primary" class="submit">提交</SnButton>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import {
    SnListItem,
    SnCollapse,
    SnCollapsePanel,
    SnIcon,
    SnButton,
    SnRadio,
    SnRadioGroup
}from 'sinosun-ui'
export default {
    components:{
        SnListItem,
        SnCollapse,
        SnCollapsePanel,
        SnIcon,
        SnButton,
        SnRadio,
        SnRadioGroup
    },
    data(){
        return {
            userData:{
                orderNumber:201802015,
                orderData:20181228,
                createData:20220222,
                accountNumber:6244123412341234,
                accountName:'深圳兆日科技有限公司',
                openAccountBand:'深圳分行营业部',
                balanceDate:'2020/06/30',
                accountBalance:12000,
                currencyType:'人民币',
                checkResulet:'相符 不相符'
                
            },
            list:[1],
            index:{
                type:Number,
                default:0
            },
            index1:{
                type:Number,
                default:1
            },
            radio2:'1',
        }
    },
    methods:{
        goToUnknownDetail(){
            this.$router.push({path:'/unknownDetail'})
        }
    }

}
</script>

<style lang="less" scoped>
.child-view{
    background: #f6f9fd;
}
.out{
    background: #f6f9fd;
    .up{
        font-size: .28rem;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #222222;
        line-height: .4rem;
        margin: .05rem 0 .03rem .3rem;
    }
    .down{
        margin-top: .22rem;
    }
    .down{
    .tipContainer{
        
        .tip{
            margin: .16rem .32rem .16rem .28rem ;
            font-size: .26rem;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: left;
            color: #a4acb2;
            line-height: .36rem;
            .img{
                position: relative;
                top: .025rem;
            }
        }
    }

    .unknownDetail{
    /deep/.sn-list-item-title{
        width: 1.76rem;
        flex:unset;
        }
    /deep/.sn-list-item-value{
        color: #262dd9;

        }

    }
    }
    .bottom{
        margin-top: .2rem;
        .buttonContainer{
            display: flex;
            justify-content: center;
            padding: .6rem .3rem .84rem .3rem;
            .submit{
                width: 6.9rem;
            }
        }
    /deep/.sn-list-item-value{
        color: #c2c2c2;
        }
    }
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

/deep/.sn-collapse-panel-content{
    padding: 0;
}


</style>