<!--
 * @Author: yinfu
 * @Date: 2020-10-28 15:36:10
 * @LastEditTime: 2021-01-08 15:49:02
 * @Description: 
-->
<template>
    <div class="page-formatToMoney">
        <!-- Excel解析 -->
        <div>
            <div class="title-content">Excel解析</div>
            <input type="file" 
                @change="importf" 
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
            <div v-if="accountList.length>0">
                <div class="bill-list">
                    <div v-for="(item, index) in accountList" :key="index" class="bill-list-item">
                        <div class="list-item-header">
                            <div class="list-item-header-detail">
                                <div class="list-item-header-detail-title">登录账号</div>
                                <div class="list-item-header-detail-content">{{ item.登陆账号 }}</div>
                            </div>
                            <div class="list-item-header-detail">
                                <div class="list-item-header-detail-title">姓名</div>
                                <div class="list-item-header-detail-content">{{ item.姓名 }}</div>
                            </div>
                            <div class="list-item-header-detail">
                                <div class="list-item-header-detail-title">部门</div>
                                <div class="list-item-header-detail-content">{{ item.部门 }}</div>
                            </div>
                            <div class="list-item-header-detail">
                                <div class="list-item-header-detail-title">二级部门</div>
                                <div class="list-item-header-detail-content">{{ item.二级部门 }}</div>
                            </div>
                            <div class="list-item-header-detail">
                                <div class="list-item-header-detail-title">状态</div>
                                <div class="list-item-header-detail-content">{{ item.状态 }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { SnInputItem, SnListItem } from "sinosun-ui";
import baseRouter from "@/baseView/baseRouter";
export default {
    extends: baseRouter,
    components: {},
    data() {
        return {
            accountList: [],
        };
    },
    created() {},
    mounted() {
        this.setTitle("excel解析");
        this.initFileReader();
    },
    methods: {
        //初始化initFileReader
        initFileReader() {
            let _this = this;
            FileReader.prototype.readAsBinaryString = function (f) {
                let binary = "";
                let wb; //读取完成的数据
                let reader = new FileReader();
                reader.onload = function () {
                    let bytes = new Uint8Array(reader.result);
                    let length = bytes.byteLength;
                    for (var i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    let XLSX = require("xlsx"); 
                    wb = XLSX.read(binary, {
                        type: "binary",
                    });
                    _this.accountList = XLSX.utils.sheet_to_json(
                        wb.Sheets[wb.SheetNames[0]]
                    );
                };
                reader.readAsArrayBuffer(f);
            };
        },
        //Excel解析
        importf(obj) {
            let file = obj.currentTarget.files[0];
            console.log("file", file);
            let reader = new FileReader();
            reader.readAsBinaryString(file);
        },
    },
};
</script>
<style scoped lang="less">
.title-content {
    padding: 0.24rem 0.3rem;
    background-color: #fff;
}
input {
    background-color: #fff;
    height: 0.92rem;
    padding: 0 0.3rem;
    padding-top: 0.1rem;
}
.bill-list {
    .bill-list-item {
        margin: 0.2rem 0.2rem 0;
        background-color: #ffffff;
        border-radius: 0.12rem;

        .list-item-header {
            padding: 0.3rem 0.3rem 0.1rem;

            .list-item-header-detail {
                font-size: 0.28rem;
                font-weight: 400;
                padding-bottom: 0.2rem;
                display: flex;
                align-items: center;

                .list-item-header-detail-title {
                    display: inline-block;
                    width: 1.4rem;
                    margin-right: 0.2rem;
                    color: #999999;
                }

                .list-item-header-detail-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex: 1;
                    word-wrap: break-word;
                    word-break: break-all;
                    overflow-wrap: break-word;
                    color: #333333;
                }
            }
        }
    }
}
</style>