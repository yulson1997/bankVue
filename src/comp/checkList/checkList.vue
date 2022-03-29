<template>
	<div class="sn-main-con sn-comp-check-list">
		<div class="check-list-content">
			<SnLoading v-show="loading" tip="数据加载中..." :spinning="true" :turn="true"></SnLoading>
			<div v-if="!loading" class="collapse-con">
				<div class="check-item-con">
					<SnListItem v-if="currentType === 'checkbox'" class="check-all-item"
						value-position="left" :border-indent="false">
						<div class="check-all-item-value"
							@click="checkAllHandle(renderData, iconAllChecked(renderData))">
							<div v-if="filterNoGroup" class="check-all-icon-con"
								:class="{'some-checked':allNoGroupSomeCheck(renderData)}">
								<SnIcon
									:type="iconAllChecked(renderData)?'checkbox':'checkbox-empty'" />
							</div>
							<div v-else class="check-all-icon-con"
								:class="{'some-checked':allSomeCheck(renderData)}">
								<SnIcon
									:type="iconAllChecked(renderData)?'checkbox':'checkbox-empty'" />
							</div>
							<div class="name-con">{{renderData[nameKey].replace(/\ /g, '+')}}</div>
						</div>
					</SnListItem>
					<SnEmpty v-if="0 == childRanderData.length"
						:image="require(`assets/img/img_defpage_nocontent@3x.png`)"
						:desc="`暂无${subTitleName}数据`" />
					<check-item v-if="childRanderData.length > 0" :subTitleName="subTitleName"
						:child-list="childRanderData" :res-data="renderData" :nameKey="nameKey"
						:idKey="idKey" :childrenKey="childrenKey" :current-type="currentType"
						:check-list-key="checkListKey" :radio-list-key="radioListKey"
						:filterNoGroup="filterNoGroup" :isAllChecked="iconAllChecked(renderData)" />
				</div>
			</div>
		</div>
		<div class="btn-group">
			<div class="select-number">
				<span>已选择（{{selectLength}}）个{{subTitleName}}</span>
			</div>
			<SnButton class="sure-btn" type="primary" shape="square" @click="closePage">确定
			</SnButton>
		</div>
	</div>
</template>

<script>
import { SnListItem, SnButton, SnLoading, SnEmpty, SnIcon } from "sinosun-ui";
import CheckItem from "@/comp/checkItem/checkItem";
export default {
	components: {
		SnListItem,
		SnButton,
		SnLoading,
		CheckItem,
		SnEmpty,
		SnIcon,
	},
	props: {
		// 数据名称
		subTitleName: {
			type: String,
			default: `部门`,
		},
		// 跳转标题名称
		subTitle: {
			type: String,
			default: `请选择`,
		},
		// 需要渲染的数据
		resData: {
			type: Object,
			default: () => [],
		},
		// 数据列表
		childList: {
			type: Array,
			default: () => [],
		},
		// 加载动画展示
		loading: {
			type: Boolean,
			default: true,
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
		}
	},
	inject: [`setTitle`],
	data() {
		return {
			// 是否全部选中
			isAllChecked: false,
			renderData: {}, // 渲染数据
			childRanderData: [], // 渲染列表
			collapseList: [], // 折叠面板展示列表
			popName: `sn-comp-checklist`,
		};
	},
	computed: {
		iconAllChecked() {
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
					}
				}
			};
		},
		allSomeCheck() {
			return (item) => {
				if (this.$store) {
					return this.getSomeCheck(item);
				}
			};
		},
		// 没有未分组的部分选中处理
		allNoGroupSomeCheck() {
			return (item) => {
				if (this.$store) {
					let checkList = this.$store.state[this.checkListKey];
					checkList = this.filterSelectList(checkList) || [];
					if (checkList.length <= 0) {
						return false;
					} else {
						return this.getSomeCheck(item);
					}
				}
			};
		},
		// 选择个数
		selectLength() {
			if (this.$store) {
				if (this.currentType === `checkbox`) {
					let checkList = this.$store.state[this.checkListKey];
					checkList = this.filterSelectList(checkList) || [];
					return checkList.length;
				} else {
					return this.$store.state[this.radioListKey].length;
				}
			}
			return 0;
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
	created() { },
	methods: {
		// vue初始化
		init() { },
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
        // 全选非全选处理
		checkAllHandle(item, isChecked) {
			let paramsCheckData = {
				stateKey: this.checkListKey,
				data: item,
				idKey: this.idKey,
				childrenKey: this.childrenKey,
			};
			if (isChecked) {
				this.$store.commit(`delAllCheckList`, paramsCheckData);
				this.isAllChecked = false;
				return;
			}
			this.$store.commit(`addAllCheckList`, paramsCheckData);
			this.isAllChecked = false;
        },
        // 部分全选处理
		getSomeCheck(item) {
			let paramsData = {
				data: item,
				stateKey: this.checkListKey,
				idKey: this.idKey,
				childrenKey: this.childrenKey,
			};
			return this.$store.getters.itemSomeCheck(paramsData);
        },
        // 关闭弹框
		closePage() {
			this.$emit(`click`);
		},
	},
};
</script>

<style lang="less">
.sn-comp-check-list {
	width: 100%;
	height: 100%;
	.check-list-content {
		height: 100%;
		padding-bottom: 0.88rem;
		.collapse-con {
			width: 100%;
			height: 100%;
			overflow-x: hidden;
			.check-item-con {
				position: relative;
				height: 100%;
				padding: 0 0.3rem;
				.sn-empty {
					position: absolute;
					height: auto;
					top: 50%;
					transform: translateY(-50%);
				}
				.check-all-item {
					padding-left: 0.3rem;
					cursor: pointer;
					&:after {
						left: 0.3rem;
					}
					.check-all-item-value {
						display: flex;
						align-items: center;
						.check-all-icon-con {
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
				}
			}
		}
	}
	.btn-group {
		display: flex;
		position: fixed;
		left: 0;
		bottom: 0;
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
}
@media screen and (min-width: @screen-sm) {
	.sn-comp-check-list {
		.check-list-content {
			.collapse-con {
				.check-item-con {
					.check-all-item {
						padding-left: 0;
						&:after {
							right: 0.3rem;
						}
					}
				}
			}
		}
	}
}
</style>