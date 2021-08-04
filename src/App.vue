<template>
    <router-view/>
</template>
<script>
    import {mapState} from "vuex"
    export default {
        name: "app",
        data() {
            return {
                timer:'',
                timers: '',
                tool: '',
                tools: '',
            }
        },
        methods: {
            freeLogin() {
                if (this.$c_token.get()) {
                    this.$alert("您已经登录是否进入？", {type: "success"}).then(value => {
                    }).catch(reason => {
                    });
                }
            },

            get(){
                let time = this.$util.timestamp(new Date(), 'HH:mm:ss')

                let arr = time.split(':')

                if(parseInt(arr[0]) < 21) {
                    this.$axios.post("d/auto/refresh",{},{
                        showLoading: false,
                        showMessage: false
                    }).then(res => {
                        if(this.userInfo.role === "受理员" || this.userInfo.role === "受理主管" || this.userInfo.role === "管理员"){
                            if(res.code === 0) {
                                this.$alert("",{
                                    type:"success",
                                    message: res.message,
                                    title: "提示",
                                    // showClose: false
                                }).then(val => {

                                    this.$router.replace({name: "logins", path: "/main/logins"}).then(value => {
                                        this.$message({
                                            type: "success",
                                            duration: 2000,
                                            message: "请登录",
                                        });
                                    });
                                })
                            }
                        }
                    })
                }
            },



            gets(){
                let time = this.$util.timestamp(new Date(), 'HH:mm:ss')

                let arr = time.split(':')

                if(parseInt(arr[0]) < 21) {

                    this.$axios.post("cust_refreshcode", {},{
                        showLoading: false,
                        showMessage: false
                    }).then(({code, message}) => {

                        if(this.userInfo.role === "受理员" || this.userInfo.role === "受理主管" || this.userInfo.role === "管理员"){
                            if(code === 0) {
                                this.$alert("",{
                                    type:"success",
                                    message: message,
                                    title: "提示"
                                }).then(val => {

                                    this.$alert("",{
                                        type: "error",
                                        // duration: 6000,
                                        message: "请前往 反刷工号管理 页面登录",
                                        title: "提示"
                                    });
                                })
                            }
                        }
                    }).catch(val => {
                        console.log(val)
                    })
                }else {
                    console.log(456)
                }

            },
            toolTip() {
                if(this.userInfo.role === "受理员") {
                    this.$axios.post('work_hangupthenumber',{},{
                        params: {
                            name: this.userInfo.username
                        },
                        showLoading: false,
                        showMessage: false
                    }).then(({code,entry}) => {

                        if(code === 1) {
                            this.$notify({
                                title: '在途单温馨提醒',
                                message: `${entry}，请及时处理！`,
                                // message: `您好，您名下存在 ${entry} 条 待处理工单滞留1天未处理，请及时处理`,
                                dangerouslyUseHTMLString: true,
                                type: 'warning',
                                customClass:'notify-info',
                                duration: 0
                            });
                        }
                    })
                }
            },
            toolTips() {
                if(this.userInfo.role === "业务员") {
                    this.$axios.post('work_queryEmpByWorkView',{},{
                        params: {
                            name: this.userInfo.username
                        },
                        showLoading: false,
                        showMessage: false
                    }).then(({code,entry}) => {
                        let msg = ''
                        if(entry.length === 1) {
                            msg = entry[0]["count(1)"] + '条' + entry[0].status + ' '
                        }else if(entry.length === 2){
                            msg = entry[0]["count(1)"] + '条' + entry[0].status + '，' +  entry[1]["count(1)"] + '条' + entry[1].status + ' '
                        }else {
                            msg = ''
                        }
                        // console.log(msg)
                        if(code === 1) {
                            this.$notify({
                                title: '在途单温馨提醒',
                                message: `您好，您名下存在 ${msg} 工单滞留1天未处理，请及时处理！`,
                                type: 'warning',
                                customClass:'notify-info',
                                duration: 0
                            });
                        }
                    })
                }
            }
        },
        computed: {
            ...mapState({
                userInfo: z => z.userInfo
            })
        },
        mounted() {
            // console.log(this.userInfo)
            this.timer = setInterval(this.get,1000*60*20)
            this.timers = setInterval(this.gets,1000*60*15)
            this.tool = setTimeout(this.toolTip,1000*60) // 受理员
            this.tools = setTimeout(this.toolTips,1000*60)  // 业务员

        },
        beforeDestroy() {
            clearInterval(this.timer)
            clearInterval(this.timers)
            clearTimeout(this.tool)
            clearTimeout(this.tools)

        }

    }
</script>
<style>
    .notify-success {

        /*background: rgba(131,213,134,0.1) !important;*/
        color: rgb(103, 194, 58);
        border: 2px solid rgb(103, 194, 58);
    }
    .notify-error {
        /*background: rgba(255, 31, 36, 0.05) !important;*/
        border: 2px solid red;
    }
    .notify-info {
        color: rgb(235, 181, 99) !important;
        border: 2px solid rgb(235, 181, 99);
    }
</style>
<!--全局的css样式 -->
<style lang="less">
    * {
        touch-action: pan-y !important;
    }

    [v-block] {
        display: none;
    }

    input.el-range-input {
        background: #ffffff !important;
    }

    body {
        min-width: 1200px;
        height: 100vh;
        margin: 0;
        bottom: 0;
        // overflow-y: hidden;
        // overflow:scroll !important;
    }

    ::-webkit-scrollbar {
        width: 14px;
        height: 14px;
    }

    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-thumb {
        border-radius: 999px;
        border: 5px solid transparent;
    }

    ::-webkit-scrollbar-track {
        box-shadow: 1px 1px 5px rgba(0, 0, 0, .2) inset;
    }

    ::-webkit-scrollbar-thumb {
        min-height: 20px;
        background-clip: content-box;
        box-shadow: 0 0 0 5px rgba(0, 0, 0, .2) inset;
    }

    ::-webkit-scrollbar-corner {
        background: transparent;

    }

    /*
     * 适配火狐
    */
    body, div, table, main, header, footer, aside, section {
        scrollbar-color: rgba(0, 0, 0, .2) transparent; /* 滑块颜色  滚动条背景颜色 */
        scrollbar-width: thin; /* 滚动条宽度有三种：thin、auto、none */
    }

    .el-dialog {
        border-radius: 8px !important;
    }

    .showList {
        text-align: right;
        margin-bottom: 10px;
        position: relative;

        .group {
            position: absolute;
            right: 50px;
            background-color: #FFFFFF;
            display: flex;
            flex-direction: column;
            z-index: 100;
            width: 100px;
            height: 150px;
            overflow-x: hidden;
            overflow-y: auto;
            border: 1px solid blanchedalmond;
            padding: 10px;
            align-items: flex-start;
            top: 35px;
        }
    }

    .mydialog2 {
        height: 700px;

        .el-dialog__body {
            padding: 0 20px !important;
        }
    }

    .myDrawer {
        .el-drawer__body {
            padding: 0 0 0 20px !important;
        }

        .el-drawer__header {
            margin: 0 !important;
            padding: 10px 20px 0 !important;
        }

        .el-tabs__header {
            margin: 0;
        }
    }

    .editBox {
        height: 500px;
        overflow-y: auto;
        overflow-x: hidden;

        .el-dialog__body {
            padding: 0 20px;
        }

        .el-form {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: flex-start;

            .el-form-item {
                width: 45%;
                margin: 0;
                display: flex;
                flex-direction: column;
            }

            .el-input.is-disabled .el-input__inner {
                background-color: #F5F7FA;
                border-color: #888888;
                color: #888888;
            }

            .el-form-item__label {
                line-height: 50px;
                text-align: left;
            }

            .el-form-item__content {
                text-align: right;
            }

            .el-autocomplete, .el-select {
                width: 100%;
            }

            .el-date-editor.el-input, .el-date-editor.el-input__inner, .el-cascader {
                width: 100% !important;
            }
        }

        .mytextarea {
            width: 100%;
        }

        .btnBox {
            margin-top: 16px;
            width: 100%;

            .el-form-item__content {
                display: flex;
                flex-wrap: wrap;

                button {
                    margin-bottom: 10px;
                    margin-right: 10px;
                    margin-left: 0;
                }
            }
        }

        .btnBox2 {
            width: 100%;
            margin-top: 16px;

            .el-form-item__content {
                text-align: left;
            }
        }

        .noInput {
            flex-direction: row;
            align-items: center;

            .el-form-item__content {
                flex-grow: 1;
                text-align: left;
                color: #888888;
            }
        }
    }

    /*
    表格列调整
    */
    .tableListSetting {
        .el-checkbox-group {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;

            label {
                margin: 10px 20px;

                .el-checkbox__label {
                    font-size: 16px !important;
                }
            }
        }
    }

    .el-row {
        margin-right: 0 !important;
        margin-left: 0 !important;
    }

    .autocompleteProduct {
        width: 500px !important;
    }

    .el-pagination {
        margin: 20px 0 !important;
    }

    body .el-table th.gutter {
        display: table-cell !important
    }
</style>
