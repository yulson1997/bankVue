<!--
 * @Author: yinfu
 * @Date: 2020-10-28 15:36:10
 * @LastEditTime: 2021-01-08 15:57:15
 * @Description: 
-->
<template>
    <div class="page-formatToMoney">
        <!-- 金额格式化 -->
        <div>
            <div class="title-content">formatToMoney：金额格式化</div>
            <SnInputNumber
                v-model="formatToMoneyInput"
                title="金额"
                class="money"
                placeholder="请输入金额"
                decimal
                :maxlength="15"
            />
            <section v-show='formatToMoneyInput'>
                <SnListItem title="转换后金额格式" :value="transformatToMoneyInput(formatToMoneyInput)" />
            </section>
        </div>
    </div>
</template>

<script>
import { SnInputNumber, SnListItem } from "sinosun-ui";
import { moneyFormat as formatToMoney } from "utils/moneyUtils";
import baseRouter from "@/baseView/baseRouter";

export default {
    extends: baseRouter,
    components: {
        SnListItem,
        SnInputNumber,
    },
    data() {
        return {
            formatToMoneyInput: "",
        };
    },
    mounted() {
        this.setTitle("金额格式化");
    },
    methods: {
        // 金额格式化
        transformatToMoneyInput(value) {
            return formatToMoney(value);
        },
    },
};
</script>
<style scoped lang="less">
.title-content,
.money {
    padding: 0.24rem 0.3rem;
    background-color: #fff;
}
</style>