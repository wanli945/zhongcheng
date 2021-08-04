<!--
 --@IDE      : WebStorm
 --@time     : 2021/2/5 10:47
 --@author   : 李艳鹏
 --@Software : app
 --@File     : editInfo
 --@describe : describe
-->
<template>
    <el-dialog :title="title"
               :visible.sync="visible"
               append-to-body
               modal-append-to-body
               :close-on-click-modal="false"
               show-close
               :close-on-press-escape="false"
               @open="open"
    >
        <el-form ref="formDD" style="display: flex;flex-wrap: wrap;justify-content: space-between"
                 label-suffix="：" :model="dataInfo"
                 label-width="auto" label-position="top" inline :rules="rules">
            <template v-for="(label,filed,index) of key2label">
                <el-form-item :label="label" :key="index" style="width: 40%;margin-bottom: 16px"
                              :prop="filed">
                    <el-input v-model.trim="dataInfo[filed]"></el-input>
                </el-form-item>
            </template>
        </el-form>
        <template #footer>
            <el-button @click="oKChange('formDD')" type="primary">确定修改</el-button>
        </template>
    </el-dialog>
</template>

<script>
    export default {
        name: "editInfo",
        props: {
            infoProp: {
                type: Object,
                required: true
            },
            scope: null
        },
        data() {
            const key2label = {
                custname: "客户名称",
                custphone: "联系电话",
                custidcard: "身份证号",
                businessnumber: '宽带帐号',
                broadband: "业务号码",
            }
            return {
                dataInfo: {},
                visible: false,
                title: `修改${name}信息`,
                key2label,
                rules: {
                    custname: [
                        {required: true, message: '客户名称不能为空', trigger: 'blur'},
                        {

                            validator: (rule, value, callback) => {
                                if (!value) {
                                    callback(new Error("客户名称不能为空"))
                                } else if (!this.$reg.name.normal2.test(value)) {
                                    callback(new Error("客户名称格式不对"))
                                } else {
                                    callback()
                                }
                            }, trigger: "blur"
                        },
                    ],
                    custphone: [
                        {required: true, message: '联系电话不能为空', trigger: 'blur'},
                        {
                            validator: (rule, value, callback) => {
                                if (!value) {
                                    callback(new Error("联系电话不能为空"))
                                } else if (!this.$reg.phone.digit.test(value)) {
                                    callback(new Error("联系电话格式不对"))
                                } else {
                                    callback()
                                }
                            }, trigger: "blur"
                        },
                    ],
                    custidcard: [
                        {
                            validator: (rule, value, callback) => {
                                if (!value) {
                                    callback()
                                } else if (!this.$reg.idCard.all.test(value)) {
                                    callback(new Error("身份证号格式不对"))
                                } else {
                                    callback()
                                }
                            }, trigger: "blur"
                        }
                    ]
                }
            };
        },
        methods: {
            oKChange(formDD) {
                this.$refs[formDD].validate(valid => {
                    if (valid) {
                        let {diffArr, diffMess} = this.$util.orderEditDiff(this.dataInfo);
                        if (diffArr.length) {
                            this.$alert("", {
                                message: "是否" + this.title,
                                title: "标题",
                                type: "info",
                            }).then(value => {
                                this.$axios.post("work_changeInfo", {}, {
                                    params: {...this.dataInfo, diffMess}
                                }).then(({message}) => {
                                    this.$message({
                                        message,
                                        type: "success",
                                        duration: 1500
                                    })
                                    this.visible = false;
                                    this.scope.query_id();
                                }).catch(reason => {
                                })
                            })
                        } else {
                            this.$message({
                                duration: 1500,
                                type: "warning",
                                message: "未修改信息"
                            })
                        }
                    }
                    return valid
                })
            },
            open() {
                // 打开后重新设置
                this.dataInfo = {
                    ...this.infoProp,
                };
            }
        },
        components: {}
    }
</script>

<style scoped>

</style>
