<template>
  <div>
    <div class="outer">
        <div class="certificateContainer">
            <div class="certificate">
                <div class="detail">凭证详情</div>
                <div class="checkContainer">
                   <div class="check">银企对账</div>
                </div>
                <div class="statusContainer">
                    <div class="status">
                        <div>对账成功</div>
                        <div>银行处理中</div>
                        <div>银行已处理</div>
                        <div>银行已受理</div>
                    </div>                
                </div>
                <div class="Date">2020年06月对账单</div>
                <SnListItem title="对账单编码" value='000123' :border='false' value-position='left' :label-number='5' title-style='color: #999999;font-size:.3rem'></SnListItem>
                <SnListItem title="对账单生成日期" value='2020-07-01' :border='false' value-position='left' :label-number='5' title-style='color: #999999;font-size:.3rem'></SnListItem>
                <SnListItem title="对账结果" value='相符' :border='false' value-position='left' :label-number='5' title-style='color: #999999;font-size:.3rem'></SnListItem>
                
            </div>
        </div>
    </div>

    <div class="applyDetail">
        <combination></combination>
    </div>
  </div>
</template>

<script>
import {SnListItem} from 'sinosun-ui'
import combination from '@/pages/balance/components/MyComponents/combination.vue'
export default {
    components:{
        SnListItem,
        combination
    }

}
</script>

<style lang="less" scoped>
.outer{
    padding: .44rem .24rem .61rem .26rem;
    .certificateContainer{
        padding: .22rem .45rem .49rem .44rem;
        background: #ffffff;
        border-radius: .2rem;
        .certificate{
            .sn-list-item{
                padding: .15rem 0 0 0 ;
            }
            .detail{
                font-size: .3rem;
                font-weight:500;
                color: #222222;
            }
            .check{
              
            }
            .checkContainer{
                display: flex;
                justify-content: center;
                padding: .48rem 0 .2rem 0;
            }
            .statusContainer{
                padding: 0 .15rem .45rem .18rem;
                font-size:.28rem;
                border-bottom:  .01rem dashed #c2c2c2;
                .status{
                    display: flex;
                    justify-content: space-between;
                    :nth-child(1){
                        color:#23cda7
                    }
                    :nth-child(2){
                        color:#ffa501
                    }
                    :nth-child(3){
                        color:#999999
                    }
                    :nth-child(4){
                        color:#262dd9 ;
                    }
                }
            }
            .Date{
                margin-top: .32rem;
                font-size: .3rem;
                font-weight: 400;
            }
        }
    }
}

</style>