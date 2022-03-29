<template>
	<div class="sn-comp-check-item">
		<SnCollapse class="collapse-list" v-model="collapseList"
			v-for="(item,index) in childRanderData" :key="index">
			<SnCollapsePanel v-if="hasChildren(item)" :name="item[idKey]" class="collapse-item"
				value-position="left" :clickable="false" center border border-indent
				collapse-on-right-icon>
				<div slot="value" class="collapse-item-value"
					@click="valueClickHandle(item, iconIsChecked(item))">
					<div class="left-icon-con" :class="{'some-checked':itemSomeCheck(item)}">
						<SnIcon v-if="currentType==='checkbox'"
							:type="iconIsChecked(item)?'checkbox':'checkbox-empty'" />
						<SnIcon v-if="currentType==='radio'"
							:type="iconIsChecked(item)?'radio':'radio-empty'" />
					</div>
					<div class="name-con">{{item[nameKey].replace(/\ /g, '+')}}</div>
				</div>
				<list-item :subTitleName="subTitleName" :child-list="(item[childrenKey] || [])"
					:res-data="(item || {})" :nameKey="nameKey" :idKey="idKey"
					:childrenKey="childrenKey" :current-type="currentType"
					:check-list-key="checkListKey" :radio-list-key="radioListKey"></list-item>
			</SnCollapsePanel>
			<SnListItem v-else value-position="left" :clickable="false" center border border-indent
				class="collapse-item-child">
				<div class="collapse-child-value"
					@click="valueClickHandle(item, iconIsChecked(item))">
					<div v-if="filterNoGroup && item[idKey] === -3" class="left-icon-con"
						:class="{'some-checked':itemSomeCheck(item)}">
						<SnIcon v-if="currentType==='checkbox'"
							:type="isAllChecked?'checkbox':'checkbox-empty'" />
						<SnIcon v-if="currentType==='radio'"
							:type="iconIsChecked(item)?'radio':'radio-empty'" />
					</div>
					<div v-else class="left-icon-con" :class="{'some-checked':itemSomeCheck(item)}">
						<SnIcon v-if="currentType==='checkbox'"
							:type="iconIsChecked(item)?'checkbox':'checkbox-empty'" />
						<SnIcon v-if="currentType==='radio'"
							:type="iconIsChecked(item)?'radio':'radio-empty'" />
					</div>
					<div v-if="filterNoGroup && item[idKey] === -3" class="name-con"
						:class="{'no-group-disable':!isAllChecked}">
						{{item[nameKey].replace(/\ /g, '+')}}</div>
					<div v-else class="name-con">
						{{item[nameKey].replace(/\ /g, '+')}}</div>
				</div>
			</SnListItem>
		</SnCollapse>
	</div>
</template>

<script>
import { SnToast, SnListItem, SnCollapse, SnCollapsePanel, SnIcon } from "sinosun-ui";

export default {
	name: "ListItem",
	components: {
		SnIcon,
		SnListItem,
		SnCollapse,
		SnCollapsePanel,
	},
	props: {
		// 数据名称
		subTitleName: {
			type: String,
			default: `部门`,
		},
		// 需要渲染的数据
		resData: {
			type: Object,
			default: () => { },
		},
		// 数据列表
		childList: {
			type: Array,
			default: () => [],
		},
		// 名字key值
		nameKey: {
			type: String,
			default: `orgName`,
		},
		// 父级属性值key值 唯一性
		parentIdKey: {
			type: String,
			default: `pOrgId`,
		},
		// 属性值key值 唯一性
		idKey: {
			type: String,
			default: `orgId`,
		},
		// 子属性字段
		childrenKey: {
			type: String,
			default: `childOrg`,
		},
		// 当前列表展示类型
		currentType: {
			type: String,
			default: `checkbox`,
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
		// 是否过滤未分组数据
		filterNoGroup: {
			type: Boolean,
			default: false,
		},
		// 是否全部选中
		isAllChecked: {
			type: Boolean,
			default: false,
		}
	},
	computed: {
		iconIsChecked() {
			return (item) => {
				if (this.$store) {
					let paramsData = {
						data: item,
						idKey: this.idKey,
						childrenKey: this.childrenKey,
					};
					if (this.currentType === `checkbox`) {
						paramsData.stateKey = this.checkListKey;
						return this.$store.getters.iconIsChecked(paramsData);
					} else {
						paramsData.stateKey = this.radioListKey;
						return this.$store.getters.iconIsRadio(paramsData);
					}
				}
			};
		},
		itemSomeCheck() {
			return (item) => {
				if (this.$store) {
					let paramsData = {
						data: item,
						stateKey: this.checkListKey,
						idKey: this.idKey,
						childrenKey: this.childrenKey,
					};
					return this.$store.getters.itemSomeCheck(paramsData);
				}
			};
		},
	},
	watch: {
		resData: {
			//深度监听，可监听到对象、数组的变化
			immediate: true,
			handler(newVal) {
				this.renderData = newVal;
			},
			deep: true,
		},
		childList: {
			immediate: true,
			handler(newVal) {
				this.childRanderData = newVal;
			},
			deep: true,
		},
	},
	data() {
		return {
			collapseList: [],
			renderData: [],
			childRanderData: [],
		};
	},
	methods: {
		hasChildren(item) {
			return item[this.childrenKey] && item[this.childrenKey].length > 0;
		},
		valueClickHandle(item, isChecked) {
			// 过滤部门未分组点击
			if (item[this.idKey] === -3 && this.filterNoGroup) { SnToast(`企业未分组不可主动选择`); return }
			if (this.currentType === `checkbox`) {
				this.iconClickCheckHandle(item, isChecked);
			} else {
				this.iconClickRadioHandle(item, isChecked);
			}
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
		iconClickCheckHandle(item, isChecked) {
			let paramsData = {
				parentData: this.renderData,
				stateKey: this.checkListKey,
				data: item,
				idKey: this.idKey,
				childrenKey: this.childrenKey,
			};
			if (isChecked) {
				this.$store.dispatch(`delCheckList`, paramsData);
			} else {
				this.$store.dispatch(`addCheckList`, paramsData);
			}
		},
		iconClickRadioHandle(item) {
			let paramsData = {
				parentData: this.renderData,
				data: item,
				stateKey: this.radioListKey,
				idKey: this.idKey,
				childrenKey: this.childrenKey,
			};
			this.$store.dispatch(`addRadioList`, paramsData);
		},
	},
};
</script>

<style lang="less">
.sn-comp-check-item {
	.collapse-list {
		.collapse-item,
		.collapse-item-child {
			&.sn-collapse-panel {
				.sn-collapse-panel-body {
					background: @color-pc-bg;
					.bb1px();

					&::after {
						z-index: 10;
						left: 0.3rem;
					}
				}

				.sn-collapse-panel-header {
					padding: 0;
					padding-left: 0.3rem;

					&::after {
						visibility: visible;
					}

					i {
						padding: 0.33rem;
					}
				}
			}

			.sn-list-item {
				cursor: pointer;
				padding-right: 0;
			}

			.collapse-item-value,
			.collapse-child-value {
				display: flex;
				align-items: center;
				padding: 0.33rem 0;
				.left-icon-con {
					display: flex;
					align-items: center;
					padding-right: 0.1rem;
					.sn-icon {
						padding: 0;
					}
					.sn-icon-checkbox-empty,
					.sn-icon-radio-empty {
						color: @text-color-5;
					}
					.sn-icon-checkbox,
					.sn-icon-radio {
						color: @theme-color;
					}
				}
				.some-checked {
					.sn-icon-checkbox-empty {
						color: @theme-color;
					}
				}
			}
			.collapse-child-value {
				padding: 0;
			}

			// 解决纯数字无法换行
			.sn-list-item-value {
				word-break: break-all;
				.name-con {
					&.no-group-disable {
						color: @text-color-5;
					}
				}
			}

			// 子面板背景
			.sn-collapse-panel-content {
				padding-top: 0;
				padding-bottom: 0;
				padding-right: 0;
			}
		}
		.collapse-item-child {
			&:after {
				display: block;
			}
		}
	}
	@media screen and (min-width: @screen-sm) {
		.collapse-list {
			&::after {
				left: 0;
				right: 0.3rem;
			}
			.collapse-item {
				&.sn-collapse-panel {
					.sn-collapse-panel-header {
						padding: 0;

						&::after {
							left: 0;
							right: 0.3rem;
						}
					}

					.sn-collapse-panel-body {
						&::after {
							left: 0;
							width: calc(~"100% - .3rem");
						}
					}
				}
			}
		}
	}
}
</style>