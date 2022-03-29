<template>
	<div class="sn-comp-department">
		<SnListItem v-if="currentType===`checkbox`" class="department-item-con" title="部门"
			:label-number="labelNumber" value-position="left" :border-indent="borderIndent"
			right-icon="right" @click="showDepartment">
			<div class="select-list">{{selectNameStr}}</div>
		</SnListItem>
		<div v-else class="department-radio-content" @click="showDepartment">
			<span>{{labelText}}</span>
			<span>{{formatSelectStr(selectNameStr)}}</span>
		</div>
		<!-- 部门选择 -->
		<div v-transfer-dom class="comp-sn-popup-con">
			<SnPopup v-model="topPopShow" position="right" :style="{ width: '100%'}">
				<check-list class="bossPayCard-check-list-con" subTitleName="部门"
					:subTitle="subTitle" :loading="popupLoading" :child-list="childList"
					:nameKey="nameKey" :idKey="idKey" :childrenKey="childrenKey"
					:res-data="orgsData" :current-type="currentType" :check-list-key="checkListKey"
					:radio-list-key="radioListKey" :filterNoGroup="filterNoGroup"
					@click="checkClickHandle"></check-list>
			</SnPopup>
		</div>
	</div>
</template>

<script>
import { isPC } from "@/utils/commonUtil";
import QuickPaymentService from "@/service/QuickPayment";
import { SnPopup, SnListItem, TransferDom } from "sinosun-ui";
import CheckList from "@/comp/checkList/checkList";
export default {
	directives: {
		TransferDom,
	},
	components: {
		SnPopup,
		SnListItem,
		CheckList,
	},
	props: {
		// 默认显示多少个部门
		limitSelectLength: {
			type: Number,
			default: 6,
		},
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
		// 展示在一行的时候label名称
		labelText: {
			type: String,
			default: `部门：`,
		},
		// 当前列表展示类型
		currentType: {
			type: String,
			default: `checkbox`,
		},
		// 跳转标题名称
		subTitle: {
			type: String,
			default: `请选择`,
		},
		// 提示语
		placeholder: {
			type: String,
			default: `请选择部门`,
		},
		// store 用来存储check数据的列表名称
		checkListKey: {
			type: String,
			default: `compCheckList`,
		},
		// store 用来存储radio数据的列表名称
		radioListKey: {
			type: String,
			default: `compRadioList`,
		},
		// 弹出层名字 可以控制名字唯一性
		popName: {
			type: String,
			default: `sn-comp-checklist`,
		},
		// 是否需要添加未分组数据（针对部门）
		hasUngrupData: {
			type: Boolean,
			default: true
		},
	},
	inject: [`setTitle`],
	data() {
		return {
			userInfo: {},
			childList: [], // 部门列表
			orgsData: {}, // 后台获取的部门列表
			popupLoading: true, // 弹框数据加载标志
			parentInfoKey: `departProfile`,
			nameKey: "departmentName",
			idKey: "departmentId",
			childrenKey: "departmentList",
			// 是否过滤未分组
			filterNoGroup: true,
			// 树型菜单的项
			dispInfo: {
				nameKey: "departmentName",
				idKey: "departmentId",
				childrenKey: "departmentList",
				parentKey: `departmentParentId`,
				parentInfoKey: `departProfile`,
			},
		};
	},
	computed: {
		topPopShow: {
			get() {
				if (this.$store) {
					return this.$store.getters.isShowPage(this.popName);
				}
				return false;
			},
			set(val) {
				if (val === false) {
					this.closePage();
				}
			},
		},
		selectIdList() {
			if (this.$store) {
				let selectList = [];
				let checkList = [];
				let paramsCheckData = {
					data: this.orgsData,
					idKey: this.idKey,
					childrenKey: this.childrenKey,
				};
				if (this.currentType === `checkbox`) {
					checkList = this.$store.state[this.checkListKey];
					if (this.filterNoGroup) {
						checkList = this.filterSelectList(checkList);
					}
				} else {
					checkList = this.$store.state[this.radioListKey];
				}
				let len = checkList.length;
				if (len === 0) {
					return selectList;
				}
				if (this.currentType === `checkbox`) {
					paramsCheckData.stateKey = this.checkListKey;
					let isAllSelect = this.$store.getters.isAllSelect(
						paramsCheckData
					);
					if (isAllSelect) {
						return selectList;
					}
				}
				checkList.map((item) => {
					selectList.push(item[this.idKey]);
				});
				return selectList;
			}
			return [];
		},
		selectNameStr() {
			if (this.$store) {
				let selectList = [];
				let checkList = [];
				let defaultStr = `全部`;
				if (this.currentType === `checkbox`) {
					checkList = this.$store.state[this.checkListKey];
					if (this.filterNoGroup) {
						checkList = this.filterSelectList(checkList);
					}
					defaultStr = `全部`;
					let paramsCheckData = {
						stateKey: this.checkListKey,
						data: this.orgsData,
						idKey: this.idKey,
						childrenKey: this.childrenKey,
					};
					let isAllSelect = this.$store.getters.isAllSelect(
						paramsCheckData
					);
					if (isAllSelect) {
						return defaultStr;
					}
				} else {
					checkList = this.$store.state[this.radioListKey];
					defaultStr = `请选择`;
				}
				let len = checkList.length;
				if (len === 0) {
					return defaultStr;
				}
				checkList.map((item) => {
					selectList.push(item[this.nameKey]);
				});
				if (this.currentType === `checkbox`) {
					return this.formatStrLen(selectList);
				} else {
					return selectList.join(``);
				}
			}
			return ``;
		},
	},
	watch: {
		selectIdList(newVal) {
			if (this.currentType === `checkbox`) {
				this.$emit(`input`, newVal);
			} else {
				this.$emit(`input`, newVal[0] || {});
			}
		},
	},
	created() {
		this.initEvent();
		//获取用户信息，调用初始化接口
		NativeSupportApi.getCurrentUserInfo().then((Data) => {
			if (Data) {
				this.userInfo = Data;
				this.initResultData();
			}
		});
	},
	methods: {
		// 监听外部事件
		initEvent() {
			if (this.$EventBus) {
				this.$EventBus.$off(`reset-department-selected`);
				this.$EventBus.$on(`reset-department-selected`, () => {
					this.resetStoreData();
				});
			}
		},
		// 初始化后台数据
		initResultData() {
			if (this.currentType === `checkbox`) {
				this.$store.dispatch(`delAllCheckList`, {
					stateKey: this.checkListKey,
				});
			}
			this.getOrgList();
		},
		// 过滤为分组数据
		filterSelectList(list = []) {
			let resultList = [];
			(list || []).map(item => {
				if (item[this.idKey] !== -3) {
					resultList.push(item);
				}
			})
			return resultList;
		},
		// 处理后台数据为树型结构
		dealOrgsData(data = []) {
			let dispInfo = this.dispInfo;
			let resultData = {};
			// 组织机构为公司
			if (data[this.parentInfoKey][this.idKey] === this.userInfo.cpyId) {
				resultData = Object.assign({}, data[this.parentInfoKey]);
			}
			let childrenList = data[this.childrenKey] || [];
			resultData[this.childrenKey] = this.compareTree(
				childrenList,
				data[this.parentInfoKey],
				dispInfo
			);
			return resultData;
		},
		// 组装部门信息(树型)
		compareTree(dataList = [], parentInfo, dispInfo) {
			// 子树处理
			let resultData = [];
			dataList.map((item) => {
				let dealitem = Object.assign({}, item[dispInfo.parentInfoKey]);
				dealitem[dispInfo.parentKey] = parentInfo[dispInfo.idKey];
				dealitem[dispInfo.childrenKey] = this.compareTree(
					item[dispInfo.childrenKey],
					item,
					dispInfo
				);
				resultData.push(dealitem);
			});
			return resultData;
		},
		// 获取部门信息
		getOrgList() {
			let params = {
				bizMateId: this.userInfo.UAId,
				orgId: this.userInfo.cpyId,
				targetDeptId: this.userInfo.cpyId,
				onlyReturnOrganization: "false",
			};
			QuickPaymentService.DownloadCpyOrganization(params).then((res) => {
				let rootTree = res.root || {};
				let orgsData = this.dealOrgsData(rootTree);
				this.orgsData = orgsData;
				this.childList = this.orgsData[this.childrenKey] || [];
				// 添加未分组数据
				if (this.hasUngrupData) {
					let unGroupInfo = {};
					unGroupInfo[this.idKey] = -3;
					unGroupInfo[this.nameKey] = `未分组`;
					this.childList.push(unGroupInfo);
				}
				if (this.currentType === `checkbox`) {
					let paramsCheckData = {
						stateKey: this.checkListKey,
						data: this.orgsData,
						idKey: this.idKey,
						childrenKey: this.childrenKey,
					};
					this.$store.dispatch(`addAllCheckList`, paramsCheckData);
				} else {
					let paramsRadioData = {
						stateKey: this.radioListKey,
						data: this.childList[0] || {},
						idKey: this.idKey,
						childrenKey: this.childrenKey,
					};
					this.$store.dispatch(`addRadioList`, paramsRadioData);
				}
				this.popupLoading = false;
			});
		},
		formatStrLen(list) {
			let len = (list || []).length;
			let curList = list;
			if (len > this.limitSelectLength) {
				curList = list.slice(0, this.limitSelectLength);
				return `${curList.join("; ")}等等`;
			}
			return curList.join("; ");
		},
		// 格式化部门展示
		formatSelectStr(value, num = 6) {
			if (!value) return "";
			let len = value.length;
			if (isPC()) return value;
			if (len > num) {
				value = `${value.substring(0, num)}...`;
			}
			return value;
		},
		// 清除部门数据
		resetStoreData() {
			if (this.currentType === `checkbox`) {
				let paramsCheckData = {
					stateKey: this.checkListKey,
					data: this.orgsData,
					idKey: this.idKey,
					childrenKey: this.childrenKey,
				};
				this.$store.dispatch(`addAllCheckList`, paramsCheckData);
			}
		},
		// 打开部门选择控制
		showDepartment() {
			let checkList = this.$store.state[this.checkListKey];
			if (this.currentType === `checkbox` && this.filterNoGroup) {
				checkList = this.filterSelectList(checkList);
			}
			if (checkList.length === 0) {
				this.resetStoreData();
			}
			this.$store.dispatch("showPage", {
				pageName: this.popName,
				fromPageTitle: this.subTitle,
			});
			this.setTitle("选择部门");
		},
		// 点击确定 关闭页面
		checkClickHandle() {
			if (this.currentType === `checkbox`) {
				let checkList = this.$store.state[this.checkListKey];
				if (this.filterNoGroup) {
					checkList = this.filterSelectList(checkList);
				}
				this.$emit(`click`, checkList);
			} else {
				this.$emit(`click`, this.$store.state[this.radioListKey]);
			}
			this.closePage();
		},
		/**
		 * @description: 关闭页面
		 * @param {type}
		 */
		closePage() {
			let showPageNo = this.$store.state.showPageList.length;
			// 重新设置title
			if (showPageNo) {
				let page = this.$store.state.showPageList[showPageNo - 1];
				this.setTitle(page.fromPageTitle);
				this.$store.dispatch(`closePage`);
				return;
			}
			this.setTitle(this.subTitle);
		},
	},
};
</script>

<style lang="less" scoped>
.sn-comp-department {
	.department-item-con {
		&:after {
			display: block;
		}
	}
}
</style>