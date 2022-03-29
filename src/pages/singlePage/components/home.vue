<template>
    <div class="page-list-item">
        <div v-for="(item, index) in sectionList" :key="index">
            <div class="section">{{item.titleName}}</div>
            <section>
                <SnListItem
                    v-for="(item1,index1) in item.value" :key="index1"
                    :title="item1.title"
                    @click="handleClick(item1.path)"
                    :label-number="20"
                    value
                    value-position="left"
                    right-icon="right"
                />
            </section>
        </div>
    </div>
</template>
<script>
import { SnListItem } from "sinosun-ui";
import baseRouter from "@/baseView/baseRouter";
export default {
    extends: baseRouter,
    components: {
        SnListItem,
    },
    data() {
        return {
            sectionList: [
                {
                    titleName: "工具类",
                    value: [
                        {
                            title: "金额转大写",
                            path: "toUpperCase",
                        },
                        {
                            title: "日期",
                            path: "dateFormat",
                        },
                        {
                            title: "弹窗",
                            path: "popup",
                        },
                        {
                            title: "筛选",
                            path: "screen",
                        },
                        {
                            title: "收款银行",
                            path: "collection",
                        },
                    ],
                },
                {
                    titleName: "jsBridge类",
                    value: [
                        {
                            title: "设置title栏颜色",
                            path: "jsbridgepage",
                        },
                        {
                            title: "日志打印",
                            path: "printerrorlog",
                        },
                    ],
                },
                {
                    titleName: "校验类",
                    value: [
                        {
                            title: "格式校验/图片加载",
                            path: "validatorpage",
                        },
                    ],
                },
                {
                    titleName: "基础组件",
                    value: [
                        { 
                            title: "滚动加载",
                            path: "basecomponentdemopage",
                        },
                    ],
                },
                {
                    titleName: "业务组件",
                    value: [
                        {
                            title: "excel解析",
                            path: "exceltojson",
                        },
                        {
                            title: "省市联动",
                            path: "transferbranch",
                        },
                    ],
                },
            ], 
            str:
                "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",
        };
    },
    created() {
        this.a()
    },
    mounted() {
        console.log(this);
        // this.setTitle("示例页面");
    },
    methods: {
        a(){
            console.log(1)
        },
        onBack() {
            localStorage.clear();
            this.goBack();
        },
        getMenuList() {
            return [
                {
                    iconNormalBase64: this.str,
                    iconPressedBase64: this.str,
                    menuId: "but_1_0",
                    type: 1,
                    func: () => {
                        BrowserApi.openPage("paymentTest.html");
                    },
                },
                { type: 4, name: "false" },
            ];
        },
        handleClick(path) {
            this.$router.push({ path });
        },
    },
};
</script>
<style scoped lang="less">
.section {
    padding: 0.3rem 0.15rem;
    color: #999;
    font-size: 0.28rem;
}
.sn-main-con {
    background: #f6f9fd;
}
</style>