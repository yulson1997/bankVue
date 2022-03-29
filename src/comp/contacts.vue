<template>
    <div class="sn-comp-contacts">
        <SnListItem
            :title="title"
            :label-number="labelNumber"
            required
            @click="addUser"
            :class="['contacts-item',{'show-border':listItemBorder}]"
            :value="placeholder"
            value-position="left"
            :border-indent="false"
            :right-icon="rightIcon"
        >
            <div class="value-names-con" v-if="selectedUserNames.length > 0">
                <span>{{ formatStrLen(selectedUserNames)}}</span>
            </div>
        </SnListItem>
        <div v-if="selectedUserArr.length > 0" class="user-list">
            <div
                class="user-item"
                v-for="(item,index) in selectedUserArr"
                :key="index"
                v-show="index < currentLimitLen"
            >
                <div class="item-con">
                    <span class="user-com" :title="item.uName" @click="delUser(item)">
                        <SnAvatar class :uaid="item.UAId"></SnAvatar>
                        <span class="user-name">{{item.uName}}</span>
                    </span>
                    <em class="icon-con" @click="delUser(item)">
                        <SnIcon type="minus-circle-fill" />
                    </em>
                </div>
            </div>
        </div>
        <div
            v-if="selectedUserArr.length > limitSelectLength"
            class="load-more"
            @click="toggleLoadMore"
        >
            <span class="load-more-con">
                <span>{{loadMoreText}}</span>
                <SnIcon :type="isShowAll?'double-up':'double-down'" />
            </span>
        </div>
    </div>
</template>
<script>
import { isPC } from "@/utils/commonUtil";
import { SnListItem, SnIcon } from "sinosun-ui";
import SnAvatar from "@/comp/SnAvatar/SnAvatar";
export default {
    components: {
        SnListItem,
        SnIcon,
        SnAvatar,
    },
    props: {
        // 默认显示多少个人员
        limitSelectLength: {
            type: Number,
            default: 10,
        },
        // label长度
        labelNumber: {
            type: Number,
            default: 5,
        },
        // 是否是全选 3表示全部
        queryType: {
            type: Number,
            default: 1,
        },
        // 选择模式
        selectType: {
            type: String,
            default: `check`,
        },
        // 选中值
        value: {
            type: Array,
            default() {
                return [];
            },
        },
        title: {
            type: String,
            default: `选择人员`,
        },
        rightIcon: {
            type: String,
            default: `right`,
        },
        // 提示语
        placeholder: {
            type: String,
            default: `请选择人员`,
        },
        showPersonList: {
            type: Boolean,
            default: false,
        },
        listItemBorder: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            userInfo: {},
            selectedUserId: [],
            selectedUserNames: [],
            selectedUserArr: [],
            currentLimitLen: 10,
            loadMoreText: `展开`,
            isShowAll: false,
            needGetData: true, // 是否需要查询后太选中数据
            isSelectAll: false, // 通讯录是否默认全选
        };
    },
    watch: {
        value(newVal) {
            if (newVal && newVal.length === 0) {
                this.initData();
                if (this.needGetData && this.queryType == 2) {
                    this.isSelectAll = true;
                    this.selectedUserNames = [`全企业`];
                }
            } else {
                if (this.needGetData) {
                    this.initData();
                    this.getUserByIdList(newVal);
                }
            }
        },
        limitSelectLength(newVal) {
            this.currentLimitLen = newVal;
        },
    },
    created() {
        this.initData();
        NativeSupportApi.getCurrentUserInfo().then((Data) => {
            if (Data) {
                this.userInfo = Data;
            }
        });
    },
    mounted() {},
    methods: {
        //初始化
        initData() {
            this.selectedUserId = [];
            this.selectedUserNames = [];
            this.selectedUserArr = [];
        },
        // 根据用户id获取去详细数据
        getUserByIdList(selectedUserId) {
            NativeSupportApi.queryUserInfoById({
                cpyId: this.userInfo.cpyId,
                uaid: selectedUserId || [],
                // .filter(item => { if (/^[1-9]+[0-9]*]*$/.test(item)) { return item; }}
            }).then((res) => {
                let selectUser = res.userList;
                this.dealSelectUser(selectUser, "uaid", "userName", true);
            });
        },
        formatStrLen(list) {
            let len = (list || []).length;
            let curList = list;
            if (len > this.limitSelectLength) {
                curList = list.slice(0, this.limitSelectLength);
                return `${curList.join(",")}等${len}人`;
            }
            return curList.join(",");
        },
        // 是否查看更多
        toggleLoadMore() {
            let len = this.selectedUserId.length;
            this.isShowAll = !this.isShowAll;
            if (this.isShowAll) {
                this.currentLimitLen = len;
                this.loadMoreText = `折叠`;
            } else {
                this.currentLimitLen = this.limitSelectLength;
                this.loadMoreText = `展开`;
            }
        },
        //增加人员
        addUser() {
            var selectUaIds = [];
            if (this.selectedUserId) {
                selectUaIds = this.selectedUserId;
            }
            //打开通讯录参数
            var selectJson = {
                action: "IntentAction_SelectContactWithOrgListActivity",
                dataList: [
                    { key: "from_key", value: 9, type: "int" },
                    {
                        key: "select_model",
                        value: this.selectType === "check" ? "1" : "0",
                        type: "string",
                    },
                    {
                        key: "selecting_list",
                        value: JSON.stringify(selectUaIds),
                        type: "string",
                    },
                    { key: "is_show_inactivated", value: true, type: "bool" },
                ],
                responseKeyList: [
                    { key: "addusers_tpay", value: "", type: "string" },
                    { key: "isSelectAll", value: "", type: "bool" },
                ],
            };
            if (this.selectType === "check") {
                selectJson.dataList.push({
                    key: "isSelectAll",
                    value: this.isSelectAll,
                    type: "bool",
                });
                selectJson.dataList.push({
                    key: "showAllSelect",
                    value: true,
                    type: "bool",
                });
            }
            BrowserApi.openAppPage(selectJson).then((data) => {
                //调用app选择联系人窗口
                try {
                    this.dealAppSelect(data);
                } catch (err) {
                    this.initData();
                }
                this.changeSelectPerson();
            });
        },
        dealAppSelect(data) {
            let returnUserList = [];
            let retIsSelectAll = false;
            let len;
            if (data && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].key == "addusers_tpay") {
                        let tempUserList = JSON.parse(data[i].value);
                        len = (tempUserList || []).length;
                        for (let index = 0; index < len; index++) {
                            let element = tempUserList[index];
                            if (typeof element === `object`) {
                                if (element["bizMateId"]) {
                                    returnUserList.push(element);
                                } else if (element[`userList`]) {
                                    returnUserList.push(...element[`userList`]);
                                }
                            }
                        }
                    }
                    if (data[i].key == "isSelectAll") {
                        let allValue = data[i].value;
                        if (typeof allValue === `string`) {
                            allValue = allValue === `true` ? true : false;
                        }
                        retIsSelectAll = allValue;
                    }
                }
            }
            // app 没有点击确定 且已经全选了
            // if (len === 0) return;
            if (retIsSelectAll) {
                // 全选
                this.initData();
                if (this.selectType === `check`) {
                    this.selectedUserNames = [`全企业`];
                } else {
                    // 企业只有一个人
                    this.dealSelectUser(returnUserList);
                }
            } else {
                if (0 < returnUserList.length) {
                    this.initData();
                    this.dealSelectUser(returnUserList);
                } else {
                    // 不是pc未选择数据需要 清空
                    // pc 点击控件外部关闭 也是为[] 无法判定是否是选择 故不做处理
                    if (!isPC()) {
                        this.initData();
                    }
                }
            }
            this.isSelectAll = retIsSelectAll;
        },
        dealSelectUser(
            selectUser,
            idKey = "bizMateId",
            nameKey = "name",
            type = true
        ) {
            if (0 < selectUser.length) {
                for (let i = 0; i < selectUser.length; i++) {
                    //增加权限人员时屏蔽企业最高管理员
                    let item = selectUser[i];
                    if (type) {
                        item["UAId"] = item[idKey];
                        item["uName"] = item[`uName`] || item[nameKey] || ``;
                    }
                    if (this.selectType === `check`) {
                        this.selectedUserArr.push(item);
                        this.selectedUserNames.push(item.uName);
                        this.selectedUserId.push(item.UAId);
                    } else {
                        this.initData();
                        this.selectedUserArr.push(item);
                        this.selectedUserNames.push(item.uName);
                        this.selectedUserId.push(item.UAId);
                        break;
                    }
                }
            }
        },
        delUser(uItem) {
            this.delType = true;
            let beforeDelUserArr = this.selectedUserArr;
            let index = beforeDelUserArr.findIndex((item) => {
                return uItem.UAId === item.UAId;
            });
            this.selectedUserArr.splice(index, 1);
            this.selectedUserNames.splice(index, 1);
            this.selectedUserId.splice(index, 1);
            this.changeSelectPerson();
        },
        changeSelectPerson() {
            this.needGetData = false;
            if (this.isSelectAll) {
                this.$emit(`select-all`, true);
            } else {
                this.$emit(`select-all`, false);
                this.$emit(`input`, this.selectedUserId);
            }
        },
    },
};
</script>
<style lang="less">
.sn-comp-contacts {
    .contacts-item {
        &.show-border {
            &::after {
                display: block;
            }
        }
        .sn-list-item-value {
            color: @text-color-5;
            .value-names-con {
                color: @text-color;
            }
        }
    }
    .load-more {
        padding: 0 0.3rem;
        background: @color-pc-bg;
        cursor: pointer;
        &-con {
            .sn-icon {
                color: @theme-color;
                font-size: @fs-24;
            }
        }
    }
    .user-list {
        display: flex;
        flex-wrap: wrap;
        background: @color-pc-bg;
        padding: 0.2rem;
        padding-bottom: 0;
        .user-item {
            position: relative;
            display: flex;
            padding: 0.1rem;
            .user-com {
                display: inline-block;
                color: #999;
                width: 1.1rem;
                cursor: pointer;
                .user-name {
                    display: inline-block;
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text-align: center;
                }
                .sn-avatar {
                    width: 0.8rem !important;
                    height: 0.8rem !important;
                    border-radius: 50%;
                }
            }
            .icon-con {
                position: absolute;
                top: 0;
                right: 0;
                font-size: 0.34rem;
                color: #ff4e3a;
            }
        }
    }
}
</style>