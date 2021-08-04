<!--
 --@IDE      : WebStorm
 --@time     : 2020/12/21 9:13
 --@author   : 李艳鹏
 --@Software : app
 --@File     : index
 --@describe : 结算分析
-->
<template>
    <table_page
        :total='pagination.total'
        :current-page="pagination.curpage"
        :page-size="pagination.pagesize"
        @size-change="pageSize=> {pagination.curpage = 1;pagination.pagesize = pageSize;table_select()}"
        @current-change="curPage=>{pagination.curpage = curPage;table_select()}"
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
                    <template #other>
                        <template v-if="item.field==='accountPeriod'">
                            <el-date-picker
                                v-model.trim="item.value"
                                type="month"
                                format="yyyyMM"
                                value-format="timestamp"
                                placeholder="请选择账期">
                            </el-date-picker>
                        </template>
                        <!--<template v-if="item.field === 'accountPeriodRange'">
                            <el-date-picker
                                v-model.trim="item.value"
                                type="monthrange"
                                range-separator="至"
                                start-placeholder="开始月份"
                                format="yyyyMM"
                                value-format="yyyyMM"
                                end-placeholder="结束月份">
                            </el-date-picker>
                        </template>-->
                    </template>
                </query-option-item>
            </template>
        </template>
        <template #left_btn>
            <el-button type="primary" icon="el-icon-refresh-left" @click="resetQuery">重置
            </el-button>
            <el-button type="success"
                       icon="el-icon-search"
                       @click="()=>{pagination.curpage = 1;table_select()} ">查询
            </el-button>
            <el-button type="danger" @click="table_select" icon="el-icon-refresh">刷新
            </el-button>
            <el-button type="warning" @click="changeStatus('已结算')"
                       :disabled="!chooseTableItemArr.length" icon="el-icon-document-checked">批量已结算
            </el-button>
            <el-button type="success" @click="changeStatus('未结算')"
                       :disabled="!chooseTableItemArr.length" icon="el-icon-document-remove">批量结算异常
            </el-button>

        </template>
        <template #right_btn>
            <!--            sett_settslist-->
            <el-button type="info" icon="el-icon-check" @click="generateList()">结算分析</el-button>
            <el-button type="success" icon="el-icon-download">导出
            </el-button>
            <!-- <el-button type="info" icon="el-icon-upload2">导入
             </el-button>-->
        </template>
        <template #body>
            <el-row :gutter="24" style="margin-bottom: 10px;" type="flex" justify="end">
                <el-col :span="10" style="text-align: right">
                    <el-button type="danger" size="small" @click="tableListSetting.visible = true"
                               icon="el-icon-s-cooperation"
                    ></el-button>
                </el-col>
            </el-row>
            <el-table
                :data="table_data"
                border
                max-height="700px"
                row-key="id"
                :header-cell-style="{'text-align':'center','background-color':'rgba(193, 206, 214, 1)','fontSize':'14px',color:'black',fontWeight:600}"
                ref="tableGG"
                @row-click="row=>$refs['tableGG'].toggleRowExpansion(row)"
                :empty-text="tableEmpty"
                @selection-change="chooseTableItem"
            >
                <el-table-column class-name="analysisExpend" fixed="left" type="expand">
                    <template slot-scope="prop">
                        <el-row>
                            <el-table
                                :data="prop.row.every"
                                border
                                row-key="id"
                                :header-cell-style="{'text-align':'center','background-color':'rgba(238, 238, 238,.6)','fontSize':'14px',color:'black',fontWeight:600,padding:'2px 0',}"
                                :cell-style="{'padding':'2px 0',textAlign:'center'}"
                            >
                                <template v-for="(item,index) of assetsListColumns">
                                    <el-table-column :label="item.label" :prop="item.prop"
                                                     :min-width="item.width"
                                                     :key="index"></el-table-column>
                                </template>
                                <template #empty>
                                    <el-input :value="prop.row.everyOrigin" autosize="auto"
                                              type="textarea" readonly></el-input>
                                </template>
                            </el-table>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column
                    type="selection"
                    min-width="55">
                </el-table-column>
                <template v-for="(item,index) of analysisListColumns">
                    <el-table-column :label="item.label" :prop="item.prop"
                                     :min-width="item.width"
                                     :key="index"></el-table-column>
                </template>
            </el-table>
        </template>
        <template #other>
            <el-dialog :visible.sync="tableListSetting.visible"
                       width="800px"
                       custom-class="tableListSetting"
                       modal-append-to-body
                       append-to-body
            >
                <template #title>
                    <h2>自定义表格列</h2>
                </template>
                <el-checkbox-group v-model.trim="tableListSetting.tableCustomizeList.beforeList"
                                   size="medium">
                    <el-checkbox
                        v-for="item of tableListSetting.tableCustomizeListItem.beforeColumn"
                        border
                        :label="item.prop" :key="item.prop">
                        {{item.label}}
                    </el-checkbox>
                </el-checkbox-group>
                <el-checkbox-group
                    v-model.trim="tableListSetting.tableCustomizeList.TPlus"
                    size="medium">
                    <el-checkbox
                        v-for="item of tableListSetting.tableCustomizeListItem.TPlus"
                        border
                        :label="item" :key="item">
                    </el-checkbox>
                </el-checkbox-group>
                <el-checkbox-group v-model.trim="tableListSetting.tableCustomizeList.afterList"
                                   size="medium">
                    <el-checkbox
                        v-for="item of tableListSetting.tableCustomizeListItem.afterColumn"
                        border
                        :label="item.prop" :key="item.prop">
                        {{item.label}}
                    </el-checkbox>
                </el-checkbox-group>
                <template #footer>
                    <el-button style="margin-bottom: 10px;margin-right: 20px"
                               @click="saveTableColumnsSetting" type="warning">保存设置
                    </el-button>
                </template>
            </el-dialog>
        </template>
    </table_page>
</template>

<script>
    import Table_page from "../../../../common/components/table_page/index";
    import QueryOptionItem from "../../../../common/components/table_page/item";
    import {
        analysisQuery,
        analysisListColumns,
        afterColumn,
        beforeColumn,
        TPlus,
        assetsListColumns
    } from "./data"
    // import table_data from "./data/mock"

    export default {
        name: "index",
        components: {QueryOptionItem, Table_page},
        activated() {
            this.$root.finance.commissionList.commOrderList.index = this;
            this.init();
        },
        data() {
            return {
                pagination: {
                    total: 0,
                    curpage: 1,
                    pagesize: 10,
                    months: {}
                },
                paramsList: analysisQuery(),
                table_data: [],
                tableEmpty: "暂无数据",
                analysisListColumns: [],
                assetsListColumns: assetsListColumns,
                tableListSetting: {
                    visible: false,
                    tableCustomizeList: {
                        beforeList: [],
                        afterList: [],
                        TPlus: []
                    },
                    tableCustomizeListItem: {
                        afterColumn,
                        beforeColumn,
                        TPlus: TPlus
                    },
                },
                chooseTableItemArr: []
            }
        },

        methods: {
            chooseTableItem(arr = []) {
                this.chooseTableItemArr = [];
                arr.forEach(v => {
                    this.chooseTableItemArr.push(v.orderId.trim())
                })
            },
            changeStatus(status) {
                this.$alert("", {
                    type: "info",
                    title: "状态修改",
                    message: `是否批量转${status}`
                }).then(value => {
                    this.$axios.post("sett_settstauts", {
                        tableArr: this.chooseTableItemArr,
                        status
                    }, {}).then(({message}) => {

                    }).catch(reason => {

                    })
                })
            },
            resetQuery() {
                this.paramsList = []
                this.paramsList.push(...analysisQuery())
                this.pagination.curpage = 1;
                this.table_select();
            },
            init() {
                this.table_select();
            },
            table_select() {
                this.generateColumns()
                this.$axios.post("sett_setts", {}, {
                    params: {
                        pagination: this.pagination,
                        paramsList: this.paramsList
                    },
                    showLoading: false
                }).then(({list, message, total}) => {
                    this.table_data = list;
                    this.pagination.total = total;
                    this.tableEmpty = "暂无数据"
                }).catch(({message}) => {
                    this.table_data = [];
                    this.tableEmpty = message
                    this.pagination.total = 0;
                })
            },

            /*
            *  todo 生成 对应的列名
            * */
            generateColumns() {
                let after = [], before = [], afterList = [], beforeList = [], Tc = [];
                try {
                    after = this.$c_anlaysistable.get().after || afterColumn
                    before = this.$c_anlaysistable.get().before || beforeColumn
                    Tc = this.$c_anlaysistable.get().TPlus || TPlus
                } catch (e) {
                    after = afterColumn;
                    Tc = TPlus;
                    before = beforeColumn
                }
                after.forEach(v => {
                    afterList.push(v.prop)
                })
                before.forEach(v => {
                    beforeList.push(v.prop)
                })
                this.tableListSetting.tableCustomizeList.afterList = afterList;
                this.tableListSetting.tableCustomizeList.beforeList = beforeList;
                this.tableListSetting.tableCustomizeList.TPlus = Tc;
                const {columns, months} = analysisListColumns(
                    {
                        that: this,
                        after: after,
                        before: before,
                        TPlus: Tc,
                    })
                this.analysisListColumns = columns;
                this.pagination.months = months
            },
            saveTableColumnsSetting() {
                const after = [], before = [];
                afterColumn.forEach(value => {
                    if (this.tableListSetting.tableCustomizeList.afterList.indexOf(value.prop) >= 0) {
                        after.push(value)
                    }
                })
                beforeColumn.forEach(value => {
                    if (this.tableListSetting.tableCustomizeList.beforeList.indexOf(value.prop) >= 0) {
                        before.push(value)
                    }
                })

                this.$c_anlaysistable.set({
                    after,
                    before,
                    TPlus: this.tableListSetting.tableCustomizeList.TPlus
                })
                this.generateColumns();
                this.tableListSetting.visible = false
            },
            /*
            * todo 生成列表
            * */
            generateList() {
                this.$axios.post("sett_settslist").then(value => {

                }).catch(reason => {

                })
            }
        },
        computed: {
            paramsKV() {
                let data = {};
                this.paramsList.forEach(value => {
                    data[value.field] = value.value
                })
                return data
            },
        },
        deactivated() {
            this.$root.finance.commissionList.commOrderList.index = null;
        },
    }
</script>

<style lang="less">
    .analysisExpend {
        color: transparent;
    }
</style>
