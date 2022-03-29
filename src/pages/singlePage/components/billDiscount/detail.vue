<template>
  <div class="detailBox">
      <div v-if="detailList">
          <div class="box-title">
              <div class="ti-l">票号</div>
              <div class="ti-c">{{detailList.acctRight}}</div>
              <div class="ti-b"><SnIcon type="right" /></div>
          </div>
          <div class="box-content">
              <div class="cont-detail">
                  <div class="cont-detail-title">出票人日期</div>
                  <div class="cont-detail-content">{{detailList.time}}</div>
              </div>
               <div class="cont-detail">
                  <div class="cont-detail-title">票据状态</div>
                  <div class="cont-detail-content">提示承诺代签收</div>
              </div>
              <div class="cont-detail">
                  <div class="cont-detail-title">汇票到期日</div>
                  <div class="cont-detail-content">{{detailList.time}}</div>
              </div>
              <div class="cont-title">出票人</div>
              <div class="cont-detail">
                  <div class="cont-detail-title">全称</div>
                  <div class="cont-detail-content">xxxx公司</div>
              </div>
              <div class="cont-detail">
                  <div class="cont-detail-title">开户行</div>
                  <div class="cont-detail-content">鄂尔多斯股份有限公司东胜支行</div>
              </div>
              <div class="cont-title">收票人</div>
              <div class="cont-detail">
                  <div class="cont-detail-title">全称</div>
                  <div class="cont-detail-content">xxxx公司</div>
              </div>
              <div class="cont-detail">
                  <div class="cont-detail-title">开户行</div>
                  <div class="cont-detail-content">鄂尔多斯股份有限公司东胜支行</div>
              </div>
              <div class="cont-title">承兑人信息</div>
              <div class="cont-detail">
                  <div class="cont-detail-title">全称</div>
                  <div class="cont-detail-content">广东发展银行广州分行华泰支行</div>
              </div>
              <div class="cont-detail">
                  <div class="cont-detail-title">开户行</div>
                  <div class="cont-detail-content">鄂尔多斯股份有限公司东胜支行</div>
              </div>
              <div class="cont-detail margin-t">
                  <div class="cont-detail-title">票据金额</div>
                  <div class="cont-detail-content" style="color:#AB2029">{{ transformatToMoneyInput(detailList.money) }}</div>
              </div>
              <div class="cont-detail">
                  <div class="cont-detail-title">能否转让</div>
                  <div class="cont-detail-content">转让</div>
              </div>
          </div>
      </div>
      <div></div>
  </div>
</template>

<script>
import {SnIcon} from "sinosun-ui";
import baseRouter from "@/baseView/baseRouter";
import { moneyFormat as formatToMoney } from "utils/moneyUtils";
export default {
    extends: baseRouter,
    components: {
        SnIcon
    },
    data(){
        return {
            detailList:[]
        }
    },
    created(){
        console.log(this.$route)
        this.detailList=this.$route.query
    },
    methods:{
        // 金额格式化
        transformatToMoneyInput(value) {
            return formatToMoney(value);
        },
    }
}
</script>

<style scoped lang='less'>
.detailBox{
    background: #EBEBEB;
    position: relative;
}
.box-title{
    width: 100%;
    height: 0.92rem;
    background: #ffffff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0.3rem;
    margin-bottom: 0.1rem;
}
.ti-l{
    color: #999999;
}
.ti-c{
    color: #333333;
}
.ti-b{
    color: #999;
    font-size: 0.13rem;
}
.box-content{
    background: #fff;
    padding: 0.4rem 0.3rem 0.2rem 0.3rem;
}
.cont-detail{
    display: flex;
    align-items: center;
    padding: 0 0 0.3rem 0;
}
.cont-detail-title{
    width: 2.2rem;
    font-size: 0.3rem;
    color: #999;
    font-weight: 400;
}
.cont-detail-content{
    flex: 1;
    font-size: 0.3rem;
    color: #333;
    font-weight: 400;
}
.cont-title{
    font-size: 0.32rem;
    color: #333;
    padding: 0.2rem 0 0.3rem 0;
    font-weight: 600;
}
.margin-t{
    margin-top: 0.2rem;
}
</style>