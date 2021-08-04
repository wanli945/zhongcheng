<template>
    <el-container>
        <el-header style="padding: 0;" height="120px">
            <el-row :gutter="24" style="margin-bottom: 20px">
                <el-col :span="6">
                    <el-input :index="'keyword'" v-model.trim="params.keyword" type="input" has-span
                              label="关键字"
                              placeholder="订单号/CRM单号/产品/业务员"/>
                </el-col>
                <el-col :span="8">
                    <query-option-item style="width: 100%" label="竣工时间" type="daterange"
                                       v-model.trim="params.timerange"
                                       is-today></query-option-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-button type="success" @click="operate('reset')">重置</el-button>
                    <el-button type="primary"
                               @click="()=>{pagination.curpage=1;operate('select')}">
                        查询
                    </el-button>
                    <el-button type="warning" @click="operate('select') " icon="el-icon-refresh">刷新
                    </el-button>
                    <template v-for="(item,index) of btnBox.tableItem">
                        <el-button @click="tableItemMethod(item.methodCode,item.label)"
                                   :type="item.type"
                                   :disabled="!tableSelectData.length"
                                   :key="index">
                            批量{{item.label}}
                        </el-button>
                    </template>
                </el-col>
                <el-col :offset="6" :span="6" style="text-align: right">
                    <el-button type="danger" @click="operate('export')">导出报表</el-button>

                </el-col>
            </el-row>
        </el-header>
        <el-main style="padding: 0; margin-top: 10px">
            <el-table
                :data="table.data"
                ref="multipleTable"
                @selection-change="selectionChange"
                :stripe="true"
                :highlight-current-row="true"
                :empty-text="table.tableEmpty"
                @row-click="rowClick"
                max-height="650px"
                style="width: 100%;cursor: pointer;"
                :cell-style="{'text-align':'center'}"
                @header-dragend="header_dragend"
                :header-cell-style="{'text-align':'center','background-color':'rgba(193, 206, 214, 1)','fontSize':'14px',color:'black',fontWeight:600}"
                border
            >
                <el-table-column
                    type="selection"
                    fixed="left"
                    width="55">
                </el-table-column>
                <el-table-column v-for="(item,index) of table.rowList" :label="item.label"
                                 :prop="item.prop"
                                 :min-width="item.width" :key="index"></el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作" min-width="170">
                    <template slot-scope="prop">
                        <el-button size="mini" type="success" style="padding: 5px;"
                                   @click="openDialog(prop.$index,prop.row)">查看
                        </el-button>
                        <template v-for="(item,index) of btnBox.tableItem">
                            <el-button size="mini"
                                       @click="tableItemMethod(item.methodCode,item.label,prop.$index,prop.row)"
                                       :type="item.type"
                                       style="padding: 5px;" :key="index">
                                {{item.label}}
                            </el-button>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer height="40px" style="padding: 0;margin-top: 20px">
            <el-row :gutter="24">
                <el-col :span="15">
                    <el-pagination
                        @size-change="(size)=>{pagination.pageSize=size;pagination.curpage=1;operate('select')}"
                        @current-change="(cur)=>{pagination.curpage=cur;operate('select')}"
                        :page-sizes="[10, 20, 30,50]"
                        :page-size="pagination.pageSize"
                        :current-page="pagination.curpage"
                        layout="total,sizes, prev, pager, next, jumper,->"
                        :total="pagination.total">
                    </el-pagination>
                </el-col>
                <el-col :span="9">
                    <el-row :gutter="24">
                        <el-col :span="8" :offset="15">
                            <span style="font-size: 18px;color: red">佣金合计：</span>
                            <span style="font-size: 16px">{{table.rateMoney}} ￥</span>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-footer>

        <el-drawer
            :visible.sync="boxVisible"
            :close-on-click-modal="false"
            :wrapperClosable="false"
            :close-on-press-escape="false"
            destroy-on-close
            size="100%"
            append-to-body

            custom-class="myDrawer"
            ref="dialog"
        >
            <template #title><h2>{{component.name}}</h2></template>
            <detailed-information :options="component.options"></detailed-information>
        </el-drawer>
    </el-container>
</template>
<script>
    import Table_page from "../../../../common/components/table_page/index";
    import QueryOptionItem from "../../../../common/components/table_page/item";
    import DetailedInformation from '../../../orderManage/orderQuery/item/context/editBox.vue'
    import {mapState} from "vuex"

    import {columnsList} from "./index.data.js"

    export default {
        name: "mySettle",
        components: {QueryOptionItem, Table_page, DetailedInformation},
        props: {
            statos: {
                type: String,
                require: true
            }
        },
        data() {
            let statos = this.statos
            return {
                /*
                * 分页
                * */
                pagination: {
                    curpage: 1,
                    pageSize: 10,
                    total: 0
                },

                params: {
                    keyword: "",
                    timerange: [new Date(), new Date()],
                    statos,
                },

                table: {
                    tableEmpty: "暂无数据",
                    data: [],
                    rateMoney: "",
                    rowList: columnsList,
                },
                /*
                * 查看
                * */
                boxVisible: false,
                component: {
                    name: "工单详情",
                    options: {
                        workid: '',
                        index: '',
                        scope: null,
                        type: "deduct",
                        pageList: ["first", "second", "third"]
                    }
                },
                btnBox: {
                    tableItem: []
                },
                tableSelectData: [],
            }
        },
        computed: {
            ...mapState({
                userInfo: s => s.userInfo
            })
        },
        mounted() {
            this.createBtn();
        },
        activated() {
            this.init();
        },
        methods: {
            init() {
                this.operate('select')
            },
            /*
            * 获取按钮信息
            * */
            createBtn() {
                let Item;
                switch (this.statos) {
                    case "未发放":
                        Item = [{
                            label: '转已发放',
                            methodCode: "已发放", type: 'primary',
                        }];
                        break;
                    case "已发放":
                        Item = [];
                        break;
                }
                this.btnBox.tableItem = []
                this.btnBox.tableItem.push(...Item);
            },

            operate(method, other, ok = false) {
                this[`operate_${method}`](other, ok)
            },
            /*
            * 查询
            * */
            operate_select() {
                this.$axios.post('workinfo_chaxunre', {}, {
                    params: {
                        ...this.params,
                        ...this.pagination
                    }
                }).then(({rateMoney, list, total}) => {
                    this.table.data = list;
                    this.table.tableEmpty = "暂无数据"
                    this.table.rateMoney = rateMoney
                    this.pagination.total = total
                }).catch(reason => {
                    this.table.tableEmpty = reason.message
                    this.table.data = [];
                    this.table.rateMoney = 0;
                    this.pagination.total = 0;
                })
            },
            /*
            * 重置条件
            * */
            operate_reset() {
                this.params = {
                    keyword: "",
                    timerange: ['', ''],
                    statos: this.statos,
                };
                this.pagination.curpage = 1
                this.operate_select()
            },
            /*
            * 导出报表
            * */
            operate_export() {
                this.$prompt("请输入文件名", "提示", {
                    type: "success",
                    inputValidator: (value = "") => {
                        return !!value.trim() || "文件名不能为空";
                    }
                }).then(({value}) => {
                    this.$axios.post("money_chaxunduct", {}, {
                        params: {
                            ...this.params,
                            name: value
                        }
                    }).then(({url}) => {
                        this.$DLFile(url);
                    })
                })
            },
            /*
            * 多选改变
            * */
            selectionChange(val) {
                this.tableSelectData = [];
                this.tableSelectData.push(...val);
            },
            /*
            * 行点击
            * */
            rowClick() {

            },
            header_dragend() {

            },
            /*
            * 查看基础信息
            * */
            openDialog(index, row) {
                this.boxVisible = true
                this.component.options.index = index;
                this.component.options.workid = row.id;
            },

            /*
            * 表格 操作的按钮事件
            * */
            tableItemMethod(status, label, index, row) {
                const success = (arr) => {
                    console.log(status)
                    this.$axios.post("workinfo_xiustatues", {}, {
                        params: {
                            arr: arr,
                            status: status,
                            userInfo: this.userInfo,
                        }
                    }).then(value => {
                        this.$message({
                            type: "success",
                            message: "订单已转" + status,
                            duration: 1500
                        });
                        this.operate_select()
                    }).catch(reason => {

                    })
                }
                if (row) {
                    this.$alert("是否执行" + label + "操作", "提示", {
                        type: "info",
                    }).then(value => {
                        success([row]);
                    })
                } else {
                    /*
                    * 批量转的
                    * */
                    this.$alert("是否执行批量" + label + "操作", "提示", {
                        type: "info",
                    }).then(value => {
                        success(this.tableSelectData)
                    })
                }
            }
        },

        watch: {}
    }
</script>

<style scoped>

</style>


