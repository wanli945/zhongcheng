
<template>
    <div>
        <el-card>
            <el-row :gutter="24">
                <el-col :span="3">
                    <el-input
                        placeholder="组名 回车搜索"
                        clearable
                        v-model="tableBox.data.id"
                        @keyup.enter.native="() => operate_select"
                    ></el-input>
                </el-col>
                <el-col :span="6">
                    <!--                    <el-button type="success" @click="operate('delete')">增</el-button>-->
                </el-col>
            </el-row>
        </el-card>

        <el-row :gutter="24">
            <el-col :span="24">
                <el-main>
<!--                    formDate-->
                    <el-form :model="tableBox.data[0]" ref="formRef" :rules="tableBox.paramsRules">
                        <el-table
                            ref="axsLogintable"
                            :data="tableBox.data"
                            stripe
                            highlight-current-row
                            style="width: 100%; cursor: pointer"
                            row-key="id"
                            :header-cell-style="{ 'text-align': 'center', 'background-color': 'rgba(193, 206, 214, 1)',fontSize: '16px',
                        color: 'black',  fontWeight: 600,}"
                            :cell-style="{ 'text-align': 'center' }"
                            :tooltip-effect="'light'"
                            :empty-text="tableBox.emptyText"
                            max-height="600px"
                            border
                        >
                            <el-table-column
                                prop="id"
                                label="id"
                                min-width="150px"
                            >
                                <template slot-scope="scope">
                                    <div class="zuName">{{scope.row.id}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="tel"
                                label="账号"
                                min-width="150px"
                            >
                                <template slot-scope="scope">
                                    <el-form-item prop="tel" >
                                        <el-input v-model="scope.row.tel" maxlength="11" clearable placeholder="请输入账号"></el-input>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="password"
                                label="密码"
                                min-width="150px"
                            >
                                <template slot-scope="scope">
                                    <el-form-item prop="password">
                                        <el-input v-model="scope.row.password" clearable placeholder="请输入密码"></el-input>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="code"
                                label="验证码"
                                width="350px"
                            >
                                <template slot-scope="scope">
                                    <el-row :gutter="20">
                                        <el-col :span="15">
                                            <el-form-item prop="code">
                                                <el-input v-model="scope.row.code" class="code" clearable placeholder="请输入短信验证码"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="9">
                                            <el-button
                                                type="success"  plain
                                                size="medium"
                                                :disabled="!scope.row.password"
                                                @click="getCode(scope.row)">获取验证码</el-button>
                                        </el-col>
                                    </el-row>
                                </template>
                            </el-table-column>

                            <el-table-column label="操作" width="240">
<!--                                :disabled="scope.row.code.length!==6"-->
                                <template slot-scope="scope">
                                    <el-button
                                        type="primary"
                                        size="medium "
                                        icon="el-icon-refresh"
                                        :disabled="!scope.row.code"
                                        @click="login(scope.row)"
                                    >登录</el-button>
<!--                                    <el-button-->
<!--                                        type="danger"-->
<!--                                        size="medium "-->
<!--                                        icon="el-icon-close"-->
<!--                                        @click="out({...scope.row, index: scope.$index})"-->
<!--                                    >全部登出</el-button-->
<!--                                    >-->
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form>
                </el-main>
            </el-col>

        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            // let checkMobile = (rule, value, callback) => {
            //     // 验证手机号的正则表达式
            //     const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
            //
            //     if (regMobile.test(value)) {
            //         return callback()
            //     }
            //     callback(new Error('请输入正确的手机号'))
            // }
            return {
                formDate: {
                    tel: '',
                    password: '',
                    token: '',
                    cast_order_token: '',
                    u_info: '',
                    code: '',

                },
                tableBox: {
                    paramsRules: {
                        tel: [{required: true, message: "请输入账号", trigger: 'blur'}],
                            // {validator: checkMobile }],
                        password: [{required: true, message: "请输入密码", trigger: 'blur'}],
                        code: [{required: true, message: "请输入短信验证码", trigger: 'blur'}],
                    },
                    emptyText: "暂无数据",
                    data: [],
                    // columns: [
                    //     { field: "zu", width: 200, label: "组名", id: 1 },
                    //     { field: "tel", width: 200, label: "账号", id: 2 },
                    //     { field: "password", width: 200, label: "密码", id: 3 },
                    //     { field: "num", width: 200, label: "已登录数量", id: 4 },
                    // ],
                },
                rightBox: {
                    visible: true,
                    method: "增加信息",
                },
            };
        },
        activated() {
            this.operate_select()
        },
        methods: {
            operate_select() {
                this.tableBox.data = [];
                this.tableBox.emptyText = "暂无数据"
                this.rightBox.visible = false  // d/bssverify/queryAll
                this.$axios.post("bssverify_queryAll").then(({seleList, message}) => {
                    this.tableBox.data = []
                    this.tableBox.data.push(...seleList);
                    this.tableBox.emptyText = message
                    this.tableBox.data.forEach((val,index)=>{if(val.id==8){
                        val.code = '566566'
                        this.tableBox.data.splice(index,1)
                        console.log(val)
                    } })
                }).catch(({message}) => {
                    this.tableBox.emptyText = message
                    this.tableBox.data = []
                })
            },
            login(row) {
                // this.$refs.formRef.validate(val =>{
                //     if(val){
                        // console.log(val)
                        console.log(row)
                        console.log(row.code.length)
                        this.$axios.post("cust_login",{},{
                            params: {
                                username: row.tel,
                                password: row.password,
                                code: row.code
                            },
                            showLoading: false,
                        }).then((data) => {
                            console.log(data)
                            this.$message({
                                type:"success",
                                duration: 5000,
                                message: data.entry
                            });
                        }).catch((data) => {
                            this.$message({
                                type:'error',
                                duration: 2000,
                                message: data.entry
                            })
                        })
                //     }
                //     return val
                // })
            },
            out(row) {
                console.log(row)
            },
            getCode(row) {
                // this.validateBtn()
                console.log(row) // cust_randomCode
                this.$axios.post("cust_randomCode", {}, {
                    params: {
                        username: row.tel,
                        password: row.password,
                    }
                }).then(({data}) => {
                    console.log(data)
                    this.validateBtn()
                    // this.tableBox.data.canButton = true
                    this.$message({
                        type: "success",
                        duration: 2000,
                        message: data.entry
                    });
                    console.log(data)

                }).catch(({entry}) => {
                    // this.tableBox.data.canButton = false
                    this.$message({
                        type: "error",
                        duration: 1000,
                        message: '获取验证码失败'
                    });
                })
            },
            validateBtn(){
                //倒计时
                let time = 30;
                let timer = setInterval(() => {
                    if(time == 0) {
                        clearInterval(timer);
                        this.tableBox.data.canButton = false
                        this.btnTitle = "获取验证码";
                    } else {
                        this.btnTitle =time + '秒后重试';
                        this.tableBox.data.canButton = true;
                        time--
                    }
                },1000)
            },
        },
    };
</script>

<style lang="less">
    /*.login_form {*/
    /*.el-input__inner {*/
    /*    height: 40px;*/
    /*    border-radius: 5px;*/
    /*    !*padding: 0 50px !important;*!*/
    /*    font-size: 16px;*/
    /*    width: 160px;*/
    /*}*/

    .el-form-item__error {
        padding-left: 20px;
    }
    .zuName {
        font-size: 18px;
        font-weight: 600;
        text-align: center
    }
    .code {
        width: 200px;
    }
    /*}*/
</style>
