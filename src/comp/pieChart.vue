<template>
    <div>
        <ve-pie
            ref="chart"
            :width="width"
            :height="height"
            :judge-width="true"
            :data="chartData"
            :data-empty="dataEmpty"
            :settings="chartSettings"
            :events="chartEvents"
            :legend-visible="showHeadTip"
            :legend-position="legendPosition"
            :extend="chartExtend"
            :loading="loading"
        />
    </div>
</template>

<script>
import Vue from "vue";
import VePie from "v-charts/lib/pie";
import "v-charts/lib/style.css";
import { isPC, moneyStringFixTwo } from "@/utils/commonUtil";
let echarts = require("echarts/lib/echarts");

Vue.component(VePie.name, VePie);
export default {
    components: {},
    props: {
        /**
         * 这个是显示的数据，用key和value 作为对象的属性名传递进来
         *
         *  */
        chartValue: {
            type: Array,
            default: () => [],
        },
        dataEmpty: {
            type: Boolean,
            default: false,
        },
        //这个是表示是否显示颜色块对应的提示，默认是不显示
        showHeadTip: {
            type: Boolean,
            default: true,
        },
        legendPosition: {
            type: String,
            default: "bottom",
        },
        width: {
            type: String,
            default: "100%",
        },
        height: {
            type: String,
            default: isPC() ? "300px" : "65vw",
        },
        unit: {
            type: String,
            default: "元",
        },
        colorList: {
            type: Array,
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        this.chartSettings = {
            area: true,
            selectedMode: false, // 禁用图表点击
            hoverAnimation: false,
        };
        let self = this;
        this.chartEvents = {
            click(e) {
                self.$emit("click", e);
            },
        };
        let totalData = 0;
        const legendData = this.chartValue.map((item) => {
            totalData += item.value;
            return {
                name: item.key,
                value: item.value,
            };
        });

        return {
            totalData: totalData,
            chartData: {
                columns: ["key", "value"],
                rows: this.chartValue,
            },
            chartExtend: {
                color: this.colorList || ["#23CDA7", "#FFA501"],
                tooltip: {
                    formatter: (params) => {
                        let toolTipData = params.data;
                        let name = toolTipData.name;
                        let value = toolTipData.value;
                        return `${name}<br/>${moneyStringFixTwo(value)}`;
                    },
                },
                legend: {
                    bottom: 0,
                    icon: "circle",
                    itemGap: 5,
                    itemWidth: 10,
                    itemHeight: 10,
                    data: legendData,
                    orient: `vertical`,
                    formatter: (name) => {
                        let value = 0;
                        legendData.map((item) => {
                            if (item.name === name) {
                                value = item.value;
                            }
                        });
                        return `${name}：${moneyStringFixTwo(value)}`;
                    },
                },
                /* 位置布局 */
                grid: {
                    top: "0%",
                    left: "5%",
                    right: "5%",
                    bottom: "25%",
                    containLabel: true,
                },
                series: {
                    type: "pie",
                    radius: "52%",
                    center: ["50%", "45%"],
                    label: {
                        normal: {
                            formatter: (params) => {
                                const { name, value } = params;
                                const shortName = isPC()
                                    ? name
                                    : name.length > 4
                                    ? name.substring(0, 4) + "..."
                                    : name;
                                let formatValue;
                                if (!this.totalData) {
                                    formatValue =
                                        name === `已用金额` ? `0.00%` : `0.00%`;
                                } else {
                                    formatValue =
                                        (
                                            (value / this.totalData) *
                                            100
                                        ).toFixed(2) + `%`;
                                }
                                return shortName + `\n` + formatValue;
                            },
                        },
                    },
                    lineStyle: {
                        normal: {
                            width: 2,
                            color: {
                                type: "linear",
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: "rgb(38, 45, 217)", // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: "rgb(38, 45, 217)", // 100% 处的颜色
                                    },
                                ],
                                globalCoord: false, // 缺省为 false
                            },
                        },
                    },
                    areaStyle: {
                        //区域填充样式
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: "transparent",
                                    },
                                    {
                                        offset: 1,
                                        color: "transparent",
                                    },
                                ],
                                false
                            ),
                            shadowColor: "transparent",
                            shadowBlur: 0,
                        },
                    },
                    smooth: false,
                },
            },
        };
    },
    methods: {},
    watch: {
        chartValue(val) {
            this.chartData.rows = val;
            this.totalData = 0;
            const legendData = val.map((item) => {
                this.totalData += item.value;
                return {
                    name: item.key,
                    value: item.value,
                };
            });
            this.chartExtend.legend.data = legendData;
            this.chartExtend.legend.formatter = (name) => {
                let value = 0;
                legendData.map((item) => {
                    if (item.name === name) {
                        value = item.value;
                    }
                });
                return `${name}：${moneyStringFixTwo(value)}`;
            };
        },
    },
};
</script>