<!--
 * @Author: caohui
 * @Date: 2020-12-08 16:44:26
 * @LastEditors: caohui
 * @LastEditTime: 2020-12-08 17:29:54
 * @Description: 
 * @FilePath: \bosspay\customSrc\app.vue
-->

<script>
import app from "@/home.vue";

export default {
    extends: app,
    created() {
        this.customFn();
    },
    methods: {
        a() {
            console.log("这里是可定制的部分");
        },
    },
};
</script>