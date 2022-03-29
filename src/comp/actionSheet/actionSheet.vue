<template>
	<SnPopup
		class="action-sheet-popup"
		v-model="openPopup"
		position="bottom"
		@click-overlay="handleOverlay"
	>
		<SnListItem class="action-sheet-title" :value="descriptionText" :value-class="valueClass" />
		<SnListItem
			class="action-sheet-content"
			:class="{active:clickIndex===index}"
			v-for="(item,index) in menus"
			:key="index"
			:value="item[labelKey]"
			@click="menuItemClick(item,index)"
			:value-class="valueClass"
		>
			<div slot="value">
				<slot></slot>
			</div>
		</SnListItem>
		<div v-if="showCancel" class="action-sheet-split-bottom"></div>
		<SnListItem
			v-if="showCancel"
			class="action-sheet-bottom"
			:value="cancelText"
			@click="cancelHandle()"
			:value-class="valueClass"
		/>
	</SnPopup>
</template>

<script>
import { SnPopup, SnListItem } from "sinosun-ui";
export default {
    name: "ActionSheet",
    components: {
        SnPopup,
        SnListItem,
    },
    props: {
        // 是否显示sheet
        openFlag: {
            type: Boolean,
            default: false,
        },
        // 底部 sheet 居中展示还是别的
        valueClass: {
            type: String,
            default: "text-left",
        },
        // 选中值
        value: {
            type: Object,
            default: () => {},
        },
        //渲染显示的字段key
        labelKey: {
            type: String,
            default: "text",
        },
        //辅助说明文字
        descriptionText: String,
        //是否显示取消按钮
        showCancel: {
            type: Boolean,
            default: true,
        },
        //取消按钮的别名
        cancelText: {
            type: String,
            default: "取消",
        },
        //渲染的数据array
        menus: {
            type: Array,
            default: () => [],
        },
        //点击mask是否隐藏actionsheet
        closeOnClickingMask: {
            type: Boolean,
            default: true,
        },
        //点击menuItem是否隐藏actionsheet
        closeOnClickingMenu: {
            type: Boolean,
            default: true,
        },
        //选择menuItem是否显示选中的效果
        showSelectedEffect: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            openPopup: false,
            clickIndex: -1,
        };
    },
    watch: {
        // sheet显示
        openFlag(val) {
            this.openPopup = val;
        },
        // 数据变化
        value: {
            handler(val) {
                if (val[this.labelKey]) {
                    // 选中默认值
                    let index = this.menus.findIndex((item) => {
                        return val[this.labelKey] === item[this.labelKey];
                    });
                    this.clickIndex = index;
                }
            },
            immediate: true,
        },
    },
    methods: {
        // 点击遮罩
        handleOverlay() {
            this.cancelHandle();
        },
        // 关闭遮罩
        cancelHandle() {
            this.$emit("on-click-menu-cancel");
        },
        // 点击每一项
        menuItemClick(item, index) {
            if (this.showSelectedEffect) {
                this.clickIndex = index;
            }
            this.$emit("on-click-menu", item);
            if (this.closeOnClickingMenu) {
                setTimeout(() => {
                    this.cancelHandle();
                }, 50);
            }
        },
    },
};
</script>

<style lang="less" scoped>
.action-sheet-popup {
    .sn-list-item {
        &::after {
            left: 0;
            transform-origin: 0 50%;
        }
        &.action-sheet-title {
            color: #999;
        }
        &.action-sheet-content {
            .sn-list-item-value {
                color: @theme-color;
            }
        }
        .text-left {
            text-align: left;
        }
        .text-center {
            text-align: center;
        }
        .text-right {
            text-align: right;
        }
    }
    .action-sheet-split-bottom {
        height: 0.2rem;
        background: @body-color;
    }
}
</style>