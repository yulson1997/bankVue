<template>
  <div class="titleBarContainer">
      <div class="waitting" >待对账</div>
      <div class="done">已对账</div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      waittingSelected:false,
      doneSeletcetd:false
    }
  }

}
</script>

<style lang="less">
.titleBarContainer{
  height: 0.88rem;
  display: flex;
  justify-content:space-evenly;
  .waitting{
    width: 1.02rem;
    font-size: .34rem;
    font-weight: 500;
    margin: .24rem 0;
  }
  .done{
    width:1.02rem;
    font-size: .34rem;
    font-weight: 500;
    margin: .24rem 0;
    
  }
}
</style>