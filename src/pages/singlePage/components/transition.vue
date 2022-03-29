<!--
 * @Author: caohui
 * @Date: 2020-12-15 16:57:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-08 17:26:51
 * @Description: 
 * @FilePath: \wealthmarket\src\pages\wealth\components\transition.vue
-->
<template>
    <div class="sn-main-con">
        <transition :name="transitionName">
            <keep-alive>
                <router-view
                    v-if="$route.meta.keepAlive"
                    class="child-view"
                ></router-view>
            </keep-alive>
        </transition>
        <transition :name="transitionName">
            <router-view
                v-if="!$route.meta.keepAlive"
                class="child-view"
            ></router-view>
        </transition>
    </div>
</template>
<script>
export default {
    data() {
        return {
            transitionName: "slide-left",
        };
    },
    beforeRouteUpdate(to, from, next) {
        let isBack = this.$router.isBack;
        if (isBack) {
            this.transitionName = "slide-right";
        } else {
            this.transitionName = "slide-left";
        }
        console.log("this.transitionName: ============", this.transitionName);
        this.$router.isBack = false;
        next();
    },
    mounted() {},
};
</script>
<style scoped lang="less">
/* 可以设置不同的进入和离开动画 */
.child-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    // overflow: hidden;
    transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
}

.slide-left-enter,
.slide-right-leave-active {
    opacity: 0;
    transform: translate(50%, 0);
}
.slide-right-enter {
    display: none;
}
.slide-left-leave-active,
.slide-right-enter {
    opacity: 0;
    transform: translate(-50%, 0);
}
</style>