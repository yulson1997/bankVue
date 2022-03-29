/*
 * @Author: caohui
 * @Date: 2020-12-08 16:44:26
 * @LastEditors: caohui
 * @LastEditTime: 2020-12-08 17:28:04
 * @Description: 
 * @FilePath: \bosspay\src\utils\directive.js
 */

import Vue from 'vue';
/***************************VUE自定义函数 start********************************/

/**
 * 使用blob对象来生成图片的预览
 * @param el <img>标签dom
 * @param binding 绑定数据，使用value获取值
 */
Vue.directive('imgfid', function (el, binding) {
    var imgBlob = undefined;
    var blob = binding.value;
    if (blob != undefined && blob != "") {
        try {
            imgBlob = new Blob([blob], { type: 'image/png' });
        } catch (e) {
            window.BlobBuilder = window.BlobBuilder ||
                window.WebKitBlobBuilder ||
                window.MozBlobBuilder ||
                window.MSBlobBuilder;
            if (e.name == 'TypeError' && window.BlobBuilder) {
                var bb = new BlobBuilder();
                bb.append(blob)
                imgBlob = bb.getBlob("image/png");
            }
            else if (e.name == "InvalidStateError") {
                imgBlob = new Blob([blob], { type: "image/png" });
            }
        }
        var reader = new FileReader();
        reader.readAsDataURL(imgBlob);
        reader.onload = function () {
            el.setAttribute('src', this.result || defaultImgBlob);
        }
    }
});

/***************************VUE自定义函数 end********************************/