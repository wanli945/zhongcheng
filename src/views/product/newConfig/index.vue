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
                            <el-input v-model="condition.stuCode"
                                       placeholder="sku编码 回车搜索"
                                       clearable
                                       @change="()=> (condition.pageNum=1, operate('select')) ">
                            </el-input>
                        </el-col>


                    </el-row>
                </template>
                <template #right_btn>
                    <el-row type="flex" style="margin-top: 8px">
                        <el-button  type="info"
                                   @click="()=> (condition.pageNum=1, operate('select')) ">
                            刷新
                        </el-button>
                        <el-button size="small" type="danger" @click="downLoadTemplate">
                            下载模板
                        </el-button>
                        <el-button size="small" type="primary" @click="upload.visible = true">导入
                        </el-button>
<!--                        <el-button size="small" type="warning" @click="exportExecl">导出</el-button>-->
                        <el-button  type="success" @click="operate('insert')">增加
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
                                <el-button size="mini" type="warning" icon="el-icon-edit"
                                           @click="operate('update',prop.row)"
                                           circle></el-button>
                            </template>
                        </el-table-column>

                    </el-table>
                </template>
            </table_page>
        </el-main>

        <el-aside style="transition: all ease-in .5s;" :width="showRight?'45%':'0'"
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

                                <el-form-item :prop="item.field"
                                              :key="index"
                                              :label="item.label"
                                              :class="item.type==='textarea'?'form-item-textarea':''"
                                >
                                    <template v-if="item.field === 'productsName'">
                                        <el-autocomplete
                                            style="width: 350px;"
                                            v-model="formData.productsName"
                                            :fetch-suggestions="(queryString, cd)=>productSearch(queryString, cd)"
                                            :trigger-on-focus="true"
                                            :hide-loading="false"
                                            popper-class="autocompleteProduct"
                                            :debounce="500"
                                            popper-append-to-body
                                            clearable
                                            @input="aotochange"
                                        >
<!--                                            <template slot-scope="{ item }">-->
<!--                                                <el-tooltip effect="light" :content="item.value" placement="top">-->
<!--                                                    <p style="width: 400px">{{ item.value}}</p>-->
<!--                                                </el-tooltip>-->
<!--                                            </template>-->
                                        </el-autocomplete>
                                    </template>
                                    <template v-else>
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
                                    </template>
                                </el-form-item>
                            </template>
                        </el-form>

                    </el-main>
                    <el-footer>
                        <el-row>
                            <el-col :offset="10" :span="14"
                                    style="margin-top: 20px;text-align: right">
<!--                                <el-button v-if="condition.method==='insert'" size="small"-->
<!--                                           type="primary" @click="addOne('push')">新增-->
<!--                                </el-button>-->
<!--                                <el-button v-if="condition.method==='insert'" size="small"-->
<!--                                           type="warning" :disabled="formData.mutile.length<=1"-->
<!--                                           @click="addOne('pop')">删除-->
<!--                                </el-button>-->
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
    import proConfig from "./index.js"

    export default {
        name: "newConfig",
        components: {MyLoadfile, QueryOptionItem, Table_page},
        data() {
            return {
                // depanameSelect: [], // 部门下拉
                Plist: [],
                columns: proConfig.columns,
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
                    productsName: '', // 产品名
                    id: undefined,
                    index: undefined,
                    method: undefined,
                    timerange: [new Date(), new Date()],
                    depaname: "",
                    stuCode: "",
                    pid: undefined,
                    proList:[]
                },
                tableData: [], // table 数据源
                emptyText: '无数据',
                formDataList: proConfig.addList,
                formData: {
                    title: "修改信息", // 右边的标题
                    stuCode : "",
                    stuBusinessType: '',    // 业务类型
                    productsName: '',   // 产品名称
                    stupackagesType: '',  // 可选包类型
                    isoocp: '',    // 是否需要oocp支付
                    bsspay: '',     // BSS订单类型
                    bssType: '',      // BSS订单支付类型
                    contractcharge: '', // 合同号收费方式
                    plugType: '',     // 插件类型
                    isDiscount: '',       // 关联优惠
                    flowType: '',   // 流程类型
                    goodsType: '', // 商品类型
                    paymentType : "", // Oocp支付类型
                    upAttachment: "", // 是否需要上传附件
                    nameType: "", // 实名类型
                    masterCard:"",
                    secondaryCard:"",
                    bradbandCard:"",
                    twobradbandCard:"",
                    remark: "",
                    unitwidth: "",
                    // depaname: ''
                },
                showRight: false,
                // 上传弹窗
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
                return formRules
            }
        },
        mounted() {
            // this.queryDepaname();
        },
        activated() {
            this.operate_select(false)
        },
        methods: {
            init() {
                this.operate_select(false)
                // this.queryDepaname();
            },
            async productSearch(queryString, cd) {
                if (queryString) {
                    try {
                        const {Plist} = await this._productSearch(queryString)
                        console.log(Plist)
                        if (Plist.length <= 0) {
                            this.$message({
                                type: "error",
                                duration: 1500,
                                message: "未查询到产品信息"
                            })
                        }
                        cd(Plist)
                        this.Plist = Plist

                    } catch (e) {
                        cd([])
                    }
                } else {
                    cd([])
                }
            },
            async _productSearch(queryString) {
                try {
                    return await this.$axios.post('query_chaproname', {}, {
                        params: {
                            queryString,
                            depaname:''
                        },
                        showLoading: false
                    });
                } catch (e) {
                    return e
                }
            },

            operate(method, data, ok = false, callback = () => {
            }) {
                this[`operate_${method}`](data, ok, callback)
            },
            /*
            * 查询 table 数据源   query_querySku
            * */
            operate_select(show = true) {

                this.emptyText = '无数据'
                const {pageNum, pageSize, productsName, timerange, stuCode } = this.condition
                this.$axios.post('stucode_queryByskuNameOrskuCode', {}, {
                    params: {
                        pageNum,
                        pageSize,
                        productsName: productsName.trim(),
                        otime: this.$util.timestamp(timerange[0], "yyyy-MM-dd"),
                        ptime: this.$util.timestamp(timerange[1], "yyyy-MM-dd"),
                        stuCode : stuCode
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
                            title: '新增产品',
                            stuCode : "",
                            stuBusinessType: '',    // 业务类型
                            productsName: '',   // 产品名称
                            stupackagesType: '',  // 可选包类型
                            isoocp: '',    // 是否需要oocp支付
                            bsspay: '',     // BSS订单类型
                            bssType: '',      // BSS订单支付类型

                            contractcharge: '', // 合同号收费方式
                            plugType: '',     // 插件类型
                            isDiscount: '',       // 关联优惠
                            flowType: '',   // 流程类型

                            goodsType: '', // 商品类型

                            paymentType : "", // Oocp支付类型
                            upAttachment: "", // 是否需要上传附件
                            nameType: "", // 实名类型
                            masterCard:"",
                            secondaryCard:"",
                            bradbandCard:"",
                            twobradbandCard:"",
                            remark: "",
                            unitwidth: ""
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
                        stuCode,
                        stuBusinessType,    // 业务类型
                        productsName,   // 产品名称
                        stupackagesType,  // 可选包类型
                        isoocp,    // 是否需要oocp支付
                        bsspay,     // BSS订单类型
                        bssType,      // BSS订单支付类型
                        contractcharge, // 合同号收费方式
                        plugType,     // 插件类型
                        isDiscount,       // 关联优惠
                        flowType,   // 流程类型
                        goodsType, // 商品类型
                        id,
                        index,
                        paymentType, // Oocp支付类型
                        upAttachment, // 是否需要上传附件
                        nameType, // 实名类型
                        masterCard,
                        secondaryCard,
                        bradbandCard,
                        twobradbandCard,
                        remark,
                        unitwidth
                    } = data;
                    this.showRight = false;
                    setTimeout(() => {
                        this.condition.method = 'update';
                        this.formData = {
                            stuCode,
                            stuBusinessType,    // 业务类型
                            productsName,   // 产品名称
                            stupackagesType,  // 可选包类型
                            isoocp,    // 是否需要oocp支付
                            bsspay,     // BSS订单类型
                            bssType,      // BSS订单支付类型
                            contractcharge, // 合同号收费方式
                            plugType,     // 插件类型
                            isDiscount,       // 关联优惠
                            flowType,   // 流程类型
                            goodsType, // 商品类型
                            paymentType, // Oocp支付类型
                            upAttachment, // 是否需要上传附件
                            nameType, // 实名类型
                            masterCard,
                            secondaryCard,
                            bradbandCard,
                            twobradbandCard,
                            remark,
                            unitwidth,
                            title: "修改产品",

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
                    this.$axios.post("", {}, {
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
            // 页改变
            pageChange(pageSize) {
                this.condition.pageNum = 1;
                this.condition.pageSize = pageSize;
                this.operate_select();
            },
            // 当前页面切换
            currentChange(pageNum) {
                this.condition.pageNum = pageNum;
                this.operate_select(false);
            },
            async JproductSearch(queryString, depaname) {
                try {
                    return await this.$axios.post('auto_queryByProp', {}, {
                        params: {
                            queryString,
                            depaname
                        },
                        showLoading: false
                    });
                } catch (e) {
                    return e
                }
            },
            aotochange(e) {
                console.log(e)
                this.formData.productsName = e
            },
            submit(form, method, callback = () => {
            }, form2, mutileIndex) {
                this.$refs[form].validate(vaild => {
                    console.log(vaild)
                    if (vaild) {
                        //   ---
                        if(!this.formData.masterCard.trim() && !this.formData.bradbandCard.trim() && !this.formData.secondaryCard.trim()
                            && !this.formData.twobradbandCard.trim() ) {
                            return this.$message({
                                duration: 2200,
                                message: "包名不能为空",
                                type: "error"
                            })
                        } else {
                            const arr = this.formData.productsName.split('_')
                            console.log(arr.length)
                            if(arr.length === 1) {
                                this.condition.depaname = ''

                            }else {
                                this.condition.depaname = arr[1]

                            }
                            this.JproductSearch(arr[0], this.condition.depaname).then(({productInfo}) => {
                                console.log(productInfo)
                                if (productInfo === undefined) {
                                    return this.$message({
                                        duration: 1500,
                                        type: 'error',
                                        message: '请在下拉框中选择产品'
                                    })
                                }else {
                                    this.condition.pid = productInfo.id
                                    /*
                                    * todo 插入产品
                                    * */
                                    if (method === 'insert') {
                                        this.$alert("", {
                                            title: "提示",
                                            type: "success",
                                            message: "是否新增sku配置",
                                        }).then(value => {
                                            this.$axios.post("stucode_addStucodetable", {...this.formData}, {
                                                params: {
                                                    ...this.formData,
                                                    pid: this.condition.pid
                                                },
                                            }).then(({my_mess}) => {
                                                this.$message({
                                                    message: my_mess,
                                                    type: "success",
                                                    duration: 1500
                                                });
                                                callback();
                                            })
                                        })

                                        /*
                                        *
                                        * todo 更新产品   修改产品
                                        *
                                        * */
                                    } else if(method === 'update') {
                                        this.$alert("", {
                                            title: "提示",
                                            type: "success",
                                            message: "是否修改sku配置",
                                        }).then(value => {
                                            this.$axios.post("stucode_updateStucodetable", {}, {
                                                params: {
                                                    id: this.condition.id,
                                                    ...this.formData,
                                                    pid: this.condition.pid,
                                                }
                                            }).then(({message}) => {
                                                callback(message);
                                            }).finally(() => {
                                                loading.close()
                                            })
                                            console.log(this.condition.pid)
                                        })

                                    }

                                }

                            })
                        }
                        /*
                        * todo 插入产品
                        * */
                        // if (method === 'insert') {
                        //     console.log(this.formData)
                        //     if(!this.formData.masterCard.trim() && !this.formData.bradbandCard.trim() && !this.formData.secondaryCard.trim()
                        //         && !this.formData.twobradbandCard.trim() ) {
                        //         return this.$message({
                        //                     duration: 2200,
                        //                     message: "包名不能为空",
                        //                     type: "error"
                        //                 })
                        //     } else {
                        //         const arr = this.formData.productsName.split('_')
                        //         console.log(arr.length)
                        //         if(arr.length === 1) {
                        //             this.formData.depaname = ''
                        //         }else {
                        //             this.formData.depaname = arr[1]
                        //         }
                        //         this.JproductSearch(arr[0], this.formData.depaname).then(({productInfo}) => {
                        //             console.log(productInfo)
                        //             if (productInfo === undefined) {
                        //                 return this.$message({
                        //                     duration: 1500,
                        //                     type: 'warning',
                        //                     message: '请在下拉框中选择产品'
                        //                 })
                        //             }else {
                        //                 this.condition.pid = productInfo.id
                        //                 this.$axios.post("stucode_addStucodetable", {...this.formData}, {
                        //                     params: {
                        //                         ...this.formData,
                        //                         pid: this.condition.pid
                        //                     },
                        //                 }).then(({my_mess}) => {
                        //                     this.$message({
                        //                         message: my_mess,
                        //                         type: "success",
                        //                         duration: 1500
                        //                     });
                        //                     callback();
                        //                 })
                        //             }
                        //
                        //         })
                        //     }
                        //
                        //
                        // } else if (method === 'update') {
                        //     /*
                        //     *
                        //     * 更新产品   修改产品
                        //     *
                        //     * */
                        //     if (!this.formData.masterCard.trim() && !this.formData.bradbandCard.trim() && !this.formData.secondaryCard.trim()
                        //         && !this.formData.twobradbandCard.trim()) {
                        //         return this.$message({
                        //             duration: 2200,
                        //             message: "包名不能为空",
                        //             type: "error"
                        //         })
                        //     }else {
                        //         const arr = this.formData.productsName.split('_')
                        //         console.log(arr.length)
                        //         if(arr.length === 1) {
                        //             this.formData.depaname = ''
                        //         }else {
                        //             this.formData.depaname = arr[1]
                        //         }
                        //         this.JproductSearch(arr[0], this.formData.depaname).then(({productInfo}) => {
                        //             console.log(productInfo)
                        //             if (productInfo === undefined) {
                        //                 return this.$message({
                        //                     duration: 1500,
                        //                     type: 'warning',
                        //                     message: '请在下拉框中选择产品'
                        //                 })
                        //             }else {
                        //                 this.condition.pid = productInfo.id;
                        //                 this.$axios.post("stucode_updateStucodetable", {}, {
                        //                     params: {
                        //                         id: this.condition.id,
                        //                         ...this.formData,
                        //                         pid: this.condition.pid,
                        //                     }
                        //                 }).then(({message}) => {
                        //                     callback(message);
                        //                 }).finally(() => {
                        //                     loading.close()
                        //                 })
                        //                 console.log(this.condition.pid)
                        //             }
                        //
                        //         })
                        //     }
                        // }
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
                width: 50% !important;
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


