<template>
    <div class="login_page">
        <div class="login_box">
            <!--          <h2 style="cursor: pointer">登录</h2>-->
            <el-form :model="ruleForm" :rules="rules" ref="submit" label-width="auto" class="login_form" style="position: relative">
                <el-form-item  prop="username">
                    <el-input v-model="ruleForm.username" maxlength="11" placeholder="请输入账号">
                        <template #prefix>
                            <span class="iconfont icon-wo"
                                  style="font-size: 26px;line-height: 44px"></span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item  prop="password">
                    <el-input type="password" v-model="ruleForm.password" show-password placeholder="请输入密码">
                        <template #prefix>
                            <span class="iconfont icon-yuechi"
                                  style="font-size: 26px;line-height: 50px"></span>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="code">
                    <el-row :gutter="24" type="flex">
                        <el-col :span="16" style="padding: 0;">
                            <el-input placeholder="请输入短信验证码" style="margin-top: 5px;"
                                      v-model.trim="ruleForm.code"
                                      @keydown.enter.native="login('submit')"
                                      maxlength="6">
                                <template #prefix>
                            <span class="iconfont icon-dunpai"
                                  style="font-size: 26px;line-height: 50px"></span>
                                </template>
                            </el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="primary" plain @click="getDXcode" :disabled="!this.ruleForm.password"
                                       style="margin-top: 10px; margin-left: 10px">{{btnTitle}}</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login('submit')"
                               :disabled="ruleForm.code.length!==6" class="login_submit" >登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>


    export default {
        data() {
            let checkMobile = (rule, value, callback) => {
                // 验证手机号的正则表达式
                const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

                if (regMobile.test(value)) {
                    return callback()
                }

                callback(new Error('请输入正确的手机号'))
            }
            return {
                ruleForm: {
                    username: "18072892408",
                    password: "",
                    code: "",
                    canButton: false,
                },
                btnTitle:"获取验证码",
                rules: {
                    username: [{required: true, message: "请输入账号", trigger: 'blur'},
                        {validator: checkMobile }],
                    password: [{required: true, message: "请输入密码", trigger: 'blur'}],
                    // code: [{required: true, message: "请输入图片验证码", trigger: 'blur'}],
                    code: [{required: true, message: "请输入短信验证码", trigger: 'blur'}],

                },
            }
        },
        created() {},
        methods: {
            getDXcode() {
                this.$axios.post("staff_yanCode", {}, {
                    params: {
                        username: this.ruleForm.username,
                        password: this.ruleForm.password,
                    }
                }).then(({data, token}) => {
                    this.validateBtn()
                    this.ruleForm.canButton = true
                    this.$message({
                        type: "success",
                        duration: 2000,
                        message: data.entry
                    });
                    console.log(data)

                }).catch(({entry}) => {
                    this.ruleForm.canButton = false
                    this.$message({
                        type: "warning",
                        duration: 1000,
                        message: entry
                    });
                })
                // }
            },

            validateBtn(){
                //倒计时
                let time = 30;
                let timer = setInterval(() => {
                    if(time == 0) {
                        clearInterval(timer);
                        this.ruleForm.canButton = false;
                        this.btnTitle = "获取验证码";
                    } else {
                        this.btnTitle =time + '秒后重试';
                        this.ruleForm.canButton = true;
                        time--
                    }
                },1000)
            },
            login(from) {
                this.$refs.submit.validate((val) => {
                    if (val) {
                        this.$axios.post("staff_login2", {}, {
                            params: {
                                ...this.ruleForm
                            },
                            showMessage: false,
                        }).then(({entry}) => {
                            console.log(entry) //
                            if(entry === '0000') {
                                this.$message({
                                    type: "success",
                                    duration: 1500,
                                    message: "BSS登录成功"
                                });
                                this.$router.replace({name: "main", path: "/main"}).then(value => {});
                            }else{
                                this.$message({
                                    type: "error",
                                    duration: 1500,
                                    message: "登录失败"
                                });
                            }
                        }).catch(({message}) => {
                            this.$message({
                                type: "warning",
                                duration: 2000,
                                message: message
                            });
                        })
                    }
                    return val
                })
            },
        },

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
            /*background-image: linear-gradient(to top right,#8DEBFF,#6CACFF);*/
            background-color: #ED876B;
            border-color: transparent;
            opacity: 1 !important;
        }

        .el-button--primary.is-plain {
            background-color: #ED876B;
            border-color: #ED876B;
            color: #FFFFFF;
        }
        .el-input__inner:focus {
            border-color: #ED876B;
        }
    }
</style>
<style scoped lang="less">

    .login_page {
        background-image: url("../../../assets/image/login.jpg");
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
        /*background: linear-gradient(to top right,#8DEBFF,#6CACFF);*/
        background: #ED876B;
        border-radius: 25px;
        border-color: #ED876B;
        color: white;
        font-size: 20px;
        cursor: pointer;
        display: block;

        &:hover {
            opacity: 0.9;
        }

        &:visited, &:link, &:focus, &:active, &:hover {
            background-color:  #ED876B;
            border-color: #ED876B;
            color: #FFFFFF;
        }
    }

    .login_box {
        position: fixed;
        width: 550px;
        height: 370px; // 440
        border-radius: 25px;
        left: 50%;
        margin-left: 225px;
        top: 50%;
        margin-top: -170px;
        background-color: transparent;
        padding: 50px;
        box-sizing: border-box;

        h2 {
            font-size: 24px;
            padding-bottom: 28px;
            color: #67C23A;
            text-align: center;
            font-weight: 500;
        }

        input {
            font-size: 16px;
        }
    }
</style>
