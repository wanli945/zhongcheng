<!--
-*- coding:utf-8 -*-
@IDE      : WebStorm
@time     : 2020/10/28 10:38
@author   : 李艳鹏
@Software : app
@File     : importCustomer
@describe : 商机单导入
-->
<template>
    <el-tabs v-model.trim="activeName">
        <el-tab-pane name="first" label="单个导入">
            <div class="editBox" v-if="activeName==='first'">
                <el-form size="small" style="height: 440px" :model="addDialog.data"
                         :rules="addDialog.rules"
                         ref="addFinance">
                    <el-form-item label="客户姓名" prop="name">
                        <el-input v-model.trim="addDialog.data.name" autocomplete="on"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="phone">
                        <el-input v-model.trim="addDialog.data.phone" autocomplete="on"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="idcard">
                        <el-input v-model.trim="addDialog.data.idcard" autocomplete="on"></el-input>
                    </el-form-item>

                    <el-form-item label="业务号码" prop="broadband">
                        <el-input v-model.trim="addDialog.data.broadband"
                                  autocomplete="on"></el-input>
                    </el-form-item>
                    <el-form-item label="安装地址" prop="interior">
                        <el-input v-model.trim="addDialog.data.interior"
                                  autocomplete="on"></el-input>
                    </el-form-item>
                    <el-form-item label="渠道(一级)" prop="channels">
                        <el-select v-model.trim="addDialog.data.channels" placeholder="请选择"
                        >
                            <template v-for="(item,index) in addDialog.option.channels">
                                <el-option
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </template>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="渠道(二级)" prop="channel">
                        <el-select v-model.trim="addDialog.data.channel" placeholder="请选择">
                            <template v-for="(item,index) in channelObj[addDialog.data.channels]">
                                <el-option
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </template>
                        </el-select>
                    </el-form-item>

                    <template v-if="pageRight !== 'oneBroadband'">
                    <el-form-item label="广告主" prop="nameofadvertiser">
                        <el-select v-model.trim="addDialog.data.nameofadvertiser" placeholder="请选择"
                                   clearable>
                            <template v-for="(item,index) in addDialog.option.advertiserList">
                                <el-option
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </template>
                        </el-select>
                    </el-form-item>
                    </template>

                    <el-form-item label="备注" style="width: 100%;" prop="remark">
                        <el-input type="textarea" :autosize="{ minRows: 2}" clearable
                                  v-model.trim="addDialog.data.remark"
                                  autocomplete="on"></el-input>
                    </el-form-item>
                    <el-form-item style="margin-top: 20px;width: 100%;text-align: right">
                        <div style="text-align: center">
                            <el-button
                                type="success"
                                size="medium"
                                @click="addDialogFn"
                            >确定 <!--failure-->
                            </el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </el-tab-pane>
        <template v-if="api.daoruexcele && pageRight !== 'oneBroadband'">
            <el-tab-pane name="second" label="批量导入">
                <el-row :gutter="24" v-if="activeName==='second'">
                    <el-row :gutter="24" style="margin-bottom: 30px;">
                        <el-col :offset="18">
                            <!--
                              商机单模板文件
                            -->
                            <el-button type="success" @click="()=>this.$DAFile(api.templateUrl)">
                                下载模板文件
                            </el-button>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="24" :offset="6">
                            <el-upload
                                ref="uploadExcel"
                                class="upload-demo"
                                drag
                                :action="api.daoruexcele"
                                accept=".xlsx,.xls"
                                :multiple="false"
                                :http-request="uploadFile"
                                auto-upload
                                :show-file-list="false"
                            >
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__tip" slot="tip">只能上传xlsx文件</div>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            </el-upload>
                        </el-col>
                    </el-row>
                </el-row>
            </el-tab-pane>
        </template>
    </el-tabs>
</template>
<script>
    import {businessDefaultChannel, businessAllAdvertiser} from "../../../../../data/status.data.js"
    import {mapState} from "vuex"

    export default {
        name: "importCustomer",
        props: {
            parentScope: Object,
            pageRight: String,
            api: {
                type: Object,
                default() {
                    return {
                        // insertOneFi: "fley_insertOneFi", // 单个导入
                        insertOneFi: this.pageRight === 'oneBroadband' ? "keep_insertOneFi" : "fley_insertOneFi",
                        templateUrl: "/template/商机单导入模板.xlsx", // 商机模板下载
                        daoruexcele: "", //订单批量导入
                    }
                }
            }
        },
        data() {
            return {
                activeName: 'first',
                channelObj: {},
                addDialog: {
                    data: {
                        phone: "",  // 联系方式
                        name: "", // 客户姓名
                        interior: "", // 装机地址
                        // channels: businessDefaultChannel.infoFlow.default, // 渠道
                        channels: this.pageRight !== 'oneBroadband' ? businessDefaultChannel.infoFlow.default : businessDefaultChannel.oneBroadband.default,
                        channel: "",
                        area: "", //  区域
                        nameofadvertiser: "", // 广告主
                        remark: "",
                        idcard: "",
                        broadband: ''
                    },
                    rules: {
                        name: [{
                            required: true, message: '请输入用户姓名', trigger: 'blur',
                        }, {
                            validator: (rule, value, callback) => {
                                if (value.trim() <= 1) {
                                    return callback(new Error("用户姓名不能少于2位"))
                                } else {
                                    return callback()
                                }
                            },
                            message: '用户姓名格式不对', trigger: 'change'
                        },
                        ],
                        interior: {required: true, message: '请输入安装地址', trigger: 'blur'},
                        phone: [
                            {required: true, message: '请输入联系方式', trigger: 'blur'},
                            {
                                validator: (rule, value, callback) => {
                                    if (!(this.$reg.contact.test(value))) {
                                        return callback(new Error("联系号码格式不对"))
                                    } else {
                                        return callback()
                                    }
                                },
                                message: '联系号码格式不对', trigger: 'change'
                            },
                        ],
                        channels: {required: true, message: '请选择渠道', trigger: 'blur'},
                        channel: {required: true, message: '请选择渠道', trigger: 'blur'},

                        nameofadvertiser: {required: true, message: '请选择广告主', trigger: 'blur'},
                        idcard: [
                            {
                                validator: (rule, value, callback) => {
                                    if (value && !(this.$reg.idCard.all.test(value))) {
                                        return callback(new Error("身份证格式不对"))
                                    } else {
                                        return callback()
                                    }
                                },
                                message: '15或18位身份证号', trigger: 'change'
                            },
                        ],
                    },
                    option: {
                        channels: [],
                        advertiserList: businessAllAdvertiser["infoFlow"],
                    },
                },
                addDialogFnTimer: null
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            async init() {
                try {

                    if(this.pageRight !== 'oneBroadband') {
                        const {dataObj, channelDict} = await this.$root.query_channel(true, businessDefaultChannel.infoFlow.channelArr)
                        this.addDialog.option.channels = channelDict;
                        this.channelObj = dataObj
                    } else if(this.pageRight === 'oneBroadband') {
                        const {dataObj, channelDict} = await this.$root.query_channel(true, businessDefaultChannel.oneBroadband.channelArr)
                        this.addDialog.option.channels = channelDict;
                        this.channelObj = dataObj
                        // this.addDialog.option.channels = (await this.$root.query_channel()).channelDict
                        // this.channelObj = (await this.$root.query_channel()).dataObj
                    }
                    console.log(this.addDialog.option.channels)
                    console.log(this.channelObj)
                    // this.channelObj = dataObj
                } catch (e) {
                    console.log(e)
                }
            },
            addDialogFn() {
                if (this.addDialogFnTimer === null) {
                    this.$refs["addFinance"].validate(async (valid) => {
                        if (valid) {
                            const loading = this.$loading({
                                lock: true,
                                text: '提交中',
                                spinner: 'el-icon-loading',
                                background: 'rgba(0, 0, 0, 0.7)'
                            });
                            this.$axios.post(this.api.insertOneFi, {}, {
                                params: {
                                    ...this.addDialog.data,
                                    servicename: this.pageRight === 'oneself' ? this.userInfo.username : "",
                                    idcard: this.addDialog.data.idcard && String(this.addDialog.data.idcard).toUpperCase(),
                                }
                            }).then((data) => {
                                this.$message({
                                    type: "success",
                                    message: data["my_mess"],
                                    duration: 1000,
                                });
                                this.addDialogFnTimer = setTimeout(() => {
                                    clearTimeout(this.addDialogFnTimer)
                                    this.addDialogFnTimer = null
                                }, 10 * 1000);
                                /*
                                * 改变弹框得可见性
                                * */
                                this.parentScope && (this.parentScope.visible = false)
                            }).finally(() => {
                                loading.close();
                            })
                        } else {
                            return false;
                        }
                    });
                } else {
                    this.$message({
                        type: "warning",
                        message: "10秒内只能提交一张订单"
                    })
                }
            },

            uploadFile({action, file}) {
                let formData = new FormData();
                formData.append('empFile', file);
                this.$file.post(this.api.daoruexcele, formData).then(({
                                                                          code,
                                                                          entry,
                                                                          message,
                                                                          status,
                                                                          totalCount,
                                                                      }) => {
                    this.$message({
                        type: code === 1 ? "success" : 'error',
                        message: entry || message,
                        duration: 1500
                    })
                    if (code === 1) {
                        this.parentScope && (this.parentScope.visible = false)
                    }
                }).catch(err => {
                    this.$message({
                        duration: 1000,
                        type: "error",
                        message: `文件上传失败${err.message}`
                    });
                })
            },
            /*beforeUpload(file) {
                return file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || (this.$message({
                    message: "只能上传xlsx文件",
                    duration: 1500,
                    type: "warning"
                }), false);
            }*/
        },
        computed: {
            ...mapState({
                userInfo: z => z.userInfo
            })
        },
        watch: {
            "addDialog.data.channels"() {
                this.addDialog.data.channel = ""
            }
        }
    }
</script>

<style lang="less" scoped>
    .upLoadBox {
        margin: 0 auto;
    }
</style>
