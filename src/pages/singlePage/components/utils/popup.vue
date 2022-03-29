<template>
  <div class="popup">
    <!-- 选择用户名 -->
  <PopulItem :datas='userData' :callBack='callBack1'></PopulItem>
  <!-- 选择账户 -->
  <PopulItem :datas='accountData' :callBack='callBack2'></PopulItem>
  <!-- 选择交易类型 -->
  <PopulItem :datas='transactionData' :callBack='callBack3'></PopulItem>
  <!-- 选择付款账户 -->
  <PopulItem :datas='paymentAccountData' :callBack='callBack4'></PopulItem>
  <!-- 选择账号 -->
  <PopulItem :datas='accountNumberData' :callBack='callBack5'></PopulItem>
  <!-- 单选-弹窗 -->
  <PopulItem :datas='singleChoiceData' :callBack='callBack6'></PopulItem>
  <!-- 选择用途 -->
  <PopulItem :datas='purposeData'></PopulItem>
      
  </div>
</template>

<script>
import baseRouter from "@/baseView/baseRouter";
import PopulItem from './popul_item'
export default {
  extends: baseRouter,
  components:{
    PopulItem
  },
  data(){
    return {
      userData:{
        type:'right',
        title:'请选择户名',
        list:[{
          title:'粉色方法色粉',
          id:1
        },
        {
          title:'台风天割舍的',
          id:2
        },{
          title:'孤独探戈哥发',
          id:3
        },
        {
          title:'违反合同法刚导入',
          id:4
        },
        {
          title:'北京易诚互动网络技术有限公司',
          id:5
        }]
      },
      accountData:{
        type:'bottom',
        secondaryTitle:'选择账户',
        thirdLevelTitle:'全部',
        title:'请选择账户',
        list:[{
          title:'发顺丰大润发',
          id:1,
          label:'阿瓦达瓦大多哇风'
        },
        {
          title:'退还给大润发',
          id:2,
          label:'d粉色的万粉色的万瓦打我'
        },{
          title:'海富通工时费',
          id:3,
          label:'发顺丰大唐歌飞啊'
        },
        {
          title:'世纪难题复工后反弹股份',
          id:4,
          label:'大锅饭方式如果符合非色散'
        },
        {
          title:'反弹好多人发我的',
          id:5,
          label:"打完饭单人份大武当"
        },]
      },
      transactionData:{
         type:'right',
        title:'请选择交易类型',
        list:[
          {
            title:'全部',
            id:1
          },
          {
            title:'行内转账-收入',
            id:2
          },
          {
            title:'行内转账-支出',
            id:3
          }
        ]
      },
      paymentAccountData:{
        type:'right',
        title:'请选择付款账户',
        list:[{
          title:'发顺丰大润发',
          id:1,
          label:'阿瓦达瓦大多哇风'
        },
        {
          title:'退还给大润发',
          id:2,
          label:'d粉色的万粉色的万瓦打我'
        },{
          title:'海富通工时费',
          id:3,
          label:'发顺丰大唐歌飞啊'
        },
        {
          title:'世纪难题复工后反弹股份',
          id:4,
          label:'大锅饭方式如果符合非色散'
        },
        {
          title:'反弹好多人发我的',
          id:5,
          label:"打完饭单人份大武当"
        }]
      },
      accountNumberData:{
        type:'right',
        title:'请选择账号',
        list:[{
          title:'8785 7798 7777 7777 654',
          id:1
        },
        {
          title:'8785 7798 7777 7777 654',
          id:2
        },{
          title:'8785 7798 7777 7777 654',
          id:3
        },
        {
          title:'8785 7798 7777 7777 654',
          id:4
        },
        {
          title:'8785 7798 7777 7777 654',
          id:5
        }]
      },
      singleChoiceData:{
        type:'bottom',
        title:'单选_弹窗',
        secondaryTitle:'Title',
        list:[{
          title:'title',
          id:1
        },
        {
          title:'title',
          id:2
        },{
          title:'title',
          id:3
        },
        {
          title:'title',
          id:4
        },
        {
          title:'title',
          id:5
        },
        {
          title:'title',
          id:2
        }]
      },
      purposeData:{
        type:'right-delete',
        title:'请选择用途',
        list:[{
          title:'粉色方法色粉',
          id:1
        },
        {
          title:'台风天割舍的',
          id:2
        },{
          title:'孤独探戈哥发',
          id:3
        },
        {
          title:'违反合同法刚导入',
          id:4
        },
        {
          title:'北京易诚互动网络技术有限公司',
          id:5
        }]
      },
    }
  },
    methods:{
      callBack1(item){
        console.log(item)
      },
      callBack2(item){
        console.log(item)
      },
      callBack3(item){
        console.log(item)
      },
      callBack4(item){
        console.log(item)
      },
      callBack5(item){
        console.log(item)
      },
      callBack6(item){
        console.log(item)
      }
  }
}
</script>

<style lang="less" scoped>
</style>