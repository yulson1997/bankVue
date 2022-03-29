<!--
 * @Autor: dingfeng
 * @Description: 
 * @Date: 2020-06-15 10:47:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-09 16:12:24
 * @FilePath: \bosspay\src\comp\404.vue
--> 
<template>
    <div class="page-404">
        <div>
            404
            <br />页面未找到
        </div>
    </div>
</template>

<script>
import baseRouter from "@/baseView/baseRouter";
export default {
    extends: baseRouter,
    methods: {
        // 回退
        onBack() {
            this.goBack();
        }
    }
}
</script>