<!--
 --@IDE      : WebStorm
 --@time     : 2020/12/21 9:45
 --@author   : 李艳鹏
 --@Software : app
 --@File     : CoTable
 --@describe : describe
-->
<!--// 工单清单table表格-->
<template>
    <el-table :data="tableData"
              ref="materialTable"
              :stripe="true"
              :highlight-current-row="true"
              :empty-text="tableEmpty"
              style="width: 100%;cursor: pointer;"
              :cell-style="{'text-align':'center'}"
              @row-click="(row)=>rowClick(row,'materialTable')"
              border
              max-height="650px"
              :header-cell-style="{'text-align':'center','background-color':'rgba(193, 206, 214, 1)','fontSize':'14px',color:'black',fontWeight:600}"
    >
        <el-table-column type="expand" fixed>
            <template slot-scope="{$index,row}">
                <el-table :data="row.accountList"
                          :stripe="true"
                          :highlight-current-row="true"
                          :empty-text="tableEmpty"
                          style="width: 100%;cursor: pointer;"
                          row-key="id"
                          :cell-style="{'text-align':'center'}"
                          border
                          :header-cell-style="{'text-align':'center','background-color':'rgba(193, 206, 214, 1)','fontSize':'14px',color:'black',fontWeight:600}"
                >
                <!-- 工单清单的展开列 -->
                    <el-table-column width="100" label="编号" prop="id"></el-table-column>
                    <el-table-column width="200" label="资产号码" prop="account"></el-table-column>
                    <el-table-column width="150" label="行为" prop="behavior"></el-table-column>
                    <el-table-column width="150" label="当前状态" prop="curStatus"></el-table-column>
                </el-table>
            </template>
        </el-table-column>
        <template v-for="(item,index) of tableColumns">
            <!--
                   :min-width="item.width"
                   -->
            <el-table-column :min-width="item.width" :label="item.label" :prop="item.field"
                             :key="index"></el-table-column>
        </template>
    </el-table>
</template>

<script>
    import {columns} from "./CoTable.data.js"

    export default {
        name: "CoTable",
        data() {
            return {
                tableData: [],
                tableColumns: columns,
                tableEmpty: "暂无数据"
            }
        },

        methods: {
            rowClick(row, ref) {
                this.$refs[ref].toggleRowExpansion(row)
            },
            table_select(params) {
                return new Promise((resolve, reject) => {
                    this.$axios.post("workinfo_queryAllWorkorder", {}, {
                        params,
                        showLoading: false
                    }).then(({list, total}) => {
                        this.tableData = list;
                        this.tableEmpty = "暂无数据"
                        resolve(total)
                    }).catch(reason => {
                        this.tableEmpty = reason.message
                        this.tableData = [];
                        resolve(0)
                    })
                })
            }
        },
        rowClick() {

        }
    }
</script>

<style scoped>

</style>
