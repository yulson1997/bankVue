<template>
	<div>
        <div class="out">
            <div class="billDetail">
                <SnCollapse  v-model="list">
                        <SnCollapsePanel class="orderTitle" :name="index" title=2019年06月对账单 >
                            <div class="down">
                                <div class="orderCode" >
                                    <div class="div1">对账单编码</div>
                                    <div class="div2">000123</div>
                                </div>
                                <div class="orderDate" >
                                    <div class="div1">对账单生成日期</div>
                                    <div class="div2">2020/06/11</div>
                                </div>
                                <div class="orderStatus" >
                                    <div class="div1">对账状态</div>
                                    <div class="div2">相符</div>
                                </div>
                                <div class="processStatus" >
                                    <div class="div1">处理状态</div>
                                    <div class="div2">对账成功</div>
                                </div>
                            </div>

                        </SnCollapsePanel>
                </SnCollapse>

            </div>
        </div>
	</div>
</template>

<script>
import {
        SnCollapse,
        SnCollapsePanel} from 'sinosun-ui'
export default {
    components:{
        // SnListItem,
        SnCollapse, 
        SnCollapsePanel
    },
    props:{
        index:{
            type:Number,
            default:0
        }
    },
	data() {
		return {
			year: 2019,
			month: 6,
            list:[1]
		};
	},
};
</script>

<style lang="less" scoped>
.out{
    background: #ffffff;
    border-radius: .2rem;
    box-shadow: 0rem 6rem 20rem 0rem rgba(101,112,242,0.12); 
    .billDetail{
        .title{
            font-size: .3rem;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 500;
            color: #333333;
        }
    /deep/.sn-list-item {
            padding: .3rem .3rem;
            font-size: .3rem;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 500;
            text-align: left;
            color: #333333;
            line-height: .3rem;
        }
        .orderTitle{
    /deep/  .sn-collapse-panel-content{
                padding: 0;
            }
    /deep/  .sn-list-item{
                border-radius: .2rem;
            }
            .orderCode{
                display: flex;
                margin: .18rem .3rem ;
                margin-top: 0;
                font-size: .3rem;
                font-family: PingFangSC, PingFangSC-Regular;
                font-weight: 400;
                text-align: left;
                color: #999999;
                line-height: .42rem;
                .div1{
                    width: 1.5rem;
                }
                .div2{
                    margin-left: .3rem;
                    font-size: .28rem;
                    font-family: PingFangSC, PingFangSC-Regular;
                    font-weight: 400;
                    text-align: left;
                    color: #333333;
                    line-height: .4rem;
                }
            }
            .orderDate{
                display: flex;
                margin: .18rem .3rem;
                font-size: .3rem;
                font-family: PingFangSC, PingFangSC-Regular;
                font-weight: 400;
                text-align: left;
                color: #999999;
                line-height: .42rem;
                .div1{
                    width: 1.5rem;
                }
                .div2{
                    margin-left: .3rem;
                    font-size: .28rem;
                    font-family: PingFangSC, PingFangSC-Regular;
                    font-weight: 400;
                    text-align: left;
                    color: #333333;
                    line-height: .4rem;
                }

            }
            .orderStatus{
                display: flex;
                margin: .18rem .3rem;
                font-size: .3rem;
                font-family: PingFangSC, PingFangSC-Regular;
                font-weight: 400;
                text-align: left;
                color: #999999;
                line-height: .42rem;
                .div1{
                    width: 1.5rem;
       
                }
                .div2{
                    margin-left: .3rem;
                    font-size: .28rem;
                    font-family: PingFangSC, PingFangSC-Regular;
                    font-weight: 400;
                    text-align: left;
                    color: #23cda7;
                    line-height: .4rem;
                }
            }
            .processStatus{
                display:flex;
                margin: .18rem .3rem;
                font-size: .3rem;
                font-family: PingFangSC, PingFangSC-Regular;
                font-weight: 400;
                text-align: left;
                color: #999999;
                line-height: .42rem;
                .div1{
                    width: 1.5rem;
                }
                .div2{
                    margin-left: .3rem;
                    font-size: .28rem;
                    font-family: PingFangSC, PingFangSC-Regular;
                    font-weight: 400;
                    text-align: left;
                    color: #333333;
                    line-height: .4rem;
                }
            }
     
                    }
    }
}

</style>
