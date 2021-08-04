<!--
 --@IDE      : WebStorm
 --@time     : 2020/12/17 9:49
 --@author   : 李艳鹏
 --@Software : app
 --@File     : index
 --@describe : describe
-->
<template>
    <page-one ref="pageOne" :page-data="pageData" @importBOrder="importBOrder"
              :page-right="pageRight">
        <template #insertOrder>
            <el-dialog
                append-to-body
                destroy-on-close
                :close-on-click-modal="false"
                :close-on-press-escape="true"
                :visible.sync="visible"
                fullscreen
                ref="dialog"
                custom-class="myDialog"
            >
                <template #title><h2>万号商机单导入(ESC退出)</h2></template>
                <importCustomer :page-right="pageRight" :api="pageData.api"
                                v-if="visible"
                                :parent-scope="parentScope"
                ></importCustomer>
            </el-dialog>
        </template>
    </page-one>
</template>

<script>
    import pageOne from "../index"
    import importCustomer from "./content/importCustomer.vue"
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
                parentScope: null,
                visible: false,
                pageData: {
                    api: {
                        select: "tent_select", // 订单查询
                        selectAll: "tent_selectAll",
                        remind: "", // 订单提醒信息
                        grouby: "", // 分组
                        xiuuplogin: "tent_xiuuplogin", // 分配
                        xiugai: "tent_update", // 信息的修改

                        autoaccept: "tent_autobusiness", // 自动受理
                        transferorder: "tent_aboutbusiness", // 人工流转

                        excelfish: "", //导出文件
                        insertOneFi: "tent_insert", // 单个导入
                        daoruexcele: "", //订单批量导入
                        templateUrl: "", // 商机模板下载
                    },
                    localColumns: this.$c_tenHaotable_infoFlow, // 万号列
                    tableColumns: [
                        {label: "商机单编号", field: "id", width: "100"},
                        {label: "客户姓名", field: "name", width: "100"},
                        {label: "身份证号", field: "idcard", width: "180"},
                        {label: "联系电话", field: "phone", width: "150"},
                        {label: "业务号码", field: "broadband", width: "150"},
                        {label: "省份", field: "areas", width: "100"},
                        {label: "地市", field: "address", width: "100"},
                        {label: "业务员", field: "servicename", width: "100"},
                        {label: "产品名称", field: "accept", width: "250"},
                        {label: "渠道/一级", field: "channels", width: "150"},
                        {label: "渠道/二级", field: "channel", width: "150"},
                        {label: "创建时间", field: "ordertime", width: "180"},
                        {label: "跟踪时间", field: "trackingtime", width: "180", sortable: "custom"},
                        // {label: "广告主", field: "nameofadvertiser", width: "150"},
                        // {label: "来源", field: "toproomotelinks", width: "150"},
                        {label: "营销结果", field: "statos", width: "150"},
                        // {label: "二级营销结果", field: "failure", width: "150"},
                        {label: "订单状态", field: "orderStatus", width: "150"},
                    ], // 飞鱼展示的列
                    type: "tenHao",
                    alias: "10000号"
                }
            }
        },
        methods: {
            importBOrder() {
                this.parentScope = this;
                this.visible = true;
            },
            async init() {
                await this.$refs['pageOne'].init()
            }
        },
        watch: {
            visible(v) {
                return v || (this.$refs['pageOne'].table_query(), this.parentScope = null);
            }
        }

    }
</script>

<style scoped>

</style>
