<template>
    <el-container style="padding:0; height: 100%">
        <el-main style="padding: 0;">
            <table_page
                :total='condition.total'
                :current-page="condition.pageNum"
                :page-size="condition.pageSize"
                @size-change="pageChange"
                @current-change="currentChange"
                :container="false"
                :container-style="containerStyle"
                :showFold="false"
            >
                <template #left_btn>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-input placeholder="产品名称 回车搜索" clearable
                                      v-model="condition.productsName"
                                      @keyup.enter.native="()=> (condition.pageNum=1, operate('select')) "
                            ></el-input>
                        </el-col>
                        <el-col :span="12">
                            <el-select v-model="condition.depaname"
                                       placeholder="请选择部门"
                                       clearable
                                       filterable
                                       @change="()=> (condition.pageNum=1, operate('select')) ">
                                <template v-for="(item,index) of depanameSelect">
                                    <el-option :value="item.value"
                                               :key="index"
                                               :label="item.label"></el-option>
                                </template>
                            </el-select>
                        </el-col>
                        <el-col :span="14">
                            <query-option-item style="width: 100%;" v-show="false" :has-span="false"
                                               type="daterange"
                                               v-model="condition.timerange"
                                               :is-today="false">
                            </query-option-item>
                        </el-col>
                    </el-row>
                </template>
                <template #right_btn>
                    <el-row type="flex" style="margin-top: 8px">
                        <el-button size="small" type="info"
                                   @click="()=> (condition.pageNum=1, operate('select')) ">
                            刷新
                        </el-button>
                        <el-button size="small" type="danger" @click="downLoadTemplate">
                            下载模板
                        </el-button>
                        <el-button size="small" type="primary" @click="upload.visible = true">导入
                        </el-button>
                        <el-button size="small" type="warning" @click="exportExecl">导出</el-button>
                        <el-button size="small" type="success" @click="operate('insert')">增加
                        </el-button>
                    </el-row>
                </template>
                <template #body>
                    <el-table
                        ref="materialTable"
                        :data="tableData"
                        :stripe="true"
                        max-height="680px"
                        :highlight-current-row="true"
                        row-key="id"
                        :header-cell-style="{'text-align':'center','background-color':'rgba(193, 206, 214, 1)','fontSize':'14px',color:'black',fontWeight:600}"
                        :cell-style="{'text-align':'center'}"
                        :tooltip-effect="'light'"
                        border
                        :empty-text="emptyText"
                    >
                        <template v-for="(item,index) of columns">
                            <el-table-column :key="index" :label="item.label" :prop="item.prop"
                                             :min-width="item.width"/>
                        </template>
                        <el-table-column fixed="right" label="操作" min-width="50">
                            <template slot-scope="prop">
                                <el-button size="mini" type="warning" icon="el-icon-view"
                                           @click="operate('update',prop.row)"
                                           circle></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </table_page>
        </el-main>
        <el-aside style="transition: all ease-in .5s;" :width="showRight?'45%':'0'"
                  :style="{
                   padding: showRight ? undefined:'0'
                  }"
                  class="box-right">
            <template v-if="showRight">
                 <!--新增弹窗内容-->
                <el-container style="height: calc(100vh - 120px)">
                    <el-header height="50px">
                        <h5 style="font-size: 16px;line-height: 40px;font-weight: bold;border-bottom: #DCDFE6 solid 1px; position: relative">
                            {{formData.title}}
                            <el-button @click="showRight=false" size="mini"
                                       style="position: absolute;top: 0;right: 0;"
                                       type="info" circle icon="el-icon-close"></el-button>
                        </h5>
                    </el-header>
                    <el-main style="padding: 0;margin: 0;">
                        <el-form style="margin-bottom:  20px;" size="small" ref="formBox"
                                 :model="formData" :rules="formRules">
                            <template v-for="(item,index) of formDataList">
                                <!--
                                  1 自动受理
                                -->
                                <template v-if="item.field==='isAuto' || item.field==='payMethod'">
                                    <template v-if="formData.acceptMethod===1">
                                        <el-form-item :prop="item.field"
                                                      :key="index"
                                                      :label="item.label"
                                                      :class="item.type==='textarea'?'form-item-textarea':''"
                                        >
                                            <query-option-item
                                                :has-span="false"
                                                :required="item.require"
                                                v-model="item.value"
                                                :type="item.type"
                                                :is-today="false"
                                                :has-datepicker-options="false"
                                                @change="(value,index)=>formData[formDataList[index].field] = formDataList[index].value"
                                                :switch-box="item.switchBox"
                                                :select-list="item.selectList"
                                                :index="index">
                                            </query-option-item>
                                        </el-form-item>
                                    </template>
                                </template>
                                <template v-else>
                                    <template
                                        v-if="item.field==='depaname' || item.field==='deduct'">
                                        <template v-if="condition.method==='update'">
                                            <el-form-item :prop="item.field"
                                                          :key="index"
                                                          :label="item.label"
                                                          :class="item.type==='textarea'?'form-item-textarea':''"
                                            >
                                                <query-option-item
                                                    :has-span="false"
                                                    :required="item.require"
                                                    v-model="item.value"
                                                    :type="item.type"
                                                    :is-today="false"
                                                    :has-datepicker-options="false"
                                                    @change="(value,index)=>formData[formDataList[index].field] = formDataList[index].value"
                                                    :switch-box="item.switchBox"
                                                    :select-list="item.selectList"
                                                    :index="index">
                                                </query-option-item>
                                            </el-form-item>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <el-form-item :prop="item.field"
                                                      :key="index"
                                                      :label="item.label"
                                                      :class="item.type==='textarea'?'form-item-textarea':''"
                                        >
                                            <query-option-item
                                                :has-span="false"
                                                :required="item.require"
                                                v-model="item.value"
                                                :type="item.type"
                                                :is-today="false"
                                                :has-datepicker-options="false"
                                                @change="(value,index)=>formData[formDataList[index].field] = formDataList[index].value"
                                                :switch-box="item.switchBox"
                                                :select-list="item.selectList"
                                                :index="index">
                                            </query-option-item>
                                        </el-form-item>
                                    </template>
                                </template>
                            </template>
                            <template v-if="condition.method==='insert'">
                                <template v-for="(item,index) in formData.mutile">
                                    <el-form-item label="部门" style="margin-top: 10px;" :key="'item'+index"
                                    >
                                        <el-select style="width: 71.4%"
                                                   v-model="item.depaname">
                                            <template v-for="(item,index) of depanameSelect">
                                                <el-option :value="item.value"
                                                           :key="index"
                                                           :label="item.label"></el-option>
                                            </template>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="提成"
                                                  style="margin-top: 10px;"
                                    >
                                        <el-input type="number" style="width: 71.4%"
                                                  v-model="item.deduct"></el-input>
                                    </el-form-item>
                                </template>
                            </template>
                        </el-form>

                    </el-main>
                    <el-footer>
                        <el-row>
                            <el-col :offset="10" :span="14"
                                    style="margin-top: 20px;text-align: right">
                                <el-button v-if="condition.method==='insert'" size="small"
                                           type="primary" @click="addOne('push')">新增
                                </el-button>
                                <el-button v-if="condition.method==='insert'" size="small"
                                           type="warning" :disabled="formData.mutile.length<=1"
                                           @click="addOne('pop')">删除
                                </el-button>
                                <el-button size="small"
                                           type="success" @click="operate(condition.method, {
                            form:'formBox'
                        }, true)">
                                    确定
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-footer>
                </el-container>
            </template>
        </el-aside>
                <!-- 上传弹窗-->
        <el-dialog :visible.sync="upload.visible" v-if="upload.visible" width="400px">
            <template #title>
                上传文件
            </template>
            <template #default>
                <el-upload
                    ref="uploadExcel"
                    class="upload-demo"
                    drag
                    action="/a/query/rexcel"
                    accept=".xlsx"
                    :multiple="false"
                    :http-request="uploadFile"
                    auto-upload
                    :show-file-list="false"
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__tip" slot="tip">只能上传xlsx</div>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </template>
        </el-dialog>
    </el-container>
</template>

<script>
    import Table_page from "../../../common/components/table_page/index";
    import QueryOptionItem from "../../../common/components/table_page/item";
    import MyLoadfile from "../../../common/components/myLoadfile";
    import productConfig from "./index.data";

    export default {
        name: "index",
        components: {MyLoadfile, QueryOptionItem, Table_page},
        data() {
            return {
                depanameSelect: [], // 部门下拉
                columns: productConfig.columns,
                containerStyle: {
                    style: 'height: calc(100vh - 120px);padding:0px',
                    header: {
                        height: '80px',
                        style: 'padding:0'
                    },
                    footer: {
                        height: '30px',
                        style: 'padding:0'
                    },
                    main: {
                        style: 'padding:10px 0;margin:10px 0;'
                    }
                },
                condition: {
                    total: 0,
                    pageNum: 1,
                    pageSize: 10,
                    productsName: '',
                    id: undefined,
                    index: undefined,
                    method: undefined,
                    timerange: [new Date(), new Date()],
                    depaname: ""
                },
                tableData: [],
                emptyText: '无数据',
                /*
                *
                    productsName: '',
                    proCount: '',
                    proMoney: '',
                    otime: '',
                    ptime: '',
                    slname: '',
                * */
                formDataList: productConfig.formDataList,
                formData: {
                    title: "修改信息", // 右边的标题
                    depaname: "",
                    deduct: '',    // 提成
                    productsName: '',   // 产品名称
                    proMoney: '',  // 价格
                    proCount: '',    // 数量
                    rate: '',     // 佣金
                    integral: '',      // 积分

                    subsidy: '', // 补贴
                    otime: '',     // 生效日期
                    ptime: '',       // 失效日期
                    slname: '',   // 描述

                    enable: '', // 是否启用
                    // todo 2020-11-25 付费方式 + 是否自动单
                    acceptMethod: "",
                    payMethod: "", //
                    isAuto: "",

                    mutile: [
                        {
                            depaname: "",  // 部门
                            deduct: '',    // 提成
                        }
                    ]
                },
                showRight: false,
                upload: {
                    visible: false,
                    file: null
                }
            }
        },
        computed: {
            formRules() {
                let formRules = {};
                this.formDataList.forEach((item, index) => {
                    if (item.require) {
                        formRules[item.field] = [
                            {
                                required: item.require,
                                message: `${item.label}是必填项`,
                                trigger: 'blur'
                            }
                        ]
                    }
                })
                formRules['depaname'] || (formRules['depaname'] = [
                    {
                        required: true,
                        message: `产品名称是必填项`,
                        trigger: 'blur'
                    }
                ])
                formRules['depaname'] || (formRules['deduct'] = [
                    {
                        required: true,
                        message: `产品提成不能为空`,
                        trigger: 'blur'
                    }
                ])

                return formRules
            }
        },
        mounted() {
            this.queryDepaname();
        },
        activated() {
            this.operate_select(false)
        },
        methods: {
            init() {
                this.operate_select(false)
                this.queryDepaname();
            },
            addOne(type) {
                if (type === 'push') {
                    this.formData.mutile.push({
                        depaname: "",  // 部门
                        deduct: '',    // 提成
                    })
                } else if (type === 'pop') {
                    this.formData.mutile.pop()
                }
            },
            /*
            * 查询部门
            * */
            queryDepaname() {
                this.depanameSelect = [];
                this.$root.getStaff().then(({deparList}) => {
                    this.formDataList[4].selectList = deparList;
                    this.depanameSelect = [];
                    this.depanameSelect.push(...deparList)
                })
            },
            operate(method, data, ok = false, callback = () => {
            }) {
                this[`operate_${method}`](data, ok, callback)
            },
            /*
            * 查询
            * */
            operate_select(show = true) {

                this.emptyText = '无数据'
                const {pageNum, pageSize, productsName, timerange, depaname} = this.condition
                this.$axios.post('query_queryAll', {}, {
                    params: {
                        pageNum,
                        pageSize,
                        productsName: productsName.trim(),
                        otime: this.$util.timestamp(timerange[0], "yyyy-MM-dd"),
                        ptime: this.$util.timestamp(timerange[1], "yyyy-MM-dd"),
                        depaname: depaname
                    },
                    showLoading: false
                }).then(({list, total}) => {
                    this.tableData = list;
                    this.condition.total = total

                    if (show) {
                        this.$message({
                            message: '查询成功',
                            type: 'success',
                            duration: 1000
                        });
                    }
                }).catch(reason => {
                    this.emptyText = reason.message
                    this.tableData = [];
                }).finally(() => {
                    this.showRight = false
                });
            },
            /*
            * 新增
            * */
            operate_insert(data, ok) {
                if (ok) {
                    const {form, form2, mutileIndex} = data
                    this.submit(form, 'insert', () => {
                        this.currentChange(1)
                        this.showRight = false;
                    }, form2, mutileIndex)
                } else {
                    this.showRight = false;
                    setTimeout(() => {
                        this.condition.method = 'insert';
                        this.formData = {
                            productsName: '',
                            proMoney: '',
                            proCount: '',
                            rate: '',
                            integral: '',
                            deduct: '',
                            subsidy: "", // 补贴
                            otime: '',
                            ptime: '',
                            slname: '',
                            enable: '', // 是否启用
                            depaname: '', // 部门
                            title: '新增产品',

                            // todo 2020-11-25 付费方式 + 是否自动单
                            payMethod: "", //
                            isAuto: "",

                            acceptMethod: "",
                            settlementratio: "",
                            mutile: [
                                {
                                    depaname: "",  // 部门
                                    deduct: '',    // 提成
                                }
                            ]
                        };
                        this.formDataList.forEach((item, index1) => {
                            this.formDataList[index1].value = this.formData[item.field]
                        });
                        this.condition.id = undefined;
                        this.condition.index = undefined;
                        this.showRight = true;
                    })

                }

            },
            /*
            * 删除
            * */
            operate_delete({
                               productsName,
                               proMoney,
                               proCount,
                               otime,
                               ptime,
                               rate,
                               integral,
                               deduct,
                               slname,
                               depaname,
                               subsidy,
                               id,
                               index
                           }) {
                this.$axios.post('', {
                    id: id
                }).then(value => {
                    this.$message({
                        message: '删除成功',
                        type: 'success',
                        duration: 1000
                    });
                    this.operate_select()
                }).catch(reason => {

                })
            },
            /*
            * 更新
            * */
            operate_update(data, ok) {
                if (ok) {
                    const {form} = data;
                    this.submit(form, 'update', (message) => {
                        this.$message({
                            duration: 1500,
                            message,
                            type: "success"
                        });
                        this.operate_select(false)
                    })
                } else {
                    const {
                        productsName,
                        proMoney,
                        depaname,
                        proCount,
                        otime,
                        ptime,
                        rate,
                        integral,
                        deduct,
                        subsidy,
                        slname,
                        id,
                        index,
                        enable,
                        originalData,
                        settlementratio
                    } = data;
                    this.showRight = false;
                    setTimeout(() => {
                        this.condition.method = 'update';
                        this.formData = {
                            productsName,
                            proMoney,
                            depaname,
                            proCount,
                            rate,
                            integral,
                            deduct,
                            otime,
                            ptime,
                            slname,
                            subsidy,
                            // todo 2020-11-25
                            // originalData 存放初始值
                            enable: originalData.enable,
                            payMethod: originalData.payMethod, //


                            isAuto: originalData.isAuto,
                            acceptMethod: originalData.acceptMethod,
                            title: "修改产品",
                            settlementratio,

                            mutile: [
                                {
                                    depaname: depaname,  // 部门
                                    deduct: deduct,    // 提成
                                }
                            ]
                        };

                        this.condition.id = id;
                        this.condition.index = index;
                        this.formDataList.forEach((item, index1) => {
                            this.formDataList[index1].value = this.formData[item.field]
                        });
                        this.showRight = true;
                    }, 100)
                }
            },
            /*
            *todo  导出产品配置的文件
            * */
            exportExecl() {
                this.$prompt("请输入文件名", "提示", {
                    type: "success",
                    inputValidator: (value = "") => {
                        return !!value.trim() || "文件名不能为空";
                    }
                }).then(({value}) => {
                    const {pageNum, pageSize, productsName, timerange} = this.condition
                    this.$axios.post("daoexcel_excelprod", {}, {
                        params: {
                            productsName: productsName.trim(),
                            otime: this.$util.timestamp(timerange[0], "yyyy-MM-dd"),
                            ptime: this.$util.timestamp(timerange[1], "yyyy-MM-dd"),
                            name: value
                        }
                    }).then(({url}) => {
                        this.$DLFile(url);
                    })
                })
            },
            //页数量改变
            pageChange(pageSize) {
                this.condition.pageNum = 1;
                this.condition.pageSize = pageSize;
                this.operate_select();
            },
            //页面切换
            currentChange(pageNum) {
                this.condition.pageNum = pageNum;
                this.operate_select(false);
            },
            submit(form, method, callback = () => {
            }, form2, mutileIndex) {
                this.$refs[form].validate(vaild => {
                    if (vaild) {
                        /*
                        * todo 插入产品
                        * */

                        if (method === 'insert') {
                            for (let item of this.formData.mutile) {
                                if (!item.deduct.trim() || !item.deduct.trim()) {
                                    return this.$message({
                                        duration: 2200,
                                        message: "部门佣金不能为空",
                                        type: "warning"
                                    })
                                }
                            }
                           /*  let loading = this.$loading({
                                body: true,
                                text: "提交中",
                                fullscreen: true
                            }) */
                            this.$axios.post("query_insertProd", {...this.formData}, {
                                params: {
                                    ...this.formData
                                },
                            }).then(({my_mess}) => {
                                this.$message({
                                    message: my_mess,
                                    type: "success",
                                    duration: 1500
                                });
                                callback();
                            })
                        } else if (method === 'update') {
                            /*
                            *
                            * 更新产品   修改产品
                            *
                            * */
                            let loading = this.$loading({
                                body: true,
                                text: "提交中",
                                fullscreen: true
                            })
                            // console.log(this.formData)
                            this.$axios.post("query_xiugaiprod", {}, {
                                params: {
                                    id: this.condition.id,
                                    ...this.formData
                                }
                            }).then(({message}) => {
                                callback(message);
                            }).finally(() => {
                                loading.close()
                            })
                        }
                    }
                    return vaild
                })
            },
            /*
            * 自定义上传文件
            * */
            uploadFile({action, file}) {
                let formData = new FormData();
                formData.append('file', file);
                this.$file.post(this.$fileApi.product, formData).then(({
                                                                           code,
                                                                           entry,
                                                                           message,
                                                                           status,
                                                                           totalCount,
                                                                       }) => {

                    this.$message({
                        type: (code === 1 || code === 2) ? "success" : 'error',
                        message: (code === 1 || code === 2) ? "上传成功" : (entry || message),
                        duration: 1500
                    })
                    code === 1 && (this.upload.visible = false, this.operate_select(false));
                    code === 2 && (this.upload.visible = false, this.operate_select(false));
                }).catch(err => {
                    this.$message({
                        duration: 1000,
                        type: "error",
                        message: `文件上传失败${err.message}`
                    });
                })
            },
            downLoadTemplate() {
                this.$DAFile(this.$tURL.product)
            }
        }
    }
</script>

<style scoped lang="less">
    .box-right {
        display: flex;
        flex-direction: column;
        padding: 0 20px;

        .el-form {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .el-form-item {
                margin-bottom: 5px;
            }

            .form-item-textarea {
                width: 100% !important;

                .param {
                    height: auto;
                }
            }


            & > div {
                width: 50%;
            }

            .param {
                width: 100%;
            }
        }
    }

</style>


