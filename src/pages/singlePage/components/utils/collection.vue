<template>
    <div>
        <SnListItem 
                    title="选择收款银行" 
                    @click="showcollFn"
                    :label-number="20"
                    value="" 
                    value-position="left"
                    right-icon="right"
                />
       <Collapse :dataList='dataList' ref="collapse"></Collapse>
    </div>
</template>

<script>
import baseRouter from "@/baseView/baseRouter";
import Collapse from './collapse'
import { SnListItem } from "sinosun-ui";
export default {
    extends: baseRouter,
    components: {
        Collapse,
        SnListItem
    },
    data() {
        return {
            dataList:[
                {
                    title:'企业下挂账户',
                    list:[
                        {
                            img:'',
                            name:'张爽',
                            label:'四川农信(2331)'
                        },
                        {
                            img:'',
                            name:'大王',
                            label:'四川农信(2331)'
                        },
                        {
                            img:'',
                            name:'让大哥',
                            label:'四川农信(2331)'
                        }
                    ]
                },
                {
                    title:'财务部',
                    list:[
                        {
                            img:'',
                            name:'他如果',
                            label:'四川农信(2331)'
                        },
                        {
                            img:'',
                            name:'五千多',
                            label:'四川农信(2331)'
                        },
                        {
                            img:'',
                            name:'加工费',
                            label:'四川农信(2331)'
                        }
                    ]
                },
                {
                    title:'财务部',
                    list:[
                        {
                            img:'',
                            name:'他如果',
                            label:'四川农信(2331)'
                        },
                        {
                            img:'',
                            name:'五千多',
                            label:'四川农信(2331)'
                        },
                        {
                            img:'',
                            name:'加工费',
                            label:'四川农信(2331)'
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        showcollFn(){
            this.$refs.collapse.collResetFn()
        }
    },
};
</script>
<style scoped lang="less">
</style>