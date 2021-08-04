<!--
 --@IDE      : WebStorm
 --@time     : 2020/12/17 9:49
 --@author   : 李艳鹏
 --@Software : app
 --@File     : index
 --@describe : 信息流
-->
<template>
    <page-one ref="pageOne" @importBOrder="importBOrder" :page-data="pageData"
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
                <template #title><h2>{{importTitle}}</h2></template>

                <importCustomer :api="pageData.api"
                                :parent-scope="parentScope"
                                :page-right="pageRight"
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
        created() {
            console.log(this.pageRight)
        },
        data() {
            return {
                importTitle: this.pageRight === 'oneBroadband' ? '单宽维系商机单导入' : '信息流商机单导入',
                pageData: {
                    api: {
                        // select: "fley_queryFi", // 订单查询
                        select: this.pageRight === 'oneBroadband' ? "keep_queryFi" : "fley_queryFi",
                        selectAll: "fley_queryAllFi",
                        remind: "fley_remind", // 订单提醒信息
                        // grouby: "fley_grouby", // 分组
                        grouby: this.pageRight === 'oneBroadband' ? " " : "fley_grouby", // 分组
                        // xiuuplogin: "fley_xiuuplogin", // 分配
                        xiuuplogin: this.pageRight === 'oneBroadband' ? "keep_xiuuplogin" : "fley_xiuuplogin",
                        // xiugai: "fley_xiugai", // 信息的修改
                        xiugai: this.pageRight === 'oneBroadband' ? "keep_xiugai" : "fley_xiugai",
                        autoaccept: "workinfo_autoaccept", // 流转 自动
                        transferorder: "fley_transferorder", // 人工
                        excelfish: "daoexcel_excelfish", //导出文件

                        // insertOneFi: "fley_insertOneFi", // 单个导入
                        insertOneFi: this.pageRight === 'oneBroadband' ? "keep_insertOneFi" : "fley_insertOneFi",
                        daoruexcele: this.$fileApi.daoruexcele,//订单批量导入
                        templateUrl: "/template/信息流导入模板.xlsx", // 商机模板下载
                    },
                    localColumns: this.$c_fytable_infoFlow, // 飞鱼列
                    tableColumns: [
                        {label: "商机单编号", field: "id", width: "100"},
                        {label: "客户姓名", field: "name", width: "150"},
                        {label: "联系电话", field: "phone", width: "150"},

                        {label: "地市", field: "address", width: "100"},
                        {label: "产品名称", field: "accept", width: "250"},
                        {label: "备注", field: "remark", width: "350"},
                        {label: "安装地址", field: "interior", width: "250"},
                        {label: "业务员", field: "servicename", width: "100"},
                        {label: "营销结果", field: "statos", width: "150"},
                        // {label: "二级营销结果", field: "failure", width: "150"},
                        {label: "订单状态", field: "orderStatus", width: "150"},
                        {label: "下单时间", field: "ordertime", width: "180"},
                        {label: "跟踪时间", field: "trackingtime", width: "180", sortable: "custom"},
                        {label: "更新时间", field: "uplogintime", width: "180"},
                        {label: "广告主", field: "nameofadvertiser", width: "150"},
                        {label: "渠道/二级", field: "channel", width: "120"},
                        {label: "来源", field: "toproomotelinks", width: "150"},
                        {label: "身份证号", field: "idcard", width: "200"},
                        {label: "渠道/一级", field: "channels", width: "120"},
                        {label: "省份", field: "areas", width: "100"},
                        {label: "业务号码", field: "broadband", width: "150"},
                    ], // 飞鱼展示的列

                    // type: "infoFlow",
                    type: this.pageRight === 'oneBroadband' ? "oneBroadband" : "infoFlow",
                    // alias: "信息流",
                    alias: this.pageRight === 'oneBroadband' ? "单宽维系" : "信息流"
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
