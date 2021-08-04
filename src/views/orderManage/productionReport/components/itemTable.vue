<!--
 --@IDE      : WebStorm
 --@time     : 2021/2/18 9:30
 --@author   : 李艳鹏
 --@Software : app
 --@File     : itemTable
 --@describe : describe
-->
<template>
    <el-table :data="tableData"
              :cell-style="{'text-align':'center','font-size':'16px'}"
              :header-cell-style="{
                      'text-align':'center',
                      'font-size':'18px',
                      'font-weight':'bold',
                      color:'rgb(0,0,0)'
                      }"
              border
              max-height="600px"
    >
        <template v-for="(item,index) in tableColumns">
            <el-table-column :prop="item.prop" :width="item.width" :label="item.label"
                             :key="index"></el-table-column>
        </template>
    </el-table>
</template>

<script>
    export default {
        name: "itemTable",
        props: {
            tableData: {
                type: Array,
                required: true
            },
            tableColumns: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>
