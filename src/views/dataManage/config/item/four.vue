<template>
    <!--
    地市配置
    -->
    <el-container style="height: calc(100vh - 184px)">
        <el-header height="60px">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-row :gutter="24">
                        <el-col :span="12" style="text-align: right" :offset="12">
                            <el-button type="primary" size="small" @click="operating({
                            method:'select'

                            })">刷新
                            </el-button>
                            <el-button type="success" size="small" @click="operating({
                            method:'insert'
                            })">新增
                            </el-button>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <h2 v-show="rightBox.visible">{{rightBox.title}}</h2>
                </el-col>
            </el-row>
        </el-header>
        <el-main style="margin: 0;padding: 0;">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-table
                        max-height="680px"
                        ref="materialTable"
                        :data="tableData"
                        :stripe="true"
                        :highlight-current-row="true"
                        style="width: 100%;cursor: pointer;"
                        :header-cell-style="{'text-align':'center','background-color':'rgba(193, 206, 214, 1)','fontSize':'14px',color:'black',fontWeight:600}"
                        :cell-style="{'text-align':'center'}"
                        :tooltip-effect="'light'"
                        border
                    >
                        <template v-for="(item,index) of columns">
                            <el-table-column :prop="item.field" :label="item.name"
                                             :width="item.width"></el-table-column>
                        </template>
                        <el-table-column label="操作" width="100">
                            <template slot-scope="prop">
                                <!--
                                修改
                                -->
                                <el-button icon="el-icon-edit" size="small" circle type="primary"
                                           @click="operating({
                                           method:'update',
                                           data:{index:prop.$index,...prop.row}
                                })"></el-button>

                                <!--
                                删除
                                -->
                                <!--                                <el-button icon="el-icon-delete" size="small" circle type="success"></el-button>-->
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="12">
                    <el-container v-if="rightBox.visible">
                        <el-main style="margin: 0;padding: 0;">
                            <el-form :ref="rightBox.form" size="small" :model="rightBox.data"
                                     label-width="auto"
                                     :rules="rightBox.rules">
                                <el-form-item label="地市：" style="display: flex" prop="cityName">
                                    <el-input :disabled="rightBox.method==='update'"
                                              style="width: 213px;"
                                              v-model="rightBox.data.cityName"></el-input>
                                </el-form-item>
                                <el-form-item label="是否启用：" style="display:flex;">
                                    <el-select :disabled="rightBox.method==='insert'"
                                               v-model="rightBox.data.isOpen">
                                        <el-option value="启用" label="启用"></el-option>
                                        <el-option value="禁用" label="禁用"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </el-main>
                        <el-footer style="text-align: right">
                            <el-button @click="operating({
                              method:rightBox.method,
                              ok:true,
                              data:rightBox.data
                            })"
                                       type="success"
                                       size="small"
                            >
                                确定
                            </el-button>
                        </el-footer>
                    </el-container>
                </el-col>
            </el-row>

        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "four",
        data() {
            return {
                tableData: [],
                columns: [
                    {name: "地市编号", field: "id", width: "80"},
                    {name: "地市名称", field: "city", width: ""},
                    {name: "创建时间", field: "createTime", width: "180"},
                    // {name: "创建人", field: "createPeople", width: "150"},
                    {name: "是否启用", field: "isOpen", width: "100"},
                ],

                rightBox: {
                    visible: false,
                    method: "insert",
                    form: 'rightForm',
                    title: "新增地市",
                    rules: {
                        cityName: [
                            {required: true, message: '请输入地市名称', trigger: 'blur'}
                        ]
                    },
                    data: {
                        cityName: "",
                        isOpen: "启用",
                        id: undefined,
                        index: undefined
                    }
                }
            }
        },
        mounted() {
            this.operating({
                method: "select",
            })
        },
        methods: {
            operating({method, data, ok = false, callback} = {}) {
                this[`operating_${method}`]({data, ok, callback})
            },
            operating_select({
                                 data, ok, callback = () => {
                }
                             } = {}) {
                this.rightBox.visible = false
                this.tableData = []
                this.$axios.post("info_queryatree", {}, {
                    showLading: false,
                }).then(({list}) => {

                    this.tableData = [...list]
                }).catch(reason => {
                    console.log(reason)
                })
            },
            operating_insert({
                                 data, ok, callback = () => {
                }
                             } = {}) {
                if (ok) {
                    const {isOpen, cityName} = this.rightBox.data
                    this.$refs[this.rightBox.form].validate(v => {
                        return v && this.$axios.post("info_tree", {}, {
                            params: {
                                areaname: cityName
                            }
                        }).then(({message}) => {
                            this.operating({
                                method: 'select'
                            })
                            this.$message({
                                duration: 1000,
                                type: 'success',
                                message
                            })
                        }).catch(reason => {
                            console.log(reason)
                        })
                    })
                } else {
                    this.rightBox.visible = false;
                    setTimeout(() => {
                        this.rightBox.visible = true;
                        this.rightBox.method = 'insert'
                        this.rightBox.title = "新增地市"
                        this.rightBox.data = {
                            cityName: "",
                            isOpen: "启用",
                            id: undefined,
                            index: undefined
                        }
                    })

                }
            },

            operating_update({
                                 data, ok, callback = () => {
                }
                             } = {}) {
                if (ok) {
                    this.$axios.post("info_updatetree", {}, {
                        params: {
                            id: data.id,
                            isOpen: data.isOpen
                        }
                    }).then(({message}) => {
                        this.$message({
                            message: "修改成功",
                            type: "success",
                            duration: 1500
                        });
                        this.rightBox.visible = false;
                        this.tableData[data.index].isOpen = data.isOpen
                    })
                } else {
                    const {city, isOpen, id, index} = data
                    this.rightBox.visible = false;
                    setTimeout(() => {
                        this.rightBox.visible = true;
                        this.rightBox.method = 'update'
                        this.rightBox.title = "修改地市"
                        this.rightBox.data = {
                            cityName: city,
                            isOpen: isOpen,
                            id,
                            index
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
