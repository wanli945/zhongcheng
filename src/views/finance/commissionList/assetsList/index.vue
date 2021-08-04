<!--
 --@IDE      : WebStorm
 --@time     : 2020/12/22 9:20
 --@author   : 李艳鹏
 --@Software : app
 --@File     : index
 --@describe : 佣金清单 单个资产
-->
<template>
    <table_page
        :total='pagination.total'
        :current-page="pagination.curpage"
        :page-size="pagination.pagesize"
        @size-change="pageSize=> {pagination.curpage = 1;pagination.pagesize = pageSize}"
        @current-change="curPage=>pagination.curpage = curPage"
    >
        <template #paramsList>
            <template v-for="(item,index) of queryOption">
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
                    <template #other>
                        <template v-if="item.field==='accountPeriod'">
                            <el-date-picker
                                v-model.trim="item.value"
                                type="month"
                                format="yyyyMM"
                                value-format="yyyyMM"
                                clearable
                                placeholder="请选择账期">
                            </el-date-picker>
                        </template>
                        <template v-if="item.field === 'accountPeriodRange'">
                            <el-date-picker
                                v-model.trim="item.value"
                                type="monthrange"
                                range-separator="至"
                                start-placeholder="开始月份"
                                format="yyyyMM"
                                value-format="yyyyMM"
                                clearable
                                end-placeholder="结束月份">
                            </el-date-picker>
                        </template>
                    </template>
                </query-option-item>
            </template>
        </template>
        <template #left_btn>
            <el-button type="primary" @click="resetQueryOption" icon="el-icon-refresh-left">重置
            </el-button>
            <el-button type="success"
                       @click=" pagination.curpage === 1 ? table_select() : pagination.curpage = 1"
                       icon="el-icon-search">查询
            </el-button>
            <el-button type="warning" @click="table_select" icon="el-icon-refresh">刷新
            </el-button>
        </template>
        <template #right_btn>
            <el-button type="info" @click="uploadDialog.visible=true" icon="el-icon-upload2">导入
            </el-button>
        </template>
        <template #body>
            <el-table
                :data="table_data"
                border
                max-height="700px"
                row-key="id"
                :header-cell-style="{'text-align':'center','background-color':'rgba(193, 206, 214, 1)','fontSize':'14px',color:'black',fontWeight:600}"
                :empty-text="emptyText"
            >
                <template v-for="(item,index) of assetsListColumns">
                    <!--
                    :min-width="item.width"
                    -->
                    <el-table-column :label="item.label" :prop="item.prop" :min-width="item.width"
                                     :key="index"></el-table-column>
                </template>
            </el-table>
        </template>
        <template #other>
            <!--导入信息的弹窗-->
            <el-dialog append-to-body :close-on-click-modal="false" width="400px"
                       :visible.sync="uploadDialog.visible">
                <template #title>
                    <h2>佣金清单导入</h2>
                </template>
                <div style="text-align: right;margin-bottom: 20px;">
                    <el-button size="small" type="primary"
                               @click="lodM">下载模板
                    </el-button>
                </div>
                <el-upload
                    ref="uploadExcel"
                    class="upload-demo"
                    drag
                    action=""
                    accept=".xlsx,.xls"
                    :multiple="false"
                    :http-request="uploadFile"
                    auto-upload
                    :show-file-list="false"
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__tip" slot="tip">只能上传xlsx/xls文件</div>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </el-dialog>
        </template>
    </table_page>
</template>

<script>
    import Table_page from "../../../../common/components/table_page/index";
    import QueryOptionItem from "../../../../common/components/table_page/item";
    import {queryOption, assetsListColumns} from "./data";

    export default {
        name: "index",
        components: {QueryOptionItem, Table_page},
        data() {
            return {
                pagination: {
                    total: 0,
                    curpage: 1,
                    pagesize: 10,
                },
                queryOption: queryOption(),
                assetsListColumns,
                table_data: [],
                emptyText: "",
                uploadDialog: {
                    visible: false
                }
            }
        },
        activated() {
            this.table_select();
        },
        methods: {
            lodM() {
                this.$DAFile("/template/佣金清单导入表.xlsx");
            },
            resetQueryOption() {
                this.queryOption = queryOption();
                this.pagination.curpage === 1 ? this.table_select() : this.pagination.curpage = 1;
            },
            table_select() {
                this.$axios.post("miss_querycomm", {}, {
                    params: {
                        ...this.queryOptionKS,
                        ...this.pagination,
                    },
                    showLoading: false
                }).then(({list, total, message}) => {
                    this.table_data = list;
                    this.pagination.total = total;
                    this.emptyText = "暂无数据";
                }).catch(({message}) => {
                    this.emptyText = message
                    this.table_data = [];
                    this.pagination.total = 0;
                })
            },
            uploadFile({action, file}) {
                let formData = new FormData();
                formData.append('empFile', file);
                this.$file.post(this.$fileApi.comm_daoruexcelecomm, formData, {
                    timeout: 1000 * 60 * 20,
                }).then(({code, entry, message, status, totalCount}) => {
                    this.$message({
                        type: code === 1 ? "success" : 'error',
                        message: entry || message,
                        duration: 1500
                    })
                }).catch(err => {
                    this.$message({
                        duration: 1000,
                        type: "error",
                        message: `${err.message} `
                    });
                }).finally(() => {
                    this.table_select();
                    this.uploadDialog.visible = false;
                })
            },
        },
        computed: {
            queryOptionKS() {
                let p = {};
                this.queryOption.forEach((v) => {
                    if (v.field === 'accountPeriodRange') {
                        p['otime'] = v.value[0] || "";
                        p['ptime'] = v.value[1] || "";
                    } else {
                        p[v.field] = v.value
                    }
                })
                return p;
            }
        },
        watch: {
            "pagination.curpage"() {
                this.table_select();
            },
            "pagination.pagesize"() {
                this.table_select();
            }
        }
    }
</script>

<style scoped>

</style>
