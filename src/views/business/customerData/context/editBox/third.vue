<!--
-*- coding:utf-8 -*-
@IDE      : WebStorm
@time     : 2020/10/28 14:15
@author   : 李艳鹏
@Software : app
@File     : second
@describe : 商机单行销结果
-->

<template>
    <el-container v-if="showPage">
        <el-header height="30" v-if="!editBoxData.servicename">
            <el-alert
                title="请先分配业务员再进行操作！"
                show-icon
                :closable="false"
                type="warning"
            >
            </el-alert>
        </el-header>
        <el-main style="padding-top: 0">
            <el-form>
                <el-form-item label="行销结果">
                    <el-cascader :props="{ expandTrigger: 'hover' }"
                                 filterable
                                 :options="cascaderItem.failure.select"
                                 separator="-"
                                 :value="editBoxData.failure?[editBoxData.statos,editBoxData.failure] : [editBoxData.statos]"
                                 @change="statosChange"
                    />
                </el-form-item>
                <el-form-item label="待跟踪时间">
                    <el-date-picker
                        v-model.trim="editBoxData.trackingtime"
                        type="datetime"
                        editable
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期"
                        default-time="12:00:00"
                        :clearable="false"
                    >
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </el-main>
        <el-footer v-if="!!editBoxData.servicename" style="margin-top: 20px;text-align: right">
            <el-button type="success" @click="changeStatos">提交</el-button>
        </el-footer>
    </el-container>
</template>

<script>
    import {businessStatus} from "../../../../../data/status.data";

    export default {
        name: "third",
        props: ['parentScope', 'rootScope'],
        data() {
            return {
                showPage: false,
                cascaderItem: {
                    failure: {
                        value: "",
                        select: businessStatus.failure
                    },
                },
                editBoxData: {
                    id: "", // 商机单编号
                    name: "", // 姓名
                    idcard: "", // 身份证号
                    accept: "", // 产品名称
                    payment: "", // 产品金额
                    remark: "", // 备注
                    interior: "", // 安装地址
                    address: "",// 地区
                    failure: "",//失败原因
                    channel: "",//渠道
                    phone: '',
                    toproomotelinks: "",
                    appointmentime: "",
                    servicename: "",
                    trackingtime: "",
                    city: "",  // 城市
                    statos: "", // 状态
                    orderTemplate: "", // 模板
                    broadband: '',
                    /*
                    *
                    * 部门
                    * */
                    department: ''
                },
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.parentScope.queryInfo({
                    SonScope: this,
                    callback: ({success}) => {
                        success();
                    }
                })
            },
            statosChange([one, two]) {
                this.editBoxData.statos = one ? one : ''
                this.editBoxData.failure = two ? two : ''
            },
            changeStatos() {
                if (!this.editBoxData.statos) {
                    this.$message({
                        message: '请选择行销结果',
                        type: 'warning',
                        duration: 1500
                    })
                    return void 0;
                }
                this.parentScope.editInfo({
                    SonScope: this
                }).then(() => {
                    this.$message({
                        duration: 1500,
                        type: 'success',
                        message: '修改成功'
                    });
                })
            }
        }
    }
</script>

<style scoped>

</style>
