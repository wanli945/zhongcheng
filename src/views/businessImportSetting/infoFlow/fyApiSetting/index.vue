<!--
 --@IDE      : WebStorm
 --@time     : 2021/1/18 15:50
 --@author   : 李艳鹏
 --@Software : app
 --@File     : index
 --@describe : 信息流  飞鱼  key 配置
-->
<template>
    <el-row :gutter="24" type="flex" justify="space-between">
        <el-col :span="14">
            <el-container>
                <el-header height="40px" style="margin: 0;padding: 0;">
                    <el-row :gutter="24">
                        <el-col :offset="12" :span="12" style="text-align: right">
                            <el-button size="small" type="success" @click="operate({
                            method:'select'
                            })">刷新
                            </el-button>
                            <el-button size="small" type="primary" @click="operate({
                            method:'insert'
                            })">新增
                            </el-button>
                        </el-col>
                    </el-row>
                </el-header>
                <el-main style="margin: 0;padding: 0;">
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
                        <template v-for="(item,index) in tableBox.columns">
                            <el-table-column :label="item.label" :prop="item.field" :key="index"
                                             :width="item.width"
                            ></el-table-column>
                        </template>
                        <el-table-column label="操作" width="100">
                            <template slot-scope="prop">
                                <el-button size="mini" type="primary" circle icon="el-icon-view"
                                           @click="operate({
                                  method:'update',
                                  data:{...prop.row,index:prop.$index},
                                })">
                                </el-button>

                                <el-button size="mini" type="danger" circle icon="el-icon-delete"
                                           @click="operate({
                                  method:'delete',
                                  data:{...prop.row,index:prop.$index}
                                })">
                                </el-button>

                            </template>
                        </el-table-column>
                    </el-table>
                </el-main>
            </el-container>
        </el-col>
        <el-col :span="10" v-if="rightBox.visible">
            <el-container style="height: 500px">
                <el-header height="50px" style="padding: 0;">
                    <h5 style="font-size: 20px;line-height: 50px;font-weight: bold">
                        {{rightBox.method |methodTitle}}</h5>
                </el-header>
                <el-main style="margin: 0;padding: 0!important;overflow: hidden">
                    <template v-if="rightBox.method==='insert' || rightBox.method==='update'">
                        <el-form :model="rightBox.replaceData" ref="replace" size="mini"
                                 style="display:flex;flex-wrap: wrap;justify-content: space-between"
                                 label-width="auto"
                                 label-position="top"
                                 :rules="rightBox.rules">
                            <el-form-item style="width:45%" prop="adName" label="户名">
                                <el-input v-model.trim="rightBox.replaceData.adName"></el-input>
                            </el-form-item>
                            <el-form-item style="width:45%" prop="key" label="私钥">
                                <el-input v-model.trim="rightBox.replaceData.key"></el-input>
                            </el-form-item>
                            <el-form-item style="width:45%" prop="token" label="token">
                                <el-input v-model.trim="rightBox.replaceData.token"></el-input>
                            </el-form-item>

                            <el-form-item style="width:45%" label="是否启用" prop="isOpen">
                                <el-select style="width: 100%"
                                           v-model.trim="rightBox.replaceData.isOpen">
                                    <el-option label="是" value="是"></el-option>
                                    <el-option label="否" value="否"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-main>
                <el-footer style="margin: 0;padding: 0;text-align: right">
                    <el-button size="small" type="success" @click="operate({
                            method:rightBox.method,
                            ok:true
                            })">提交
                    </el-button>
                </el-footer>
            </el-container>
        </el-col>
    </el-row>
</template>

<script>
    const columns = [
        {field: "adName", width: 200, label: "户名", id: 1},
        {field: "key", width: 180, label: "私钥", id: 2},
        {field: "token", width: undefined, label: "token", id: 3},
        {field: "isOpen", width: 80, label: "启用", id: 4},
    ]
    export default {
        name: "index",
        data() {
            return {
                tableBox: {
                    data: [
                        {
                            adName: "杭州合讯科技有限公司-5",
                            token: "3f21fbc6a91efc02c285aea8e34de502cb649ed7",
                            key: "TDQ4RE0wMjFNTEZa",
                            isOpen: "是",
                        }
                    ],
                    emptyText: "无数据",
                    columns,
                },

                rightBox: {
                    visible: false,
                    method: "",
                    /*
                     * 更新和插入的数据
                     * */
                    replaceData: {
                        adName: undefined,
                        token: undefined,
                        isOpen: undefined,
                        key: undefined,
                        index: undefined
                    },
                    /*
                    * 登录的数据
                    * */
                    loginDate: {},

                    rules: {
                        adName: [{required: true, message: '请填写户名', trigger: 'blur'}],
                        token: [{required: true, message: '请填写token', trigger: 'blur'}],
                        key: [{required: true, message: '请填写私钥', trigger: 'blur'}],
                        isOpen: [{required: true, message: '请选择是否启用', trigger: 'blur'}],
                    }
                },

                loginBox: {
                    visible: false,
                    codeImgUrl: '',
                    data: {
                        adName: "",
                        token: "",
                        imgCode: '',
                        random: ''
                    },
                    canButton: {
                        okImg: false,
                        okCode: false
                    },

                    getCode: {
                        timer: null,
                        text: '获取验证码',
                        disable: false
                    }
                }
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.operate({
                    method: 'select'
                })
            },
            /*
            * 数据的基本事件
            *
            * */
            operate({
                        method, data, ok = false, callback = () => {
                }
                    } = {}) {
                this.rightBox.method = method
                this[`operate_${method}`]({data, ok, callback})
            },
            /*
            * 查询
            * */

            operate_select({
                               callback = () => {
                               }
                           } = {}) {
                this.tableBox.data = [];
                this.tableBox.emptyText = "暂无数据"
                this.rightBox.visible = false
                const success = (list, message) => {
                    this.tableBox.data = []
                    this.tableBox.data.push(...list);
                    this.tableBox.emptyText = message
                }
                this.$axios.post("", {}, {
                    showLoading: false
                }).then(({list}) => {
                }).catch(({message}) => {
                    /*
                    * 失败的例子
                    * */
                    success([{
                        loginTime: "2020-11-12 02:33:11",
                        adName: "杭州合讯科技有限公司-5",
                        token: "3f21fbc6a91efc02c285aea8e34de502cb649ed7",
                        key: "TDQ4RE0wMjFNTEZa",
                        isOpen: "是",
                    }], message)
                })
            },
            /*
            * 新增
            * */
            operate_insert({data, ok, callback}) {
                if (ok) {
                    const success = () => {
                        this.operate_select();
                    }
                    this.$refs['replace'].validate(v => {
                            return v && this.$axios.post("").then(value => {
                                success()
                            }).catch(reason => {
                                success()
                            })
                        }
                    )
                } else {
                    this.rightBox.visible = false;
                    setTimeout(() => {
                        this.rightBox.replaceData.isOpen = '是'
                        this.rightBox.replaceData.adName = ''
                        this.rightBox.replaceData.token = ''
                        this.rightBox.replaceData.index = undefined
                        this.rightBox.replaceData.key = undefined
                        this.rightBox.visible = true;
                    })
                }
            },

            /*
            * 更新
            * */
            operate_update({data, ok}) {
                if (ok) {
                    const {key, u_info, adName, index, token, isOpen} = this.rightBox.replaceData
                    // this.$axios.post()
                    const success = () => {
                        this.$message({
                            duration: 1500,
                            message: '提交成功',
                            type: 'success'
                        })
                    }
                    success()
                } else {
                    this.rightBox.visible = false;
                    setTimeout(() => {
                        const {index, isOpen, token, adName, u_info, key} = data
                        this.rightBox.replaceData.isOpen = isOpen
                        this.rightBox.replaceData.adName = adName
                        this.rightBox.replaceData.token = token
                        this.rightBox.replaceData.index = index
                        this.rightBox.replaceData.u_info = u_info
                        this.rightBox.replaceData.key = key

                        this.rightBox.visible = true;
                    })
                }
            },

            /*
            * 删除
            * */
            operate_delete({data}) {
                this.rightBox.visible = false
                this.$alert("", {
                    type: 'success',
                    title: '提示',
                    message: '是否删除 ' + data.adName + ' 反刷工号'
                }).then(value => {
                    const success = () => {
                        this.$message({
                            message: '删除成功',
                            duration: 1500,
                            type: "success"
                        });
                        this.tableBox.data.splice(data.index, 1)
                    }
                    this.$http('').then(value1 => {

                    }).catch(reason => {
                        success()
                    })
                })
            },
        },
        filters: {
            methodTitle(val) {
                return {
                    insert: '新增数据',
                    update: '更新数据',
                    delete: '删除数据',
                    login: '工号登录',
                }[val] || "无相关方法"
            }
        },
        beforeDestroy() {
            this.loginBox.getCode.timer && (clearInterval(this.loginBox.getCode.timer), this.loginBox.getCode.timer = null)
        }
    }
</script>

<style scoped>

</style>
