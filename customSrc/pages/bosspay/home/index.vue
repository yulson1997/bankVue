<!--
 * @Author: caohui
 * @Date: 2020-12-08 16:44:26
 * @LastEditors: caohui
 * @LastEditTime: 2020-12-08 17:29:49
 * @Description: 
 * @FilePath: \bosspay\customSrc\pages\bosspay\home\index.vue
-->

<script>
import Add from "@/pages/annualLeave/components/add/index.vue";
export default {
    extends: Add,
    created() {
        this.customFn();
    },
    methods: {
        customFn() {
            console.log("这里是可定制的部分");
        },
    },
};
</script>