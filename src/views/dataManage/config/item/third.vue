
<!--  工单流模板 -->

<template>
    <el-container style="height: calc(100vh - 164px)">
        <el-aside width="50%" style="padding: 0;margin: 0;">
            <el-container>
                <el-header height="40px" style="margin: 0;padding: 0;">
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-input size="small" v-model="condition.search"
                                      placeholder="请输入模板名称 回车搜索"
                                      @keyup.enter.native="operate('select')"></el-input>
                        </el-col>
                        <el-col :span="8" :offset="4" style="text-align: right">
                            <el-button size="small" type="success" @click="operate('select')">刷新
                            </el-button>
                            <el-button size="small" type="primary"
                                       @click="operate('insert',{},false)">新增
                            </el-button>
                        </el-col>
                    </el-row>
                </el-header>
                <el-main style="margin: 0;padding: 0;">
                    <el-table
                        max-height="680px"
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
                    >
                        <el-table-column label="编号" prop="id" width="100"></el-table-column>
                        <el-table-column label="模板名称" prop="templateName"></el-table-column>
                        <el-table-column label="启用状态" width="150">
                            <template slot-scope="prop">
                                {{prop.row.enable===1?"启用":"禁用"}}
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="120">
                            <template slot-scope="prop">
                                <el-button size="mini" type="success" icon="el-icon-delete-solid"
                                           circle
                                           @click="operate('delete',{...prop.row,index:prop.$index})"></el-button>
                                <el-button size="mini" type="danger" icon="el-icon-edit-outline"
                                           circle
                                           @click="operate('update',{...prop.row,index:prop.$index},false)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-main>
            </el-container>
        </el-aside>

        <el-main style="margin: 0;padding: 0;margin-left: 10px;">
            <el-container v-if="rightBox.visible"
                          style="height: calc(100vh - 200px);margin: 0;padding: 0;">
                <el-header height="30px" style="margin: 0;padding: 0;">
                    <h5 style="font-size: 16px;line-height: 30px;font-weight: bold;">
                        {{rightBox.title}}</h5>
                </el-header>
                <el-main style="padding: 0;margin: 10px 0 0;">
                    <el-row :gutter="24">
                        <el-col :span="4"
                                style="line-height: 40px;font-size: 14px;font-weight: bold">
                            工单流名称
                        </el-col>
                        <el-col :span="12">
                            <el-input v-model="rightBox.template.name"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24" v-if="rightBox.method==='update'">
                        <el-col :span="4"
                                style="line-height: 40px;font-size: 14px;font-weight: bold">是否启用
                        </el-col>
                        <el-col :span="12" style="line-height: 40px">
                            <el-switch
                                v-model="rightBox.template.enable"
                                :active-value="1"
                                :inactive-value="0">
                            </el-switch>
                        </el-col>
                    </el-row>
                    <el-container style="height: calc(100vh - 380px)">
                        <el-header height="30px" style="margin: 0;padding: 0;">
                            <h5 style="line-height:30px;font-size: 14px;font-weight: bold">流程图</h5>
                        </el-header>
                        <el-main style="margin: 0;padding: 0;">
                            <template v-if="rightBox.method==='insert'">
                                <el-steps style="margin-top: 20px;height: auto"
                                          :active="rightBox.template.data.length"
                                          align-center
                                          direction="vertical"
                                          :space="150">
                                    <template v-for="(item,index) of rightBox.template.data">
                                        <el-step :key="index">
                                            <template #title>
                                                <el-row :gutter="24">
                                                    <el-col :span="12">
                                                        <el-select v-model="item.title" clearable
                                                                   placeholder="订单流状态">
                                                            <template
                                                                v-for="(item,index) of orderFlowList">
                                                                <el-option :key="index"
                                                                           :value="item.value"
                                                                           :label="item.value"></el-option>
                                                            </template>
                                                        </el-select>
                                                        <!--<el-input placeholder=""
                                                                  v-model="item.title"></el-input>-->
                                                    </el-col>
                                                    <el-col :span="5" :offset="4">
                                                        <el-button v-if="index"
                                                                   type="danger"
                                                                   @click="removeOneList(index)"
                                                                   size="mini"
                                                                   icon="el-icon-delete"
                                                                   circle></el-button>
                                                    </el-col>
                                                </el-row>
                                            </template>
                                            <template #description>
                                                <el-row :gutter="24">
                                                    <el-col :span="16">
                                                        <el-input :rows="3" resize="none"
                                                                  placeholder="订单流状态说明"
                                                                  type="textarea"
                                                                  v-model="item.description"></el-input>
                                                    </el-col>
                                                </el-row>
                                            </template>
                                        </el-step>
                                    </template>
                                </el-steps>
                                <el-row :gutter="24">
                                    <el-col :span="15" :offset="1"><i class="el-icon-plus my_plus"
                                                                      @click="addOneList"></i>
                                    </el-col>
                                </el-row>
                            </template>
                            <template v-else-if="rightBox.method==='update'">
                                <el-steps style="margin-top: 20px"
                                          :active="rightBox.template.data.length"
                                          align-center
                                          direction="vertical"
                                          :space="100"
                                >
                                    <template v-for="(item,index) of rightBox.template.data">
                                        <el-step
                                            :key="index"
                                            :title="item.title"
                                            :description="item.description"/>
                                    </template>
                                </el-steps>

                            </template>
                        </el-main>
                    </el-container>
                </el-main>
                       <!--todo 右侧 确定按钮-->
                <el-footer height="40px"
                           style="margin: 0;padding: 0; margin-right: 40px;text-align: right">
                    <el-button size="small" @click="operate(rightBox.method,{},true)"
                               type="success"> {{rightBox.method === "insert" ? "提交" :"确定"}}
                    </el-button>
                </el-footer>
            </el-container>
        </el-main>
    </el-container>
</template>
<script>
    import {orderFlow} from "../../../../data/status.data"

    export default {
        name: "third",
        beforeCreate() {
            this.$root.dataManage.third = this;
        },
        data() {
            return {
                orderFlowList: orderFlow.list,
                condition: {
                    search: '',
                    pagesize: 10,
                    curpage: 1
                },
                tableBox: {
                    data: [{
                        id: 0,
                        templateName: "信息流",
                        enable: 0,
                        templateData: []
                    }]
                },

                rightBox: {
                    visible: false,
                    method: "insert",
                    title: "",
                    template: {
                        name: "",
                        data: [
                            {
                                title: "状态",
                                description: "说明"
                            }
                        ],
                        enable: undefined,
                        id: undefined,
                        index: undefined
                    }
                }
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.operate_select(false)
            },
            addOneList() {
                this.rightBox.template.data.push({
                    title: "",
                    description: ""
                })
            },
            removeOneList(index) {
                this.rightBox.template.data.splice(index, 1)
            },
            operate(method, option, ok = false) {
                this[`operate_${method}`](option, ok)
            },
            // todo 新增
            operate_insert(option, ok) {
                if (ok) {
                    this.submit('insert', () => {
                    })
                } else {
                    this.rightBox.visible = false;
                    setTimeout(() => {
                        this.rightBox.visible = true;
                        this.rightBox.method = "insert";
                        this.rightBox.title = "新增工单流程";
                        this.rightBox.template = {
                            name: "",
                            data: [
                                {
                                    title: "",
                                    description: ""
                                }
                            ],
                            enable: undefined,
                            id: undefined,
                            index: undefined
                        };
                    }, 10)
                }
            },
            // todo 操作删除
            operate_delete({id, index}) {
                this.$alert("",{
                    type:"success",
                    message: '确定删除模板吗？',
                    title: "提示",
                }).then(res =>{
                    this.$axios.post("fley_liu_deleteliu", {}, {
                        params: {
                            id
                        }
                    }).then(({message}) => {
                        this.tableBox.data.splice(index, 1);
                        this.$message({
                            message,
                            duration: 1500,
                            type: "success"
                        })
                        this.rightBox.visible = false
                    })
                })

            },
            operate_update(option, ok) {
                if (ok) {
                    this.submit('update', () => {
                    })
                } else {
                    this.rightBox.visible = false;
                    setTimeout(() => {
                        this.rightBox.visible = true;
                        this.rightBox.method = "update";
                        this.rightBox.title = "修改工单流程";
                        this.rightBox.template = {
                            name: option.templateName,
                            data: option.templateData,
                            enable: option.enable,
                            id: option.id,
                            index: option.index
                        };
                    }, 10)
                }
            },
            operate_select(isShow = true) {
                this.tableBox.data = []
                this.$axios.post("fley_liu_liu", {}, {
                    params: {
                        flowName: this.condition.search
                    },
                    showLading: false,
                }).then(({list, message}) => {
                    this.tableBox.data = [];
                    this.tableBox.data.push(...list);
                    isShow && this.$message({
                        message,
                        duration: 1500,
                        type: "success"
                    })
                })
            },

            // todo 右侧确定按钮 搜索框 不能为空
            submit(method, callback = () => {
            }) {
                const {enable, data, name, id, index} = this.rightBox.template
                if (!name.trim()) {
                    return this.$message({
                        duration: 1500,
                        message: "模板流名称不能为空",
                        type: "warning"
                    })
                }
                this.$alert("是否" + method === 'insert' ? '新增' : '修改' + '模板流', "提示").then(value => {
                    if (method === "insert") {
                        this.$axios.post("fley_liu_insertliu", {
                            flowName: name,
                            stateName: JSON.stringify(data)
                        }).then(({message}) => {
                            this.$message({
                                type: "success",
                                duration: 1500,
                                message
                            });
                            this.rightBox.visible = false
                            this.operate("select");
                        })
                    } else if (method === "update") {

                        this.$axios.post("fley_liu_updateliu", {}, {
                            params: {
                                flowName: name,
                                id,
                                enable
                            }
                        }).then(({message}) => {
                            this.$message({
                                type: "success",
                                duration: 1500,
                                message
                            });
                            this.rightBox.visible = false;
                            this.tableBox.data[index].enable = enable;
                            this.tableBox.data[index].templateName = name;
                        })
                    }
                })

            }
        },
        watch: {
            'condition.curpage'() {
                this.operation('select')
            },
            "condition.pagesize"() {
                this.operation('select')
            }
        }
    }
</script>

<style lang="less" scoped>
    .my_plus {
        font-size: 28px;
        color: #8c939d;
        height: 50px;
        line-height: 50px;
        width: 100%;
        text-align: center;
        border: 1px dashed #b6b6b6;
        background-color: #d9d9d9;
    }
</style>
