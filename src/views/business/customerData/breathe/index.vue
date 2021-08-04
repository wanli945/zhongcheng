<!--
 --@IDE      : WebStorm
 --@time     : 2020/12/17 9:49
 --@author   : 李艳鹏
 --@Software : app
 --@File     : index
 --@describe : 终端外呼
-->
<template>
    <page-one @importBOrder="importBOrder" ref="pageOne" :page-data="pageData"
              :page-right="pageRight">
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
                <template #title><h2>终端外呼商机单导入</h2></template>

                <importCustomer :page-right="pageRight" :api="pageData.api"
                                :parent-scope="parentScope"
                ></importCustomer>
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
                visible: false,
                pageData: {
                    api: {
                        select: "breathe_select", //
                        selectAll: "breathe_selectAll",
                        remind: "", // 订单提醒信息
                        grouby: "", // 分组
                        xiuuplogin: "breathe_xiuuplogin", // 分配
                        xiugai: "breathe_update", // 信息的修改

                        autoaccept: "", // 自动受理
                        transferorder: "breathe_zhuan", // 人工流转

                        excelfish: "", //导出文件
                        insertOneFi: "breathe_insert", // 单个导入
                        daoruexcele: this.$fileApi.breath_execltent, //订单批量导入
                        templateUrl: "/template/终端外呼导入模板.xlsx", // 商机模板下载
                    },
                    localColumns: this.$c_breathtable_infoFlow, // 外呼
                    tableColumns: [
                        {label: "商机单编号", field: "id", width: "100"},
                        {label: "客户姓名", field: "name", width: "100"},
                        {label: "身份证号", field: "idcard", width: "180"},

                        {label: "联系方式", field: "phone", width: "150"},
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
                        /* {label: "来源", field: "toproomotelinks", width: "150"},*/

                        {label: "营销结果", field: "statos", width: "150"},
                        // {label: "二级营销结果", field: "failure", width: "150"},
                        {label: "订单状态", field: "orderStatus", width: "150"},
                        {label: "现有套餐类型", field: "nowPackageType", width: "180"},
                    ], // 飞鱼展示的列

                    type: "breathe",
                    alias: "外呼"
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
