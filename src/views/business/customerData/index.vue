<!--
-*- coding:utf-8 -*-
@IDE      : WebStorm
@time     : 2020/10/28 10:38
@author   : 李艳鹏
@Software : app
@File     : index
@describe : 商机单查询模板页面
一孔多形化多孔，似山连季成他山。

商机单 整体模板样式

客户信息： 客户姓名、身份证号、联系电话
-->
<template>
<!-- 分页 -->
    <table_page
        v-if="showPage"
        :total='pagination.total'
        :current-page="pagination.curpage"
        :page-size="pagination.pagesize"
        @size-change="pageSize=> {pagination.curpage = 1;pagination.pagesize = pageSize}"
        @current-change="curPage=>pagination.curpage = curPage"
        :status="status"
        @status-click="statusClick"
    >
        <!--搜索部分-->
        <!--后端返回 不同的条件-->
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
                    @keydown.enter.native="pagination.curpage === 1 ? table_query() :pagination.curpage = 1"
                    :placeholder="item.placeholder"
                    show-all-levels
                    :cascader-props="item.cascaderProps"
                    v-show="item.show"
                    :is-today="item.isToday"
                >
                </query-option-item>
            </template>
        </template>
        <!--左边按钮-->
        <template #left_btn>
            <el-button type="primary" @click="resetQueryOption" icon="el-icon-refresh-left">重置
            </el-button>
            <el-button type="success"
                       @click="pagination.curpage === 1 ? table_query() :pagination.curpage = 1"
                       icon="el-icon-search">查询
            </el-button>
            <el-button type="warning" @click="table_query" icon="el-icon-refresh">刷新
            </el-button>
            <!--分配有权限限制的-->
            <template v-if="(pageRight==='all' || pageRight==='allB') && !!~userInfo.role.indexOf('业务员')">
                <el-button type="warning" icon="el-icon-aim" @click="assignData_All(false)">取单
                </el-button>
            </template>
            <template v-if="pageRight==='oneself'">
                <template v-if="pageData.type !== 'distribution'">
                    <el-button type="warning" icon="el-icon-aim" @click="assignData_Back()">回退
                    </el-button>
                </template>
            </template>

            <!--<template v-if="pageRight==='oneself'">
                <el-button type="primary" icon="el-icon-aim" @click="todoAlarm()">刷新消息
                </el-button>
            </template>-->
            <template v-if="pageRight==='management' || pageRight==='managementB' || pageRight==='oneBroadband'">
                <template v-if="pageData.type !=='distribution'">
                    <el-button type="warning" icon="el-icon-aim" @click="assignData_Message(false)"
                               v-if="right.assign">分配
                    </el-button>
                </template>
            </template>
        </template>
        <!--右边按钮-->
        <template #right_btn>
            <!--导入导出的权限-->
            <template v-if="pageData.type !=='distribution'">
                <template v-if="pageData.api.excelfish">
                    <el-button type="success" icon="el-icon-download" @click="importExecl"
                               v-if="right.download && pageRight !== 'oneBroadband'">导出
                    </el-button>
                </template>
                <el-button type="info"
                           @click="importCustomerOpen"
                           v-if="right.upload"
                           icon="el-icon-upload2">导入
                </el-button>
            </template>
            <!-- <el-button type="success" @click="customizeRow" icon="el-icon-suitcase">自定义表格列</el-button>-->
        </template>
        <template #body>
            <customer-table
                @sortchange="(desc, callback)=> {pagination.desc = desc;table_query(callback)}"
                @edit="editBoxOpen"
                :select-api="pageData.api"
                ref="customerTable"
                :page-right="pageRight"
                :c_table-list="pageData.tableColumns"
                :page-type="pageData.type"
                :local-columns="pageData.localColumns"></customer-table>
        </template>
        <template #other>
            <!--
            这里写  el-dialog 是为了不报警告
            -->
            <el-drawer
                :visible.sync="editBoxDataVisible"
                :close-on-click-modal="false"
                :wrapper-closable="false"
                destroy-on-close
                :size="drawerSize"
                append-to-body
                custom-class="myDrawer"
                @close="table_query"
                close-on-press-escape
            >
                <template #title><h2>商机详情信息</h2></template>
                <template #default>
                    <edit-box :page-type="pageData.type" :api="pageData.api"
                              :options="component.options||''"></edit-box>
                </template>
            </el-drawer>
            <template v-if="pageRight==='management' || pageRight==='managementB' || pageRight==='oneBroadband'">
                <el-dialog append-to-body destroy-on-close
                           :close-on-click-modal="false"
                           :close-on-press-escape="false"
                           :visible.sync="selectBox.visible"
                           width="600px"
                >
                    <template #title>
                        <h4>分配订单到业务员</h4>
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
                        <el-button @click="assignData_Message(true)" type="success">确定</el-button>
                    </template>
                </el-dialog>
            </template>
            <slot name="insertOrder">
            </slot>
        </template>
    </table_page>
</template>
<script>
    import {mapState} from "vuex";
    import customerTable from "./context/customerTable";
    import table_page from "../../../common/components/table_page/index";
    import queryOptionItem from "../../../common/components/table_page/item";
    import businessData from "../../../data/businessData.js";
    import {businessAllMarketing, businessDefaultChannel} from "../../../data/status.data";
    import editBox from "./context/editBox"

    export default {
        name: "index",
        provide() {
          return {
              editBoxDataVisible: this.editBoxDataVisible,
              pagination :this.pagination.desc,
              pageRight: this.pageRight
          }
        },
        components: {
            queryOptionItem,
            table_page,
            customerTable,  //
            editBox,
            // customizeRow: () => import("./context/customizeRow")
        },
        props: {
            pageRight: {
                type: String,
                default: 'oneself'
            },
            pageData: {
                type: Object,
                default() {
                    return {
                        api: {
                            select: "", // 订单查询
                            selectAll: "",

                            remind: "", // 订单提醒信息
                            grouby: "", // 分组
                            xiuuplogin: "", // 改变业务员
                            xiugai: "", // 修改信息
                            autoaccept: "", // 自动受理
                            transferorder: "", // 人工流转
                            excelfish: "", //导出文件
                            insertOneFi: "", // 订单插入一个
                            daoruexcele: "", //订单批量导入
                            templateUrl: "",//
                        },
                        localColumns: null, // 本地的列
                        tableColumns: [], // 展示的列
                        type: "",
                        alias: "",
                    }
                }
            }
        },
        data() {
            return {
                drawerSize: this.pageRight === 'oneBroadband' ? "100%" : "70%",
                showPage: true, // 控制各 商机页面
                /*
                * todo 2020-12--15 获取提醒信息
                * */
                alarm: true,
                timerState: true,

                serviceSelect2: [],
                cityDict: [],
                /*
                * 导入数据和盒子
                * */
                /*
                * 编辑盒子的 可见性
                * */
                editBoxDataVisible: false,
                component: {options: null, name: "商机单详情"},

                queryOption: [],
                pagination: {
                    total: 0,
                    curpage: 1,
                    pagesize: 10,
                    /*
                    * 升降序
                    * */
                    desc: 2
                },
                status: [],
                selectBox: {
                    visible: false,
                    select: {
                        value: "",
                        data: []
                    }
                },
            }
        },
        async activated() {
            await this.$refs['customerTable'].changeList();
            // todo 2021-02-04 无条件时生成条件
            if (!this.queryOption.length) {
                // 对页面信息的判断以及获取
                await this.get_queryOption();
            }
            await this.init_activated() && await this.init();
        },
        computed: {
            ...mapState({
                right: s => s.right,
                userInfo: s => s.userInfo
            })
        },
        methods: {
            /*
            * activated 的 初始化函数
            * */
            async init_activated() {
                if (this.pageRight === 'oneself' && !~this.userInfo.role.indexOf("业务员")) {
                    this.$message({
                        message: "此员工的角色非业务员",
                        duration: 1500,
                        type: "warning"
                    });
                    this.showPage = false;
                    return false;
                }
                // 公共池不展示  状态  定时器 设置
                /*this.pageRight !== 'all' && (this.timerState = setInterval(() => {
                    this.state_query();
                }, 60 * 1000));*/
                // 不是公共池 和 查询分组信息接口  获取提醒信息  this.state_query,获取营销结果
                // 原 this.pageRight !== 'all'
                //this.pageRight==='management' || this.pageRight==='managementB' || this.pageRight==='oneself' || this.pageRight==='oneBroadband'
                if ((this.pageRight !== 'all' || this.pageRight !== 'allB' || this.pageRight !== 'oneBroadband') && this.pageData.api.grouby) {
                    this.timerState = true
                    this.$util.loopTask({
                        switchFlag: "timerState",
                        task: this.state_query,
                        timeout: 1000 * 60,
                        immediate: false,
                        that: this
                    })
                }
                // 如果是业务员 且 是个人池 且 获取订单提示信息   this.todoAlarm,获取代办事项
                if (!!~this.userInfo.role.indexOf('业务员') && this.pageRight === 'oneself' && this.pageData.api.remind) {
                    this.alarm = true
                    this.$util.loopTask({
                        switchFlag: 'alarm',
                        task: this.todoAlarm,
                        timeout: 1000 * 20,
                        immediate: true,
                        that: this
                    })
                }
                /*if (!!~this.userInfo.role.indexOf('业务员') && this.pageRight === 'oneself') {
                    this.pageData.api.remind && (this.todoAlarm(), this.alarm = setInterval(() => {
                        this.todoAlarm();
                    }, 1000 * 20));
                }*/
                return true;
            },
            /*
            * todo 2020-12-15 获取代办事项
            * */
            todoAlarm() {

                this.$axios.post(this.pageData.api.remind, {}, {
                    params: {
                        servicename: this.userInfo.username
                    },
                    showLoading: false,
                    showMessage: false
                }).then(({alarmList, messType}) => {
                    this.$set(this.$root.main.index.messBox.data, messType, [...alarmList])
                });
            },

            /*
            *
            * 重置条件
            * */
            resetQueryOption() {
                this.queryOption.forEach((value, index) => {
                    if (value.value instanceof Array) {
                        this.queryOption[index].value = ['', '']
                    } else {
                        if (this.pageData.type.trim() === 'breathe' && value.field.trim() === "servicename") {
                            this.queryOption[index].value = "所有人"
                        } else {
                            this.queryOption[index].value = ""
                        }
                    }
                });
                // todo 20210114 重置从第一页开始
                if (this.pagination.curpage === 1) {
                    this.table_query();
                } else {
                    this.pagination.curpage = 1
                }
            },

            /*
            * 初始化 查询条件
            * */
            async get_queryOption() {
                // 个人池 且 是业务员 不显示分页
                if (this.pageRight === 'oneself' && !~this.userInfo.role.indexOf("业务员")) {
                    return this.showPage = false
                }
                this.$root.business.customerData.index = this;
                const serviceSelect2 = [];
                // 外呼
                if (this.pageData.type === 'breathe') {
                    serviceSelect2.push({label: '所有人', value: '所有人', id: -999})
                }
                // 管理池 查到 所有 员工列表，
                // this.pageRight === 'management' || this.pageRight === 'managementB' || this.pageRight === 'oneBroadband'
                if (this.pageRight!== 'all' || this.pageRight!== 'allB') {
                    try {
                        let data = (await this.$root.getStaff()).serviceSelect2
                        serviceSelect2.push(...data)
                    } catch (e) {

                    }
                }
                this.queryOption = await businessData.queryOption({
                    that: this,
                    cityDict: await this.$root.query_city(),
                    serviceSelect2,
                    type: this.pageData.type,
                    channelDict: (await this.$root.query_channel(true, businessDefaultChannel[this.pageData.type].channelArr)).channelDict
                });
            },

            async init() {
                await this.table_query();
            },
            /*
            * 信息查询
            *
            * */
            table_query(callback2 = () => {
            }) {
                // 原 this.pageRight !== 'all'
                // this.pageRight==='management' || this.pageRight==='managementB' || this.pageRight==='oneself'
                (this.pageRight !== 'all' || this.pageRight !== 'allB' || this.pageRight !== 'oneBroadband')  && this.state_query();
                // 根据 ... 查询表格
                this.$refs['customerTable'].operating_select({
                    queryOption: this.queryOption,
                    pagination: this.pagination,
                    pageRight: this.pageRight
                }, (total) => {
                    this.pagination.total = total
                }, callback2);
            },
            /*
            *
            * 各个行销结果数量的查询
            * */
            state_query() {
                /*
                * todo 分销商不需要查询状态
                * */
                if (this.pageData.type !== 'distribution') {
                    this.pageData.api.grouby && this.$axios.post(this.pageData.api.grouby, {}, {
                        params: {
                            queryOption: this.queryOption,
                            userInfo: this.userInfo,
                            pageRight: this.pageRight
                        },
                        showLoading: false
                    }).then(({list, dict}) => {
                        this.status = [];
                        // 行销结果
                        businessAllMarketing[this.pageData.type].forEach((v, index) => {
                            this.status.push({
                                label: v.label,
                                num: dict[v.label] || 0,
                                id: index
                            });
                            dict[v.label] && delete dict[v.label];
                        });
                        for (let item of Object.entries(dict)) {
                            let id = this.status[this.status.length - 1] + 1;
                            this.status.push({
                                label: item[0],
                                num: item[1] || 0,
                                id: id
                            });
                        }
                    }).catch(reason => {
                    });
                }
            },
            /*
            *  导入盒子打开
            * */
            importCustomerOpen() {
                this.$emit("importBOrder")
            },
            /*
            * 编辑信息盒子 first 抽屉弹框
            * */
            editBoxOpen(index, row, name, page, scope) {
                this.editBoxDataVisible = true;
                this.component = {
                    options: {page, index, scope, row, rootScope: this},
                    name,
                }
            },
            /*
            *  页面切换
            * */
            currentChange(curPage) {
                this.pagination.curpage = curPage
            },
            /*
            *  页面个数的改变
            * */
            pageChange(pageSize) {
                this.pagination.curpage = 1
                this.pagination.pageSize = pageSize
            },
            /*
            * @params label 行销结果 查询
            *
            * */
            statusClick(label) {
                this.pagination.curpage = 1
                for (let item of this.queryOption) {
                    if (item.field.trim() === "statos") {
                        item.value = label
                        break;
                    }
                }
                this.table_query();
            },
            //todo 分配 商机单
            assignData_Message(is = true) {
                if (is) {
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
                            this.orderGO(p[0], "是否分配订单")
                        })
                    }
                } else {
                    let can_send = this.$refs.customerTable.selectData.length;
                    /*if (can_send > 30) {
                        return this.$message({message: "多选不能超过30个", type: "warning"})
                    }*/
                    if (can_send) {
                        this.selectBox.visible = true;
                        this.selectBox.select.value = "";
                        if (this.selectBox.select.data.length <= 0) {
                            this.$root.getStaff().then(({serviceSelect}) => {
                                this.selectBox.select.value = "";
                                this.selectBox.select.data = [];
                                for (let item of Object.entries(serviceSelect)) {
                                    this.selectBox.select.data.push({
                                        label: item[0],
                                        value: item[0],
                                        children: [...item[1]]
                                    })
                                }
                            })
                        }
                    } else {
                        this.$message({message: "未选择订单", type: "warning"})
                    }
                }
            },
            /*
            * todo 2020-12-11 回退
            * */
            assignData_Back() {
                this._orderGo("", "是否回退订单")
            },
            /*
            * todo 2020-12-11 只能分配给自己
            * */
            assignData_All() {
                /*
                * todo 先判断这个人是不是业务员
                * */
                let canS = this.$refs.customerTable.selectData.length
                if (!canS) {
                    return this.$message({message: "请选择订单", type: "warning"})
                }
                /*if (canS > 10) {
                    return this.$message({message: "多选不能超过10个", type: "warning"})
                }*/
                canS = !!~this.userInfo.role.indexOf("业务员")
                if (canS) {
                    this.$alert("", {
                        message: "是否取单",
                        title: "提示",
                        type: "info"
                    }).then(value => {
                        this.orderGO(this.userInfo.username)
                    })
                } else {
                    this.$message({
                        message: "非业务员不能分配订单",
                        type: "warning",
                        duration: 1500
                    })
                }
            },

            /*
            * @params servername 回退+分配
            * @params message 提示信息
            * */
            _orderGo(servername = "", message) {
                let canS = this.$refs.customerTable.selectData.length
                if (!canS) {
                    return this.$message({message: "请选择订单", type: "warning"})
                }
                /*（  if (canS > 10) {
                      return this.$message({message: "多选不能超过10个", type: "warning"})
                  }*/
                if (servername && servername.trim()) {
                    this.$root.getStaff().then(({serviceList}) => {
                        let can = serviceList.indexOf(this.userInfo.username) >= 0
                        if (can) {
                            this.$alert("提示", {
                                type: "success",
                                message: message,
                                title: "提示"
                            }).then(value => {
                                this.orderGO(servername)
                            })
                        } else {
                            this.$message({
                                message: "非业务员不能分配订单",
                                type: "warning",
                                duration: 1500
                            })
                        }
                    })
                } else {
                    this.orderGO(servername)
                }

            },
            /*
            * todo 2020-12-11  分配
            * */
            orderGO(servicename) {
                this.$axios.post(this.pageData.api.xiuuplogin, {}, {
                    params: {
                        servicename: servicename,
                        data: this.$refs.customerTable.selectData,
                        userInfo: this.userInfo
                    }
                }).then(({my_mess}) => {
                    this.$message({
                        type: "success",
                        message: servicename ? my_mess : "订单回退成功",
                        duration: 2000
                    });
                    this.selectBox.visible = false;
                    /*
                    * 修改表格中的 业务员名称
                    * */
                    this.$refs.customerTable.changeTableServerName(servicename);

                }).finally(() => {
                    this.table_query()
                })
            },
            /*
            *
            * 表格导出
            * */
            importExecl() {
                this.$prompt("请输入文件名", "提示", {
                    type: "success",
                    inputValidator: (value = "") => {
                        return !!value.trim() || "文件名不能为空";
                    }
                }).then(({value}) => {
                    this.$axios.post(this.pageData.api.excelfish, {}, {
                        params: {
                            queryOption: this.queryOption,
                            name: value
                        }
                    }).then(({url}) => {
                        this.$DAFile(url);
                    })
                })
            },
            destroyed__() {
                this.timerState = false
                this.alarm = false
                /*if (this.timerState) {
                    clearInterval(this.timerState)
                    this.timerState = null;
                }*/
                /*if (this.alarm) {
                    clearInterval(this.alarm)
                    this.alarm = null
                }*/
                this.$root.business.customerData.index = null;
                this.selectBox.select.value = "";
                this.selectBox.select.data = [];
            }
        },
        destroyed() {

        },
        deactivated() {
            this.destroyed__()
        },
        watch: {
            "pagination.curpage": function () {
                this.table_query()
            },
            "pagination.pagesize": function () {
                this.table_query()
            },
        },
    }

</script>
