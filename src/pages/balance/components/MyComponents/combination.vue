<template>
    <div class="outer">
        <div class="container">
            <peopleImage></peopleImage>
        </div>
        <div class="ApprovalContainer" @click="goToCertificate">
            <Approval></Approval>
        </div>
    </div>
</template>

<script>
import peopleImage from '@/pages/balance/components/MyComponents/peopleImage.vue'
import Approval from '@/pages/balance/components/MyComponents/Approval.vue'

export default {
    methods:{
        goToCertificate(){
            this.$router.push({path:'/certificate'})
        }    
    },
    components:{
        peopleImage,
        Approval
    }
}
</script>

<style lang="less" scoped>
.outer{
    background: #f6f9fd;
    .container{
        border: honeydew;
    }
    .ApprovalContainer{
    }   
}

</style>