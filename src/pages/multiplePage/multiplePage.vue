<template>
    <div class="page-multiplePage">
        <!-- 金额补零 -->
        <div>
            <SnListItem 
                class="title"
                icon="star"
                title="formatToMoney：金额补两位小数00" 
                value="" 
                value-position="left"
                />
            <SnInputItem
                v-model="formatToMoneyInput"
                title="金额"
                placeholder="请输入金额"
                clear
                :maxlength="15"
            />
            <section v-show='formatToMoneyInput'>
                <SnListItem title="转换后金额格式" :value="transformatToMoneyInput(formatToMoneyInput)" />
            </section>
        </div>
           <!-- 金额转大写 -->
        <div>
            <SnListItem 
                class="title"
                icon="star"
                title="toUpperCase：金额转大写" 
                value="" 
                value-position="left"
                />
            <SnInputItem
                v-model="toUpperCaseInput"
                title="金额"
                placeholder="请输入金额"
                clear
                :maxlength="15"
            />
            <section v-show='toUpperCaseInput'>
                <SnListItem title="转换后金额格式" :value="transtoUpperCaseInput(toUpperCaseInput)" />
            </section>


        </div>
       <!-- 日期格式化 -->
        <div>
            <SnListItem 
                class="title"
                icon="star"
                title="dateFormat：日期格式转换" 
                value="" 
                value-position="left"
                />
            <SnInputItem
                v-model="dateFormatInput"
                title="日期"
                placeholder="请输入时间"
                clear
                :maxlength="15"
            />
            <SnRadioGroup v-model="timeMode" justify="around">
                    <SnRadio name="1">年</SnRadio>
                    <SnRadio name="2">年月</SnRadio>
                    <SnRadio name="3">年月日</SnRadio>
                    <SnRadio name="4">年月日时分</SnRadio>
                </SnRadioGroup>
            <section v-show='dateFormatInput'>
                <SnListItem title="时间转换后格式" :value="transdateFormatInput(dateFormatInput)" />
            </section>
        </div>
    </div>
</template>

<script>
import "./multiplePage.less";
import { SnInputItem, SnListItem, SnRadio, SnRadioGroup } from "sinosun-ui";
import { dateFormat } from "utils/dateFormat.js";
import { moneyFormat as formatToMoney, toUpperCase } from "utils/moneyUtils.js";

export default {
    el: "#app",
    components: {
        SnInputItem,
        SnListItem,
        SnRadio,
        SnRadioGroup,
    },
    data: function () {
        return {
            formatToMoneyInput: "",
            toUpperCaseInput: "",
            dateFormatInput: new Date().getTime(),
            timeMode: "",
            imgDefault:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAaVBMVEUAAAAj0fwj0fwj0fwj0fwj0fwj0fwj0fwj0fz///801vz4/v/X9//z/P9p4P0q0/yZ6v5V3P208P6n7v77/v/t+/+S6f6A5f1J2v3P9f7E8/5y4v1d3v091/zn+v/g+f+78f6L5/1B1/xFieyRAAAACHRSTlMA8oRTFPnQ00UYVGIAAAHoSURBVGje7drZbqswEIBhSEM644U9QNYm5/0f8iCXUsq4iQENUlT/l7n5EjzYUuSgbbt5j4ClaLfZBqa3EBgL34wBzLXKNgTmwm2wAfY2wQ7Yew8iYC8KYIU84pE+j3jEIx75I4hIlZSqEtDFgcQaTToGEwcSY59ROBChsU8LABakwkEpAAuihogCYEHkEJEAr4uQx/WyC09G+GVfRrZthW6Q5cIN8qSVcMPmI5lEPCTQx4GIK7YV0MeAJAc01dDFgRT4WXkGEwdS41f7f9DGgWQl9im6+Oc8Xo5c9jjoRowS8bQUSRT+qIIfNRoRZbYQyQcA3ZrEB1mrGcgdx+mGzjYqsQCJkfYhLD/zmMxGGo2WjtCV4nfFFIQ+cVoKphMOu89Ejnajm9mzJBMxA0nRXjezR/LhDOSEv3cVABmO2l8mI418gJjDpcZRSkxExBVpo2kqyNxNQ5IDPqkGgBuhJyHFQ6A/XA6EnoDUSLOtc6PGdOyMZBIdUollxGTzAKFHyPNy28t0vTghiULHKttZoBIXJEfnYgBBPrw5IHd0Tze275Q+RzROqLBNonyOpKW7sc8AcmJU0Pa6/614xCMe8YhHPELyiEc8MkIiYC9c43LMbpVrPqtcWFrj6tU6l8h4r8OFn9fh/gOfEUM6bRK/4AAAAABJRU5ErkJggg==",
        };
    },
    created: function () {},
    methods: {
        // 金额补零
        transformatToMoneyInput(value) {
            return formatToMoney(value);
        },

        // 金额转大写
        transtoUpperCaseInput(value) {
            return toUpperCase(value);
        },

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
        // 缺省图
        defImg() {
            let img = event.srcElement;
            img.src = this.imgDefault;
            img.onerror = null; //防止闪图
        },
    },
};
</script>

<style lang="less">
html {
    font-size: 10000/750vw;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
body {
    width: 100%;
}
</style>






