<!--
 --@IDE      : WebStorm
 --@time     : 2021/2/19 9:15
 --@author   : 李艳鹏
 --@Software : app
 --@File     : index
 --@describe : 订单生产
-->
<template>
    <order-page order-type="order" :storage-column="this.$c_ordertable"
                :table-column="tableColumn" :api="api" ref="orderQuery"></order-page>
</template>

<script>
    import orderPage from "../item/index"

    export default {
        name: "index",
        components: {
            orderPage
        },
        data() {
            return {
                tableColumn: [
                    {label: "订单编号", field: "workid", width: "100"},
                    {label: "客户姓名", field: "name", width: "100"},
                    {label: "身份证号", field: "idcard", width: "180"},
                    // {label: "是否异常", field: "abnormal", width: "80"},
                    {label: "省份", field: "areas", width: "100"},
                    {label: "地市", field: "address", width: "100"},


                    {label: "联系电话", field: "phone", width: "150"},
                    {label: "业务号码", field: "broadband", width: "150"},

                    {label: "渠道/一级", field: "channels", width: "150"},
                    {label: "渠道/二级", field: "channel", width: "150"},

                    {label: "受理业务", field: "product", width: "250"},
                    {label: "订单状态", field: "status", width: "100"},
                    // {label: "受理状态", field: "statos", width: "100"},
                    {label: "安装地址", field: "interior", width: "200"},
                    {label: "预约时间", field: "appointmenttime", width: "120"},
                    {label: "下单时间", field: "ordertime", width: "180"},
                    {label: "受理员", field: "assigneeName", width: "100"},
                    {label: "业务员", field: "servicename", width: "100"},
                ],
                api: {
                    select: "work_cha", // 查询接口
                    group: "work_goury", // 分组
                    changeState: "work_remark", // 状态流转
                    editRemark: "work_remarks", // 修改工单备注
                    orderInsert: "cust_cha", // 受理工单填写
                    orderDel: "cust_deleteorder", // 受理工单删除
                    editUser: "work_changeInfo" // 修改用户信息
                }
            }
        },
        methods: {
            init() {
                this.$refs["orderQuery"].init();
            }
        }
    }
</script>

<style scoped>

</style>
