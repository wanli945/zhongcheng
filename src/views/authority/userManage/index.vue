<template>
    <el-row :gutter="24" style="padding: 20px">
        <el-row>
            <el-col>
                <h3 style="font-size: 20px;font-weight: 600">员工配置</h3>
            </el-col>
            <el-col style="margin: 20px auto">
                <el-button size="small" icon="el-icon-refresh" type="danger"
                           @click="operation('select')">刷新
                </el-button>
                <el-button size="small" icon="el-icon-plus" type="success"
                           @click="operation('insert')">新增员工
                </el-button>
                <el-select v-model="op.dname" style="width: 300px;margin-left: 30px"  @change="operation('select')" placeholder="请选择部门"
                           clearable>
                    <el-option
                        v-for="item of optionList.dname"
                        :value="item.label"
                        :label="item.label"
                        :key="item.id"
                    >
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="15">
                <el-table border :data="tableData"
                          row-key="id"
                          :empty-text="emptyText"
                          highlight-current-row
                          max-height="600px"
                          :header-cell-style="{'text-align':'center','background-color':'rgba(193, 206, 214, 1)','fontSize':'14px',color:'black',fontWeight:600}"
                          :cell-style="{'text-align':'center'}">
                    <el-table-column prop="id" label="编号"></el-table-column>
                    <el-table-column prop="ename" label="姓名"></el-table-column>
                    <el-table-column prop="ephone" label="账号"></el-table-column>
                    <el-table-column prop="dname" label="部门"></el-table-column>
                    <el-table-column prop="lname" label="角色"></el-table-column>
                    <el-table-column label="操作" width="120">
                        <el-row slot-scope="prop" type="flex" justify="space-between">
                            <el-button type="warning" icon="el-icon-edit" @click="operation('update',{
                                 index:prop.$index,
                                ...prop.row
                            })" circle>
                            </el-button>
                            <el-button type="success" icon="el-icon-delete"
                                       @click="operation('delete',{
                                           index:prop.$index,
                                           ...prop.row
                                       })"
                                       circle></el-button>
                        </el-row>
                    </el-table-column>
                </el-table>
            </el-col>

        </el-row>
        <!--
         新增用户  传 名字
        -->
        <el-dialog :visible.sync="insert_User.visible" custom-class="editBox" width="800px">
            <template #title>
                <h2 style="font-size: 24px;font-weight: 600;line-height: 60px">新增用户 </h2>
            </template>
            <el-form ref="insert_User" :model="insert_User.data" :rules="userRules">
                <el-form-item label="用户名" prop="ename">
                    <el-input v-model="insert_User.data.ename"></el-input>
                </el-form-item>
                <el-form-item label="账号" prop="ephone">
                    <el-input v-model="insert_User.data.ephone"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="dname">
                    <el-select v-model="insert_User.data.dname">
                        <el-option
                            v-for="item of optionList.dname"
                            :value="item.value"
                            :label="item.label"
                            :key="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色" prop="lname">
                    <el-select v-model="insert_User.data.lname">
                        <el-option
                            v-for="item of optionList.lname"
                            :value="item.value"
                            :label="item.label"
                            :key="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="success"
                           @click="operation('insert',{form:'insert_User'},true)">提交
                </el-button>
            </template>
        </el-dialog>

        <!--
        修改用户  传id
        -->
        <el-dialog :visible.sync="update_User.visible" custom-class="editBox" width="800px">
            <template #title>
                <h2 style="font-size: 24px;font-weight: 600;line-height: 60px">修改员工信息 </h2>
            </template>
            <el-form ref="update_User" :model="update_User.data" :rules="userRules">
                <el-form-item label="用户名">
                    <el-input disabled :value="update_User.data.ename"></el-input>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input disabled :value="update_User.data.ephone"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="dname">
                    <el-select v-model="update_User.data.dnameid">
                        <el-option
                            v-for="item of optionList.dname"
                            :value="item.id"
                            :label="item.label"
                            :key="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色" prop="lname">
                    <el-select v-model="update_User.data.lnameid">
                        <el-option
                            v-for="item of optionList.lname"
                            :value="item.id"
                            :label="item.label"
                            :key="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="密码" prop="epwd">
                    <el-input v-model="update_User.data.epwd"></el-input>
                </el-form-item>

            </el-form>
            <template #footer>
                <el-button type="success" style="margin-top: 50px"
                           @click="operation('update',{form:'update_User'},true)">提交
                </el-button>
            </template>
        </el-dialog>
    </el-row>
</template>

<script>
    export default {
        name: "index",
        data() {

            return {
                userRules: {
                    ename: {required: true, message: "不能为空", trigger: 'blur'},
                    ephone: {required: true, message: "不能为空", trigger: 'blur'},
                    lname: {required: true, message: "不能为空", trigger: 'blur'},
                    dname: {required: true, message: "不能为空", trigger: 'blur'},
                    epwd: [{
                        validator: (rule, value, callback) => {
                            if (value) {
                                if (this.$reg.password.test(value)) {
                                    callback()
                                } else {
                                    callback(new Error("密码不能少于8位且为数字、大小写字母组合"))
                                }
                            } else {
                                callback();
                            }
                        }, trigger: 'blur'
                    }],
                },
                tableData: [],
                emptyText: "无数据",
                insert_User: {
                    visible: false,
                    data: {
                        ename: "",
                        lname: "",
                        dname: "",
                        ephone: "",

                    }
                },
                update_User: {
                    visible: false,
                    data: {
                        id: undefined,
                        index: undefined,
                        ename: "",
                        lname: "",
                        dname: "",
                        ephone: "",

                        lnameid: "",
                        dnameid: '',
                        epwd: ""
                    }
                },
                optionList: {
                    lname: [],
                    dname: []
                },
                op: {
                    dname:""
                }
            };
        },
        mounted() {

        },
        activated() {
            this.init();
        },
        methods: {
            init() {
                this.operation('select')
            },
            submit(form, method, callback = () => {
            }) {
                method = method.trim();
                form = form.trim();
                /*
                * 存在 员工姓名相同的
                * */
                if (method === 'insert') {
                    const {ename, ephone, lname, dname} = this.insert_User.data;
                    const cannotSubmit = this.tableData.some((value) => {
                        return ephone === value.ephone
                    })
                    if (cannotSubmit) {
                        this.$message({
                            message: `该证号已存在`
                        });
                        return void 0;
                    }
                } else if (method === 'update') {
                    const {ename, ephone, lname, dname, id, index} = this.update_User.data;
                    let cannotSubmit = false;
                    let _index = parseInt(index);
                    for (const itemIndex in this.tableData) {
                        const itemVal = this.tableData[itemIndex]
                        if (itemVal.ephone === ephone) {
                            _index = parseInt(itemIndex);
                            break
                        }
                    }
                    cannotSubmit = _index !== index;
                    if (cannotSubmit) {
                        this.$message({
                            message: `该证号已存在`
                        })
                        return void 0;
                    }
                }
                this.$refs[form].validate(vaild => {
                    if (vaild) {
                        this.$alert(`是否 ${method === 'insert' ? '添加' : '修改'}`, {
                            title: "提示"
                        }).then(() => {
                            if (method === 'insert') {
                                const {ename, ephone, lname, dname} = this.insert_User.data;
                                this.$axios.post("staff_tianjia", {}, {
                                    params: {
                                        ename, // 用户名称
                                        ephone, // 手机
                                        lname, // 角色
                                        dname, // 部门
                                    }
                                }).then(value => {
                                    this.$message({
                                        type: "success",
                                        duration: 1000,
                                        message: "添加成功"
                                    });
                                    callback()
                                })
                            } else if (method === 'update') {
                                const {ename, ephone, lname, dname, id, index, lnameid, dnameid, epwd} = this.update_User.data;
                                this.$axios.post("empl_empldepa", {}, {
                                    params: {
                                        id,
                                        lnameid,
                                        dnameid,
                                        epwd
                                    }
                                }).then(value => {
                                    this.$message({
                                        type: "success",
                                        duration: 1000,
                                        message: "修改成功"
                                    });
                                    callback();
                                })
                            }
                        })
                    }
                    return vaild
                });
            },
            operation(method, obj, ok = false) {
                this[`operation_${method}`](obj, ok)
            },
            /*
            * 查询   刷新
            * */
            operation_select() {
                // console.log(this.op.dname)

                const success = ({deparList, levelsList, empl}) => {
                    this.tableData = empl;
                    this.emptyText = "无数据"
                    this.$set(this.optionList, "lname", levelsList)
                    this.$set(this.optionList, "dname", deparList)
                }
                this.$axios.post("staff_queryemply", {}, {
                    params: {
                        deparname: this.op.dname
                    },
                    showLoading: false
                }).then(({deparList, levelsList, empl}) => {
                    success({deparList, levelsList, empl})}
                // this.tableData =
                ).catch(reason => {
                    this.tableData = []
                    this.emptyText = reason.message
                })
            },

            /*
            * 删除
            * */
            operation_delete(obj) {
                const {index, id} = obj
                this.$axios.post("empl_deleteempl", {}, {
                    params: {
                        id
                    }
                }).then(value => {
                    this.$message({
                        message: "删除成功",
                        duration: 1000,
                        type: "success"
                    })
                    this.operation_select();
                })
            },
            /*
            * 更新
            * */
            operation_update(data, ok) {
                if (ok) {
                    const {form} = data
                    this.submit(form, "update", () => {
                        this.update_User.visible = false;
                        this.operation("select");
                    })
                } else {
                    const {
                        id, index, ename, lname, dname, ephone, lnameid,
                        dnameid, epwd
                    } = data
                    this.update_User.visible = true;
                    this.$set(this.update_User, "data", {
                        id,
                        index,
                        ename,
                        lname,
                        dname,
                        ephone,
                        lnameid,
                        dnameid,
                        epwd
                    })
                }
            },
            /*
            *
            * 新增用户
            * */
            operation_insert(data, ok) {
                if (ok) {
                    const {form} = data
                    this.submit(form, "insert", () => {
                        this.insert_User.visible = false;
                        this.operation("select");
                    })
                } else {
                    this.insert_User.visible = true
                    this.insert_User.data = {
                        ename: "",
                        lname: "",
                        dname: "",
                        ephone: ""
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
