<template>
    <div>
        <div class="approvalApplicant">
            <div class="container">
                <div class="isApplicant">
                    <div class="applyTime">2019-12-30 15:00 </div>
                    <div class="applyStatus">申请者</div>
                </div>
                <div class="applicantInformation">
                    <div class='applicantImage'></div>
                    <div class="applycantName">张山</div>
                    <div class="imageContainer">
                        <SnIcon type='pen'></SnIcon>
                        <SnIcon type='chat'></SnIcon>
                    </div>
                </div>
                <div class="approvalSuggestion">
                    <div>审批意见：意见内容</div>
                    <div>转账后字符改为结算卡支付</div>
                </div>
            </div>
            <div class="infomerBackground">
                <div class="infomer">
                    <div class="informTo">知会给:</div>
                    <div class="infomerNmae">刘毅、张山</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {SnIcon} from 'sinosun-ui'
export default {
    components:{
        SnIcon
    }
    
}
</script>

<style lang="less" scoped>
.approvalApplicant{
    overflow: hidden;
    background: #ffffff;
    border-radius: .2rem;

    .isApplicant{
        display: flex;
        justify-content: space-between;
        background: #ffffff;
        display: flex;

        .applyTime{
            opacity: 0.7;
            font-size: .24rem;
            font-weight: 400;

        }
        .applyStatus{
            font-size: .26rem;
            font-weight: 400;
        }
    }
    .container{
        padding: .3rem .58rem .18rem .98rem;
        .applicantInformation{
            margin-top: .18rem;
            display: flex;
            align-items: center;
        .applicantImage{
            width: .92rem;
            height: .92rem;
            background-color: rgb(240, 92, 92);
        }
        .applycantName{
            margin-left: .22rem;
            font-size: .36rem;
            font-weight: 500;
        }
    }
        .approvalSuggestion{
            margin-top: .38rem;
            font-size:.26rem;
            font-weight:400;
            color: #666666;
        }
        .imageContainer{
            display: flex;
            justify-content: space-between;
            flex:1;
            margin-left:.32rem;
        }
    }

    .infomerBackground{
        background: rgba(246,249,253,0.50);;
        border-bottom-right-radius: .2rem;
        border-bottom-left-radius: .2rem;       
        .infomer{
            margin: .44rem 0 0 .94rem;
            display: flex;
            background: rgba(246,249,253,0.50);
            min-height: .88rem;
            align-items: center;
            .informTo{
                
                width: .96rem;
                height: .34rem;
                font-size: .24rem;
                font-weight: 400;
                color:#a4acb2;
            }
            .infomerNmae{
                font-size:.26rem;
                font-weight: 400;
                color:#333333;
            }
        }
    }
  
}
</style>