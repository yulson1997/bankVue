<!-- 所有router页面基础类， 封装处理 back、refresh、setMenu等浏览器基本操作-->
<!-- 
    子类按需重写 @override 这些function：
    // 浏览器返回事件触发
    onBack()

    // 页面刷新事件处理
    onRefresh(refreshData)

    // 返回需要注册到浏览器上的菜单、按钮
    getMenuList()
 -->

<script>
import EventType from "./EventType";
import { throttle } from "@/utils/commonUtil";
export default {
    inject: [`basePageConfig`],
    created() {
        this.setTitleBar();
        //监听浏览器事件处理
        this.observeBrowserOption();
    },
    activated() {
        this.setTitleBar();
    },
    methods: {
        // 设置title定制
        setTitleBar() {
            let titleBarConfig = (this.$route.meta || {}).titleBarConfig || {};
            titleBarConfig = Object.assign(
                {},
                this.basePageConfig,
                titleBarConfig
            );
            // 设置是否有变化 
            if (
                JSON.stringify(window.TITLEBARCONFIG) ===
                JSON.stringify(titleBarConfig)
            ) {
                return;
            }
            window.TITLEBARCONFIG = titleBarConfig;
            BrowserApi.setTitleBarTheme(titleBarConfig);
        },
        /**
         * 监听浏览器事件处理
         * TODO 如果子类不需要注册这些事件，或者不在create生命周期regist，可以重写该function, 按需regist
         * @abstract
         */
        observeBrowserOption() {
            this.observeBackEvent();
            this.observeRefreshPageEvent();
            this.registerBrowserMenuList();
        },

        /**
         * 监听浏览器返回事件
         */
        observeBackEvent() {
            const name = this.getEventName(EventType.NOTIFYAPPBACK);
            // 先移除监听
            this.$EventBus.$off(name);
            // 监听回退事件
            this.$EventBus.$on(name, (data) => {
                throttle(() => {
                    this.onBack(data);
                }, this);
            });
        },

        /**
         * 监听页面刷新事件
         */
        observeRefreshPageEvent() {
            const name = this.getEventName(EventType.REFRESHPAGE);
            // 先移除监听
            this.$EventBus.$off(name);
            // 监听回退事件
            this.$EventBus.$on(name, (data) => {
                throttle(() => {
                    this.onRefresh(data);
                }, this);
            });
        },

        /**
         * 获取事件名称
         */
        getEventName(type) {
            const path = this.$route.path ? this.$route.path : "/";
            return `${this.$route.name}_${path}_${type}`;
        },

        /**
         * 子页面回退逻辑处理，子类可以实现该方法
         * @abstract
         */
        onBack() {
            this.routerBack();
        },
        /**
         * @description: 处理多页面进入非首页路由退出页面处理 并且页面内有路由跳转
         * @param {type}
         * @return boolean 是否执行回退
         */
        isRouterPageBack(exitPageName) {
            let exitRouterName = this.$route.name;
            if (exitPageName === exitRouterName) {
                return true;
            }
            return false;
        },
        /**
         * @description: 处理多页面进入非首页路由退出页面处理 页面不可跳转别的页面
         * @param {type}
         */
        isPageBack(exitPage) {
            if (exitPage && exitPage == 1) {
                return true;
            }
            return false;
        },
        /**
         * @param
         * url：目标页面的url, 为''时关闭当前页
         * backSteps：当前页面回退步数
         * loadData：传递给目标页面的数据
         */
        goBack(url = "", backSteps, loadData) { 
            BrowserApi.goBack(url, backSteps, loadData);
        },
        // 页面跳转 之前的公共处理 针对keepAlive
        beforeRouterChange() {
            this.$modal && this.$modal.close();
            // 当前页面活动元素
            if (document.activeElement) {
                let tagName = document.activeElement.tagName;
                if (tagName === `INPUT` || tagName === `TEXTAREA`) {
                    document.activeElement.blur &&
                        typeof document.activeElement.blur === `function` &&
                        document.activeElement.blur();
                }
            }
        },
        /**
         * 路由页面回退
         */
        routerBack() {
            this.$router.goBack();
        },
        /**
         * 子页面刷新逻辑处理，子类可以实现该方法
         * @abstract
         */
        onRefresh() {},
        /**
         * 设置页面title
         */
        setTitle(data) {
            let titleInfo = {};
            if (typeof data !== `object`) {
                titleInfo.title = data;
            } else {
                titleInfo = data;
            }
            BrowserApi.setTitle(titleInfo);
        },
        /**
         * 注册app菜单监听事件，子类没有重写 getMenuList() 方法的不额外加 menu 菜单项
         */
        registerBrowserMenuList() {
            BrowserApi.registerMenu(this.getMenuList());
        },

        /**
		 * 注册菜单
		 * MenuItem {
			 String name;  //  如果是菜单，用name显示菜单文字
			String iconNormalBase64;  // 如果是图标按钮，用来显示 正常图标（JS交互时，用base64转码，如果图片超过5k，提出来让UI重新切图）
			String iconPressedBase64; // 如果是图标按钮，用来显示 按下效果 图标（JS交互时，用base64转码，如果图片超过5k，提出来让UI重新切图）
			String menuId;  //必填   菜单ID （不区分是 图标按钮 或是 菜单项），列表中的menuId必须相互唯一
			Int type;  // 必填 类型 1 ActionBar上的图标按钮，2 下拉菜单项 3 title显示(设置title请使用BrowserApi.setTitle('title')接口)（一般情况下，只有一个图标按钮，可以有多个下拉菜单项）
			function func; // 菜单点击回调
			}
		注意
			name 和 iconNormalBase64 至少需要填写一个；
			name 和iconNormalBase64 都有值时ActionBar上的按钮优先显示name，下拉菜单项会左边显示图标，右边显示name；
				当有多个type 为1的item时，app会取第一个值；
				下拉菜单项显示顺序默认按menuList的顺序排序；

            example:
            [{name:'设置',menuId:'but_1_1',type: 1,func:function(){openPage('setting.html')}}];
        */
        getMenuList() {
            return [];
        },
        /////// --- end 浏览器基本操作方法，子类view应当按需重写 @override ///////////////////////////////////
    },
    watch: {
        /**
         * 设置进入、回退页面动画
         */
        $route() {
            this.beforeRouterChange();
        },
    },
};
</script>