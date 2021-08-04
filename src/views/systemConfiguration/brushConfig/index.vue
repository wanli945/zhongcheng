<!--
 --@IDE      : WebStorm
 --@time     : 2020/11/23 09:28
 --@author   : 李艳鹏
 --@Software : app
 --@File     : index
 --@describe : 反刷工号配置
-->

<template>
    <el-row :gutter="24" type="flex" justify="space-between">
        <el-col :span="14">
            <el-container>
                <el-header height="40px" style="margin: 0;padding: 0;">
                    <el-row :gutter="24">
                        <el-col :offset="12" :span="12" style="text-align: right">
<!--                            <el-button size="small" type="success" @click="operate({-->
<!--                            method:'select'-->
<!--                            })">刷新-->
<!--                            </el-button>-->
<!--                            <el-button size="small" type="primary" @click="operate({-->
<!--                            method:'insert'-->
<!--                            })">新增-->
<!--                            </el-button>-->
<!--                            <el-button size="small" type="primary" @click="operate({-->
<!--                            method:'logining'-->
<!--                            })">登录-->
<!--                            </el-button>-->
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
                                             :min-width="item.width"
                            ></el-table-column>
                        </template>
                        <el-table-column label="操作" min-width="180">
                            <template slot-scope="prop">
<!--                                <el-button size="mini" type="primary" @click="operate({-->
<!--                                  method:'delete',-->
<!--                                  data:{...prop.row,index:prop.$index}-->
<!--                                })">删除-->
<!--                                </el-button>-->
                                <el-button size="mini" type="danger" @click="operate({
                                  method:'update',
                                  data:{...prop.row,index:prop.$index},
                                })"  v-if="prop.row.id!==8"   >查看
                                </el-button>

                                <!--<el-button size="small" type="danger" @click="bssOperate({
                                   method:'openLoginBox',
                                  data:{
                                      ...prop.row
                                  }
                                })">重新登录
                                </el-button>-->
                            </template>
                        </el-table-column>
                    </el-table>
                </el-main>
            </el-container>
        </el-col>
        <el-col :span="10" v-if="rightBox.visible">
            <el-container>
                <el-header height="50px" style="padding: 0;">
                    <h5 style="font-size: 20px;line-height: 50px;font-weight: bold">
                        {{rightBox.method |
                        methodTitle}}</h5>
                </el-header>
                <el-main style="margin: 0;padding: 0;">

                    <template v-if="rightBox.method==='insert' || rightBox.method==='update'">
                        <el-form :model="rightBox.replaceData" ref="replace" size="mini"
                                 :rules="rightBox.rules">
                            <el-row :gutter="24">
                                <el-col :span="10">
                                    <template v-if="rightBox.method==='insert'">
                                        <el-form-item label="手机号：" style="display: flex" prop="tel">
                                            <el-input v-model="rightBox.replaceData.tel"></el-input>
                                        </el-form-item>
                                    </template>
                                    <template v-if="rightBox.method==='logining'">
                                        <el-form-item label="手机号：" style="display: flex" prop="tel">
                                            <el-input v-model="rightBox.replaceData.tel"></el-input>
                                        </el-form-item>
                                    </template>
                                    <template v-else-if="rightBox.method==='update'">
                                        <el-form-item label="手机号：" style="display: flex">
                                            <el-input readonly
                                                      :value="rightBox.replaceData.tel"></el-input>
                                        </el-form-item>
                                    </template>
                                </el-col>
                                <el-col :span="14">
                                    <el-form-item label="cast-order-token：" style="display: flex" prop="ordertoken">
                                        <el-input
                                            v-model="rightBox.replaceData.ordertoken"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <template v-if="rightBox.method==='update' || rightBox.method==='insert'">
                                <el-row :gutter="24">
                                    <el-col :span="12">
                                        <el-form-item label="token：" style="display: flex"
                                                      prop="token">
                                            <el-input
                                                v-model="rightBox.replaceData.token"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="u_info：" style="display: flex"
                                                      prop="uinfo">
                                            <el-input
                                                v-model="rightBox.replaceData.uinfo"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                            </template>
<!--                            <el-row :gutter="24">-->
<!--                                <el-col :span="12">-->
<!--                                    <el-form-item label="是否切换地市：" style="display: flex">-->
<!--                                        <el-switch-->
<!--                                            v-model="rightBox.replaceData.isSwitch"-->
<!--                                            inactive-text="否"-->
<!--                                            inactive-value="否"-->
<!--                                            active-text="是"-->
<!--                                            active-value="是"-->
<!--                                        ></el-switch>-->
<!--                                    </el-form-item>-->
<!--                                </el-col>-->
<!--                            </el-row>-->
                        </el-form>
                    </template>
                </el-main>
                <el-footer style="margin: 10px 0  0;padding: 0;">
                    <el-row :gutter="24">
                        <el-col style="text-align: right" :span="12" :offset="12">
<!--                            <template v-if="rightBox.method==='update'">-->
<!--                                <el-button size="small" type="primary" @click="bssOperate({-->
<!--                                  method:'verify',-->
<!--                                  data:rightBox.replaceData-->
<!--                                })">验证-->
<!--                                </el-button>-->
<!--                            </template>-->
                            <el-button size="small" type="success" @click="operate({
                            method:rightBox.method,
                            ok:true
                            })" :disabled="rightBox.replaceData.id === 8 ">提交
                            </el-button>
                        </el-col>
                    </el-row>
                </el-footer>
            </el-container>
        </el-col>
        <!--
         重新登录
        -->

        <el-dialog :visible.sync="loginBox.visible" width="800px" :close-on-click-modal="false"
                   append-to-body
                   modal-append-to-body>
            <template #title>
                <h5 style="font-size: 20px;font-weight: bold">BSS工号登录（{{loginBox.data.tel}}
                    ->{{loginBox.data.password}}）（ESC键退出）</h5>
            </template>
            <template #default>
                <el-form label-width="auto">
                    <el-row :gutter="24" v-show="!loginBox.canButton.okCode">
                        <el-col :span="12">
                            <el-form-item style="display: flex" label="图片验证">
                                <el-input placeholder="请输入图形验证码"
                                          v-model="loginBox.data.imgCode"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-row type="flex">
                                <el-col>
                                    <el-tooltip placement="top" effect="light" content="点击刷新验证码">
                                        <el-image style="width: 108px;height: 50px;"
                                                  @click="bssOperate_getImgCode"
                                                  :src="loginBox.codeImgUrl">
                                            <template #placeholder>图片验证码</template>
                                            <template #error>加载失败</template>
                                        </el-image>
                                    </el-tooltip>
                                </el-col>
                                <el-col>
                                    <el-button
                                        v-show="loginBox.data.imgCode && loginBox.data.imgCode.length>=4"
                                        :disabled="!loginBox.canButton.okImg "
                                        style="margin-left: 10px"
                                        type="success" @click="bssOperate({
                                method:'verifyImgCode'
                            })">验证
                                    </el-button>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>

                    <el-row :gutter="24" v-show="loginBox.canButton.okCode">
                        <el-col :span="12">
                            <el-form-item style="display: flex" label="验证码">
                                <el-input placeholder="请输入验证码"
                                          v-model="loginBox.data.random"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-row type="flex">
                                <el-col>
                                    <el-button style="margin-left: 10px"
                                               :disabled="loginBox.getCode.timer!==null"
                                               type="success" @click="bssOperate({
                                                method:'getCode'

                                 })">{{loginBox.getCode.text}}
                                    </el-button>
                                </el-col>
                                <el-col>
                                    <el-button style="margin-left: 10px"
                                               v-if="!!loginBox.data.random"
                                               type="success" @click="bssOperate({
                                               method:'login'
                                 })">登录
                                    </el-button>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>

                </el-form>
            </template>
        </el-dialog>
    </el-row>
</template>

<script>
    import {columns} from "./indexData";

    export default {
        name: "index",
        data() {
            return {
                tableBox: {
                    data: [],
                    emptyText: "无数据",
                    columns: columns,
                },

                rightBox: {
                    visible: false,
                    method: "",
                    /*
                     * 更新和插入的数据
                     * */
                    replaceData: {
                        tel: undefined,
                        ordertoken: undefined,
                        // isSwitch: undefined,
                        token: undefined,
                        uinfo: undefined,
                        // index: undefined,
                        id: undefined
                    },
                    /*
                    * 登录的数据
                    * */
                    loginDate: {},

                    rules: {
                        tel: [{required: true, message: '请填写手机号', trigger: 'blur'}],
                        ordertoken: [{required: true, message: '请填写ordertoken', trigger: 'blur'}],
                        token: [{required: true, message: '请填写token', trigger: 'blur'}],
                        uinfo: [{required: true, message: '请填写u_info', trigger: 'blur'}],
                    }
                },

                loginBox: {
                    visible: false,
                    codeImgUrl: '',
                    data: {
                        tel: "",
                        password: "",
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
        activated() {
            this.operate({   method: 'select'  })
        },
        methods: {
            /*
            * 数据的基本事件
            * */
            operate({
                        method, data, ok = false, callback = () => {}
                    } = {}) {
                this.rightBox.method = method
                this[`operate_${method}`]({data, ok, callback})
            },
            /*
            * 查询
            * */

            operate_select({  callback = () => {} } = {}) {
                this.tableBox.data = [];
                this.tableBox.emptyText = "暂无数据"
                this.rightBox.visible = false

                this.$axios.post("d/bssverify/queryAll").then(({entry, message}) => {
                    let seleList = [];
                    console.log(entry)
                    entry.forEach(item => {
                        seleList.push({
                            id: item.id,
                            logintime: item.logintime,
                            ordertoken: item.ordertoken,
                            password: item.password,
                            success: item.success === '0' ? '否' : '是',
                            tel: item.tel,
                            token: item.token,
                            uinfo: item.uinfo
                        })
                    })
                    this.tableBox.data = []
                    this.tableBox.data.push(...seleList);
                    this.tableBox.emptyText = message
                    // this.tableBox.data.forEach((val,index)=>{if(val.id==8){
                    //     this.tableBox.data.splice(index,1)
                    //     console.log(val)
                    // } })
                }).catch(({message}) => {
                    this.tableBox.emptyText = message
                    this.tableBox.data = []
                })
            },

            operate_logining({data ,ok}) {},
            /*
            * 新增
            * */
            operate_insert({data, ok, callback}) {
                if (ok) {
                    this.$refs['replace'].validate(v => {
                            return v && this.$axios.post("",{},{
                                params: {
                                    ...this.rightBox.replaceData
                                }
                            }).then(({entry}) => {
                                console.log(data)
                                this.$message({
                                    duration: 1500,
                                    message: entry,
                                    type: 'success'
                                })
                                this.operate_select()
                            }).catch(reason => {
                                this.operate_select()
                            })
                        }
                    )
                } else {
                    this.rightBox.visible = false;
                    setTimeout(() => {
                        this.rightBox.replaceData.isSwitch = '否'
                        this.rightBox.replaceData.tel = ''
                        this.rightBox.replaceData.password = ''

                        this.rightBox.replaceData.index = undefined
                        this.rightBox.replaceData.u_info = undefined
                        this.rightBox.replaceData.token = undefined
                        this.rightBox.visible = true;
                    })
                }
            },

            /*
            * 更新
            * */
            operate_update({data, ok}) {
                if (ok) {
                    this.$refs.replace.validate(val =>{
                        if(val) {
                            const {token, uinfo, tel, index, ordertoken, id} = this.rightBox.replaceData
                            this.$axios.post('d/bssverify/updateToken',{},{
                                params: {
                                    ...this.rightBox.replaceData
                                }
                            }).then(({entry}) => {
                                console.log(entry)

                                this.$message({
                                    duration: 1500,
                                    message: entry,
                                    type: 'success'
                                })
                                this.operate_select()
                            })
                        }
                    })
                } else {
                    this.rightBox.visible = false;
                    setTimeout(() => {
                        // const {index, isSwitch, password, tel, u_info, token} = data
                        const {index, ordertoken, password, tel, uinfo, token, id} = data
                        this.rightBox.replaceData.ordertoken = ordertoken
                        this.rightBox.replaceData.tel = tel
                        // this.rightBox.replaceData.password = password
                        // this.rightBox.replaceData.index = index
                        this.rightBox.replaceData.uinfo = uinfo
                        this.rightBox.replaceData.token = token
                        this.rightBox.replaceData.id = id
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
                    message: '是否删除 ' + data.tel + ' 反刷工号'
                }).then(value => {
                    this.$axios.post('d/bssverify/deleteToken',{},{
                        params: {
                            id: data.id,
                            tel: data.tel
                        }
                    }).then(({entry}) =>{
                        this.$message({
                            message: entry,
                            duration: 1500,
                            type: "success"
                        });
                        this.operate_select()
                    })
                })
            },

            /*
            * BSS操作
            * */
            bssOperate({method, ok = false, data}) {
                this[`bssOperate_${method}`]({ok, data})
            },
            /*验证token和u_info*/
            bssOperate_verify({ok, data}) {
                if (ok) {

                } else {
                    const {tel, u_info, token, password} = data
                    this.$message({
                        message: '失效',
                        duration: 1500
                    })
                }
            },

            /*
            * 验证 地市
            * */
            bssOperate_cityVerify({ok, data}) {
                const {tel, u_info, token, ordId, channelNbr} = data
                this.$message({
                    message: '失效',
                    duration: 1500
                })
                /*this.$axios.post("").then().catch(reason => {

                })*/
            },

            /*
            * 打开 登录
            * */
            bssOperate_openLoginBox({ok, data}) {
                this.rightBox.visible = false
                const {tel, password} = data
                this.loginBox.visible = true
                this.loginBox.data.tel = tel
                this.loginBox.data.password = password
                this.loginBox.data.imgCode = ''
                this.loginBox.data.random = ''
                this.loginBox.canButton = {
                    okImg: false,
                    okCode: false
                }
                this.loginBox.codeImgUrl = ''
                if (this.loginBox.getCode.timer) {
                    clearInterval(this.loginBox.getCode.timer);
                    this.loginBox.getCode.timer = null
                    this.loginBox.getCode.text = '获取验证码'
                }
                this.bssOperate_getImgCode()

            },
            /*
            *
            * 获取图片验证码
            * */
            bssOperate_getImgCode() {
                this.loginBox.canButton.okImg = false
                this.$http.post("/bss3/chome-fc45d4cdf-htxbj/api/login/graphic-code", `sysUserCode=${this.loginBox.data.tel}`, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "X-SysUserCode": this.loginBox.data.tel,
                    },
                    responseType: 'blob'
                }).then(({data}) => {
                    this.loginBox.codeImgUrl = window.URL.createObjectURL(data)
                }).catch(reason => {
                    // todo 测试
                    this.loginBox.codeImgUrl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606129234660&di=2ba50441bcd5f0727623a049332b8248&imgtype=0&src=http%3A%2F%2Fpic3.16pic.com%2F00%2F01%2F11%2F16pic_111395_b.jpg'
                    this.loginBox.canButton.okImg = true
                    this.$message({
                        message: "手机号码不正确",
                        duration: 1500,
                        type: "warning"
                    })
                })
            },
            /*
            *
            * 验证 图片验证码
            * */
            bssOperate_verifyImgCode() {
                this.$http.post('/bss3/chome-fc45d4cdf-htxbj/api/login/check', ``, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "X-SysUserCode": this.loginBox.data.tel,
                    }
                }).then(value => {

                }).catch(reason => {
                    this.loginBox.canButton.okCode = true
                })
            },
            bssOperate_getCode() {
                const success = () => {
                    let canGo = 30;
                    this.loginBox.getCode.text = `${canGo}s后重新获取`
                    this.loginBox.getCode.timer = setInterval(() => {
                        if (canGo-- <= 0) {
                            clearInterval(this.loginBox.getCode.timer)
                            this.loginBox.getCode.timer = null
                            this.loginBox.getCode.text = `重新获取`
                        } else {
                            this.loginBox.getCode.text = `${canGo}s后重新获取`
                        }
                    }, 1000);
                }
                success()
            },
            bssOperate_login({data}) {
                this.$http.post("").then(value => {
                }).catch(reason => {
                    console.log(this.loginBox.data)
                })
            }
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
        deactivated() {
            this.loginBox.getCode.timer && (clearInterval(this.loginBox.getCode.timer), this.loginBox.getCode.timer = null)
        }
    }
</script>

<style scoped>

</style>
