<!--
 * @Description: 基础路由页面
 * @FilePath: \attendance\src\baseView\baseApp.vue
-->
<!--
    所有page页面基础类，封装处理注册app的back、refresh事件
    设置页面的前进、回退动画
-->
<script>
import EventType from "./EventType";
import "sslib/setup";

const basePageConfig = {
    // Tile栏背景色颜色
    backgroundColor: `#ffffff`,
    // 主题色
    themeMode: `dark`,
    // Title栏透明度
    opacity: 1,
    // 图标文字透明度
    contentOpacity: 1,
    // 是否显示title栏
    showTitleBar: true,
    // 状态栏是否占位
    showStatusBar: true,
    // 标题栏是否悬浮内容区域之上
    suspend: false,
    // 右侧菜单
    showMenuAction: true,
};

export default {
    provide() {
        return {
            basePageConfig: basePageConfig,
        };
    },
    data() {
        return {
            transitionName: "slide-left",
        };
    },
    beforeCreate() {
        this.$options.methods.setDefaultTitleBar(this);
    },
    created() {
        this.registerBack();
        this.registerRefresh();
    },
    methods: {
        // 设置title定制
        setDefaultTitleBar(that) {
            let titleBarConfig = this.getRoutesMeta(that || this) || {};
            titleBarConfig = Object.assign({}, basePageConfig, titleBarConfig);
            window.TITLEBARCONFIG = titleBarConfig;
            BrowserApi.setTitleBarTheme(titleBarConfig);
        },
        // 根据hash获取当前路由route的mate配置
        getRoutesMeta(that) {
            let routerPath = window.location.hash.split(`#`)[1];
            let matchPath = `currentRouter_${routerPath}`;
            let routesList = that.$router.options.routes || [];
            let routerConfig = this.getRouterTitleConfig(routesList, matchPath);
            return routerConfig.titleBarConfig || {};
        },
        // 从页面router配置中获取当前页面的定制title信息
        getRouterTitleConfig(routesList, matchPath) {
            let routerConfig = {
                hasExit: false,
            };
            for (let i = 0; i < routesList.length; i++) {
                let item = routesList[i];
                item.path = item.path[0] === `/` ? item.path : `/${item.path}`;
                if (`currentRouter_${item.path}` === matchPath) {
                    routerConfig.titleBarConfig = (
                        item.meta || {}
                    ).titleBarConfig;
                    routerConfig.hasExit = true;
                    break;
                } else {
                    if (item.children) {
                        routerConfig = this.getRouterTitleConfig(
                            item.children,
                            matchPath
                        );
                        if (routerConfig.hasExit) {
                            break;
                        }
                    }
                }
            }
            return routerConfig;
        },
        /**
         * 注册APP回退事件
         */
        registerBack() {
            BrowserApi.registeAppBackEvent((data) => {
                this.$EventBus.$emit(
                    this.getEventName(EventType.NOTIFYAPPBACK, data)
                );
            });
        },

        /**
         * 注册APP刷新事件
         */
        registerRefresh() {
            //注册APP刷新事件
            BrowserApi.registPageRefreshEvent((data) => {
                this.$EventBus.$emit(
                    this.getEventName(EventType.REFRESHPAGE),
                    data
                );
            });
        },

        /**
         * 获取浏览器事件名称
         */
        getEventName(type) {
            const path = this.$route.path ? this.$route.path : "/";
            return `${this.$route.name}_${path}_${type}`;
        },
    },
    watch: {
        /**
         * 设置进入、回退页面动画
         */
        $route(val) {
            let isBack = this.$router.isBack;
            if (isBack) {
                this.transitionName = "slide-right";
            } else {
                if (val?.meta?.entry) {
                    this.transitionName = ``;
                } else {
                    this.transitionName = `slide-left`;
                }
            }
            this.$router.isBack = false;
        },
    },
};
</script>