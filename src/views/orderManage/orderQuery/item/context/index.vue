<!--
订单搜索
-->
<template>
    <page
        :total='pagination.total'
        :current-page="pagination.curpage"
        :page-size="pagination.pagesize"
        @size-change="pageChange"
        @current-change="currentChange"
        :status="status"
        @status-click="statusClick"
    >
        <!--搜索部分-->
        <template #paramsList>
            <!--productName-->
            <template v-for="(item,index) of queryOption">
                <template v-if="item.field==='productName'">
                    <query-option-item
                        :show="item.show"
                        :label="item.label"
                        :type="'my'"
                        :key="item.field"
                        value=""
                    >
                        <template #other>
                            <el-autocomplete
                                v-model.trim="item.value"
                                :fetch-suggestions="productSearch"
                                :trigger-on-focus="true"
                                :hide-loading="false"
                                :debounce="500"
                                clearable
                                popper-append-to-body
                                popper-class="autocompleteProduct"
                                @keydown.enter.native="()=>(pagination.curpage = 1,table_query())"
                            >
                                <template slot-scope="{ item }">
                                    {{ item.value}}
                                </template>
                            </el-autocomplete>
                        </template>
                    </query-option-item>
                </template>
                <template v-else>
                    <query-option-item
                        :show="item.show"
                        :label="item.label"
                        v-model.trim="item.value"
                        :type="item.type"
                        :key="item.field" :index="index"
                        :select-list="item.selectList||[]"
                        :cascader-list="item.cascaderList|| []"
                        @keydown.enter.native="()=>(pagination.curpage = 1,table_query())"
                        :showAllLevels="true"
                        :cascader-props="item.cascaderProps"
                    />
                </template>
            </template>
        </template>
        <!--左边按钮-->
        <template #left_btn>
            <el-button type="primary" @click="()=>{
                pagination.curpage = 1;
                resetQueryOption();
                table_query()
            }" icon="el-icon-refresh-left">重置
            </el-button>
            <el-button type="success" @click="()=>(pagination.curpage = 1,table_query())"
                       icon="el-icon-search">查询
            </el-button>

            <el-button type="warning" @click="table_query" icon="el-icon-refresh">刷新
            </el-button>
            <!--分配有权限限制的-->
            <el-button type="danger" icon="el-icon-aim" @click="assignData(false)"
                       v-if="right.assign">分配
            </el-button>
        </template>
        <!--右边按钮-->
        <template #right_btn>
            <el-button type="info" icon="el-icon-download" v-if="right.download"
                       @click="$refs.orderQueryTable.operating('download')">导出
            </el-button>
            <el-button type="primary" icon="el-icon-upload" v-if="right.upload"
                       @click="$refs.orderQueryTable.operating('upload')">导入
            </el-button>
        </template>
        <!--主体部分-->
        <template #body>
            <order-query-table :pagination="pagination"
                               :page-scope="this"
                               :storage-column="storageColumn"
                               :table-column="tableColumn"
                               @edit="openDialog"
                               ref="orderQueryTable"></order-query-table>
        </template>

        <template #other>
<!--            id 抽屉 -->
            <el-drawer
                :visible.sync="boxVisible"
                :close-on-click-modal="false"
                :wrapper-closable="false"
                :close-on-press-escape="false"
                destroy-on-close
                size="100%"
                append-to-body
                custom-class="myDrawer"
                ref="dialog"
                @close="table_query"
            >
                <template #title><h2>{{component.name}}</h2></template>
                <edit-box :options="component.options||''"></edit-box>
            </el-drawer>
            <el-dialog append-to-body destroy-on-close :close-on-click-modal="false"
                       :visible.sync="selectBox.visible"
                       width="600px"
            >
                <template #title>
                    <h4>分配订单到受理员</h4>
                </template>
                <template #default>
                    <el-cascader
                        style="width: 250px"
                        filterable
                        v-model.trim="selectBox.select.value"
                        :props="{ expandTrigger: 'hover',emitPath:false }"
                        :options="selectBox.select.data"
                        :show-all-levels="false"
                        placeholder="请选择分配人员"
                        clearable/>
                </template>
                <template #footer>
                    <el-button @click="assignData" type="success">确定</el-button>
                </template>
            </el-dialog>
        </template>
    </page>
</template>
<script>
    import orderQueryTable from "./context/orderQueryTable";
    import page from "../../../common/components/table_page/index";
    import queryOptionItem from "../../../common/components/table_page/item"
    import {mapActions, mapGetters, mapMutations, mapState} from "vuex"
    import orderQueryData from "../../../data/orderQueryData"

    export default {
        name: "index",
        props: {
            // 类型
            orderType: {
                type: String,
                required: true,
                // default:"order" || "b2i" || "msm"
            },
            // 本地列对象
            storageColumn: {
                type: Object,
                required: true,
            },
            // 显示列的数据
            tableColumn: {
                type: Array,
                required: true,
            },

        },
        components: {
            page,
            orderQueryTable,  //
            queryOptionItem,
            editBox: z => import("./context/editBox.vue")
        },

        data() {
            return {
                pagination: {
                    total: 0,
                    curpage: 1,
                    pagesize: 10
                },
                status: [],
                boxVisible: false,
                component: {
                    title: "editBox",
                    options: {
                        type: "orderList",
                        index: undefined,
                        workid: undefined,
                        scope: null,
                        pageList: ["first", 'third', "four"]
                    },
                    name: "订单详情",
                },

                selectBox: {
                    visible: false,
                    select: {
                        value: "",
                        data: []
                    }
                },
                queryOption: [],
                statusTimer: null
            }
        },
        computed: {
            /*...mapState("order", {
                queryOption: s => s.queryOption,
            }),*/
            ...mapState({
                right: s => s.right,
                userInfo: s => s.userInfo
            })
        },
        mounted() {

        },
        async activated() {
            if (!this.queryOption.length) {
                await this.create_queryOption()
            }
            await this.init();
            this.statusTimer || (this.statusTimer = setInterval(v => {
                this.getState();
            }, 1000 * 60 * 5));
        },
        methods: {
            // todo 获取  条件
            async create_queryOption() {
                const cityDict = [], serviceSelect2 = [], acceptSelect2 = [];
                try {
                    cityDict.push(...(await this.$root.query_city()))
                } catch (e) {

                }
                try {
                    let data = await this.$axios.post("staff_queryemply", {}, {
                        params: {
                            deparname: ""
                        },
                        showLoading: false
                    })
                    serviceSelect2.push(...data.serviceSelect2)
                    acceptSelect2.push(...data.acceptSelect2)
                } catch (e) {

                }
                this.queryOption = orderQueryData.queryOption({
                    cityDict,
                    that: this,
                    serviceSelect2,
                    acceptSelect2
                });
            },
            async init() {
                await this.$refs.orderQueryTable.init();
                await this.table_query();
            },
            ...mapMutations("order", {
                // changeQueryOption: "changeQueryOption",
                // statusSwitch: "statusSwitch",
                /*resetQueryOption: "resetQueryOption"*/
            }),
            /*...mapActions("order", {
                getQueryOption: "getQueryOption",
            }),*/

            /* changeQueryOption({index, value}) {
                 this.queryOption[index].value = value
             },*/
            resetQueryOption() {
                this.queryOption.forEach((value) => {
                    if (value.value instanceof Array) {
                        value.value = ["", ""]
                    } else {
                        value.value = ""
                    }
                });

            },

            /*
            * todo 分组信息
            * */
            getState() {
                this.$axios.post("work_goury", {
                    queryOption: this.queryOption,
                    pagination: this.pagination,
                    userInfo: this.userInfo,
                    random: this.right.encrypt,
                    lqudao: this.right.channel
                }, {
                    // params: {
                    //     queryOption: this.queryOption,
                    //     pagination: this.pagination,
                    //     userInfo: this.userInfo,
                    //     random: this.right.encrypt
                    // },
                    showMessage: false,
                    showLoading: false
                }).then(value => {
                    this.status = [];
                    this.status.push(...value.data)
                })
            },
            /*
            *
            * 查询
            * */
            table_query() {
                this.$refs.orderQueryTable.operating('select', {}, (total) => {
                    this.pagination.total = total;
                    this.getState();
                })
            },
            statusClick(label) {
                for (let item of this.queryOption) {
                    if (item.field === 'states') {
                        item.value = label
                        break;
                    }
                }
                this.pagination.curpage = 1;
                this.table_query();
            },
            /*
            * 页面切换
            * */
            pageChange(pageSize) {
                this.pagination.curpage = 1;
                this.pagination.pagesize = parseInt(pageSize);
                this.table_query()
            },
            currentChange(curPage) {
                this.pagination.curpage = parseInt(curPage);
                this.table_query()
            },

            openDialog(index, row, component, name, scope) {
                this.boxVisible = true;
                this.component.title = component;
                this.component.options.workid = row && row.workid;
                this.component.options.index = index;
                this.component.options.scope = scope;
            },
            /*
            *
            * 订单下载
            * */
            orderLoad() {
                this.$axios.post("", {}, {
                    params: ""
                }).then(value => {
                }).catch(reason => {

                })
            },
            /*
            * 分配订单
            * */
            assignData(ok = true) {
                if (ok) {
                    if (!this.selectBox.select.value) {
                        this.$message({
                            message: "业务员名称不能为空",
                            duration: 1500,
                            type: "warning"
                        });
                    } else {
                        let p = this.selectBox.select.value.split("_")
                        this.$alert("是否将订单分配给 ->" + p[0], {
                            type: "info",
                            title: "提示"
                        }).then(({value}) => {
                            this.$axios.post("work_changeuploginno", {}, {
                                params: {
                                    name: p[0],
                                    editname: this.userInfo.username,
                                    data: this.$refs.orderQueryTable.selectData,
                                }
                            }).then(({my_mess}) => {
                                this.$message({
                                    type: "success",
                                    message: my_mess,
                                    duration: 2000
                                });
                                this.selectBox.visible = false;
                                this.table_query();
                            })
                        })
                    }
                } else {
                    let can_send = this.$refs.orderQueryTable.selectData.length;
                    if (can_send) {
                        this.selectBox.visible = true;
                        this.selectBox.select.value = "";
                        this.selectBox.select.data = [];
                        this.$axios.post("staff_queryemply", {}, {
                            params: {
                                deparname: ""
                            },
                            showLoading: false,
                        }).then(({acceptSelect}) => {
                            this.selectBox.select.value = "";
                            this.selectBox.select.data = [];
                            for (let item of Object.entries(acceptSelect)) {
                                this.selectBox.select.data.push({
                                    label: item[0],
                                    value: item[0],
                                    children: [...item[1]]
                                })
                            }
                        })
                    } else {
                        this.$message({message: "未选择订单", type: "warning"})
                    }
                }
            },
            /*搜素产品*/
            productSearch(queryString, cd) {
                if (queryString) {
                    this.$axios.post('query_chaproname', {}, {
                        params: {
                            queryString,
                            depaname: ""
                        },
                        showLoading: false,
                    }).then(({list}) => {
                        cd(list)
                        if (list.length <= 0) {
                            this.$message({
                                type: "warning",
                                duration: 1500,
                                message: "未查询到产品信息"
                            })
                        }
                    }).catch(reason => {
                        cd([])
                    })
                } else {
                    cd([])
                }
            },
        },
        deactivated() {
            this.statusTimer && (clearInterval(this.statusTimer), this.statusTimer = null)
        },
        destroyed() {

        },
        watch: {
            /* "pagination.curpage": function () {
                 this.table_query()
             },
             "pagination.pageSize": function () {
                 this.table_query()
             },*/
        }
    }
</script>

<style lang="less">

</style>
