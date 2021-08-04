<!--
-*- coding:utf-8 -*-
@IDE      : WebStorm
@time     : 2020/10/28-14:15
@author   : 李艳鹏
@Software : app
@File     : second
@describe : 商机单的 id  历史记录
-->
<template>
    <el-container style="height: calc(100vh - 120px)">
        <el-main>
            <el-table
                :data="tableData"
                :cell-style="{'text-align':'center'}"
                :empty-text="emptyText"
                max-height="800px"
                :header-cell-style="{'text-align':'center','background-color':'rgba(193, 206, 214, 1)','fontSize':'14px',color:'black',fontWeight:600}"
            >
                <template v-for="(item,index) in columnList">
                    <template v-if="item.prop !=='remark'">
                        <el-table-column :label="item.label" :key="index" :prop="item.prop"
                                         :min-width="item.width">
                        </el-table-column>
                    </template>
                    <template v-else>
                        <el-table-column :label="item.label" :key="index" :prop="item.prop"
                                         :min-width="item.width">
                            <template slot-scope="prop">
                                <el-input type="textarea" :autosize="{ minRows: 2,}" readonly
                                          :value="prop.row.remark"></el-input>
                            </template>
                        </el-table-column>
                    </template>

                </template>
            </el-table>

        </el-main>
    </el-container>
</template>

<script>
    import {columnList } from "../data/second.js"

    export default {
        name: "second",
        props: [
            'scope', // 表格作用域
            'parentScope', // 父级作用域
            'rootScope', // index作用域
            "api",
            "pageType"
        ],
        data() {
            return {
                columnList,
                tableData: [],
                emptyText: "暂无数据"
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            async init() {
                await this.getTableData();
            },
            async getTableData() {
                try {
                    const {data, total} = await this.parentScope.queryHistory()
                    this.emptyText = "暂无数据";
                    this.tableData = data;
                } catch (e) {
                    this.tableData = [];
                    this.emptyText = e.message;
                }
            }
        }

    }
</script>

<style scoped>

</style>
