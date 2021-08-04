<!--
登录页面
登录页面：①账号+密码+图片验证
虚门
-->
<template>
    <div class="login_page">
        <div class="login_box">
            <h2 style="cursor: pointer">众诚互联网平台管理系统</h2>
            <el-form :model="info" class="login_form" label-width="auto" :rules="rules"
                     style="position: relative"
                     ref="submit">
                <el-form-item prop="phone">
                    <el-input placeholder="请输入账号"
                              v-model.trim="info.phone"
                              @keydown.enter.native="login('submit')"
                    >
                        <template #prefix>
                            <span class="iconfont icon-wo"
                                  style="font-size: 26px;line-height: 44px"></span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码" @keydown.enter.native="login('submit')"
                              show-password
                              v-model.trim="info.password">
                        <template #prefix>
                            <span class="iconfont icon-yuechi"
                                  style="font-size: 26px;line-height: 50px"></span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-row :gutter="24" type="flex">
                        <el-col :span="16" style="padding: 0;">
                            <el-input placeholder="请输入图形验证码" style="margin-top: 5px;"
                                      @keydown.enter.native="login('submit')"
                                      v-model.trim="info.code">
                                <template #prefix>
                            <span class="iconfont icon-dunpai"
                                  style="font-size: 26px;line-height: 50px"></span>
                                </template>
                            </el-input>
                        </el-col>
                        <el-col :span="8" v-show="info.codeImgUrl">
                            <!--<el-button style="padding: 0;" :disabled="info.phone.length!==11">
                                    <el-image style="width: 108px;height:50px;"
                                              :src="info.codeImgUrl">
                                        <template #placeholder>图片验证码</template>
                                        <template #error>加载失败</template>
                                    </el-image>
                            </el-button>-->
                            <el-tooltip :disabled="info.phone.length!==11" placement="top"
                                        effect="light" content="点击刷新验证码">
                                <el-button style="padding: 0;" :disabled="info.phone.length!==11"
                                           @click="getImgCode">
                                    <template #default>
                                        <el-image style="width: 108px;height:50px;"
                                                  :src="info.codeImgUrl">
                                            <template #placeholder>图片验证码</template>
                                            <template #error>加载失败</template>
                                        </el-image>
                                    </template>
                                </el-button>
                            </el-tooltip>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item style="position: absolute;bottom: -100px;width: 100%">
                    <el-button :disabled="!info.canButton" class="login_submit"
                               @click="login('submit')">登录
                    </el-button>
                </el-form-item>
            </el-form>
            <el-dialog></el-dialog>
        </div>
    </div>
</template>
<script>
    import {mapActions} from "vuex"
    import lodash from "lodash";
    import CanvasGetCode from "../../context/components/canvasGetCode";

    export default {
        name: 'Login',
        components: {CanvasGetCode},
        data() {
            return {
                info: {
                    phone: "",
                    password: "",
                    codeImgUrl: "",
                    canButton: false,
                    code: ""
                },
                rules: {
                    phone: [{required: true, message: "请输入账号", trigger: 'blur'}],
                    password: [{required: true, message: "请输入密码", trigger: 'blur'}],
                    code: [{required: true, message: "请输入验证码", trigger: 'blur'}]
                },
                getImgCode: () => {
                }
            }
        },
        beforeCreate() {
            document.title = "登录"
        },
        created() {
            this.getImgCode = lodash.debounce(this._getImgCode, 100)
        },
        mounted() {
            // this.test_Login();
        },
        methods: {
            ...mapActions("login", {
                s_login: "login",

            }),

            ...mapActions({
                setUserInfo: "a_setUserInfo",
                setRight: "a_setRight",
            }),
            //免登录
            freeLogin() {
            },
            // todo 20210112 获取验证码信息
            _getImgCode() {
                if (this.info.phone.length === 11) {
                    this.info.canButton = false
                    this.$axios.post("staff_yanzhenimg", {}, {
                        params: {
                            phone: this.info.phone
                        },
                        responseType: 'blob',
                        showLoading: false
                    }).then(({data}) => {
                        this.info.codeImgUrl = window.URL.createObjectURL(data);
                        this.info.canButton = true;
                    }).catch(reason => {
                        this.info.codeImgUrl = '';
                        this.info.canButton = false;
                    })
                }
                /*this.$http.post("/bss3/chome-fc45d4cdf-htxbj/api/login/graphic-code", `sysUserCode=${this.info.phone}`, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "X-SysUserCode": this.info.phone,
                    },
                    responseType: 'blob'
                }).then(({data}) => {
                    this.info.codeImgUrl = window.URL.createObjectURL(data);
                    this.info.canButton = true;
                    this.$message({
                        message: "获取图形验证码成功",
                        duration: 1500,
                        type: "success"
                    })
                }).catch(reason => {
                    // todo 测试
                    this.info.codeImgUrl = '';
                    this.info.canButton = false;
                    this.$message({
                        message: "获取图形验证码错误",
                        duration: 1500,
                        type: "warning"
                    })
                })*/
            },
            // 登录验证
            login(form) {
                this.$refs[form].validate((val) => {
                    if (val) {
                        this.$axios.post("staff_login", {}, {
                            params: {
                                ...this.info
                            },
                            showMessage: false,
                        }).then(({token, userInfo, menu, right}) => {
                            /*
                            * 存token  用户信息  菜单栏信息
                            * */
                            this.$c_token.set(token);
                            this.$c_user.set(userInfo);
                            this.$c_menu.set(menu);
                            this.$c_tabs.clear();
                            /*
                            * 设置权限  用户名
                            * */
                            this.setRight(right);
                            this.setUserInfo(userInfo)
                            this.$router.replace({name: "main", path: "/main"}).then(value => {

                                this.$message({
                                    type: "success",
                                    duration: 1000,
                                    message: "登录成功"
                                });

                                // if(userInfo.role === "业务员") {
                                //     this.$axios.post('work_hangupthenumber',{},{
                                //         params: {
                                //             name: userInfo.username
                                //         },
                                //         showLoading: false,
                                //         showMessage: false
                                //     }).then(({code,entry}) => {
                                //         if(code === 1) {
                                //             this.$notify({
                                //                 title: '在途单温馨提醒',
                                //                 message: `您好，您名下存在 ${entry} 条待处理工单滞留1天未处理，请及时处理！`,
                                //                 dangerouslyUseHTMLString: true,
                                //                 type: 'warning',
                                //                 customClass:'notify-info',
                                //                 duration: 0
                                //             });
                                //         }
                                //     })
                                // }
                                // if(userInfo.role === "受理员") {
                                //     this.$axios.post('work_queryEmpByWorkView',{},{
                                //         params: {
                                //             name: userInfo.username
                                //         },
                                //         showLoading: false,
                                //         showMessage: false
                                //     }).then(({code,entry}) => {
                                //         if(code === 1) {
                                //             this.$notify({
                                //                 title: '在途单温馨提醒',
                                //                 message: `您好，您名下有 ${entry} 条待处理工单，请及时处理！`,
                                //                 type: 'success',
                                //                 duration: 0
                                //             });
                                //         }
                                //     })
                                // }
                            });

                        }).catch(({message}) => {
                            this.$message({
                                type: "warning",
                                duration: 1000,
                                message: message === "Request failed with status code 500" ? "请重新刷新验证码" : message
                            });
                        })
                        /*this.s_login(this.info).then(({code, token, phone, phone}) => {
                            /!*登录成功后 设置 token   和  user   并   清空tabs*!/
                            this.$c_token.set(token)
                            this.$c_user.set({phone, phone})
                            this.a_setUserInfo({phone, phone})
                            this.$c_tabs.clear();
                            this.$router.replace({name: "main", path: "/main"})
                                .then(value => {
                                    this.$message({
                                        type: "success",
                                        duration: 1000,
                                        message: "登录成功"
                                    })
                                })
                                .catch(reason => {
                                    this.$message({
                                        type: "error",
                                        duration: 1000,
                                        message: "登录失败"
                                    })
                                })
                        })*/
                    }
                    return val
                })
            },
            // 忘记密码
            forget() {

            },
            test_Login() {
                if (this.rules.code) {
                    this.rules.code = undefined;
                    this.info.canButton = true;
                } else {
                    this.rules.code = [{required: true, message: "请输入验证码", trigger: 'blur'}];
                    this.info.canButton = false;
                }
            }
        },
        computed: {},

        watch: {
            "info.phone"(value = "") {
                if (value.length === 11) {
                    this.getImgCode();
                }
            }
        }
    }
</script>
<style lang="less">
    .login_form {
        .el-input__inner {
            height: 50px;
            border-radius: 25px;
            padding: 0 50px !important;
            font-size: 16px;
        }

        .el-form-item__error {
            padding-left: 25px;
        }

        .el-input__suffix {
            right: 22px;
        }

        .el-input__prefix {
            left: 12px;
        }

        .iconfont {
            color: #999999;
        }

        .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
            color: #fefefe;
            cursor: not-allowed;
            background-image: linear-gradient(180deg, #eb795a 0%, #eb795a 22%, #f28746 88%, #f28746 100%);
            background-color: transparent;
            border-color: transparent;
            opacity: 1 !important;
        }
    }
</style>
<style lang="less" scoped>
    .login_page {
        background-image: url("../../assets/image/banner.jpg");
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        width: 100%;
        height: 100vh;
        min-height: 700px;
        user-select: none;
    }

    .login_submit {
        width: 100%;
        height: 50px;
        background: linear-gradient(90deg, #eb795a 0%, #eb795a 22%, #f28746 88%, #f28746 100%);
        border-radius: 25px;
        color: white;
        font-size: 20px;
        cursor: pointer;
        display: block;

        &:hover {
            opacity: 0.9;
        }

        &:visited, &:link, &:focus, &:active, &:hover {
            color: white;
            background-color: transparent;
            border-color: transparent;
        }
    }

    .login_box {
        position: fixed;
        width: 550px;
        height: 440px;
        border-radius: 10px;
        left: 50%;
        margin-left: -275px;
        top: 50%;
        margin-top: -200px;
        background-color: rgba(255, 255, 255);
        padding: 50px;
        box-sizing: border-box;

        h2 {
            font-size: 24px;
            padding-bottom: 28px;
            color: #0091e6;
            text-align: center;
            font-weight: 500;

        }

        input {
            font-size: 16px;
        }
    }
</style>
