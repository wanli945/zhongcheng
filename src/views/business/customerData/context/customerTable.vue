<!--
-*- coding:utf-8 -*-
@IDE      : WebStorm
@time     : 2020/10/28 10:38
@author   : 李艳鹏
@Software : app
@File     : customerTable
@describe : 商机单列表的表格信息
-->
<template>
    <div>
        <div class="showList">
            <!-- 自定义列表 -->
            <el-button type="danger" size="small" icon="el-icon-s-cooperation"
                       @click="settingList"></el-button>
        </div>
        <el-table
            :data="tableData"
            ref="materialTable"
            @selection-change="selectionChange"
            :stripe="true"
            :highlight-current-row="true"
            :empty-text="tableEmpty"
            @row-click="rowClick"
            style="width: 100%;cursor: pointer;"
            row-key="id"
            :cell-style="{'text-align':'center'}"
            @header-dragend="header_dragend"
            @sort-change="sortTrackingtime"
            border
            :header-cell-style="{'text-align':'center','background-color':'rgba(193, 206, 214, 1)','fontSize':'14px',color:'black',fontWeight:600}"
            max-height="700px"
        >
            <el-table-column
                type="selection"
                :selectable="selectInit"
                fixed="left"
                width="55">
            </el-table-column>
            <template v-for="(item,index) of tableList">
                <template v-if="item.show !== false">
                    <template v-if="item.field==='id'">
                        <el-table-column
                            :key="index"
                            :label="item.label"
                            :min-width="item.width"
                            :sortable="item.sortable"
                            :prop="item.field"
                            class-name="phoneInfo_cutable"
                        >
                            <template slot-scope="prop">
                       <span style="position: relative">
                          <template v-if="prop.row['newOrder']">
                              <span class="newOrder">新</span>
                          </template>
                          <!-- 商机单编号id  -->
                          <el-link @click="edit(prop.$index,prop.row,'editBox','first')"
                                   type="primary">{{prop.row[item.field]}}</el-link>
                           <template v-if="prop.row['repeatOrder']">
                              <span class="repeatOrder">重</span>
                          </template>
                      </span>
                            </template>
                        </el-table-column>
                    </template>
                    <template v-else>
                        <el-table-column
                            :label="item.label"
                            :min-width="item.width"
                            :sortable="item.sortable"
                            :prop="item.field"
                            :key="index"
                        >
            <span slot-scope="prop">
                <template v-if="item.field==='toproomotelinks'">
                    <a style="color: #000000; text-overflow: ellipsis; white-space: nowrap;overflow: hidden;height: 26px"
                       :href="prop.row[item.field]" target="_blank">
                            {{prop.row[item.field]}}
                        </a>
                </template>
                <!--   todo  2021-03-22 新增-->
            <!-- 管理池  表格编辑 根据类型 判断 是否可编辑-->
                <template
                    v-else-if="pageType==='infoFlow' && ['idcard','name','remark','phone','interior'].indexOf(item.field)>-1">
                      <!-- 备注-->
                    <template v-if="item.field==='remark'">
                        <el-popover
                            placement="left"
                            width="300"
                            :content="prop.row[item.field]"
                            :disabled="!prop.row[item.field]"
                            trigger="hover">
                       <span
                           slot="reference">
                       <!--根据是否为业务员 有业务员，名 才 可以编辑-->
                           <table-column-edit
                               @submit="()=>submitEdit(prop.row,prop.$index,item.field)"
                               :disabled="!prop.row.servicename"
                               v-model.trim="prop.row[item.field]"></table-column-edit>
                       </span>
                    </el-popover>
                    </template>
                    <template v-else>
                         <!--表格 信息 修改-->
                         <table-column-edit
                             @submit="()=>submitEdit(prop.row,prop.$index,item.field)"
                             :disabled="!prop.row.servicename"
                             v-model.trim="prop.row[item.field]"></table-column-edit>
                    </template>
                </template>
                <template v-else>
                   <span>{{prop.row[item.field]}}</span>
                </template>
            </span>
                        </el-table-column>
                    </template>
                </template>
            </template>
            <el-table-column
                label="操作"
                v-if="pageRight!=='all' && pageRight!=='allB'"
                :fixed="operaFixed?'right':undefined"
                width="120">
                <template #header>
                    <i :class="!operaFixed?'el-icon-s-unfold':'el-icon-s-fold'"
                       @click="operaFixed=!operaFixed"></i>
                    <span>操作</span>
                </template>
                <template slot-scope="prop">
                    <el-tooltip effect="dark" content="打电话" placement="top">
                        <el-button type="success" size="small" icon="el-icon-phone" circle/>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="发短信" placement="top">
                        <el-button type="danger" size="small" icon="el-icon-message" circle/>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <!--
        ⑤ 弹窗部分  自定义 列表
        -->
        <el-dialog :visible.sync="tableListSetting.visible"
                   width="800px"
                   custom-class="tableListSetting"
                   modal-append-to-body
                   append-to-body
                   @close="tableCustomizeListItem = JSON.parse(JSON.stringify(tableList))"
        >
            <template #title>
                <h2>自定义表格列</h2>
            </template>
            <el-checkbox-group v-model.trim="tableListSetting.tableCustomizeList" text-color="#fff"
                               size="medium">
                <template v-for="(item,index) of tableCustomizeListItem">
                    <div :key="index" style="display: flex">
                        <el-checkbox
                            border
                            :label="item.field"
                            style="margin-right: 0;margin-left: 10px"
                        >
                            {{item.label}}
                        </el-checkbox>
                        <div class="check-right">
                            <span class="el-icon-caret-top" style="cursor: pointer;"
                                  @click="moveCheck(index,'up')"></span>
                            <span class="el-icon-caret-bottom" style="cursor: pointer"
                                  @click="moveCheck(index,'down')"></span>
                        </div>
                    </div>
                </template>
            </el-checkbox-group>
            <template #footer>
                <el-button style="margin-bottom: 10px;margin-right: 20px" type="warning"
                           @click="saveList">
                    保存设置
                </el-button>
            </template>
        </el-dialog>
    </div>
</template>
<script>
    import {mapState, mapMutations} from "vuex"
    import TableColumnEdit from "../../../../context/components/tableColumnEdit";

    export default {
        name: "customerTable",
        components: {TableColumnEdit},
        props: {
            pageRight: {
                type: String,
                default: "management"
            },
            pageType: String,
            selectApi: {
                type: Object,
                default() {
                    return {
                        select: "",
                        selectAll: ""
                    }
                },
                required: true
            },
            c_tableList: {
                type: Array,
                default() {
                    return []
                },
                required: true
            },
            localColumns: {
                type: Object,
                default: null,
                required: true
            },
        },
        data() {
            return {
                selectData: [],
                tableData: [],
                tableEmpty: "",
                group: {
                    show: false,
                },
                operaFixed: true,
                tableListSetting: {
                    visible: false,
                    tableCustomizeList: ["id"]
                },
                tableList: [],
                tableCustomizeListItem: []
            }
        },
        created() {
            this.changeList()
        },
        computed: {
            selectData_index() {
                let dd = [];
                for (let i of this.selectData) {
                    dd.push(i.index)
                }
                return dd;
            },
            /*...mapState("business", {
                c_tableList: s => s.tableList
            }),*/
            ...mapState({
                right: s => s.right,
                userInfo: s => s.userInfo
            }),
            /*
             * ⑤ 弹窗部分
            *  所有的列的展示
            * */
        },
        methods: {

            ...mapMutations({
                addTab: "addTab"
            }),
            /*
            * 点击后打开弹窗
            * */
            settingList(e, list = []) {
                this.tableListSetting.visible = true;
                const pps = () => {
                    this.localColumns.clear();
                    this.c_tableList.forEach(item => {
                        list.push(item.field)
                    });
                }
                try {
                    let _list = this.localColumns.get();
                    if (_list instanceof Array && _list.length && typeof _list[0] !== "string") {
                        _list.forEach(item => {
                            if (item.show !== false) {
                                list.push(item.field)
                            }
                        });
                    } else {
                        pps()
                    }
                } catch (e) {
                    pps()
                }
                this.tableListSetting.tableCustomizeList = list;
            },

            changeList() {
                let List = []
                const localList = this.localColumns.get();
                if (localList instanceof Array && localList.length) {
                    List.push(...localList);
                } else {
                    List = JSON.parse(JSON.stringify(this.c_tableList));
                }
                this.tableList = List;
                this.tableCustomizeListItem = JSON.parse(JSON.stringify(this.tableList));
            },
            saveList() {
                this.$alert("保存成功", {
                    title: "提示",
                    message: "是否保存成功",
                    type: "info"
                }).then(() => {
                    const List = [];
                    this.tableCustomizeListItem.forEach(value => {
                        List.push({
                            ...value,
                            show: this.tableListSetting.tableCustomizeList.indexOf(value.field) >= 0
                        })
                    })
                    this.localColumns.set(List);
                    this.changeList();
                }).catch(reason => {
                    this.tableCustomizeListItem = JSON.parse(JSON.stringify(this.tableList))
                }).finally(() => {
                    this.tableListSetting.visible = false
                });
            },
            moveCheck(index, method) {
                const tabs = this.tableCustomizeListItem;
                const len = tabs.length
                let change = null;
                if (method === 'up' && index >= 1) {
                    change = index - 1
                } else if (method === 'down' && index < len - 1) {
                    change = index + 1
                }
                if (typeof change === "number") {
                    const curI = this.tableCustomizeListItem[index];
                    const changeI = this.tableCustomizeListItem[change];
                    this.$set(this.tableCustomizeListItem, index, changeI);
                    this.$set(this.tableCustomizeListItem, change, curI);
                }
            },
            /*
            *
            * */
            selectionChange(data) {
                this.selectData = [];
                this.selectData.push(...data);
                /* if (data.length > 10) {
                     this.$alert("一次分配不能超过10个", {}).finally(() => {
                         this.$refs.materialTable.clearSelection();
                     });
                 } else {

                 }*/
            },
            rowClick(row, column, event) {
                this.$emit("row-click", row, column, event)
            },

            /*
            *
            * 修改页面信息
            * */
            updateTableItem({
                                index, row, callback = () => {
                }
                            } = {}) {
                this.$nextTick(() => {
                    this.$set(this.tableData, index, row);
                    callback();
                })
            },
            /*
            *
            * 表格操作
            * */
            operating(method, option, callback) {
                this[`operating_${method}`](option, callback)
            },
            /*
            * 查询表格
            * */
            operating_select(
                {queryOption, pagination, pageRight},
                callback = () => {
                },
                callback2) {
                // 如果是公共池 查询

                this.$axios.post(pageRight === 'all' || pageRight === 'allB' ? this.selectApi.selectAll : this.selectApi.select, {}, {
                    params: {
                        queryOption,
                        pagination,
                        random: this.right.encrypt,
                        userInfo: this.userInfo,
                        pageRight
                    },
                    showLoading: false
                }).then(data => {
                    const {list, total} = data
                    this.tableData = list
                    callback(total);
                    this.tableEmpty = "暂无数据"
                    callback2 || callback2();
                }).catch(reason => {
                    this.tableData = [];
                    this.tableEmpty = reason.message
                    callback(0);
                })
            },

            selectInit(row) {
                /*
                * 有id的不能选
                * */
                return true
            },
            edit(index, row, name, page) {
                this.$emit("edit", index, row, name, page, this)
            },
            /*
            *
            * 增加标签
            * */
            addTabs(index, row) {
                this.addTab({
                    title: row.phone,
                    options: {id: row.workid},
                    name: row.workid,
                    components: "customer",
                    fixed: false,
                    id: row.workid
                })
            },
            header_dragend(newWidth, oldWidth, column, event) {
                let len = this.tableCustomizeListItem.length;
                for (let i = 0; i < len; i++) {
                    let node = this.tableCustomizeListItem[i];
                    if (column.property === node.field) {
                        node.width = newWidth;
                        break;
                    }
                }
                try {
                    let local = this.localColumns.get();
                    let len = local.length;
                    for (let i = 0; i < len; i++) {
                        let node = local[i];
                        if (column.property === node.field) {
                            node.width = newWidth;
                            break;
                        }
                    }
                    this.localColumns.set(local)
                } catch (e) {

                }

            },
            /*
            * 表格排序头
            * */
            sortTrackingtime({prop, order}) {
                if (prop === "trackingtime") {
                    order = order === "descending" ? 0 : (order === "ascending" ? 1 : 2)
                    this.$emit("sortchange",
                        order,
                        () => {
                            this.$message({
                                message: order === 2 ? "下单时间降序" : (order === 1 ? "跟踪时间升序" : "跟踪时间降序"),
                                duration: 1000,
                                type: "info"
                            });
                        }
                    )
                }
            },
            changeTableServerName(name) {
                const arr = this.selectData_index
                arr.forEach(index => {
                    this.tableData[index].servicename = name
                });
                this.$refs.materialTable.clearSelection();
            },
            // todo  2021-03-22 新增
            submitEdit(row, index, field) {
                let {name, phone, remark, idcard, oldMessage} = row
                const {diffMess, diffArr} = this.$util.businessEdit(row);
                if (diffArr.length) {
                    // 修改成功
                    const success = () => this.$set(this.tableData[index], 'oldMessage', {
                        name,
                        phone,
                        remark,
                        idcard,
                    });
                    const failure = () => {
                        this.tableData[index][field] = oldMessage[field]
                    }
                    this.editInfo(row, diffMess).then(value => {
                        success();
                    }).catch(error => {
                        failure()
                    })
                } else {

                }
            },
            async editInfo(row, diffMess) {
                const obj = {}
                /*
                *  对信息的修改
                * */
                const params = Object.assign({}, row, {
                    userInfo: this.userInfo,
                    pagestatos: row.statos,
                    oldStatus: row.statos,
                    status: row.statos
                });
                try {
                    await this.$axios.post(this.selectApi.xiugai, {}, {
                        params: {
                            ...params,
                            changeObj: diffMess
                        },
                        showLoading: false
                    })
                } catch (e) {

                }
            },

        },
    }
</script>

<style lang="less">
    .phoneInfo_cutable {
        .cell {
            overflow: visible !important;
        }
    }
</style>
<style lang="less" scoped>
    .newOrder, .repeatOrder {
        position: absolute;
        font-size: 12px;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        background-color: #ff3322;
        color: white;
        top: -70%;
    }

    .newOrder {
        left: -70%;
    }

    .repeatOrder {
        right: -70%;
    }

    .check-right {
        font-size: 18px;
        margin-top: 10px;
        display: flex;
        flex-direction: column;

        span {
            &:hover {
                color: #409EFF;
            }
        }
    }

</style>
