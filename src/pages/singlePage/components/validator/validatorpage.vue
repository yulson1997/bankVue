<!--
 * @Author: yinfu
 * @Date: 2020-10-28 15:36:10
 * @LastEditTime: 2021-01-14 17:20:36
 * @Description: 
-->
<template>
    <div class="page-validator">
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
            <!-- 图片缺省图 -->
            <div class="sn-img">
                <SnImg src="123" alt="失败"/>
            </div>
            <div class="btn-content">
                <SnButton @click="submit" type="primary">确定</SnButton>
            </div>
        </div>
    </div>
</template>

<script>
import { SnInputItem, SnButton, SnToast } from "sinosun-ui";
import baseRouter from "@/baseView/baseRouter";
import CommonValidator from "utils/validator/CommonValidator";
import { throttle } from "utils/commonUtil";

import SnImg from "sscomp/baseComponents/SnImg/SnImg.vue";

export default {
    extends: baseRouter,
    components: {
        SnInputItem,
        SnButton,
        SnImg,
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
            let _this = this;
            throttle(
                function () {
                    if (!CommonValidator.checkEmail(_this.email)) {
                        SnToast("邮箱地址格式不正确");
                        return;
                    }
                    if (!CommonValidator.checkWebsite(_this.website)) {
                        SnToast("网址格式不正确");
                        return;
                    }
                    if (!CommonValidator.checkCellPhone(_this.phoneNumber)) {
                        SnToast("手机号格式不正确");
                        return;
                    }
                    SnToast("校验成功");
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
.sn-img {
    text-align: center;
    margin: 0.5rem 0;
}
</style>