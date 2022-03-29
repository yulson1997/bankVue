<template>
    <div class="box">
       <SnPopup v-model="collFlag" position="right" :style="{ width: '100%'}">
           <SnCollapse v-model="collapse1">
                <SnCollapsePanel :name="index+''" :title="item.title" class="a" v-for="(item,index) in dataList" :key="index">
                    <div class="colllist-item" v-for="(it,ind) in item.list" :key="ind">
                        <div class="colllist-item-img"><img src="../../../../../assets/img/noInfo.png" alt=""></div>
                        <div class="colllist-item-name">
                            <span>{{it.name}}</span>
                            <div>{{it.label}}</div>
                        </div>
                    </div>
                </SnCollapsePanel>
            </SnCollapse>
      </SnPopup>
    </div>
</template>

<script>
import baseRouter from "@/baseView/baseRouter";
import {SnPopup,SnCollapsePanel,SnCollapse } from "sinosun-ui";
export default {
    extends: baseRouter,
    components: {
        SnPopup,
        SnCollapse,
        SnCollapsePanel,
    },
    props:['dataList'],
    data() {
        return {
            collFlag:false,
            collapse1:[]
        };
    },
    created(){
        this.dataList.forEach((item,index)=>{
            let num=index+''
            this.collapse1.push(num)
        })
        console.log(this.collapse1)
    },
    methods: {
        collResetFn(){
            this.collFlag=true
        },
        getData(){

        }
    },
};
</script>
<style lang="less">
.colllist-item{
    width: 100%;
    height: 1.2rem;
    border-bottom: 1px solid #eee;
    padding: 0 0.33rem;
    display: flex;
    align-items: center;
}
.sn-collapse-panel-content{
    padding: 0;
}
.colllist-item-img{
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 50%;
    overflow: hidden;
}
.colllist-item-img img{
    width: 100%;
    height: 100%;
}
.colllist-item-name{
    padding-left: 0.1rem;
    line-height: 1.6;
}
</style>