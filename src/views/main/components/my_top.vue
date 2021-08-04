<template>
    <div class="app-top">
        <div class="app-top-left" @click="$emit('closeMenu')">
            <span class="logo"></span>
            <span class="title">互联网平台管理系统</span>
        </div>
        <my-noti class="app-top-center"></my-noti>
        <div class="app-top-right">
            <el-popover class="expansion"
                        trigger="hover"
                        content=""
                        popper-class="popper"
                        title="全屏"
            >
                <i class="el-icon-rank expansion" @click="expansion" slot="reference"></i>
            </el-popover>
            <el-dropdown @command="userListFn" :hide-on-click="true" trigger="click"
                         placement="bottom">
                <div class="userNameBox" style="cursor: pointer">
                    <span class="el-icon-user-solid"></span>
                    <span class="name">{{userInfo.username}} <i
                        class="el-icon-caret-bottom"></i></span>
                    <span class="messNum"
                          v-show="mainScope.messNum">{{mainScope.messNum >= 99 ? '99+' :mainScope.messNum}}</span>
                </div>
                <el-dropdown-menu class="userList" slot="dropdown">
                    <el-dropdown-item command="1">个人中心</el-dropdown-item>
                    <el-dropdown-item command="4">消息中心</el-dropdown-item>
                    <el-dropdown-item command="2">修改密码</el-dropdown-item>
                    <!--                    <el-dropdown-item command="3">退出登录</el-dropdown-item>-->
                    <el-dropdown-item command="5">清除缓存</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-popover trigger="hover"
                        content=""
                        popper-class="popper"
                        title="退出">
                    <span slot="reference" class="el-icon-circle-close" @click="quit">
                </span></el-popover>
        </div>
        <slot name="tabs"></slot>
        <el-dialog width="600px" title="修改密码" :visible.sync="updatePwd.visible">
            <el-form v-if="updatePwd.visible" :model="updatePwd.changePassData"
                     :rules="updatePwd.rules" ref="ruleForm"
                     label-width="auto"
            >
                <el-form-item label="旧密码" prop="old">
                    <el-input show-password v-model.trim="updatePwd.changePassData.old"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPass">
                    <el-input show-password v-model.trim="updatePwd.changePassData.newPass"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="okPass">
                    <el-input show-password v-model.trim="updatePwd.changePassData.okPass"
                              autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updatePwd.visible = false">取 消</el-button>
                <el-button type="primary" @click="submitPass">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import MyNoti from "../../../common/components/myNoti"
    import {mapState} from "vuex"

    export default {
        name: "my_top",
        props: {},
        components: {
            MyNoti,
        },
        mounted() {

        },
        data() {
            return {
                mainScope: this.$root.main.index,
                /*
                * 修改密码的框
                * */
                updatePwd: {
                    visible: false,
                    changePassData: {
                        old: "",
                        newPass: "",
                        okPass: ""
                    },
                    rules: {
                        old: [{required: true, message: '请填写旧的密码', trigger: 'blur'}],
                        newPass: [
                            {required: true, message: '请填写新密码', trigger: 'blur'},
                            {
                                validator: (rule, value, callback) => {
                                    if (!value) {
                                        callback(new Error('请填写新密码'));
                                    } else if (value === this.updatePwd.changePassData.old) {
                                        callback(new Error('密码不能与旧密码一样'));
                                    } else if (this.$reg.password.test(value)) {
                                        callback();
                                    } else {
                                        callback(new Error("密码不能少于8位且为数字、大小写字母组合"))
                                    }
                                }, trigger: 'blur'
                            }],
                        okPass: [{
                            required: true,
                            validator: (rule, value, callback) => {
                                if (value === '') {
                                    callback(new Error('请再次输入密码'));
                                } else if (value !== this.updatePwd.changePassData.newPass) {
                                    callback(new Error('两次输入密码不一致!'));
                                } else {
                                    callback();
                                }
                            }, trigger: 'change'
                        }]
                    },
                }
            }
        },
        computed: {
            ...mapState({
                userInfo: s => s.userInfo,
            }),
        },
        methods: {
            /*全屏事件*/
            /*全屏事件*/
            expansion() {
                /*进入全屏*/
                const docElm = document.documentElement;
                try {
                    if (docElm.requestFullscreen) {
                        docElm.requestFullscreen();
                    } else if (docElm.mozRequestFullScreen) {
                        docElm.mozRequestFullScreen();
                    } else if (docElm.webkitRequestFullScreen) {
                        docElm.webkitRequestFullScreen();
                    } else if (docElm.msRequestFullscreen) {
                        docElm.msRequestFullscreen();
                    }
                    /*退出全屏*/
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } catch (e) {

                }
            },
            /*登录人员操作事件列表*/
            userListFn(flag) {
                /*
                * old: "",
                        newPass: "",
                        okPass: ""
                * */
                switch (flag) {
                    case "1":
                        break;
                    case "2":
                        this.change_password();
                        break;
                    case "3":
                        this.quit();
                        break;
                    case "4":
                        this.openMessCenter();
                        break;
                    case "5":
                        this.quit({clearAll: true, mess: "是否清除缓存并退出系统？"});
                        break;
                    default:
                        break
                }
            },
            change_password() {
                this.updatePwd.visible = true
                this.updatePwd.changePassData.old = this.userInfo.password;
                this.updatePwd.changePassData.newPass = "";
                this.updatePwd.changePassData.okPass = "";
            },
            /*
            * 打开消息中心
            * */
            openMessCenter() {
                // console.log(this.$root.main.index.messBox.show)
                this.$root.main.index.messBox.show = !this.$root.main.index.messBox.show
            },
            /*关闭修改密码*/
            closeEditPass() {
                this.updatePwd.visible = false
                this.changePassData = {
                    newPass: "", okPass: ""
                }
            },

            submitPass() {
                this.$refs["ruleForm"].validate((valid) => {
                    if (valid) {
                        this.$axios.post("empl_Gpwd", {}, {
                            params: {
                                oldpwd: this.updatePwd.changePassData.old,
                                ephone: this.$c_user.get().phone,
                                epwd: this.updatePwd.changePassData.okPass,
                                id: this.$c_user.get().id
                            }
                        }).then(({code, entry}) => {
                            this.quit({mess: "修改密码成功,需要重新登录", showClose: false});
                        })
                    }
                });
            },

            quit({mess = "即将退出系统", showClose = true, clearAll = false} = {}) {
                const success = () => {
                    if (clearAll) {
                        localStorage.clear();
                    } else {
                        this.$c_user.clear();
                        this.$c_menu.clear();
                        this.$c_right.clear();
                        this.$c_tabs.clear();
                        this.$c_collapse.clear();
                        this.$c_token.clear();
                    }
                }
                this.$alert(mess, {
                    title: "提示",
                    type: "info",
                    showClose: true,
                    message: `<h3>${mess}</h3>`,
                    dangerouslyUseHTMLString: true,
                    showCancelButton: showClose
                }).then(() => {
                    this.$router.replace({path: "/"}).finally(() => {
                        success();
                        location.reload()
                    });
                }).catch(() => {
                    if (!showClose) {
                        this.$router.replace({path: "/"}).finally(() => {
                            success();
                            location.reload()
                        });
                    }
                })
            },

        }
    }
</script>
<style lang="less">

    .userNameBox {
        position: relative;

        span.messNum {
            position: absolute;
            top: -6px;
            right: 20px;
            background: rgba(255, 26, 64, .9);
            color: white;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
        }
    }

    .main_left {
        ul {
            height: 100%;
        }
    }

    .editPass {
        width: 30%;

        .el-form {
            padding-left: 136px;
        }

        .el-form-item {
            display: flex;

            label {
                width: 5rem;
                text-align: left;
            }
        }
    }

    .app-top-center {
        flex-grow: 1;
    }

    .app-top-right {
        margin-left: 50px;

        .el-icon-user-solid {
            font-size: 24px;
            position: relative;
            vertical-align: middle;
        }

        .el-icon-caret-bottom {

        }

        .el-icon-circle-close {
            font-size: 30px;
            vertical-align: middle;
            padding: 0 12px;
            border-left: 1px solid #8abcf3;
            line-height: 50px;
        }

        .el-dropdown {
            color: white;
        }


    }

    .userList {
        .el-dropdown-menu__item {
            padding: 0 35px;
            font-size: 16px;
        }
    }

    .popper {
        min-width: 0;
        padding: 10px;
        background-color: black;


        .el-popover__title {
            margin: 0;
            color: white;
        }

        .popper__arrow {
            &::after {
                border-bottom-color: black !important;
            }
        }
    }
</style>
<style lang="less" scoped>

    .app-top {
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-image: linear-gradient(45deg, #1278f6, #00b4aa 50%, #1278f6);
        border-bottom: 1px solid #E4E4E4;
        user-select: none;
        z-index: 999;
        line-height: 50px;

        .curtime {
            font-size: 20px;
            padding: 0 10px;

        }

        .expansion {
            font-size: 30px;
        }
    }

    .app-top-left {
        cursor: pointer;
        display: flex;

        .logo {
            width: 120px;
            height: 50px;
            display: inline-block;
            background: url("../../../assets/dxlogo.png") no-repeat 0 -35px;
            background-size: cover;
            vertical-align: middle;
        }

        .title {
            font-size: 26px;
            display: inline-block;
            line-height: 50px;
            position: relative;
            color: #FFFFFF;
            margin: 0 0 0 15px;
            padding-left: 10px;

            &::after {
                content: "";
                position: absolute;
                left: 0;
                top: 6px;
                width: 1px;
                height: 40px;
                opacity: 0.5;
                background: linear-gradient(to bottom, #3a85e1 0%, #fff 50%, #3a85e1 100%);
            }
        }
    }

    .app-top-right {
        color: white;
        display: flex;
        align-items: center;

        .expansion {
            display: inline-block;
            vertical-align: middle;
            margin: 3px 10px 0 0;
            line-height: normal;

            svg {
                display: inline-block;
                cursor: pointer;
                fill: #fff;
                width: 26px;
                height: 26px;
            }
        }

        .name {
            font-size: 20px;
            margin: 0 10px;
        }

    }

</style>
