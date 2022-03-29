<!--
 * @Author: yinfu
 * @Date: 2020-10-28 15:36:10
 * @LastEditTime: 2021-01-08 15:52:04
 * @Description: 
-->
<template>
    <div class="page-formatToMoney">
        <!-- 金额转大写 -->
        <div>
            <div class="title-content">金额缴费</div>
                <SnInputNumber 
                v-model="toUpperCaseInput" 
                placeholder="请输入金额"
                :integer-figures="15"
                class="title-content"
                clear
                decimal
                unit="元"
            />
            <section v-show='toUpperCaseInput'>
                <SnListItem :value="transtoUpperCaseInput(toUpperCaseInput)" />
            </section>
        </div>
        <div>
            <div class="title-content">金额缴费（只允许输入整数，控制到七位）</div>
                <SnInputNumber 
                v-model="toUpperCaseInput2" 
                placeholder="请输入金额"
                :integer-figures="7"
                class="title-content"
                clear
            />
            <section v-show='toUpperCaseInput2'>
                <SnListItem :value="transtoUpperCaseInput(toUpperCaseInput2)" />
            </section>
        </div>
        <div>
            <div class="title-content">金额缴费(加￥)</div>
            <div class="flex">
                <p>￥</p>
                <SnInputNumber 
                v-model="toUpperCaseInput3" 
                placeholder="请输入金额"
                :integer-figures="15"
                class="title-content"
                clear
                decimal
                unit="元"
            />
            </div>
            <section v-show='toUpperCaseInput3'>
                <SnListItem :value="transtoUpperCaseInput(toUpperCaseInput3)" />
            </section>
        </div>
    </div>
</template>

<script>
import { SnInputNumber, SnListItem } from "sinosun-ui";
import { toUpperCase } from "utils/aa.js";
import baseRouter from "@/baseView/baseRouter";

export default {
    extends: baseRouter,
    components: {
        SnListItem,
        SnInputNumber,
    },
    data() {
        return {
            toUpperCaseInput: "",
            toUpperCaseInput2: "",
            toUpperCaseInput3: "",
        };
    },
    mounted() {
        this.setTitle("金额转大写");
    },
    methods: {
        // 金额转大写
        transtoUpperCaseInput(value) {
            return toUpperCase(value);
        },
    },
};
</script>
<style scoped lang="less">
.flex{
    display: flex;
    align-items: center;
    background: #fff;
}
.flex p{
    width: 0.5rem;
    display: flex;
    justify-content: center;
}
.sn-list-item-value{
    text-align: left;
}
.title-content {
    padding: 0.24rem 0.3rem;
    background-color: #fff;
}
</style>