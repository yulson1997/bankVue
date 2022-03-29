<template>
  <div class="popup">
        <!-- 筛选1 -->
        <SnListItem 
                    title="筛选1" 
                    @click="shwoscreenFn"
                    :label-number="20"
                    value="" 
                    value-position="left"
                    right-icon="right"
                />
        <ScreenItem ref="showFlag" :list='list1' @callBack='callback'></ScreenItem>

        <!-- 筛选2 -->
        <SnListItem 
                    title="筛选2" 
                    @click="shwoscreenFn2"
                    :label-number="20"
                    value="" 
                    value-position="left"
                    right-icon="right"
                />
        <ScreenItem ref="showFlag2" :list='list2' @callBack='callback2'></ScreenItem>
 
        <!-- 筛选3 -->
        <SnListItem 
                    title="筛选3" 
                    @click="shwoscreenFn3"
                    :label-number="20"
                    value="" 
                    value-position="left"
                    right-icon="right"
                />
        <ScreenItem ref="showFlag3" :list='list3' @callBack='callback3'></ScreenItem>
  </div>
</template>

<script>
import baseRouter from "@/baseView/baseRouter";
import ScreenItem from "./screen_item";
import { SnListItem } from "sinosun-ui";
export default {
  extends: baseRouter,
  components:{
    SnListItem,
    ScreenItem
  },
  data(){
    return {
      list1:{
        title:'筛选1',
        account:{
          list:[
            {
          title:'全部1',
          id:1
      },{
          title:'交易成功1',
          id:2
      },{
          title:'交易失败1',
          id:3
      },{
          title:'处理中1',
          id:4
      },{
          title:'待授权1',
          id:5
      },{
          title:'待银行审批1',
          id:6
      },{
          title:'预约待处理1',
          id:7
      }
          ]
        },
        transactionStatus:{
          list:[
            {
          title:'全部2',
          id:1
      },{
          title:'交易成功2',
          id:2
      },{
          title:'交易失败2',
          id:3
      },{
          title:'处理中2',
          id:4
      },{
          title:'待授权2',
          id:5
      },{
          title:'待银行审批2',
          id:6
      },{
          title:'预约待处理2',
          id:7
      }
          ]
        },
        amountRange:true
      },
      list2:{
        title:'筛选1',
        account:{
          list:[
            {
          title:'全部1',
          id:1
      },{
          title:'交易成功1',
          id:2
      },{
          title:'交易失败1',
          id:3
      },{
          title:'处理中1',
          id:4
      },{
          title:'待授权1',
          id:5
      },{
          title:'待银行审批1',
          id:6
      },{
          title:'预约待处理1',
          id:7
      }
          ]
        },
        transactionType:{
          list:[
            {
          title:'全部',
          id:1
      },{
          title:'存入',
          id:2
      },{
          title:'支取',
          id:3
          }]
        },
        amountRange:true
      },
      list3:{
        title:'筛选1',
        account:{
          list:[
            {
          title:'全部1',
          id:1
      },{
          title:'交易成功1',
          id:2
      },{
          title:'交易失败1',
          id:3
      },{
          title:'处理中1',
          id:4
      },{
          title:'待授权1',
          id:5
      },{
          title:'待银行审批1',
          id:6
      },{
          title:'预约待处理1',
          id:7
      }
          ]
        },
        depositType:{
          list:[
            {
          title:'全部',
          id:1
      },{
          title:'定期存款',
          id:2
      },{
          title:'通知存款',
          id:3
          },{
          title:'大额存款',
          id:4
      },{
          title:'协议存款',
          id:5
      },{
          title:'协定存款',
          id:6
          }]
        },
        transactionType:{
          list:[
            {
          title:'全部',
          id:1
      },{
          title:'存入',
          id:2
      },{
          title:'支取',
          id:3
          }]
        },
        amountRange:true
      }
    }
  },
  methods:{
    shwoscreenFn(){
      this.$refs.showFlag.shwoscreenFn()
    },
    shwoscreenFn2(){
      this.$refs.showFlag2.shwoscreenFn()
    },
    shwoscreenFn3(){
      this.$refs.showFlag3.shwoscreenFn()
    },
    callback(data){
      console.log(data)
    },
    callback2(data){
      console.log(data)
    },
    callback3(data){
      console.log(data)
    }
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