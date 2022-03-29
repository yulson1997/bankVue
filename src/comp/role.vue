<template>
    <div class="sn-comp-role">
        <SnListItem
            :title="`选择${subTitleName}`"
            class="role-item-con"
            :right-icon="loading?'loading':'right'"
            :label-number="labelNumber"
            required
            value="请选择角色"
            value-position="left"
            :border-indent="borderIndent"
            @click="selectShowControl"
        >
            <div v-if="selectedValue !== ''" class="value-names-con">
                <span>{{selectedValue}}</span>
            </div>
        </SnListItem>
        <div class="sn-comp-role-popup" v-transfer-dom>
            <SnPopup v-model="popupShowFlag" position="right" :style="{ width: '100%'}">
                <div class="check-all-content" v-if="showCheckAll">
                    <SnListItem
                        class="check-list-item"
                        :title="`${curValue}`"
                        @click="checkAllHandle()"
                    >
                        <div
                            slot="right-icon"
                            class="check-icon-con"
                            :class="{'selected':isCheckAllItem}"
                        >
                            <SnIcon :type="isCheckAllItem?'radio-check':'radio-empty'" />
                        </div>
                    </SnListItem>
                </div>
                <div class="check-list-content">
                    <SnListItem
                        class="check-list-item"
                        v-for="(temp,index) in dataList"
                        :key="index"
                        :title="`${temp.value}`"
                        @click="checkHandle(temp)"
                    >
                        <div
                            slot="right-icon"
                            class="check-icon-con"
                            :class="{'selected':checklist.includes(temp.key)}"
                        >
                            <SnIcon
                                :type="checklist.includes(temp.key)?'radio-check':'radio-empty'"
                            />
                        </div>
                    </SnListItem>
                </div>
                <div class="btn-group">
                    <div class="select-number">
                        <span>已选择（{{checklist.length}}）个{{subTitleName}}</span>
                    </div>
                    <SnButton class="sure-btn" type="primary" shape="square" @click="choosedList">确定</SnButton>
                </div>
            </SnPopup>
        </div>
    </div>
</template>

<script>
import QuickPaymentService from "@/service/QuickPayment";
import { setStorage, getStorage } from "@/utils/commonUtil";
import {
    SnToast,
    SnListItem,
    SnPopup,
    SnButton,
    TransferDom,
    SnIcon,
} from "sinosun-ui";
export default {
    directives: {
        TransferDom,
    },
    components: {
        SnListItem,
        SnPopup,
        SnButton,
        SnIcon,
    },
    props: {
        // 下划线缩进
        borderIndent: {
            type: Boolean,
            default: false,
        },
        // label长度
        labelNumber: {
            type: Number,
            default: 5,
        },
        // 是否显示全选
        showCheckAll: {
            type: Boolean,
            default: true,
        },
        subTitleName: {
            //title
            type: String,
            default: "角色",
        },
        subTitle: {
            type: String,
            default() {
                return ``;
            },
        },
        typeKey: {
            type: String,
            default: "roleList",
        },
        value: {
            type: Array,
        },
        placeholder: {
            //控件提示
            type: String,
            default: "",
        },
        noTips: {
            //为空提示信息
            type: String,
            default: "数据为空",
        },
        maxNumber: {
            type: Number,
            default: 10000000,
        },
    },
    inject: [`setTitle`],
    data() {
        return {
            selectedValue: "",
            loading: true,
            delayShow: 0, //等待键盘收起再弹出下拉框
            checklist: [],
            dataList: [],
            roleList: [],
            brforeChoosedList: [],
            popName: `sn-comp-role`,
            curValue: `全选`,
        };
    },
    computed: {
        popupShowFlag: {
            get() {
                if (this.$store) {
                    return this.$store.getters.isShowPage(this.popName);
                }
                return false;
            },
            set(val) {
                return val;
            },
        },
        isCheckAllItem() {
            return this.checklist.length === this.dataList.length;
        },
    },
    created() {
        this.loading = true;
        //获取用户信息，调用初始化接口
        NativeSupportApi.getCurrentUserInfo().then((Data) => {
            if (Data) {
                this.userInfo = Data;
                this.initResultData();
            }
        });
    },
    methods: {
        // 获取角色列表
        initResultData() {
            let params = {
                bizMateId: this.userInfo.UAId,
                orgId: this.userInfo.cpyId,
                targetOrgId: this.userInfo.cpyId,
            };
            QuickPaymentService.GetRoleSetsList(params)
                .then((result) => {
                    this.loading = false;
                    var roleSetsListBefore = result.roleWithRoleGroupList;
                    var len = roleSetsListBefore.length;
                    this.roleList = [];
                    for (var i = 0; i < len; i++) {
                        let roleItem = roleSetsListBefore[i];
                        let roleInfoItem = roleItem.roleInfoEntity;
                        this.roleList.push({
                            key: roleInfoItem.roleId || ``,
                            value: roleInfoItem.roleName || ``,
                        });
                    }
                    setStorage("roleList", JSON.stringify(this.roleList));
                    this.dataList = this[this.typeKey];
                    this.$emit(`role-data-complate`);
                })
                .catch((err) => {
                    console.log(
                        `QuickPaymentService.GetRoleSetsList @@Error ------->`,
                        err
                    );
                });
        },
        checkHandle(item) {
            let index = this.checklist.indexOf(item.key);
            if (index === -1) {
                this.checklist.push(item.key);
            } else {
                this.checklist.splice(index, 1);
            }
        },
        checkAllHandle() {
            this.curValue = `全选`;
            this.checklist = this.isCheckAllItem
                ? []
                : this.dataList.map((item) => item.key);
        },
        choosedList() {
            this.setShowValue();
            this.brforeChoosedList = this.checklist;
            this.closePage();
            setTimeout(() => {
                this.$emit("input", this.checklist); //控件返回值
                this.setTitle(this.subTitle); //设置title及按钮
            }, 300);
        },
        /**
         * 下拉框显示隐藏控制
         */
        selectShowControl() {
            if (this.loading) {
                SnToast(`数据正在加载中...`);
                return;
            }
            this.brforeChoosedList = this.value;
            this.checklist = this.value;
            if (0 < this.dataList.length) {
                //等待键盘收起再弹出下拉 框
                setTimeout(() => {
                    this.showPage();
                    this.delayShow = 0;
                }, this.delayShow);
                this.setTitle("选择" + this.subTitleName);
            } else {
                SnToast(this.noTips);
            }
        },
        // 打开选择控制
        showPage() {
            this.$store.dispatch("showPage", {
                pageName: this.popName,
                fromPageTitle: this.subTitle,
            });
        },
        // 关闭选择控制
        closePage() {
            this.$store.dispatch("closePage");
        },
        //显示选择的内容
        setShowValue() {
            var nameArr = [];
            var allDataList = this.dataList;
            if (this.checklist.length >= 0) {
                this.checklist.forEach((checkItem) => {
                    allDataList.forEach((item) => {
                        if (checkItem == item.key) {
                            nameArr.push(item.value);
                        }
                    });
                });
                this.selectedValue = nameArr.join(","); //给控件赋值默认值  控件显示值
            }
        },
    },
    watch: {
        /**
         * 数据显示 主要针对删除使用
         * @param {Object} newVal
         * @param {Object} oldVal
         */
        value(newVal) {
            var nameArr = [];
            let allDataList = [];
            let newArray = JSON.parse(JSON.stringify(newVal));

            if (this.dataList.length) {
                allDataList = this.dataList;
            } else {
                allDataList = [...JSON.parse(getStorage("roleList"))];
            }

            if (newArray.length > 0) {
                newArray.forEach((checkItem) => {
                    allDataList.forEach((item) => {
                        if (checkItem == item.key) {
                            nameArr.push(item.value);
                        }
                    });
                });
                this.selectedValue = nameArr.join(","); //给控件赋值默认值  控件显示值
            } else {
                this.selectedValue = "";
            }
            this.checklist = newVal;
        },
    },
};
</script>
<style lang="less">
.sn-comp-role {
    .role-item-con {
        &:after {
            display: block;
        }
        .sn-list-item-value {
            color: @text-color-5;
            .value-names-con {
                color: @text-color;
            }
        }
    }
}
</style>
<style lang="less" scoped>
.sn-comp-role-popup {
    .check-all-content {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 0.8rem;
        box-shadow: 0 0.02rem 0.02rem rgba(0, 0, 0, 0.1);
        z-index: 10;
        .sn-list-item {
            height: 100%;
        }
    }
    .check-list-content {
        height: 100vh;
        padding-top: 0.8rem;
        padding-bottom: 0.88rem;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .check-all-content,
    .check-list-content {
        .sn-list-item {
            padding-top: 0.2rem;
            padding-bottom: 0.2rem;
            .sn-list-item-title {
                display: flex;
                align-items: center;
            }
            .check-icon-con {
                display: flex;
                align-items: center;
                color: @text-color-5;
                &.selected {
                    color: @theme-color;
                }
            }
            .sn-icon {
                font-size: 0.48rem;
            }
        }
    }
    .btn-group {
        display: flex;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 10;
        width: 100%;
        height: 0.88rem;
        overflow: hidden;
        background: @color-pc-bg;
        .select-number {
            .bt1px();
            flex: 6;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .sure-btn {
            flex: 4;
        }
    }
    .sn-list-item-title {
        width: calc(100% - 0.6rem);
        padding-right: 0.3rem;
        span {
            width: 100%;
            word-wrap: break-word;
        }
    }
    @media screen and (min-width: @screen-sm) {
        .check-all-item {
            .check-all-item-value {
                .check-all-icon-con {
                    margin-right: 0.1rem;
                    .sn-icon {
                        font-size: 0.46rem;
                    }
                }
            }
        }
    }
}
</style>