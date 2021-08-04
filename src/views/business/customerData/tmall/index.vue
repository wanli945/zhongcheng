<!--
 --@IDE      : WebStorm
 --@time     : 2020/12/17 9:49
 --@author   : 李艳鹏
 --@Software : app
 --@File     : index
 --@describe : 天猫模块
 [
 {}

 ]
-->
<template>
    <page-one ref="pageOne"
              @importBOrder="importBOrder"
              :page-data="pageData"
              :page-right="pageRight"
    >
        <template #insertOrder>
            <el-dialog append-to-body destroy-on-close
                       :close-on-click-modal="false"
                       :close-on-press-escape="false"
                       :visible.sync="visible"
                       width="800px"
                       v-if="visible"
                       ref="dialog"
                       custom-class="myDialog"
            >
                <template #title><h2>天猫商机单导入</h2></template>
                <importCustomer :api="pageData.api"
                                :parent-scope="parentScope"
                                :page-right="pageRight"
                >
                </importCustomer>
            </el-dialog>
        </template>
    </page-one>
</template>

<script>
    import pageOne from "../index"
    import importCustomer from "./content/importCustomer"
    export default {
        name: "index",
        props: {
            pageRight: {
                type: String,
                default: "all",
            }
        },
        components: {
            pageOne,
            importCustomer
        },

        data() {
            return {
                pageData: {
                    api: {
                        select: "tmall_select", // 订单查询
                        selectAll: "tmall_selectAll",
                        remind: "", // 订单提醒信息
                        grouby: "", // 分组
                        xiuuplogin: "tmall_xiuuplogin", // 分配
                        xiugai: "tmall_update", // 信息的修改

                        autoaccept: "", // 自动受理
                        transferorder: "tmall_tamllzhuan", // 人工流转

                        excelfish: "", //导出文件
                        insertOneFi: "tmall_insert", // 单个导入
                        //
                        daoruexcele: "", //订单批量导入
                        templateUrl: "", // 商机模板下载
                    },
                    localColumns: this.$c_tmalltable_infoFlow, // 天猫商机单
                    tableColumns: [
                        {label: "商机单编号", field: "id", width: "100"}, //
                        {label: "客户姓名", field: "name", width: "100"}, //
                        {label: "身份证号", field: "idcard", width: "180"},
                        {label: "联系电话", field: "phone", width: "150"}, //
                        {label: "业务号码", field: "broadband", width: "150"},
                        {label: "省份", field: "areas", width: "100"},
                        {label: "地市", field: "address", width: "100"},

                        {label: "业务员", field: "servicename", width: "100"},
                        {label: "产品名称", field: "accept", width: "250"},
                        {label: "营销结果", field: "statos", width: "150"},
                        {label: "订单状态", field: "orderStatus", width: "150"},
                        {label: "创建时间", field: "ordertime", width: "180"},
                        {label: "跟踪时间", field: "trackingtime", width: "180", sortable: "custom"},

                        {label: "渠道/一级", field: "channels", width: "150"},
                        {label: "渠道/二级", field: "channel", width: "150"},
                        // {label: "天猫订单号", field: "tmallId", width: "220"},
                        // {label: "来源", field: "toproomotelinks", width: "150"},
                        // {label: "营销结果", field: "statos", width: "150"},


                        // {label: "二级营销结果", field: "failure", width: "150"},

                        // {label: "广告主", field: "nameofadvertiser", width: "150"},

                    ], // 飞鱼展示的列

                    type: "tmall",
                    alias: "天猫"
                },
                visible: false,
                parentScope: null,
            }
        },
        methods: {
            importBOrder() {
                this.parentScope = this;
                this.visible = true;
            },
            async init() {
                await this.$refs['pageOne'].init()
            },
        },
        watch: {
            visible(v) {
                return v || (this.$refs['pageOne'].table_query(), this.parentScope = null);
            }
        },

    }
</script>

<style scoped>

</style>
