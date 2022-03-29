<template>
    <div class="sn-main-con page-payment-test">
        <SnListItem title="商户号" value-position="left" :label-number="5" required>
            <input v-model="shopId" placeholder="请输入商户号" />
        </SnListItem>
        <SnListItem title="订单号" value-position="left" :label-number="5" required>
            <input v-model="orderNo" placeholder="请输入订单号" />
        </SnListItem>
        <SnListItem title="金额" value-position="left" :label-number="5" required>
            <input v-model="amount" placeholder="请输入金额" />
        </SnListItem>
        <SnListItem title="签名数据" value-position="left" :label-number="5" required>
            <input v-model="sign" placeholder="请输入签名数据" />
        </SnListItem>
        <SnListItem title="商品描述" value-position="left" :label-number="5" required>
            <input v-model="commodityDesc" placeholder="请输入商品描述" />
        </SnListItem>
        <SnListItem title="回调url" value-position="left" :label-number="5" required>
            <input v-model="notifyUrl" placeholder="请输入回调url" />
        </SnListItem>
        <SnListItem title="订单有限时间" value-position="left" :label-number="5" required>
            <input v-model="timeout" placeholder="请输入订单有限时间" />
        </SnListItem>
        <SnListItem title="备注" value-position="left" :label-number="5">
            <input v-model="remark" placeholder="请输入备注" />
        </SnListItem>
        <SnListItem title="交易类型" value-position="left" :label-number="5">
            <select v-model="tradeType">
                <option
                    v-for="(item,index) in tradeTypeList"
                    :key="index"
                    :value="item.statusValue"
                >{{item.statusName}}</option>
            </select>
        </SnListItem>
        <SnListItem title="扩展信息" value-position="left" :label-number="5">
            <input v-model="extra" placeholder="请输入扩展信息" />
        </SnListItem>
        <div
            class="tip"
            v-if="result.success !== null"
            :class="result.success ? 'success' : 'fail'"
        >{{result.msg}}</div>
        <div class="wrap-btn">
            <SnButton type="primary" :loading="submitLoading" @click="submit">提交</SnButton>
        </div>
    </div>
</template>

<script>
import "./index.less";

import { SnListItem, SnButton, SnToast } from "sinosun-ui";
import PaymentTestService from "@/service/paymentTest";

import baseRouter from "@/baseView/baseRouter";
export default {
    extends: baseRouter,
    components: {
        SnListItem,
        SnButton,
    },
    data() {
        return {
            submitLoading: false,
            shopId: "123456",
            orderNo: Math.random().toString().split(".")[1],
            amount: "100",
            sign: "123abc",
            commodityDesc: "商品描述",
            notifyUrl: "http://www.baidu.com",
            timeout: 15 * 3600,
            remark: "备注信息",
            tradeTypeList: [
                { statusName: `机票`, statusValue: 1 },
                { statusName: `火车票`, statusValue: 2 },
                { statusName: `酒店`, statusValue: 3 },
                { statusName: `京东企业购`, statusValue: 4 },
                { statusName: `有退款`, statusValue: 5 },
                { statusName: `其它`, statusValue: 6 },
            ],
            tradeType: 1,
            extra: "",
            result: {
                success: null,
                msg: "",
            },
        };
    },
    created() {},
    methods: {
        onBack() {
            this.goBack();
        },
        onRefresh() {
            this.result = {
                success: null,
                msg: "",
            };
        },
        submit() {
            let {
                shopId,
                orderNo,
                amount,
                sign,
                commodityDesc,
                notifyUrl,
                timeout,
                remark,
                tradeType,
                extra,
            } = this;
            const params = {
                shopId,
                orderNo,
                amount: Number(amount) * 100,
                sign,
                commodityDesc,
                notifyUrl,
                timeout,
                remark,
                tradeType,
                extra,
            };
            this.submitLoading = true;
            this.result = {
                success: null,
                msg: "",
            };
            PaymentTestService.createPayOrder(params)
                .then((result) => {
                    // 服务器正常返回
                    this.submitLoading = false;
                    // 业务成功
                    const paymentNo = result.paymentNo;
                    SnToast("成功获取支付单号: " + paymentNo);
                    NativeSupportApi.getCurrentUserInfo().then((userinfo) => {
                        const orderParams = {
                            UAId: userinfo.UAId,
                            cpyId: userinfo.cpyId,
                            paymentNo,
                            shopId,
                            orderNo,
                            amount,
                            notifyUrl,
                            tradeType,
                            remark,
                        };
                        console.log(
                            "orderParams == ",
                            JSON.stringify(orderParams)
                        );
                        if (tradeType == 5) {
                            orderParams.reason = remark;
                            BrowserApi.callHandler(
                                "QuickPaymentRefundFunction",
                                data
                            )
                                .then((res) => {
                                    console.log(
                                        "QuickPaymentRefundFunction res == ",
                                        res
                                    );
                                    if (res.ret === 0) {
                                        this.result = {
                                            success: true,
                                            msg: "退款成功",
                                        };
                                    } else {
                                        this.result = {
                                            success: false,
                                            msg: res.errorMsg || "退款失败",
                                        };
                                    }
                                })
                                .catch((rej) => {
                                    console.log("rej == ", rej);
                                });
                        } else {
                            BrowserApi.callHandler(
                                "QuickPaymentPayOrderFunction",
                                data
                            )
                                .then((res) => {
                                    console.log(
                                        "QuickPaymentPayOrderFunction res == ",
                                        res
                                    );
                                    if (res.ret === 0) {
                                        this.result = {
                                            success: true,
                                            msg: "支付成功",
                                        };
                                    } else {
                                        this.result = {
                                            success: false,
                                            msg: res.errorMsg || "支付失败",
                                        };
                                    }
                                })
                                .catch((rej) => {
                                    console.log("rej == ", rej);
                                });
                        }
                    });
                })
                .catch(() => {
                    // 异常处理
                    this.submitLoading = false;
                });
        },
    },
};
</script>