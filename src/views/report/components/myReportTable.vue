<!--
 --@IDE      : WebStorm
 --@time     : 2021/2/3 14:11
 --@author   : 李艳鹏
 --@Software : app
 --@File     : myReportTable
 --@describe : describe
-->
<template>
    <el-table :data="tableData"
              :empty-text="emptyText"
              :cell-style="{'text-align':'center','font-size':'16px'}"
              :header-cell-style="{
                      'text-align':'center',
                      'font-size':'18px',
                      'font-weight':'bold',
                      color:'rgb(0,0,0)'
                      }"
              max-height="700px"
              :border="false"
              @sort-change="sortChange">
        <template v-for="(item,index) in columnArr">
            <el-table-column :prop="item.prop" :label="item.label" :key="index" :sortable="item.sortable ? item.sortable : false"
                             :min-width="item.width"></el-table-column>
        </template>
    </el-table>
</template>

<script>
    export default {
        name: "myReportTable",
        props: {
            tableData: {type: Array, required: true},
            columnArr: {type: Array, required: true},
            emptyText: {type: [String, undefined]},
        },
        methods: {
            sortChange(c,p,o) {
                this.$emit('sortChange',c,p,o)
            }
        }
    }
</script>

<style scoped>

</style>
