<template>
  <div>
    <!-- 右侧弹窗 -->
    <div v-if="datas.type==='right'">
      <SnListItem 
                    :title="datas.title" 
                    @click="showRight = true"
                    :label-number="20"
                    value="" 
                    value-position="left"
                    right-icon="right"
                />
      <SnPopup v-model="showRight" position="right" :style="{ width: '100%'}">
        <SnListItem v-for="(item,index) in datas.list" :key="index" :title="item.title" @click="popupFun(item)" :label='item.label'/>
      </SnPopup>
    </div>
    
      <!-- 底部弹窗 -->
      <div v-if="datas.type==='bottom'">
        <SnListItem 
                    :title="datas.title" 
                    @click="showBottom2 = true"
                    :label-number="20"
                    value="" 
                    value-position="left"
                    right-icon="right"
                />
        <SnPopup 
            v-model="showBottom2" 
            position="bottom" 
        >
        <div class="bottom-box">
            <div class="bottom-box-title">
            <div class="bottom-box-title-text" v-if="datas.secondaryTitle">{{datas.secondaryTitle}}</div>
            <div class="bottom-box-title-icon"><SnIcon type="close" class="close-icon" @click="showBottom2=false"/></div>
          </div>
          <div class="bottom-box-list">
            <div class="bottom-box-list-title" v-if="datas.thirdLevelTitle">{{datas.thirdLevelTitle}}</div>
            <div class="bottom-box-list-cont">
              <SnListItem v-for="(item,index) in datas.list" :key="index" :title="item.title" @click="bottomFun(item)" :label='item.label'/>
            </div>
          </div>
        </div>
        </SnPopup>
      </div>
    
    <!-- 右侧弹窗,可删除  按钮 -->
    <div v-if="datas.type==='right-delete'">
      <SnListItem 
                    :title="datas.title" 
                    @click="showRight = true"
                    :label-number="20"
                    value="" 
                    value-position="left"
                    right-icon="right"
                />
      <SnPopup v-model="showRight" position="right" :style="{ width: '100%'}">
        <!-- <SnListItem v-for="(item,index) in datas.list" :key="index" :title="item.title" @click="popupFun(item)" :label='item.label'/> -->
        <SnSwipeAction v-for="(item,index) in datas.list" :key="index">
                <SnListItem :title="item.title" @click="popupFun(item)"/>
                <template #right>
                    <div class="btn-group">
                        <SnButton 
                            class="delete" 
                            type="danger" 
                            shape="square"
                            style="background-color: #FF4E3A;"
                            @click="onDeleteClick(item)"
                        >删除</SnButton>
                    </div>
                </template>
            </SnSwipeAction>
      </SnPopup>
    </div>
  </div>
</template>

<script>
import baseRouter from "@/baseView/baseRouter";
import { SnPopup,SnListItem,SnIcon ,SnSwipeAction,SnButton,SnToast} from "sinosun-ui";
export default {
  extends: baseRouter,
  components:{
    SnListItem,
    SnPopup,
    SnIcon,
    SnSwipeAction,
    SnButton,
  },
  props:['datas','callBack'],
  data(){
    return {
      showRight: false,
      showBottom2:false
    }
  },
  methods:{
    popupFun(item){
      this.showRight=false
      this.datas.title=item.title
      if(this.callBack){
        this.callBack(item)
      }
    },
    bottomFun(item){
      this.showBottom2=false
      this.datas.title=item.title
      if(this.callBack){
        this.callBack(item)
      }
    },
    onDeleteClick(item) {
      this.datas.list.forEach((i,index)=>{
        if(i.id===item.id){
          this.datas.list.splice(index,1)
        }
      })
      SnToast('删除成功');
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
  padding-left: 0.33rem ;
}
.bottom-box-list-cont{
  height: 5.5rem;
  overflow: auto;
}
.btn-group .delete,
.btn-group{
  height: 99%;
}
</style>