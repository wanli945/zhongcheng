<!--

提成佣金轨迹（测试）
-->
<template>
    <order-history :column-list="columnList"
                   :options="{...this.options,isitright:0}"></order-history>
</template>

<script>
    import OrderHistory from "./component/orderHistory";

    export default {
        name: "second",
        components: {OrderHistory},
        props: {
            options: Object
        },
        data() {
            return {
                columnList: [
                    {label: "轨迹ID", prop: "id", width: "100"},
                    {label: "当前状态", prop: "state", width: "100"},
                    {label: "操作时间", prop: "time", width: "120"},
                    {label: "操作人", prop: "operator", width: "120"},
                    {label: "动作", prop: "button", width: "120"},
                    {label: "备注", prop: "remark", width: "500"}
                ],
            }
        },
    }
</script>
