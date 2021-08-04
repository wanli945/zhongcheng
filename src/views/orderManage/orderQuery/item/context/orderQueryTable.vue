
<!--// 订单生产 table-->
<template>
    <div>
        <div class="showList">
            <!--<el-button type="success" size="small" icon="el-icon-refresh" @click="operating('select')"></el-button>-->
            <el-button type="danger" size="small" icon="el-icon-s-cooperation"
                       @click="settingList"></el-button>
            <!--<el-checkbox-group v-show="group.show" v-model="group.tableCustomizeList" class="group">
                <el-checkbox :disabled="item.id==='id' || item.id==='customerName'" v-for="item of groupList"
                             :label="item.id" :key="item.id">
                    {{item.label}}
                </el-checkbox>
            </el-checkbox-group>-->
        </div>
        <el-table
            :data="tableData"
            ref="multipleTable"
            @selection-change="selectionChange"
            :stripe="true"
            :highlight-current-row="true"
            :empty-text="tableEmpty"
            @row-click="rowClick"
            style="width: 100%;cursor: pointer;"
            max-height="600px"
            :cell-style="{'text-align':'center'}"
            @header-dragend="header_dragend"
            :header-cell-style="{'text-align':'center','background-color':'rgba(193, 206, 214, 1)','fontSize':'14px',color:'black',fontWeight:600}"
            border
        >
            <el-table-column
                type="selection"
                :selectable="selectInit"
                v-if="right.assign"
                fixed="left"
                min-width="55">
            </el-table-column>
            <!--
              :min-width="item.width"
            -->
            <template v-for="(item,index) of tableList">
                <template v-if="item.show !==false">
                    <el-table-column
                        :class-name="item.field==='workid' ? 'workidBox' :''"
                        :label="item.label"
                        :key="index" :min-width="item.width">
            <span slot-scope="prop">
                <template v-if="item.field === 'phone'">
                    {{prop.row[item.field]}}
                    <!--<el-link @click="addTabs(prop.$index,prop.row)"
                             type="primary"></el-link>-->
                </template>
                  <!--  订单编号按钮     -->
                <template v-else-if="item.field==='workid'">
                     <el-link @click="edit(prop.$index,prop.row,'editBox','工单详情')"
                              type="primary">
                         <template v-if="!!prop.row.cui">
                             <i class="remindcui"></i>
                         </template>
                         {{prop.row[item.field]}}</el-link>
                </template>
                <template v-else>
                    <span>{{prop.row[item.field]}}</span>
                </template>
            </span>
                    </el-table-column>
                </template>
            </template>
            <el-table-column
                label="操作"
                :fixed="operaFixed?'right':undefined"
                width="150">
                <template #header>
                    <i :class="!operaFixed?'el-icon-s-unfold':'el-icon-s-fold'"
                       @click="operaFixed=!operaFixed"></i>
                    <span>操作</span>
                </template>
                <template slot-scope="prop">
                    <!--<el-button type="success" :disabled="!prop.row.workid" @click="edit(prop.$index,prop.row,'工单详情')"
                               size="small">
                        查看工单
                    </el-button>-->
                    <el-tooltip effect="dark" :content="!prop.row.cui ? '催单' :'取消催单'"
                                placement="top">
                        <el-button @click="cuiEvent({...prop.row,index:prop.$index})" type="danger"
                                   size="mini" circle>
                            催
                        </el-button>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="打电话" placement="top">
                        <el-button type="success" size="mini" icon="el-icon-phone" circle/>
                    </el-tooltip>

                    <el-tooltip effect="dark" content="发短信" placement="top">
                        <el-button type="danger" size="mini" icon="el-icon-message" circle/>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <!--
     ⑤ 弹窗部分
     -->

        <!--
       todo 后续增加的内容  可以后续提取为组件
        -->
        <el-dialog :visible.sync="tableListSetting.visible"
                   width="800px"
                   custom-class="tableListSetting"
                   modal-append-to-body
                   append-to-body
        >
            <template #title>
                <h2>自定义表格列</h2>
            </template>
            <el-checkbox-group v-model="tableListSetting.tableCustomizeList" size="medium">
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
                           @click="saveList">保存设置
                </el-button>
            </template>
        </el-dialog>

<!-- 导入弹框 -->
        <el-dialog :visible.sync="upload.visible" v-if="upload.visible" width="400px">
            <template #title>
                上传文件
            </template>
            <template #default>
                <el-row :gutter="24">
                    <el-row :gutter="24" style="margin-bottom: 20px;">
                        <el-col :offset="15">
                            <el-button type="success" @click="loadTemplate">下载模板</el-button>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-upload
                            ref="uploadExcel"
                            class="upload-demo"
                            drag
                            action=""
                            accept=".xlsx"
                            :multiple="false"
                            auto-upload
                            :show-file-list="false"
                            name="empFile"
                            :http-request="httpRequest"
                        >
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__tip" slot="tip">只能上传xlsx</div>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        </el-upload>
                    </el-row>
                </el-row>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    /*
    *
    * */
    import {mapMutations, mapState} from "vuex"

    export default {
        name: "orderQueryTable",
        props: {
            // 分页信息
            pagination: {
                type: Object,
                default() {
                    return {
                        total: 0,
                        curpage: 1,
                        pagesize: 10,
                    }
                }
            },
            // 页面作用域
            pageScope: {
                type: null,
                required: true
            },

            // 表格列
            tableColumn: {
                type: Array,
                required: true,
            },

            // 本地表格列
            storageColumn: {
                type: Object,
                required: true
            },
        },
        data() {
            return {
                operaFixed: true,
                tableEmpty: "",
                tableData: [],
                tableList: [],
                group: {
                    show: false,
                    tableCustomizeList: ['workid']
                },
                tableListSetting: {
                    visible: false,
                    tableCustomizeList: ['workid']
                },
                selectData: [],
                upload: {
                    visible: false
                },
                queryOption: [],
                tableCustomizeListItem: []
            }
        },
        computed: {
            ...mapState({
                right: s => s.right,
                userInfo: s => s.userInfo
            }),
        },
        created() {
            this.changeList()
        },
        methods: {
            ...mapMutations({
                addTab: "addTab"
            }),
            init() {
                this.queryOption = this.pageScope.queryOption
            },
            loadTemplate() {
                this.$DAFile(this.$tURL.work)
            },
            settingList(e, list = []) {
                this.tableListSetting.visible = true;
                const pps = () => {
                    this.storageColumn.clear();
                    this.c_tableList.forEach(item => {
                        list.push(item.field)
                    });
                }
                try {
                    let _list = this.storageColumn.get();
                    if (_list instanceof Array && _list.length) {
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
                /*this.tableCustomizeListItem.forEach(item => {
                    if (item.show !== false) {
                        list.push(item.field)
                    }
                })*/
                this.tableListSetting.tableCustomizeList = list;
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
                    this.storageColumn.set(List);
                    this.changeList();
                }).catch(reason => {
                    this.tableCustomizeListItem = JSON.parse(JSON.stringify(this.tableList))
                }).finally(() => {
                    this.tableListSetting.visible = false
                });


            },
            changeList() {
                let localList = null;
                let List = []
                try {
                    localList = this.storageColumn.get()
                    // 后续删除
                    if (typeof localList[0] === "string") {
                        List = this.tableColumn
                    }
                } catch (e) {
                }
                if (localList instanceof Array) {
                    List = localList
                } else {
                    List = this.tableColumn
                }
                this.tableList = JSON.parse(JSON.stringify(List))
                this.tableCustomizeListItem = JSON.parse(JSON.stringify(this.tableList));
                this.tableListSetting.visible = false
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

            selectionChange(data) {
                this.selectData = [];
                this.selectData.push(...data)
                /*if (data.length > 10) {
                    this.$alert("一次分配不能超过10个", {}).finally(value => {
                        this.$refs.multipleTable.clearSelection();
                    });
                } else {

                }*/
                /* this.$emit("select-data", data)*/
            },
            rowClick(row, column, event) {
                this.$emit("row-click", row, column, event)
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
            operating_select(option, callback = () => {
            }) {
                this.tableEmpty = "暂无数据"
                this.$axios.post("work_cha", {
                    queryOption: this.pageScope.queryOption,
                    pagination: this.pagination,
                    userInfo: this.userInfo,
                    random: this.right.encrypt,
                    loginA:this.userInfo.username,
                    lqudao: this.right.channel
                }, {
                    showLoading: false
                }).then(({total, qudaoList, message}) => {
                    this.tableData = qudaoList;
                    this.tableEmpty = "无数据"
                    callback(total);
                }).catch(reason => {
                    this.tableData = [];
                    this.tableEmpty = reason.message
                    callback(0);
                })
            },
            /*
            * 下载
            * */
            operating_download() {
                this.$prompt("请输入文件名", "提示", {
                    type: "success",
                    inputValue: "",
                    inputValidator: (value = "") => {
                        return !!value.trim() || "文件名不能为空";
                    }
                }).then(({value}) => {
                    this.$axios.post("daoexcel_excelwork", {}, {
                        params: {
                            queryOption: this.pageScope.queryOption,
                            userInfo: this.userInfo,
                            name: value
                        }
                    }).then(({url}) => {
                        this.$DAFile(url);
                    })
                })
            },
            operating_upload(ok = false) {
                if (ok) {

                } else {
                    this.upload.visible = true
                }
            },
            UploadSuccess(response, file, fileList) {
                this.$message({
                    message: response.code === 1 ? "上传成功" : "上传失败",
                    type: response.code === 1 ? "success" : "warning",
                    duration: 2000
                })
                if (response.code === 1) {
                    this.upload.visible = false;
                    this.pageScope.table_query()
                }
            },
            UploadError(err, file, fileList) {
                this.$message({
                    message: err.toString(),
                    type: "error",
                    duration: 2000
                })
            },
            httpRequest({action, file, filename}) {
                let fileD = new FormData()
                fileD.append(filename, file)
                this.$file.post(this.$fileApi.daoexcel_daoruexcel, fileD).then(value => {
                    this.UploadSuccess(value)
                }).catch(reason => {
                    this.UploadError(reason);
                })
            },
            header_dragend(...rest) {
                // console.log(rest)
            },

            selectInit(row) {
                //限制是否可选
                return row.status !== '成功订单';
            },
            addTabs(index, row) {
                this.addTab({
                    title: row.phone,
                    options: {id: row.id},
                    name: String(row.id),
                    components: "customer", // 客户信息的
                    fixed: false,
                    id: row.id,
                });

            },
            /*
            * 点击打开工单详情
            * */
            edit(index, row, component, name) {
                // console.log(index, row, component, name)
                this.$emit("edit", index, row, component, name, this)
            },
            /*
            * 催单事件
            * */
            cuiEvent({cui, workid, index}) {
                this.$axios.post("work_reminder", {}, {
                    params: {
                        cui,
                        workid
                    },
                }).then(value => {
                    this.$message({
                        duration: 1500,
                        message: !cui ? '催单成功' : '取消催单成功',
                        type: 'success'
                    })
                    this.tableData[index].cui = !cui
                })
            }
        },
    }
</script>

<style lang="less">

    .workidBox {
        .cell {
            overflow: visible !important;
        }

        .remindcui {
            position: relative;
            margin-right: 6px;

            &::before {
                position: absolute;
                content: "催";
                width: 20px;
                height: 20px;
                background-color: #ff3322;
                color: white;
                border-radius: 50%;
                left: -20px;
                top: -18px;
                line-height: 20px;
                text-align: center;
            }
        }
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
