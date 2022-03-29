<!--
 * @Author: yinfu
 * @Date: 2020-10-28 15:36:10
 * @LastEditTime: 2021-01-08 15:47:12
 * @Description: 
-->
<template>
    <div class="page-formatToMoney">
        <!-- 日期格式化 -->
        <div>
            <div class="title-content">日期选择</div>
            <!-- <SnInputItem
                v-model="dateFormatInput"
                title="日期"
                placeholder="请输入时间"
                clear
                :maxlength="15"
            />
            <div class="radio-content">
                <SnRadioGroup v-model="timeMode" justify="around">
                        <SnRadio shape="check" name="1">年</SnRadio>
                        <SnRadio name="2">年月</SnRadio>
                        <SnRadio name="3">年月日</SnRadio>
                        <SnRadio name="4">年月日时分</SnRadio>
                    </SnRadioGroup>
            </div>
            <section v-show='dateFormatInput'>
                <SnListItem title="时间转换后格式" :value="transdateFormatInput(dateFormatInput)" />
            </section> -->
            <SnListItem title="选择年月">
                <SnDatetimePicker v-model="value3" mode="year-month" />
            </SnListItem>
            <SnListItem title="选择年份">
                <SnDatetimePicker v-model="value4" mode="year" />
            </SnListItem>
        </div>
    </div>
</template>

<script>
import { SnListItem,SnDatetimePicker } from "sinosun-ui";
import { dateFormat } from "utils/dateFormat.js";
import baseRouter from "@/baseView/baseRouter";

export default {
    extends: baseRouter,
    components: {
        SnListItem,
        SnDatetimePicker
    },
    data() {
        return {
            dateFormatInput: new Date().getTime(),
            timeMode: "",
            value3: [2019],
            value4: ["2019"],
        };
    },
    mounted() {
        this.setTitle("日期格式化");
    },
    methods: {
        // 时间转换格式
        transdateFormatInput(value) {
            const mode = {
                1: "YYYY",
                2: "YYYY-MM",
                3: "YYYY-MM-DD",
                4: "YYYY-MM-DD HH:mm",
            };
            if (mode[this.timeMode]) {
                return dateFormat(new Number(value), mode[this.timeMode]);
            } else {
                return dateFormat(new Number(value));
            }
        },
    },
};
</script>
<style scoped lang="less">
.radio-content,
.title-content {
    padding: 0.24rem 0.3rem;
    background-color: #fff;
}
</style>