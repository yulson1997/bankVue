<!--
 * @Author: yinfu
 * @Date: 2020-10-16 20:36:15
 * @LastEditTime: 2020-10-16 21:03:24
 * @Description: 
-->
<template>
    <div>
        <img :src="srcImage" :alt="altImage" @error="defImg">
    </div>
</template>


<script>
export default {
    name: "SnImg",
    props: {
        srcImage: {
            type: String,
            default: "",
        },
        altImage: {
            type: String,
            default: "图片",
        },
    },
    data: function () {
        return {
            imgDefault:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAaVBMVEUAAAAj0fwj0fwj0fwj0fwj0fwj0fwj0fwj0fz///801vz4/v/X9//z/P9p4P0q0/yZ6v5V3P208P6n7v77/v/t+/+S6f6A5f1J2v3P9f7E8/5y4v1d3v091/zn+v/g+f+78f6L5/1B1/xFieyRAAAACHRSTlMA8oRTFPnQ00UYVGIAAAHoSURBVGje7drZbqswEIBhSEM644U9QNYm5/0f8iCXUsq4iQENUlT/l7n5EjzYUuSgbbt5j4ClaLfZBqa3EBgL34wBzLXKNgTmwm2wAfY2wQ7Yew8iYC8KYIU84pE+j3jEIx75I4hIlZSqEtDFgcQaTToGEwcSY59ROBChsU8LABakwkEpAAuihogCYEHkEJEAr4uQx/WyC09G+GVfRrZthW6Q5cIN8qSVcMPmI5lEPCTQx4GIK7YV0MeAJAc01dDFgRT4WXkGEwdS41f7f9DGgWQl9im6+Oc8Xo5c9jjoRowS8bQUSRT+qIIfNRoRZbYQyQcA3ZrEB1mrGcgdx+mGzjYqsQCJkfYhLD/zmMxGGo2WjtCV4nfFFIQ+cVoKphMOu89Ejnajm9mzJBMxA0nRXjezR/LhDOSEv3cVABmO2l8mI418gJjDpcZRSkxExBVpo2kqyNxNQ5IDPqkGgBuhJyHFQ6A/XA6EnoDUSLOtc6PGdOyMZBIdUollxGTzAKFHyPNy28t0vTghiULHKttZoBIXJEfnYgBBPrw5IHd0Tze275Q+RzROqLBNonyOpKW7sc8AcmJU0Pa6/614xCMe8YhHPELyiEc8MkIiYC9c43LMbpVrPqtcWFrj6tU6l8h4r8OFn9fh/gOfEUM6bRK/4AAAAABJRU5ErkJggg==",
        };
    },
    methods: {
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
</style>






