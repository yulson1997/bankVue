<template>
  <div>
    <div class="container">
        <div class="accountList" v-for="(item,index) in userData" :key="index">
            <SnCollapse  v-model="list">
                <SnCollapsePanel class="orderTitle" :name="index" title="不相符明细">

                    <div slot="value" class="orderTitle-value">
                        <!-- <span>不相符明细</span> -->
                        <SnIcon type="minus-circle" class="minus-circle" />
                    </div>
                  
                    <SnListItem  title="账号" :label-number="5" :value=item.accountNumber value-position="left">
                    </SnListItem>
                    <SnListItem  title="发生日期" :label-number="5" :value=item.accountName value-position="left">
                    </SnListItem>
                    <SnInputItem  title="凭证号" :label-number="5" placeholder="请输入填写凭证号吗(可选填)" value-position="left">
                    </SnInputItem>
                    <SnListItem  title="项目类型" :label-number="5" :value=item.balanceDate value-position="left">
                        <SnRadioGroup v-model="item.radio1">
                            <SnRadio class="itemClass1" slot="default" shape="check" name="1" @click="item.radio1='1'">我单位账无以下款项</SnRadio>
                            <SnRadio class="itemClass2" slot="default" shape="check" name="2" @click="item.radio1='2'">你行账无以下款项</SnRadio>
                        </SnRadioGroup>
                    </SnListItem>
                    <SnListItem  title="借方金额" :label-number="5" :value=item.createData value-position="left">
                    </SnListItem>
                    <SnInputItem  title="贷方金额" :label-number="5" placeholder="请填写贷方金额" value-position="left" :border='false'>
                    </SnInputItem>
                </SnCollapsePanel>
            </SnCollapse>     
        </div>
        <div class="addDetail" @click="addUnknownDetail">
            <div class="buttonContainer">
                <SnButton @click="handleClick">
                    <SnIcon type="plus" class="plus"></SnIcon>增加明细
                </SnButton>  
            </div>  
        </div>
        <div class="cancleConfirm">
            <SnButton class="cancle">取消</SnButton>
            <SnButton type="primary" class="confirm" @click="goToCheckApplyDetail">确定</SnButton>    
        </div>         
    </div>
  </div>
</template>

<script>
import {
    SnListItem,
    SnCollapse,
    SnCollapsePanel,
    SnInputItem,
    SnButton,
    SnRadioGroup,
    SnRadio,
    SnIcon
}from 'sinosun-ui'
export default {
    components:{
        SnListItem,
        SnCollapse,
        SnCollapsePanel,
        SnInputItem,
        SnButton,
        SnRadioGroup,
        SnRadio,
        SnIcon
    },
    methods:{
        addUnknownDetail(){
            this.userData.push(JSON.parse(JSON.stringify(this.userData[0])))
        },
        goToCheckApplyDetail(){
            this.$router.push({path:'/CheckApplyDetail'})
        }
    },
    data(){
        return {
            userData:[{
                orderNumber:201802015,
                orderData:20181228,
                createData:20220222,
                accountNumber:6244123412341234,
                accountName:'深圳兆日科技有限公司',
                openAccountBand:'深圳分行营业部',
                balanceDate:'2020/06/30',
                accountBalance:12000,
                currencyType:'人民币',
                checkResulet:'相符 不相符',
                radio1:'1'
            }],
            list:[1],
            index:{
                type:Number,
                default:0
        },
            index1:{
                type:Number,
                default:1
            },
            recycleItem:[1],
            radio1:'1',

        }
    },
}
</script>

<style lang="less" scoped>
/deep/.sn-collapse-panel-content{
     padding: 0;
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
.child-view{
    background:#f6f9fd;
}
.container{
    background:#f6f9fd;
    .accountList{
        margin-top:.2rem;
        .orderTitle{
            // &-value{
            //     text-align: left;
            //     display: flex;
            //     justify-content: space-between;
            // }
            .orderTitle-value{
                .minus-circle{
                    position: relative;
                    top: 0.04rem;
                    right: .02rem;
                    color: red;
                }
            }
            .itemClass1{
                margin-bottom: .2rem;
            }
        }
    }
    .addDetail{
        padding:  .3rem 2.26rem .6rem 2.28rem;
        display: flex;
        justify-content: center;
        .buttonContainer{
            .sn-button{
                width:2.96rem;
                height:.64rem
            }

        }
        .handleClick{
            display: flex;
            justify-content: center;
        }
        .plus{
            position: relative;
            top: .04rem;
            margin-right: .06rem;
            font-size: .3rem
        }
    }
    .cancleConfirm{
        display: flex;
        margin-bottom: .6rem;
        .cancle{
            padding: .22rem 1.33rem .22rem 1.33rem;
            margin-left:.3rem ;
            width: 3.3rem;
            height: .88rem;
            background: white;
        }
        .confirm{
            padding: .22rem 1.33rem .22rem 1.33rem;
            margin-left:.3rem ;
            width: 3.3rem;
            height: .88rem;

        }
    }
}
</style>