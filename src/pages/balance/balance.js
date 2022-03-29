import Vue from "vue";
import router from './router';
import App from '@/App.vue';
// import store from './store/store.js'

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        BrowserApi.setTitle({ title: to.meta.title });
    }
    next();
})

const EventBus = new Vue();
// 混合全局控制 进行后退按钮控制 内部路由的事件监听必须放在created之后
Vue.mixin({
    created() {
        this.$EventBus = EventBus;
    }
});

new Vue({
    // store,
    router,
    render: h => h(App)
}).$mount("#app");