<template>
    <el-row :gutter="24">
        <el-row :gutter="24">
            <el-col :span="12">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-input v-model="condition.search" placeholder="回车搜索"
                                  @keyup.native.enter="()=>!condition.search.trim() || init"></el-input>
                    </el-col>
                    <el-col :span="12" style="text-align: right">
                        <el-button type="success" @click="init">刷新</el-button>
                        <el-button type="primary" @click="operate('insert')">添加</el-button>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row :gutter="24" style="margin-top: 30px">
            <el-col :span="20">
                <el-table
                        ref="materialTable"
                        :data="tableBox.data"
                        :stripe="true"
                        :highlight-current-row="true"
                        style="width: 100%;cursor: pointer;"
                        row-key="id"
                        :header-cell-style="{'text-align':'center','background-color':'rgba(193, 206, 214, 1)','fontSize':'14px',color:'black',fontWeight:600}"
                        :cell-style="{'text-align':'center'}"
                        :tooltip-effect="'light'"
                        border
                        :empty-text="tableBox.emptyText"
                        max-height="600px"
                >
                    <el-table-column label="编号" prop="id" width="120"></el-table-column>
                    <el-table-column label="公告内容" prop="text"></el-table-column>
                    <el-table-column label="创建时间" prop="time" width="200"></el-table-column>
                    <!--<el-table-column label="是否启用" prop="top" width="200">
                        <template slot-scope="prop">
                            <el-switch disabled :value="prop.row.top" :active-value="1" :inactive-value="0"></el-switch>
                        </template>
                    </el-table-column>-->
                    <!--<el-table-column label="是否启用" prop="enable" width="200">
                        <template slot-scope="prop">
                            <el-switch disabled :value="prop.row.enable" :active-value="1"
                                       :inactive-value="0"></el-switch>
                        </template>
                    </el-table-column>-->
                    <el-table-column label="操作" width="120">
                        <template slot-scope="prop">
                            <el-button size="mini" type="success" icon="el-icon-delete-solid" circle
                                       @click="operate('delete',{...prop.row,index:prop.$index})"></el-button>
                            <!--<el-button v-if="false" size="mini" type="danger" icon="el-icon-edit-outline" circle
                                       @click="operate('update',{...prop.row,index:prop.$index})"></el-button>-->
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>

        </el-row>
        <el-dialog :visible.sync="dialog.show" append-to-body destroy-on-close width="500px">
            <template #title>
                <h2>{{dialog.title}}</h2>
            </template>
            <template #default>
                <el-form>
                    <el-form-item label="公告内容">
                        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6 }"
                                  v-model="dialog.data.text"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="是否启用">
                        <el-switch v-model="dialog.data.top" :inactive-value="0"
                                   :active-value="1"></el-switch>
                    </el-form-item>-->
                    <!-- <el-form-item label="">
                         <el-switch v-model="dialog.data.enable" :inactive-value="0" :active-value="1"></el-switch>
                     </el-form-item>-->
                </el-form>
            </template>
            <template #footer>
                <el-row :gutter="24">
                    <el-col>
                        <el-button type="primary" @click="operate(dialog.method,{},true)">提交</el-button>
                    </el-col>
                </el-row>
            </template>
        </el-dialog>
    </el-row>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                condition: {
                    search: ""
                },
                tableBox: {
                    data: [],
                    emptyText: ""
                },

                dialog: {
                    show: false,
                    data: {},
                    method: 'insert',
                    title: '新增公告'
                }
            }
        },
        activated() {
            this.init(false);
        },
        methods: {
            init(show = true) {
                this.operate('select', {}, false, (message) => {
                    if (show) {
                        this.$message({
                            duration: 1500,
                            type: 'success',
                            message: message
                        })
                    }
                })
            },
            operate(method, params, ok = false, callback = () => {
            }) {
                this[`operate_${method}`](params, ok, callback)
            },
            operate_insert(params, ok) {
                if (ok) {
                    if (this.dialog.data.text.trim()) {
                        this.submit('insert', '是否添加公告', () => {
                            this.dialog.show = false
                        })
                    } else {
                        this.$message({
                            duration: 1500,
                            type: "warning",
                            message: "请输入公告内容"
                        });
                    }
                } else {
                    this.dialog.show = true;
                    this.dialog.title = '新增公告';
                    this.dialog.method = 'insert'
                    this.$set(this.dialog, 'data', {
                        text: "",// (通知内容)、
                        top: 1,//(是否置顶)、
                        enable: 1//是否开启
                    })
                }
            },
            operate_delete(params, ok) {
                const {
                    id, text, top, enable, index
                } = params
                this.$alert("是否删除", {
                    type: "success",
                    title: "提示"
                }).then(value => {
                    this.$axios.post("info_dele", {}, {
                        params: {
                            id,
                        }
                    }).then(({my_mess}) => {
                        this.$message({
                            duration: 1500,
                            type: 'success',
                            message: my_mess
                        });
                        this.operate('select')
                    })
                })
            },
            operate_update(params, ok) {
                if (ok) {
                    this.submit('update', "是否修改公告", () => {
                        this.dialog.show = false
                    })
                } else {
                    this.dialog.show = true;
                    this.dialog.title = '修改公告';
                    this.dialog.method = 'update'
                    this.$set(this.dialog, 'data', params);
                }
            },
            operate_select(params, ok, callback) {
                this.$axios.post("info_chaxun").then(({my_mess, list}) => {
                    this.tableBox.data = list
                    callback(my_mess)
                }).catch((reason) => {
                    this.tableBox.data = []
                    this.tableBox.emptyText = reason.message
                })
            },
            submit(method, message, callback = () => {
            }, option = {}) {
                const success = (my_mess) => {
                    this.$message({
                        message: my_mess,
                        type: 'success',
                        duration: 1500
                    });
                    this.dialog.show = false
                    this.operate('select')
                }
                if (this.dialog.data.text.trim()) {
                    this.$alert("提示", {
                        message: message,
                        type: "info"
                    }).then(value => {
                        if (method.trim() === "insert") {
                            this.$axios.post('info_chainfor', {}, {
                                params: {
                                    ...this.dialog.data
                                }
                            }).then(({my_mess}) => {
                                callback();
                                success(my_mess)
                            })
                        } else if (method.trim() === "update") {
                            this.$axios.post("info_xiugai", {}, {
                                params: {
                                    ...this.dialog.data
                                }
                            }).then(({my_mess}) => {
                                callback();
                                success(my_mess)
                            })
                        }
                    })
                } else {
                    this.$message({
                        duration: 1500,
                        type: "warning",
                        message: "请输入公告内容"
                    });
                }

            }

        }
    }
</script>

<style scoped lang="less">

</style>
