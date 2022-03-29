<!--
* @Author: yinfu
* @Date: 2020-10-28 15:36:10
* @LastEditTime: 2021-01-08 15:52:04
* @Description: 
-->
<template>
	<div class="page-toUpperCaseNum">
		<!-- true  展示 全部按钮 -->
		<!-- false  不展示 全部按钮 -->
		<SnInputNumCase title="存款金额" @allMoney="allMoney" :allMore="true" />
		<SnAddAmount
			title="购买金额"
			:num="num"
			:money="money"
			@add="add"
			@lower="lower"
			@onBlur="onBlur"
		/>
		<SnDropdownMenu>
			<SnDropdownMenuItem v-model="value1" :options="option1" />
			<SnDropdownMenuItem v-model="value2" :options="option2" />
			<SnDropdownMenuItem v-model="value3" :options="option3" />
		</SnDropdownMenu>

		<div style="margin:1rem 0">
			<van-radio-group v-model="radio" direction="horizontal">
				<van-radio name="1">
					单选框 1
					<template #icon="props">
						<img
							class="img-icon"
							:src="props.checked ? activeIcon : inactiveIcon"
						/>
					</template>
				</van-radio>
				<van-radio name="2">
					单选框 2
					<template #icon="props">
						<img
							class="img-icon"
							:src="props.checked ? activeIcon : inactiveIcon"
						/>
					</template>
				</van-radio>
			</van-radio-group>
		</div>
		<!-- <div class="linchart">
			<div id="chartLineBox" style="height: 300px"></div>
		</div> -->
		<div>
			<div class="list">
				<div
					v-for="(item, index) in tabList2"
					:key="index"
					:class="{ active2: tabIndex2 == index }"
					@click="send(index)"
				>
					{{ item.content }}
				</div>
			</div>
			<SnLoading :spinning="showLoading" :turn="true" tip="默认加载" />
			<LineChart
				v-if="!showLoading"
				:index="Num"
				:showList1="showList1"
				:showList2="showList2"
				ref="LineChart"
			/>
		</div>
	</div>
</template>

<script>
// import {RadioGroup , Radio} from 'vant';
// import echarts from "echarts";
import RadioGroup from "vant/lib/radio";
import Radio from "vant/lib/radio-group";
import LineChart from "../../../comp/baseComponents/linechart/linechart.vue";
import "vant/lib/radio-group/style";
import "vant/lib/radio/style";
import {
	SnToast,
	SnDropdownMenu,
	SnDropdownMenuItem,
	SnLoading
} from "sinosun-ui";
import SnInputNumCase from "../../../comp/baseComponents/SnInputNumCase/SnInputNumCase.vue";
import SnAddAmount from "../../../comp/baseComponents/SnAddAmount/SnAddAmount.vue";
// import { toUpperCase ,toUnitCase} from "utils/aa.js";
import baseRouter from "@/baseView/baseRouter";

export default {
	extends: baseRouter,
	components: {
		LineChart,
		// SnListItem,
		// SnInputNumber,
		[Radio.name]: Radio,
		[RadioGroup.name]: RadioGroup,
		SnDropdownMenu,
		SnDropdownMenuItem,
		SnInputNumCase,
		SnAddAmount,
		SnLoading
	},
	data() {
		return {
			tabList2: [
				{
					index: "0",
					content: "近七天"
				},
				{
					index: "1",
					content: "近半年"
				},
				{
					index: "2",
					content: "近一年"
				}
			],
			tabIndex2: "",
			showList1: [],
			showList2: [],
			Num: 1,
			showLoading: true,
			radio: "1",
			activeIcon:
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAE2ElEQVRYR8WXa2xURRTH/2e2vbsG0IRgA2hUQoUEXyjwQRCjEl/f1Fp87N62dO+WNIhojEZBI0YF4ytBINju3ULv3aJS8YEmKNFo6iOSUI0EHygaEg2xQOILhTu7O8fcaXd7S7vttt3ESTbZzJzHb849c+YM4X8eNFr/kS0NF3BFbo5iVAmis319xXxMEI4KqP0nEx2/jsZmSQDhVGy2YtFM4CUALh7BQTcDXYK4xYunD44EMyKAYZsPEfAgA1PA+BICe1SO3wlxqMfL/tuDyCQK57LTcqSmCyGuB/MNAOYTcJyB56TlPjscxLAAhm3uAFBLwCdMvEHG0ztH2pG/bqRiNcS0ioHFAO2RlnNjMb2iAIZt/gigmoju9eLOxlIcny5jpGKrwfQ0Az0Zy506lI1BAJEW8zwVwrcAJhD4Qs9KHwoqTtjaMDWby85lprkgXAZGjgTtJcXfVGRx4ESzezQoX2FHFwmITwH8LnPZWVj+yvHg+gAAwzb9BNsFYIaCuiprdXwWFDZs81EATw4XDQZtyljOyqBM2I5VM8iPaDcYpky43+XXBwCEU2YLM5pAvEbG0+vyQpXJ+nlEvAvg6aV9Cv4TJJbJuPNmXj6cqlvJzC8RodWLu8sHAfQ6Ufv8hPMs9+q8gJGquxXMb5TmeKAUs5ifSbR3FyBss8tPzOB8IQKVtvkiAfeD+PZgtht27A+AzhoLAEBHpOWc07+ZWA2YXmfQhozl3OfPFwAM29wHgKXlLiiE3q7bSOB7xua8oPWYtNynChC2+TUAIS33kgLAGcnouTkSv4BonYw7a/yFiVvMKlmJnnE61+qVodC0f5Zt+03/T5qbiLBCZEIzTjVvO6wjYNhmLYAdivnabCL9sT8XSZrXKcKH5QAg8M2elX7Pt1WRjF0jiD4CsFRabmcvQDK2FkSPk6LZXpPzgz+Xz9pyAIDxiEy4z2i7rXWzWPBBMD8hE+m1+Qjokiup8kzE2/7uhTLTIETLAgC8Ki33Lm0r1TjJ4MxfADql5S4dCOCdmoQVnSf6orIdRL1K4x1MO2TCuUOb2Vw70QhH/E0GAPKfICeqveXtP+lQJc0HmPD8eH336RdOQrilfiaH1KHTP0FvEipelG1Kf64B7NhNDNpdFgCmW2TCeVsnYWtsoRDkl/j+JCwcQ2C1tNz1+hTYd5+vEDpcDgAhcjNPNW7/WX/alLkejIcHHMO+o+gXIiktd2HeqZGMvQaipeOBIMbLXsJt7rdpdoNgDChE/uKQpdiOTzbY6wFRxdggyJPeySmFxE4NU4qLX0axKJjSYwFQhMXZuOv3AnqEh7uMtECR6zhiR5coiA9GA8HE9Zl42ik4H+k61nmQrLsUhN3+vT+oIbFrJxuIvACgYVgQxvshKCvYnhcaEsL3IFUjGzv8jkuPQS1ZoFZjqJbMSJq3gXAFgMv1j6FA2AvgK4APSCv9VhAw0JIBQl0UdD4kgD6r/RcGytGU+jaZ1ZWZRMcXp0eveFfcFp0DJfziUT2ettzviJn5zvwtWzKAzom26BxisUr3iXobpT9MdHgJraxos0w4+4vlzYgvI10jkvXzQLlGgPxHin4PFh90hJl3AqI92A+OCyCorJsX5gXwH6aMqr5UPgrmYxQSXV6j8+5ojmtJERiNwdHK/gfyqE4/xSyjfAAAAABJRU5ErkJggg==",
			inactiveIcon:
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADZElEQVRYR8VXzY9URRD/Vc8bL4InJEKIkbhCgsoFOAg7s139ov4BuISLFw8aYxQ5SAgcgAOQQEKCHwe4eeXj4Ediwu7repldCAfXRA4qiomJxoSPhEQ5sbNdpCfzYIdldrZhyb7j61//6tfVVdVVhCX+KNW+iLxkjNkQQlhJRM/H/ap60xhzI4RwhZn/SeFckADv/Xoi+hBADuC1AQamVLUF4JRz7uogMQMFeO/3ENFnAFYQ0U+qeiGE8B2A68aY6/V6nVR1VbvdXk1Eb6rqWwA2A7ilqsedc8fmEzGvABE5A2AUwISqnnTOnR90orjuvd9ORLsANIjogrX27X77+goQkT8ADBHRJ9baLxZi+GGM934fER2O3mLmFx7FMUfA2NjYi1mW/QLgWQCvMPO1xzFe7fHebyOiSQC3Aaxj5luz+XoEiEgMsG8BrFXVYefcxScxXu0VkSEA0aNTxph3R0ZGfq3WegSUZXlKVd9X1f3OuSOLYbziKMvyY1X9nIhOW2s/mCPAe7+JiH6MAcfMzcU0PssTMT0bqrrZOTcV/9/3gPf+BBHtVtV3FhrtqSK72XEOwElm/rRHgIjE0yszb0klTsGXZfmzqhpmfv2+ABFZA+BvIjpird2fQpiKFZEvAXwUA52Z/+pcQVmWo6oaiw4zc5lKmoIXEQtAiGiHtfZsR0BRFAeNMQeyLFvfaDR+TyFMxU5MTKxrt9tXQwiH8jw/2BFQldx6vf7c8PDw/6mkKfjJycnl09PT/wE4y8w7egQAWM7Md1IIU7EisgxAPOQDAdUVhBCG8jz/M5U0BV8UxcvGmGs9V1AFYQhhW57nl1IIU7FFUWw1xlzsCcJZabjPWns0lTQFLyKRf29PGnYDMRaiu8y8NYUwFVuWZeyYnukpRJFkyUvxkj9G3Yq4dM9xFDA+Pr4xy7IfVHX1U2pIfqvVatubzWbsuDrfnJasqtXd9cVsyVCr1V6dbfyRAroZ0XkwOoDFaUoj1RvMfPnhrOnbFbdarQ0zMzPfxM74Sdry2BED2NnvlZ13LogiQgi7Yp/Y9UbKYBK9d9oY81Wz2bzSr14MnIy6NWITgPeIKA4pnXmwLyHRvyGEOMB8XfV98+Ifo5KNhhC2xMFUVVd2PXMjDqhE1GLm71M4F+SBFMJU7D2AlLMwYkVjwgAAAABJRU5ErkJggg==",
			num: 1000,
			money: 20000,
			toUpperCaseInput: "",
			toUpperCaseInput2: "",
			toUpperCaseInput3: "",
			value1: 0,
			value2: 0,
			value3: 0,
			option1: [
				{
					text: "投资期限",
					value: 0
				},
				{
					text: "30天以下",
					value: 1
				},
				{
					text: "31～90天",
					value: 2
				},
				{
					text: "91天～180天",
					value: 3
				},
				{
					text: "181～365天",
					value: 4
				},
				{
					text: "365天以上",
					value: 5
				}
			],
			option2: [
				{
					text: "风险等级",
					value: 0
				},
				{
					text: "极低风险",
					value: 1
				},
				{
					text: "低风险",
					value: 2
				},
				{
					text: "中等风险",
					value: 3
				},
				{
					text: "较高风险",
					value: 4
				},
				{
					text: "高风险",
					value: 5
				}
			],
			option3: [
				{
					text: "收益类型",
					value: 0
				},
				{
					text: "保本收益类",
					value: 1
				},
				{
					text: "保本浮动收益类",
					value: 2
				},
				{
					text: "非保本浮动收益类",
					value: 3
				}
			]
		};
	},
	mounted() {},
	created() {
		// this.showList1 = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
		this.showList2 = [150, 230, 224, 218, 135, 147, 260];
		this.send(0);
	},
	methods: {
		send(val) {
			var _this = this;
			console.log("Num" + val);
			_this.Num = val;
			_this.showList1 = [];
			_this.tabIndex2 = val;
			_this.showLoading = true;
			if (val == 0) {
				_this.showList1 = [
					"Mon1",
					"Tue1",
					"Wed1",
					"Thu1",
					"Fri1",
					"Sat1",
					"Sun1"
				];
				_this.$forceUpdate();
				setTimeout(function() {
					_this.showLoading = false;
				}, 2000);
			} else {
				_this.showList1 = [
					"Mon",
					"Tue",
					"Wed",
					"Thu",
					"Fri",
					"Sat",
					"Sun"
				];
				// _this.$forceUpdate();
				setTimeout(function() {
					_this.showLoading = false;
				}, 2000);
			}
		},
		allMoney() {
			console.log(123);
		},
		//递增事件
		add() {
			console.log("add");
			if (this.money == 32000) {
				SnToast("当前为最大购买金额");
				return;
			} else {
				this.money += this.num;
			}
			console.log(this.money);
		},
		//递减事件
		lower() {
			console.log("lower");
			if (this.money == 10000) {
				SnToast("当前为购买最小份额");
				return;
			} else {
				this.money -= this.num;
			}
			console.log(this.money);
		},
		//失去焦点事件
		onBlur(newMoney) {
			var _this = this;
			// console.log(item);
			_this.money = newMoney;
			console.log("this.money" + _this.money);
			if (newMoney < 20000) {
				SnToast("购买金额不能低于起购金额");
				_this.money = 20000;
			} else {
				if (newMoney % 1000 != 0) {
					SnToast("购买金额必须为递增金额的整数倍");
					_this.money = Math.ceil(newMoney / 1000) * 1000;
				}
			}
		}
	}
};
</script>

<style scoped lang="less">
.img-icon {
	height: 0.3rem;
}
.flex {
	display: flex;
	align-items: center;
	background: #fff;
}
.flex p {
	width: 0.5rem;
	display: flex;
	justify-content: center;
}
.sn-list-item-value {
	text-align: left;
}
.title-content {
	padding: 0.24rem 0.3rem;
	background-color: #fff;
}
.list {
	display: flex;
	flex-wrap: wrap;
}
.list div {
	width: 30%;
	text-align: center;
}
.active2 {
	background: #d1af81;
	color: #ffffff;
	border-radius: 0.24rem;
}
</style>
