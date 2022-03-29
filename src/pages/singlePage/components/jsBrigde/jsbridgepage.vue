<!--
 * @Author: yinfu
 * @Date: 2020-10-28 15:36:10
 * @LastEditTime: 2021-01-11 10:59:53
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
import { SnInputItem, SnButton } from "sinosun-ui";
import { throttle } from "utils/commonUtil";
import baseRouter from "@/baseView/baseRouter";
import { showConfirm } from "utils/jsBridgeUtils.js";

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
    created() {},
    mounted() {},
    methods: {
        // 时间转换格式
        submit() {
            throttle(
                function () {
                    showConfirm(
                        "尊敬的客户，邮箱地址不能为空，请重新输入。",
                        null,
                        1,
                        "确认",
                        "",
                        ""
                    );
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