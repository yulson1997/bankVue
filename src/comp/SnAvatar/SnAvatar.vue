<!--
 * @Autor: dingfeng
 * @Description: 头像组件
 * @Date: 2020-06-11 18:21:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-18 20:34:06
 * @FilePath: \bosspay\src\comp\SnAvatar\SnAvatar.vue
--> 
<template>
	<div class="sn-avatar item" :data-uaid="key" :style="style"></div>
</template>

<script>
import { isPC } from "@/utils/commonUtil";
export default {
	components: {},

	data() {
		return {
			style: {
				backgroundImage:
					"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAALVBMVEXl5eXAwMDHx8fFxcXDw8PU1NTd3d3Ozs7i4uLY2NjR0dHMzMzJycnf39/a2toZXU15AAAA6UlEQVRIx2MYBYMV8EWtbMAnz+ooKCiORwWHoiAQuOFWwCQIBgk4FSyEKDDAJc8rCAGiOJ0IVSCESwGPIBTg8gcLTEECuQqYYQou4FDADpUXweVITqgCcZwBZQhRIIZTQSJEwQIG/HZI44nuFJCCAHwJIsZRaAUDTUFfVPWuyAu4U1wQJCDrcMkXwuLCEruCEEE4UMMmzw2TxRUWB5EVSGE1AL8RE2FSuGLUEVWBEGZEooEHGMkNDRRgZEs0oICRotGAAUaeQAMOGNkODWxAU8CG5k0RjEjvrFE2NjZSAgIQfXwCwygYiQAAUhEuEBQQ9qYAAAAASUVORK5CYII=)",
				backgroundSize: "cover",
			},
			key: "",
		};
	},
	props: {
		uaid: {
			type: [Number, String],
			default: ``,
		},
	},
	watch: {
		uaid: {
			immediate: true,
			handler: function () {
				let _this = this;
				if (!_this.uaid) return;
				if (isPC()) {
					_this.style.backgroundImage = `url(../communication_icon/${_this.uaid})`;
					return (_this.key = _this.uaid);
				}
				setTimeout(function () {
					NativeSupportApi.queryUserIcon({ uaid: _this.uaid }).then(
						(data) => {
							if (data && data.iconData) {
								let base64 = data.iconData.replaceAll("\n", "");
								base64 = base64.replaceAll("\r", "");
								_this.style.backgroundImage = `url(data:image/jpg;base64,${base64})`;
								_this.key = _this.uaid;
							} else {
								_this.style.backgroundImage = `url(../communication_icon/${_this.uaid})`;
							}
						}
					);
				}, 50);
			},
		},
	},
};
</script>
<style lang='less'>
.sn-avatar {
	position: relative;
	transform: translate(-50%);
	display: inline-table;
	width: 100%;
	height: 0.8rem;
	background-size: contain;
	border-radius: @head-border-radius;
	background-repeat: no-repeat;
	left: 50%;
	&:after {
		display: block;
		content: " ";
	}
}
@media screen and (min-width: @screen-sm) {
	.sn-avatar {
		width: 40px;
		height: 40px;
		margin: 0 auto;
		border-radius: @head-border-radius;
	}
}
</style>