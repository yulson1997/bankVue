<!--
 * @Author: yinfu
 * @Date: 2020-10-28 15:36:10
 * @LastEditTime: 2021-01-15 09:09:53
 * @Description: 
-->
<template>
    <div class="page-formatToMoney">
        <!-- 格式校验 -->
        <div>
            <SnInputItem
                v-model="email"
                title="邮箱"
                placeholder="请输入邮箱"
                clear
                :maxlength="30"
            />
            <SnInputItem
                v-model="website"
                title="网址"
                placeholder="请输入网址"
                clear
                :maxlength="100"
            />
            <SnInputItem
                v-model="phoneNumber"
                title="手机号"
                placeholder="请输入手机号"
                clear
                :maxlength="11"
            />
            <div class="btn-content">
                <SnButton @click="submit" type="primary">确定</SnButton>
            </div>
        </div>
    </div>
</template>

<script>
import { PrintErrorLogFunction } from "utils/jsBridgeUtils.js";
import { SnInputItem, SnButton, SnToast } from "sinosun-ui";
import { throttle } from "utils/commonUtil";
import baseRouter from "@/baseView/baseRouter";

export default {
    extends: baseRouter,
    components: {
        SnInputItem,
        SnButton,
    },
    data() {
        return {
            email: "",
            website: "",
            phoneNumber: "",
        };
    },
    mounted() {},
    methods: {
        // 时间转换格式
        submit() {
            throttle(
                function () {
                    SnToast("日志打印成功");
                    PrintErrorLogFunction({
                        inputData: "errorlog",
                    }).then(function () {});
                }.bind(this)
            );
        },
    },
};
</script>
<style scoped lang="less">
.btn-content {
    padding: 1rem 0.3rem 0;
}
.number {
    padding: 0.24rem 0.3rem;
    background-color: #fff;
}
</style>