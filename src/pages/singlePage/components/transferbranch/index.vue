<!--
 * @Author: yinfu
 * @Date: 2020-10-30 10:57:33
 * @LastEditTime: 2021-01-11 16:44:53
 * @Description: 
-->
<template>
    <div class="page-transfer-branch">
        <div class="sn-popup-div">
            <SnListItem title="地址选择" right-icon="right">
                <SnPicker 
                    v-model="value3" 
                    :columns="cascadeColumn"
                    @confirm="onCascadeConfirm"
                    @change="onCascadeChange"
                />
            </SnListItem>
        </div>     
    </div>
</template>

<script>
import { SnListItem, SnPicker } from "sinosun-ui";
import baseRouter from "@/baseView/baseRouter";

import "./index.less";

export default {
    extends: baseRouter,
    components: {
        SnListItem,
        SnPicker,
    },
    data: function () {
        return {
            value3: "北京市",
            area: {
                北京市: ["朝阳区", "海淀区"],
                湖北省: ["武汉", "襄樊", "孝感", "黄石", "随州"],
            },
        };
    },
    computed: {
        cascadeColumn() {
            return [
                {
                    values: Object.keys(this.area),
                },
                {
                    values: this.area[Object.keys(this.area)[0]],
                },
            ];
        },
    },
    created() {},
    methods: {
        onCascadeConfirm(picker, value) {
            console.log("onConfirm === ", picker, value);
            this.value3 = value.join(" ");
        },
        onCascadeChange(picker, values) {
            console.log("onCascadeChange == ", picker, values);
            picker.setColumnValues(1, this.area[values[0]]);
        },
    },
};
</script>
<style lang="less" scoped>
</style>
