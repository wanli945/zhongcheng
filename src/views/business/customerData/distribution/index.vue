<!--
 --@IDE      : WebStorm
 --@time     : 2020/12/17 9:49
 --@author   : 李艳鹏
 --@Software : app
 --@File     : index
 --@describe : describe
-->
<template>
    <page-one :page-data="pageData" :page-right="pageRight" ref="pageOne"></page-one>
</template>

<script>
    import pageOne from "../index"

    export default {
        name: "index",
        props: {
            pageRight: {
                type: String,
                default: "all",
            }
        },
        components: {
            pageOne
        },
        data() {
            return {
                pageData: {
                    api: {
                        select: "dist_querydist", // 订单查询
                        selectAll: "",
                        remind: "", // 订单提醒信息
                        grouby: "", // 分组
                        xiuuplogin: "", // 分配
                        xiugai: "dist_disxiu", // 信息的修改

                        autoaccept: "", // 自动受理
                        transferorder: "dist_transferlist", // 人工流转

                        excelfish: "", //导出文件
                        insertOneFi: "", // 单个导入
                        daoruexcele: "", //订单批量导入
                        templateUrl: "", // 商机模板下载
                    },
                    localColumns: this.$c_distributiontable_infoFlow, // 分销列
                    tableColumns: [
                        {label: "商机单编号", field: "id", width: "100"},
                        {label: "客户姓名", field: "name", width: "100"},
                        {label: "联系电话", field: "phone", width: "150"},
                        {label: "业务号码", field: "broadband", width: "150"},
                        {label: "身份证号", field: "idcard", width: "180"},
                        {label: "省份", field: "areas", width: "100"},
                        {label: "地市", field: "address", width: "100"},

                        {label: "产品名称", field: "accept", width: "250"},
                        {label: "业务员", field: "servicename", width: "100"},
                        {label: "营销结果", field: "statos", width: "150"},
                        // {label: "二级营销结果", field: "failure", width: "150"},
                        {label: "订单状态", field: "orderStatus", width: "150"},
                        {label: "下单时间", field: "ordertime", width: "180"},
                        {label: "跟踪时间", field: "trackingtime", width: "180", sortable: "custom"},
                        {label: "更新时间", field: "uplogintime", width: "180"},
                        // {label: "广告主", field: "nameofadvertiser", width: "150"},
                        {label: "渠道/一级", field: "channels", width: "150"},
                        {label: "渠道/二级", field: "channel", width: "150"},
                        {label: "来源", field: "toproomotelinks", width: "150"},
                    ],
                    type: "distribution",
                    alias: "分销商"
                }
            }
        },
        methods: {
            async init() {
                await this.$refs['pageOne'].init()
            }
        },
    }
</script>

<style scoped>

</style>

天猫 ：来源
终端外呼：广告主
万号：广告主  来源
