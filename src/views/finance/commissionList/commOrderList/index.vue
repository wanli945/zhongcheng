<!--
 --@IDE      : WebStorm
 --@time     : 2020/12/21 9:13
 --@author   : 李艳鹏
 --@Software : app
 --@File     : index
 --@describe : 工单清单展示
-->
<template>
    <table_page
        :total='pagination.total'
        :current-page="pagination.curpage"
        :page-size="pagination.pagesize"
        @size-change="pageSize=> {pagination.curpage = 1;pagination.pagesize = pageSize;operating_select()}"
        @current-change="curPage=>(pagination.curpage = curPage,operating_select())"
    >
        <template #paramsList>
            <template v-for="(item,index) of paramsList">
                <query-option-item
                    :label="item.label"
                    v-model.trim="item.value"
                    :type="item.type"
                    :key="item.field"
                    :index="index"
                    :select-list="item.selectList||[]"
                    :cascader-list="item.cascaderList|| []"
                    :placeholder="item.placeholder"
                    show-all-levels
                    :cascader-props="item.cascaderProps"
                    :show="item.show"
                >
                </query-option-item>
            </template>
        </template>
        <template #left_btn>
            <el-button type="primary" @click="operation_reset" icon="el-icon-refresh-left">重置
            </el-button>
            <el-button type="success"
                       @click="()=>(pagination.curpage = 1,operating_select())"
                       icon="el-icon-search">查询
            </el-button>

            <el-button type="warning"
                       @click="operating_select()"
                       icon="el-icon-refresh">刷新
            </el-button>
        </template>
        <template #right_btn>
            <el-button type="success" icon="el-icon-download">导出
            </el-button>
            <el-button type="info" icon="el-icon-upload2">导入
            </el-button>
        </template>
        <template #body>
            <co-table ref="table" :scope="this"></co-table>
        </template>
    </table_page>
</template>

<script>
    import Table_page from "../../../../common/components/table_page/index";
    import QueryOptionItem from "../../../../common/components/table_page/item";
    import CoTable from "./components/CoTable";
    import pageData from "./data/data.js"

    export default {
        name: "index",
        components: {CoTable, QueryOptionItem, Table_page},
        activated() {
            this.operating_select();
            this.$root.finance.commissionList.commOrderList.index = this;
        },
        data() {
            return {
                pagination: {
                    total: 0,
                    curpage: 1,
                    pagesize: 10,
                },
                paramsList: pageData().paramsList
            }
        },
        methods: {
            operating_select() {
                this.$refs['table'].table_select({
                    params: this.paramsList,
                    pagination: this.pagination
                }).then(value => {
                    this.pagination.total = value
                });
            },
            operation_reset() {
                this.paramsList = pageData().paramsList;
                this.pagination.curpage = 1;
                this.operating_select();
            },
        },
        deactivated() {
            this.$root.finance.commissionList.commOrderList.index = null;
        },
    }
</script>

<style scoped>

</style>
