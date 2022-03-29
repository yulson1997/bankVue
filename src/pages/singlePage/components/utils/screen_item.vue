<template>
  <div class="popup">
        <!-- 筛选1 -->
        <SnPopup v-model="screen" position="bottom">
            <SnWingBlank>
                <div class="bottom-box">
                  <div class="bottom-box-title">
                  
                    <div class="bottom-box-title-text">选择账户</div>
                    <div class="bottom-box-title-icon"><SnIcon type="close" class="close-icon" @click="screen=false"/></div>
                </div>
                <div class="bottom-box-list">
                 <!-- 选择账户 -->
                  <div v-if="list.account&&list.account.list">
                    <div class="bottom-box-list-title">账户</div>
                      <SnListItem 
                        :title="accountTitle.title" 
                        @click="showSubMore = true"
                        :label-number="20"
                        value="" 
                        value-position="left"
                        right-icon="right"
                        class="bottom-box-list-item"
                      />
                  </div>
                  
                <!-- 交易状态 -->
                <div v-if="list.transactionStatus&&list.transactionStatus.list">
                  <div class="bottom-box-list-title">交易状态</div>
                  <div class="bottom-box-list-transaction">
                      <SnButton inline @click="transactionStatusFun(item)" v-for="(item,index) in list.transactionStatus.list" :key="index" :class="item.id===transactionStatusTitle.id?'active':''">{{item.title}}</SnButton>
                  </div>
                </div>

                <!-- 存款类型 -->
                <div v-if="list.depositType&&list.depositType.list">
                  <div class="bottom-box-list-title">交易状态</div>
                  <div class="bottom-box-list-transaction">
                      <SnButton inline @click="depositTypeFun(item)" v-for="(item,index) in list.depositType.list" :key="index" :class="item.id===depositTypeTitle.id?'active':''">{{item.title}}</SnButton>
                  </div>
                </div>

                <!-- 交易类型 -->
                <div v-if="list.transactionType&&list.transactionType.list">
                  <div class="bottom-box-list-title">交易状态</div>
                  <div class="bottom-box-list-transaction">
                      <SnButton inline @click="transactionTypeFun(item)" v-for="(item,index) in list.transactionType.list" :key="index" :class="item.id===transactionTypeTitle.id?'active':''">{{item.title}}</SnButton>
                  </div>
                </div>

                <!-- 金额区间 -->
                <div v-if="list.amountRange">
                  <div class="bottom-box-list-title">金额区间</div>
                  <div class="bottom-box-list-input">
                    <div class="bottom-box-list-input-item">
                      <SnInputNumber 
                          v-model="maxMoney" 
                          placeholder="￥最低金额"
                          :maxlength="15"
                          class="title-content"
                          clear
                          decimal
                          unit="元"
                      />
                    </div>
                  <span>——</span>
                  <div class="bottom-box-list-input-item">
                      <SnInputNumber 
                          v-model="minMoney" 
                          placeholder="￥最高金额"
                          :maxlength="15"
                          class="title-content"
                          clear
                          decimal
                          unit="元"
                      />
                    </div>
                  </div>
                </div>
                </div>
              </div>
                <SnPopup v-model="showSubMore" position="right" :style="{ width: '100%' }">
                    <SnListItem v-for="(item,index) in list.account.list" :key="index" :title="item.title" @click="showSubMoreFn(item)"/>
                </SnPopup>
            </SnWingBlank>
            <div class="bottom-box-list-btn">
                    <SnButton @click="resetFn">重置</SnButton>
                    <SnButton @click="queryFn" type="info">查询</SnButton>
                  </div>
        </SnPopup>
 
  </div>
</template>

<script>
import baseRouter from "@/baseView/baseRouter";
import { SnPopup,SnListItem,SnIcon,SnButton,SnWingBlank,SnInputNumber } from "sinosun-ui";
export default {
  extends: baseRouter,
  components:{
    SnListItem,
    SnPopup,
    SnIcon,
    SnButton,
    SnWingBlank,
    SnInputNumber
  },
  props:['list'],
  data(){
    return {
      screen:false,
      showSubMore:false,
      maxMoney:'',
      minMoney:'',
      accountTitle:{},
      transactionStatusTitle:{},
      depositTypeTitle:{},
      transactionTypeTitle:{}
    }
  },
  created(){
    //选择账户
    if(this.list.account&&this.list.account.list){
      this.accountTitle=this.list.account.list[0]
    }
    //交易状态
    if(this.list.transactionStatus&&this.list.transactionStatus.list){
      this.transactionStatusTitle=this.list.transactionStatus.list[0]
    }
    //存款类型
    if(this.list.depositType&&this.list.depositType.list){
      this.depositTypeTitle=this.list.depositType.list[0]
    }
    //交易类型
    if(this.list.transactionType&&this.list.transactionType.list){
      this.transactionTypeTitle=this.list.transactionType.list[0]
    }
  },
  methods:{
    //交易状态点击按钮
    transactionStatusFun(item){
      this.transactionStatusTitle=item
    },
    //存款类型点击按钮
    depositTypeFun(item){
      this.depositTypeTitle=item
    },
    //交易类型点击按钮
    transactionTypeFun(item){
      this.transactionTypeTitle=item
    },
    //账户选择
    showSubMoreFn(item){
      this.accountTitle=item
      this.showSubMore=false
    },
    shwoscreenFn(){
      this.resetFn()
      this.screen=true
    },
    resetFn(){
      if(this.list.account&&this.list.account.list){
        this.accountTitle={
            title:this.list.account.list[0].title,
            id:this.list.account.list[0].id
        }
      }
      if(this.list.transactionStatus&&this.list.transactionStatus.list){
        this.transactionStatusTitle={
            title:this.list.transactionStatus.list[0].title,
            id:this.list.transactionStatus.list[0].id
        }
      }
      if(this.list.depositType&&this.list.depositType.list){
        this.depositTypeTitle={
            title:this.list.depositType.list[0].title,
            id:this.list.depositType.list[0].id
        }
      }
      if(this.list.transactionType&&this.list.transactionType.list){
        this.transactionTypeTitle={
            title:this.list.transactionType.list[0].title,
            id:this.list.transactionType.list[0].id
        }
      }
      if(this.list.amountRange){
        this.maxMoney=''
        this.minMoney=''
      }
    },
    queryFn(){
      let data={}
      data={
        accountData:this.accountTitle,
        transactionStatusData:this.transactionStatusTitle,
        depositTypeData:this.depositTypeTitle,
        transactionTypeData:this.transactionTypeTitle,
        maxMoney:this.maxMoney,
        minMoney:this.minMoney
      }
      this.screen=false
      this.$emit('callBack',data)
    },
  }
}
</script>

<style lang="less" scoped>
.bottom-box{
  overflow: hidden;
}
.bottom-box-title{
  width: 100%;
  height: 0.9rem;
  display: flex;
  position: relative;
}
.bottom-box-title .bottom-box-title-text{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom-box-title-icon{
  height: 100%;
  position: absolute;
  right: 0.1rem;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.close-icon{
  width: 0.3rem !important;
}
.bottom-box-list-title{
  height: 0.9rem;
  line-height: 0.9rem;
}
.bottom-box-list-cont{
  height: 5.2rem;
  overflow: auto;
}
.bottom-box-list-transaction{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}
.bottom-box-list-transaction .sn-button{
    width: 31%;
    height: 0.7rem;
    margin: 0.1rem 0;
}
.active{
    background: #777;
    color: #fff;
}
.bottom-box-list-btn{
  display: flex;
  margin-top: 0.2rem;
}
.bottom-box-list-btn>.sn-button.sn-button-default:after{
  border-radius: 0 !important;
}
.bottom-box-list-btn>button{
  border-radius: 0 !important;
}
.bottom-box-list-item{
  border: 1px solid #ccc;
  height: 0.5rem;
  line-height: 0;
}
.bottom-box-list-input{
  display: flex;
  justify-content: space-between;
}
.bottom-box-list-input-item{
  width: 40%;
  height: 0.6rem;
  display: flex;
  align-items: center;
  border: 1px solid #888 !important;
}
</style>