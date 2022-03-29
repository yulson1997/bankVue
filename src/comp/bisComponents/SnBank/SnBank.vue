<template>
  <SnPopup
    :title="title"
    :placeholder="placeholder"
    :textAlign="textAlign"
    :defaultValue="current[valuePropName]"
    v-model="show"
    @beforePopup="beforePopup"
    @onHide="onHide"
  >
    <div class="bank-empty">
      <SnSearch
        @searchInfo="searchBank"
        @input="getKey"
        :placeholder="placeholdersearch"
        v-model="searchKey"
        :isEmpty='isEmpty'
      ></SnSearch>
       <SnEmpty
            v-if="notData"
            image="../../../resource/img/noInfo.png" 
            desc="暂无对应银行"
        />
    </div>

    <div
      v-show="keyWords.length === 0"
      class="sn-bank-nav"
      @touchstart.stop.prevent="touchMove($event)"
      @touchmove.stop.prevent="touchMove($event)"
      @touchend.stop.prevent="touchEnd"
      @touchcancel.stop.prevent="touchEnd"
    >
      <div
        class="sn-bank-nav-item"
        v-for="(item, index) in indexList"
        :index="index"
        :key="index"
        :ref="item"
        v-text="item"
        @mouseenter="scrollTo(item)"
      >
      </div>
    </div>
    <div
      class="atozshow"
      v-show="atozshow"
    >
      {{ atozText }}
    </div>
    <SnLoading :spinning="loading" :turn="loading" size="small" tip="正在加载"/>

    <div v-show="!notData && !loading">
      <div
        class="sn-list"
        ref="SnList"
        :class="scrollType"
      >
        <div
          v-for="(item, index) in dataList"
          @click="selectBank(item)"
          class="bank-item"
          :class="[{title: item.flag === false}]"
          :key="index"
          :ref="item.href==='热门'?'hotLine':`${item.href}Line`"
          :id="item.href"
        >
          <span>{{item.dispValue}}</span>
          <i
            v-show="item[keyPropName] == current[keyPropName]"
            class="active"
          ></i>
        </div>
      </div>
    </div>
  </SnPopup>
</template>
<script>
// import { dateFormat } from "vux";
import { dateFormat } from "utils/dateFormat.js";
import { SnLoading, SnEmpty, SnPopup, SnList, SnListItem } from "sinosun-ui";
import {
    getStorage,
    setStorage,
    deleteStorageByName,
} from "@/lib/utils/storageUtil.js";
import { setTitleOnly, initTitleMenu } from "sslib/utils/jsBridgeUtils.js";
import { SnSearch } from "components";

export default {
    components: { SnPopup, SnList, SnListItem, SnEmpty, SnSearch, SnLoading },
    data() {
        return {
            loading: false,
            isTouch: true,
            indexList: [],
            dataList: [], //银行列表集合
            valuePropName: "dispValue",
            keyPropName: "bankId",
            current: {},
            changeAccount: true,
            throttleType: false,
            indextemp: -1,
            show: false,
            atozText: "",
            atozshow: false,
            notData: false,
            searchKey: "",
            bakBankList: [], //备份原始查询常用列表
            isEmpty: true,
            hasMore: false,
            pageIndex: 0, //当前显示的条数
            pageNum: 20, //每页显示条数
            searchedList: [], //当前查询出的数据列
            keyWords: "", // 搜索关键字
        };
    },
    props: {
        title: {
            type: String,
            default: "",
        },
        placeholder: {
            type: String,
            default: "",
        },
        placeholdersearch: {
            type: String,
            default: "",
        },
        textAlign: {
            type: String,
            default: "left",
        },
        hasDefault: {
            //默认值，默认为没有
            type: Boolean,
            //required: true,
            default: false,
        },
        isInDetailFlag: {
            //是否明细组件 默认为否
            type: Boolean,
            default: false,
        },
        noTips: {
            //为空提示信息
            type: String,
            default: "暂无数据，请刷新重试",
        },
        bankName: {
            type: String,
            default: "",
        },
        payeeAccount: {
            type: String,
        },
        selectFlag: {
            type: Object,
            default: { show: false },
        },
        subTitle: {
            type: Array,
            default() {
                return [];
            },
        },
        relationFiledIds: {
            type: String,
            default: "",
        },
        value: {
            type: String,
            default: "",
        },
    },

    computed: {
        scrollType() {
            let scrollType = this.isTouch ? "touch" : "auto";
            return scrollType;
        },
    },

    created() {
        let _this = this;
        _this.getIndexList();
    },
    mounted() {
        let _this = this;
        _this.getBanKData().then((dataList) => {
            _this.dataList = dataList;
            if (_this.dataList.length > 0 && _this.hasDefault) {
                _this.setValue(_this.dataList[0]);
            }
            if (_this.bankName) {
                _this.setValue({
                    dispValue: _this.bankName,
                });
            }
            if (!!_this.value && !_this.bankName) {
                _this.dataList.some(function (item) {
                    if (item[_this.keyPropName] == _this.value) {
                        _this.setValue({
                            bankId: _this.value,
                            dispValue: item[_this.valuePropName],
                        });
                    }
                    return item[_this.keyPropName] == _this.value;
                });
            }
        });
    },
    beforeDestroy() {
        clearTimeout(this.timer);
    },

    methods: {
        selectBank(item) {
            console.log("bank onChange", item);
            let _this = this;
            if (!item.flag) {
                return;
            }
            _this.$root.content = _this.$root.content || {};
            //非超级网银需要选择支行
            if (
                undefined != item.joinSuperOnlineBank &&
                false == item.joinSuperOnlineBank
            ) {
                _this.$emit("interBankValue", true);
                _this.$root.superBank = false;
                _this.$root.content.superBank = false;
            } else {
                if (
                    2 == _this.$root.subTransMethod &&
                    parseFloat(
                        _this.$root.content.amount |
                            (0 + _this.$root.content.totalMoney) |
                            0
                    ) <= 5000000
                ) {
                    //实时
                    _this.$emit("interBankValue", false);
                }
                _this.$root.superBank = true;
                _this.$root.content.superBank = true;
            }

            _this.setValue(item);
            _this.cleanBranch();
            _this.show = false;
            initTitleMenu(_this.subTitle); //设置title及按钮
        },
        scrollTo: function (item) {
            this.isTouch = false;
            let letter = item === "热" ? "hot" : item;
            let refItemName = letter + "Line";
            let groupElement = this.$refs[refItemName][0];
            if (groupElement) {
                this.$refs.SnList.scrollTop = groupElement.offsetTop - 50;
            }
            this.timer = setTimeout(() => {
                this.isTouch = true;
            }, 200);
        },
        getIndexList() {
            let _this = this;
            _this.indexList.push("热");
            for (let i = 0; i < 26; i++) {
                _this.indexList.push(String.fromCharCode(65 + i));
            }
        },
        getBanKData() {
            let _this = this;
            let todayStr = dateFormat(new Date(), "YYYY_MM_DD");
            let bankKey = "newBankList" + todayStr;
            let bankJsonKey = "newBankJson" + todayStr;
            return new Promise(function (res) {
                let bankfromStorage = getStorage(bankKey);
                if ("" != bankfromStorage && "undefined" != bankfromStorage) {
                    //缓存中存在银行列表
                    if (JSON.parse(bankfromStorage)) {
                        _this.bakBankList = JSON.parse(
                            JSON.stringify(JSON.parse(bankfromStorage))
                        );
                    }
                    return res(JSON.parse(bankfromStorage));
                }
                deleteStorageByName("newBank");
                // YY
                _this.loading = true;
                return _this.$http.get(
                    "/yqt/account/home/accountManage.getBankList",
                    "",
                    (data) => {
                        console.log("下载实际银行列表======", data);
                        if (!!data && data.code == 0) {
                            _this.loading = false;
                            let bankList = data.bankList;
                            if (bankList) {
                                _this.bakBankList = JSON.parse(
                                    JSON.stringify(bankList)
                                );
                            }
                            let bankJson = {};
                            setStorage(bankKey, JSON.stringify(bankList)); //设置银行列表缓存
                            for (var i = 0; i < bankList.length; i++) {
                                let bank = bankList[i];
                                bankJson[bank.bankId] = bank.bankName;
                            }
                            setStorage(bankJsonKey, JSON.stringify(bankJson));
                            res(bankList);
                        }
                    }
                );
            });
        },

        /**
         * 设置父组件content中的值
         * @param {Object} bankDisplay
         */
        setValue(item) {
            let _this = this;
            _this.current = item;
            _this.$emit("input", item[_this.keyPropName] || "");
            //如果在明细中，需要区分
            if (_this.isInDetailFlag) {
                //明细
                _this.$root.content.inDetail[_this.idx].bankDisplay =
                    item[_this.valuePropName]; //传递给服务器
            } else {
                _this.$root.content.bankDisplay = item[_this.valuePropName]; //给content中另存一个bankDisplay的值
            }
        },
        //点击popup弹框
        beforePopup() {
            console.log("bank beforePopup");
            let _this = this;
            _this.openPopList();
        },
        openPopList() {
            // if (!this.dataList.length) {
            //     showToast(this.noTips);
            //     return;
            // }
            console.log("bank openPopList");
            this.show = true;
            this.selectFlag.show = true;
            setTitleOnly("选择" + this.title);
        },
        onHide() {
            console.log("bank onHide");
            this.selectFlag.show = false;
        },
        onChange(item) {
            console.log("bank onChange", item);
            let _this = this;
            if (!item.flag) {
                return;
            }
            _this.$root.content = _this.$root.content || {};
            //非超级网银需要选择支行
            if (
                undefined != item.joinSuperOnlineBank &&
                false == item.joinSuperOnlineBank
            ) {
                _this.$emit("interBankValue", true);
                _this.$root.superBank = false;
                _this.$root.content.superBank = false;
            } else {
                if (
                    2 == _this.$root.subTransMethod &&
                    parseFloat(
                        _this.$root.content.amount |
                            (0 + _this.$root.content.totalMoney) |
                            0
                    ) <= 5000000
                ) {
                    //实时
                    _this.$emit("interBankValue", false);
                }
                _this.$root.superBank = true;
                _this.$root.content.superBank = true;
            }

            _this.setValue(item);
            _this.cleanBranch();
        },
        onSelect() {
            this.show = false;
            initTitleMenu(this.subTitle); //设置title及按钮
        },
        cleanBranch() {
            let _this = this;
            _this.$root.content = _this.$root.content || {};
            if (_this.relationFiledIds != "branch") {
                return;
            }
            if (_this.isInDetailFlag) {
                //明细
                _this.$parent.$refs[_this.relationFiledIds][
                    _this.idx
                ].current = {};
                //需要清空content中的值，不然会被控件重新赋值
                _this.$root.content.inDetail[_this.idx].branchDisplay = "";
                _this.$parent.$refs[_this.relationFiledIds][_this.idx].$emit(
                    "input",
                    ""
                );
            } else {
                //非明细
                //需要清空content中的值，不然会被控件重新赋值
                _this.$root.content.branchDisplay = "";
                if (
                    _this.$root.$refs[_this.relationFiledIds] &&
                    _this.$root.$refs[_this.relationFiledIds][0]
                ) {
                    _this.$root.$refs[_this.relationFiledIds][0].current = {};
                    _this.$root.$refs[_this.relationFiledIds][0].$emit(
                        "input",
                        ""
                    );
                } else if (_this.$parent.$refs[_this.relationFiledIds]) {
                    //后续操作中的控件值
                    if (_this.$parent.$refs[_this.relationFiledIds][0]) {
                        _this.$parent.$refs[
                            _this.relationFiledIds
                        ][0].current = {};
                    }
                    if (_this.$parent.$refs[_this.relationFiledIds]) {
                        _this.$parent.$refs[
                            _this.relationFiledIds
                        ].current = {};
                    }
                    if (
                        _this.$parent.nextOprData &&
                        _this.$parent.nextOprData[_this.relationFiledIds]
                    ) {
                        _this.$parent.nextOprData[_this.relationFiledIds] = "";
                    }
                }
            }
        },
        touchMove(event) {
            let _this = this;
            setTimeout(() => {
                _this.throttleType = false;
            }, 150);

            if (_this.throttleType) {
                return;
            }

            _this.atozshow = true;
            var point = event.changedTouches ? event.changedTouches[0] : event;
            let ele = document.elementFromPoint(point.pageX, point.pageY);
            if (ele) {
                var group = ele.innerText;
                if (group && group.length == 1) {
                    _this.atozText = group;
                    _this.scrollTo(group);
                }
            }
            _this.throttleType = true;
        },
        touchEnd() {
            this.atozshow = false;
            this.atozText = "";
        },
        // 获取输入框关键字
        getKey(keywords) {
            this.keyWords = keywords;
        },
        //点击搜索，搜索银行，前端进行搜索匹配
        searchBank: function (key) {
            let _this = this;
            _this.hasMore = true;
            _this.pageIndex = 0;
            _this.searchedList = [];
            _this.dataList = [];
            //搜索后回顶部
            // document.querySelectorAll(".sn-bank-list")[0].scrollTop = 0;
            this.$refs.SnList.scrollTop = 0;
            let searchedBankList = []; //搜索结果集
            if (key) {
                //匹配银行
                for (let index = 0; index < _this.bakBankList.length; index++) {
                    let tempBank = _this.bakBankList[index];
                    let isContain = false;
                    if (
                        !!tempBank.dispValue &&
                        tempBank.dispValue.indexOf(key) > -1
                    ) {
                        isContain = true;
                    }
                    //如果匹配到搜索内容
                    if (isContain) {
                        searchedBankList.push(tempBank);
                    }
                }
                _this.searchedList = searchedBankList;
                _this.dataList = _this.searchedList.slice(0, _this.pageNum);
                _this.pageIndex += _this.pageNum;
                console.log(
                    "_this.searchedList :",
                    _this.searchedList,
                    _this.dataList
                );
            } else {
                key = "广东华兴银行";
                //匹配银行
                for (let index = 0; index < _this.bakBankList.length; index++) {
                    let tempBank = _this.bakBankList[index];
                    let isContain = false;
                    if (
                        !!tempBank.dispValue &&
                        tempBank.dispValue.indexOf(key) > -1
                    ) {
                        isContain = true;
                    }
                    //如果匹配到搜索内容
                    if (isContain) {
                        searchedBankList.push(tempBank);
                    }
                }
                _this.searchedList = searchedBankList;
                _this.dataList = _this.searchedList.slice(0, _this.pageNum);
                _this.pageIndex += _this.pageNum;

                // ----------------------------------已注释
                // _this.dataList = JSON.parse(JSON.stringify(_this.bakBankList)).slice(0, _this.pageNum);
                // _this.pageIndex += _this.pageNum;

                // YY
                // _this.dataList = JSON.parse(JSON.stringify(_this.bakBankList));
                // _this.pageIndex += _this.pageNum;
            }
            if (_this.dataList.length == 0) {
                _this.notData = true;
            } else {
                _this.notData = false;
            }
            _this.hasMore = false;
        },
        /**
         * 加载更多
         */
        loadMore() {
            let _this = this;
            if (
                _this.searchedList.length != 0 &&
                _this.searchedList.length > _this.pageIndex
            ) {
                _this.dataList.push.apply(
                    _this.dataList,
                    _this.searchedList.slice(
                        _this.pageIndex,
                        _this.pageIndex + _this.pageNum
                    )
                );
                // _this.dataList = _this.searchedList.slice(_this.pageIndex,_this.pageNum);
                _this.pageIndex += _this.pageNum;
                _this.hasMore = true;
            } else if (
                _this.searchedList.length != 0 &&
                _this.searchedList.length <= _this.pageIndex
            ) {
                _this.hasMore = false;
            } else if (
                _this.searchedList.length == 0 &&
                _this.bakBankList.length > _this.pageIndex
            ) {
                _this.dataList.push.apply(
                    _this.dataList,
                    _this.bakBankList.slice(
                        _this.pageIndex,
                        _this.pageIndex + _this.pageNum
                    )
                );
                // _this.dataList = _this.bakBankList.slice(_this.pageIndex,_this.pageNum);
                _this.pageIndex += _this.pageNum;
                _this.hasMore = true;
            } else if (
                _this.searchedList.length == 0 &&
                _this.bakBankList.length <= _this.pageIndex
            ) {
                _this.hasMore = false;
            }
        },
    },
    watch: {
        payeeAccount(newVal, oldVal) {
            if (newVal != oldVal) {
                //已变更,通知状态
                this.changeAccount = true;
            } else {
                //未变更
                this.changeAccount = false;
            }
        },
        /**
         * 父组件控件组件显示隐藏标识
         * @param {Object} newVal  新值
         * @param {Object} oldVal  旧值
         */
        "selectFlag.show": function (newVal) {
            if (!newVal) {
                //父组件隐藏子组件
                this.show = false;
            }
        },
        /**
         * 数据显示 主要针对删除使用
         * @param {Object} newVal
         * @param {Object} oldVal
         */
        value: function (newVal) {
            console.log(newVal);
            let _this = this;
            _this.getBanKData().then(() => {
                _this.dataList.some(function (item) {
                    if (item[_this.keyPropName] == _this.value) {
                        _this.setValue({
                            bankId: _this.value,
                            dispValue: item[_this.valuePropName],
                        });
                    }
                    return item[_this.keyPropName] == _this.value;
                });
            });
        },
    },
};
</script>
<style lang='less'>
@import (reference) "~components/style/mixins.less";

.sn-list {
    height: auto;
    max-height: 100vh;
    overflow-y: auto;
    background: #fff;
    padding-bottom: 1rem;

    &.touch {
        -webkit-overflow-scrolling: touch;
    }

    &.auto {
        -webkit-overflow-scrolling: auto;
    }

    .bank-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .bb1px();
        padding: 0.19rem 0;

        &:last-child {
            border-bottom: none;
        }

        .active {
            width: 0.3rem;
            height: 0.3rem;
            background: url("../../../resource/img/gou.png") no-repeat center;
            background-size: cover;
        }
    }

    .title {
        padding: 0.1rem 0 0.1rem 0.2rem;
        background: #f2f3f5;
    }

    &::-webkit-scrollbar {
        display: none;
    }
}

.sn-bank-nav {
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -4.29rem;
    z-index: 600;
    background: #fff;

    &-item {
        display: block;
        width: 0.4rem;
        height: 0.36rem;
        color: #7f7f7f;
        text-align: center;
        line-height: 0.36rem;

        &:hover {
            background: #eee;
            color: @theme-color;
        }
    }
}

.atozshow {
    display: block;
    position: fixed;
    width: 0.8rem;
    height: 0.8rem;
    z-index: 1;
    left: 40%;
    top: 40%;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    line-height: 0.8rem;
    text-align: center;
    font-size: 0.36rem;
}

.bank-empty {
    .topSearch {
        padding-left: 0;
        padding-right: 0;
    }

    .empty-comp {
        top: 6%;
    }
}

@media screen and (min-width: @screen-xs-max) {
    .sn-bank-nav {
        right: 10px;
        margin-top: -234px;

        &-item {
            cursor: pointer;
        }
    }
}

@media screen and (min-width: @screen-md-min) {
    .sn-bank-nav {
        right: 20px;
    }
}

@media screen and (min-width: @screen-lg-min) {
    .sn-bank-nav {
        right: calc(~"50% - @{max-content-width}/2 + 20px");
    }
}
</style>