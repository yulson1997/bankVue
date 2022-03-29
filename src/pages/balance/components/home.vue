<template>
    <div>
        <!-- <titleBar></titleBar> -->
        <div class="content">
            <SnTabs>
                <SnTab v-for='(item,index) in TabData' :key='index' :title="item">

                </SnTab>
            </SnTabs>
        </div>
        <div class="container">
            <div class="up">
                <div class='num'>共3笔</div>
                <div class="year">
                    <SnDatetimePicker v-model="defaultDate" mode="year" />
                    <div>年</div>
                    <SnIcon type="caret-down" />

                </div>
                
            </div>
            <div class="down" v-for="(item,index) in recycle" :key="index" @click="goCheckApply">
                <Bill :index="index"></Bill>
            </div>
        </div>
    </div>
</template>

<script>
// import titleBar from '@/pages/balance/components/MyComponents/titleBar.vue'
import Bill from '@/pages/balance/components/MyComponents/Bill.vue'
import {
    SnTabs,
    SnIcon,
    SnTab,
    SnDatetimePicker
} from 'sinosun-ui'

export default {
    components:{
        SnIcon,
        Bill,
        SnTabs,
        SnTab,
        SnDatetimePicker
    },
    data(){
        return {
            TabData:['待对账','已对账'],
            defaultDate:['2021'],
            recycle:['1','2','3'],
        }
    },
    methods:{
        goCheckApply(){
            this.$router.push({path:'/checkOrderApply'})

        }
    }
    

}
</script>

<style lang="less" scoped>
.container{
    width: 100%;
    height: 100%;
    background: #f8fafc;
    border-radius: .2rem .2rem 0rem 0rem;
    font-size:.28rem;
    font-weight: 500;
    color: #333333;
    line-height: .40rem;

    .up{
        display: flex;
        justify-content: space-between;
        .num{
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 500;
            margin: .3rem   
        }
        .year{
            display: flex;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 500;
            margin: .3rem;
        }
        svg{
        }
    }
    .down{
        margin: 0 .3rem .31rem .3rem
       }
}
</style>>
