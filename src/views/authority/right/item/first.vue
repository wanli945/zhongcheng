<template>
    <el-container style="height: calc(100vh - 174px);margin: 0;padding: 0;">
        <el-aside width="50%">
            <el-row :gutter="20">
                <el-col :span="12" :offset="12"
                        style="display: flex;justify-content: flex-end;margin-top: 10px;margin-bottom: 10px">
                    <el-button size="small" type="warning" @click="operate('select')">刷新</el-button>
                    <el-button size="small" type="success" @click="operate('insert')">添加</el-button>
                </el-col>
            </el-row>
            <el-table
                ref="materialTable"
                :data="tableData"
                :stripe="true"
                :highlight-current-row="true"
                style="width: 100%;cursor: pointer;"
                row-key="id"
                :header-cell-style="{'text-align':'center','background-color':'rgba(193, 206, 214, 1)','fontSize':'14px',color:'black',fontWeight:600}"
                :cell-style="{'text-align':'center'}"
                :tooltip-effect="'light'"
                border
                max-height="600px"
                :empty-text="emptyText"
            >
                <el-table-column label="编号" prop="id" width="80"></el-table-column>
                <el-table-column label="部门名称" prop="dname"></el-table-column>
                <el-table-column label="二级部门" prop="secondname"></el-table-column>
                <el-table-column label="创建时间" prop="dtime" width="200"></el-table-column>
                <el-table-column label="创建人" prop="daccept" width="150"></el-table-column>
                <el-table-column label="操作" width="50">
                    <template slot-scope="prop">
                        <!--<el-button size="mini" type="success" icon="el-icon-delete-solid" circle
                                   @click="operate('delete',{...prop.row,index:prop.$index})"></el-button>-->
                        <el-button size="mini" type="danger" icon="el-icon-edit-outline" circle
                                   @click="operate('update',{...prop.row,index:prop.$index})"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-aside>
        <el-main v-show="showRight" style="margin: 0;padding: 0;">
            <el-container style="">
                <el-header height="30px">
                    <h3 style="font-size: 20px;line-height: 30px;font-weight: 600">
                        {{editTitle}}</h3>
                </el-header>
                <el-main>
                    <el-form>
                        <el-form-item label="部门名称：">
                            <el-input v-model.trim="department.name" style="width: 50%"></el-input>
                        </el-form-item>
                        <el-form-item label="二级部门：">
                            <el-input v-model.trim="department.secondname"
                                      style="width: 50%"></el-input>
                        </el-form-item>

                        <template v-for="(item,index) of department.second">
                            <el-form-item :label="'二级部门'+ (index+1) +':'" :key="index">
                                <el-input v-model.trim="item.value" style="width: 50%"></el-input>
                                <el-button size="small" style="margin-left: 10px;" type="primary"
                                           @click="deleteSecond(index)">
                                    删除
                                </el-button>
                            </el-form-item>
                        </template>
                    </el-form>

                </el-main>
                <el-footer style="text-align: center">
                    <!--<el-button type="primary" v-if="editTitle.trim()==='新增部门'" icon="el-icon-plus"
                               @click="addSecond"
                               size="small">新增二级部门
                    </el-button>-->

                    <el-button
                        size="small"
                        @click="operate(editTitle.trim()==='新增部门'?'insert':'update',{},true)"
                        type="success"
                        style="margin-right: 20px;">提交
                    </el-button>
                </el-footer>
            </el-container>

        </el-main>
    </el-container>
</template>

<script>
    import autoMenu from "../../../../common/components/autoMenu";
    import {mapState} from "vuex"

    export default {
        name: "second",
        components: {autoMenu},
        data() {
            return {
                tableData: [],
                showRight: false,
                emptyText: '',
                editTitle: '新增部门权限',

                department: {
                    name: "",
                    id: undefined,
                    index: undefined,
                    second: [],
                    secondname: ""
                },
                /* navMenus: []*/
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.operate('select')
            },
            addSecond() {
                this.department.second.push({
                    value: ""
                })
            },
            deleteSecond(index) {
                this.department.second.splice(index, 1)
            },
            operate(method, obj, ok = false) {
                this[`operate_${method}`](obj, ok)
            },
            /*
            * 增加
            * */
            operate_insert(obj, ok) {
                if (ok) {
                    this.submit('insert', () => {
                        this.operate('select')
                    })
                } else {
                    this.editTitle = '新增部门'
                    this.department.name = ''
                    this.department.id = undefined
                    this.department.index = undefined
                    this.department.second = []
                    this.department.secondname = ""
                    this.showRight = true;
                }
            },
            /*
            * 删除
            * */
            operate_delete(obj, ok) {

            },
            /*
            * 修改
            * */
            operate_update(obj, ok) {
                if (ok) {
                    this.submit('update', () => {
                        this.operate('select')
                    })
                } else {
                    this.showRight = true
                    this.editTitle = `修改部门 ${obj.dname}`
                    this.department.name = obj.dname
                    this.department.id = obj.id
                    this.department.index = obj.index
                    this.department.secondname = obj.secondname
                    this.department.second = []
                }
            },
            /*
            * 查
            * */
            operate_select() {
                this.$axios.post("staff_queryemply", {}, {
                    params: {
                        deparname: ""
                    },
                    showLoading: false
                }).then(({depar}) => {
                    this.tableData = depar;
                    this.emptyText = '无数据'
                }).catch(reason => {
                    this.tableData = [];
                    this.emptyText = reason.message
                });
            },

            submit(method, callback = () => {
            }) {
                const {name, id, index, second, secondname} = this.department
                if (!name.trim()) {
                    this.$message({
                        message: "部门名称不能为空",
                        type: "warning",
                        duration: 1000
                    })
                    return void 0;
                }

                /*let canSubmit = false
                let arr = [];
                this.tableData.forEach(value => {
                    arr.push(value.dname);
                });
                method === 'update' && arr.splice(index, 1);
                canSubmit = arr.indexOf(name) < 0
                if (!canSubmit) {
                    this.$message({
                        message: "部门已存在",
                        type: "warning",
                        duration: 1000
                    });
                    return void 0;
                }*/
                this.$alert("是否" + (method === 'insert' ? "新增" : "修改") + "部门  " + name, "提示", {
                    type: "success",
                }).then(value => {
                    if (method === 'insert') {
                        this.$axios.post("staff_chadepa", {
                            daccept: this.userInfo.username, // 创建人
                            dname: name,                 // 部门名称
                            rname: 0,
                            second,
                            secondname,
                        }).then(({my_mess}) => {
                            this.$message({
                                message: my_mess,
                                type: "success",
                                duration: 1500
                            });
                            callback();
                        })
                    } else if (method === 'update') {
                        this.$axios.post("staff_xiugaidepa", {}, {
                            params: {
                                id: id,
                                dname: name,                 // 部门名称
                                secondname
                            }
                        }).then(({my_mess}) => {
                            this.$message({
                                message: my_mess,
                                type: "success",
                                duration: 1500
                            });
                            callback();
                        })
                    }
                })
            },
        },
        computed: {
            ...mapState({
                userInfo: z => z.userInfo
            })
        }
    }
</script>

<style scoped lang="less">
    .box {
        display: flex;
        justify-content: space-between;

        & > div {
            width: 48%;
            background-color: #888888;
        }

        .box-left {

        }
    }
</style>

