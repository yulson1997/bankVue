<!-- 设置title变化处理-->

<script>
import { scrollThrottle } from "@/utils/commonUtil";
import baseRouter from "./baseRouter";
import { getDeviceBarFn } from '../src/utils/uaUtil';
export default {
	extends: baseRouter,
	data() {
		return {
			distanceHeight: 0,
			// 是否设置完成 如果已完成 往下滑动 就不设置了
			setComplete: false,
			// 以1000 / 60的频率刷新
			scrollEventHandle: scrollThrottle(this.scrollEvent, 1000 / 60),
		};
	},
	methods: {
		/**
		 * @description: 不是事件e可以传空对象 自己定制获取scrollTop的方法
		 * @param {*} e 必传
		 * @param {*} type 非必传
		 * @param {*} height 非必传
		 */
		scrollEvent(e, type, height) {
			let scrollTop = this.getScrollTop(e);
			let distanceHeight;
			// 子组件自己定制滑动距离 如果传了距离以传入为准
			if (typeof this.getDistanceHeight === `function`) {
				distanceHeight = this.getDistanceHeight() || 0;
			}
			height = height || distanceHeight;
			this.setBarScrollStatus(scrollTop, height, type);
		},
		/**
		 * @abstract
		 * @description: 可由子组件定制 获取滚动距离
		 * @param {*} e 事件对象 可自定义对象含有scrollTop属性
		 */
		getScrollTop(e = {}) {
			let scrollTop = 0;
			if (typeof e === `object`) {
				// e.preventDefault 浏览器自带事件对象 是事件对象
				if (e.preventDefault) {
					e = e || window.event;
					let t = e.target || e.srcElement;
					scrollTop = t.scrollTop;
				} else {
					if (e.scrollTop) {
						scrollTop = e.scrollTop;
					}
				}
			} else {
				scrollTop = isNaN(e) ? 0 : Number(e) || 0;
			}
			return scrollTop;
		},
		/**
		 * @description: 设置bar的状态
		 * @param {type}
		 */
		setBarScrollStatus(scrollTop, height, type = `opacity`) {
			// 获取实际应该滑动的距离
			let realHeight = this.getRealHeight(height);
			// 计算失败不执行函数
			if (realHeight < 0) return;
			// 获取当前页面基础配置
			let pageConfig = Object.assign({}, window.TITLEBARCONFIG);
			// 初始主题色
			let themeMode = pageConfig.themeMode || `light`;
			// 终止主题色
			let endTheme = this.getEndTheme(themeMode);
			// 滚动小于需要滚动的高度 则改变状态
			if (scrollTop < realHeight) {
				this.setComplete = false;
				let contentRadio = this.getContentRadio(scrollTop, realHeight);
				// title渐变
				if (type.indexOf(`opacity`) !== -1) {
					pageConfig = this.opacityDeal(pageConfig, contentRadio);
				}
				// 文字渐变 由 1->0->1
				if (type.indexOf(`contentOpacity`) !== -1) {
					pageConfig = this.contentOpacityDeal(pageConfig, type, contentRadio);
				}
				// 主题变化
				if (type.indexOf(`themeChange`) !== -1) {
					pageConfig = this.themeChangeDeal(
						pageConfig,
						type,
						contentRadio,
						endTheme
					);
				}
			} else {
				// 稳定装态
				if (this.setComplete) {
					return;
				}
				pageConfig = this.completeDeal(pageConfig, type, endTheme);
				// 表示已经设置
				this.setComplete = true;
			}
			BrowserApi.setTitleBarTheme(pageConfig);
		},
		/**
		 * @abstract
		 * @description: 可由子组件定制 获取实际滑动距离
		 * @param {*}
		 */
		getRealHeight(height) {
			if (isNaN(height)) {
				if (height.indexOf(`rem`)) {
					height = this.getRemHeight(Number(height.replace(`rem`, ``)));
				} else if (height.indexOf(`px`)) {
					height = Number(height.replace(`px`, ``));
				} else {
					try {
						height = Number(height.replace(/[^\d]/g, ``));
					} catch (err) {
						console.log(`getRealHeight @@Error ------>`, err);
						height = 0;
					}
				}
			}
			if (!window.STATUSBARHEIGHT && !window.TITLEBARHEIGHT) {
				getDeviceBarFn();
			}
			let realHeight = height - (window.STATUSBARHEIGHT + window.TITLEBARHEIGHT);
			return realHeight;
		},
		/**
		 * @abstract
		 * @description:可由子组件定制 获取rem换算的px
		 * @param {*}
		 */
		getRemHeight(remNum) {
			// 浏览器宽度
			let winWidth = document.body.offsetWidth;
			// 1rem = 100px 750设计稿
			// 获取rem对应当前浏览器的px
			let height = remNum * 100 * (winWidth / 750);
			return height;
		},
		/**
		 * @abstract
		 * @description: 可由子组件定制 获取终止的tilte主题
		 * @param {*}
		 */
		getEndTheme(themeMode = `light`) {
			let themeModeInfo = { light: `dark`, dark: `light` };
			return themeModeInfo[themeMode];
		},
		/**
		 * @abstract
		 * @description: 可由子组件定制 获取比例
		 * @param {*}
		 */
		getContentRadio(scrollTop, realHeight) {
			let radio = scrollTop / realHeight;
			let contentRadio = parseFloat(radio.toFixed(6));
			return contentRadio;
		},
		/**
		 * @abstract
		 * @description: 可由子组件定制 opacity处理
		 * @param {*}
		 */
		opacityDeal(pageConfig = {}, contentRadio) {
			pageConfig.opacity = contentRadio;
			return pageConfig;
		},
		/**
		 * @abstract
		 * @description: 可由子组件定制 文字渐变处理
		 * @param {*}
		 */
		contentOpacityDeal(pageConfig = {}, type, contentRadio) {
			if (type.indexOf(`themeChange`) !== -1) {
				if (contentRadio <= 0.5) {
					pageConfig.contentOpacity = 1 - contentRadio * 2;
				} else {
					pageConfig.contentOpacity = contentRadio * 2 - 1;
				}
			} else {
				pageConfig.contentOpacity = contentRadio;
			}
			return pageConfig;
		},
		/**
		 * @abstract
		 * @description: 可由子组件定制 主题变化处理
		 * @param {*}
		 */
		themeChangeDeal(pageConfig = {}, type, contentRadio, endTheme) {
			if (type.indexOf(`contentOpacity`) !== -1) {
				if (contentRadio > 0.5) {
					pageConfig.themeMode = endTheme;
				}
			}
			return pageConfig;
		},
		/**
		 * @abstract
		 * @description: 可由子组件定制 所有事件完成处理
		 * @param {*}
		 */
		completeDeal(pageConfig = {}, type, endTheme) {
			// title渐变
			if (type.indexOf(`opacity`) !== -1) {
				pageConfig.opacity = 1.0;
			}
			// 文字渐变 文字展示
			if (type.indexOf(`contentOpacity`) !== -1) {
				pageConfig.contentOpacity = 1.0;
			}
			// 主题变化
			if (type.indexOf(`themeChange`) !== -1) {
				pageConfig.themeMode = endTheme;
			}
			return pageConfig;
		},
	},
};
</script>