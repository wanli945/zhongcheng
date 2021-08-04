<!--
 --@IDE      : WebStorm
 --@time     : 2020/12/7 9:56
 --@author   : 李艳鹏
 --@Software : app
 --@File     : index
 --@describe : 分销商H5配置数据
-->
<template>
    <el-container style="height: calc(100vh - 174px)">
        <el-header height="100px" style="margin: 0;padding: 0;">
            <el-row style="display: flex">
                <query-option-item label="产品名称" v-model="paramsList.product"></query-option-item>
                <query-option-item label="地市" v-model="paramsList.city" type="select"
                                   :select-list="cityList"></query-option-item>
                <query-option-item label="套图" type="select" v-model="paramsList.templateId"
                                   placeholder="请选择套图"
                                   :select-list="templateSelect"></query-option-item>
            </el-row>
            <el-row :gutter="24" type="flex" justify="space-between">
                <el-col :span="20">
                    <el-button type="primary" icon="el-icon-refresh-left" @click="resetQuery">重置
                    </el-button>
                    <el-button type="success" icon="el-icon-search" @click="table_select(()=>
                     $message({
                         duration: 1500,
                          type: 'success',
                          message:'查询成功'
                        })
                    )">查询
                    </el-button>
                    <el-button type="warning" icon="el-icon-delete"
                               :disabled="!multipleSelection.length" @click="table_delete">批量删除
                    </el-button>
                </el-col>
                <el-col :span="4" style="text-align: right">
                    <el-button type="warning" icon="el-icon-plus" @click="table_insert(false)">新增
                    </el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-main style="padding: 0;margin: 0;">
            <el-table
                max-height="620px"
                border
                :data="tableData"
                ref="materialTable"
                row-key="id"
                @selection-change="v=>{
                    this.multipleSelection = [];
                     this.multipleSelection.push(...v)
                }"
                :header-cell-style="{'text-align':'center','background-color':'rgba(193, 206, 214, 1)','fontSize':'14px',color:'black',fontWeight:600}"
            >
                <el-table-column
                    type="selection"
                    fixed="left"
                    width="55">
                </el-table-column>
                <template v-for="(item,index) of tableColumns">
                    <el-table-column :key="index" :prop="item.field" :label="item.label"
                                     :width="item.width"></el-table-column>
                </template>
                <el-table-column label="操作" width="80">
                    <template slot-scope="prop">
                        <div style="text-align: center">
                            <el-button type="primary" @click="table_update(false,prop.row)"
                                       icon="el-icon-edit"
                                       size="mini"
                                       circle></el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <el-dialog append-to-body :visible.sync="dialog.visible" destroy-on-close
                   :close-on-click-modal="false">
            <template #title>
                <h2>{{dialog.method==='insert'?'新增':'修改'}} (ESC退出)</h2>
            </template>
            <template #default>
                <div class="editBox" style="height: 300px;">
                    <el-form :model="dialog.data" :rules="dialog.rules" ref="myForm">
                        <el-form-item label="商品名称" prop="commodity">
                            <el-input v-model="dialog.data.commodity"></el-input>
                        </el-form-item>

                        <el-form-item label="价格" prop="price">
                            <el-input v-model="dialog.data.price"></el-input>
                        </el-form-item>
                        <el-form-item label="地市" prop="city">

                            <query-option-item type="select" placeholder="请选择地市" style="width: 100%"
                                               :has-span="false" v-model="dialog.data.city"
                                               :select-list="cityList"></query-option-item>

                            <!--<el-select v-model="dialog.data.city">
                                <template v-for="(item,index) of cityList">
                                    <el-option :key="index" :label="item.label"
                                               :value="item.value"></el-option>
                                </template>
                            </el-select>-->
                        </el-form-item>
                        <el-form-item label="调测费" prop="tuneFee">
                            <el-input v-model="dialog.data.tuneFee"></el-input>
                        </el-form-item>
                        <el-form-item label="产品名称" prop="product">
                            <el-autocomplete
                                v-model="dialog.data.product"
                                :fetch-suggestions="productSearch"
                                :trigger-on-focus="true"
                                :hide-loading="false"
                                popper-class="autocompleteProduct"
                                :debounce="500"
                                popper-append-to-body
                                @paste.native.capture.prevent="()=>{}"
                                clearable
                            >
                                <template slot-scope="{ item }">
                                    <p style="width: 400px">{{ item.label}}</p>
                                </template>
                            </el-autocomplete>
                        </el-form-item>

                        <el-form-item label="套图" prop="picturename">
                            <el-select v-model="dialog.data.picturename" type="select"
                                       placeholder="请选择套图">
                                <template v-for="item of templateSelect">
                                    <el-option :value="item.id" :label="item.label"
                                               :key="item.id"></el-option>
                                </template>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </template>
            <template #footer>
                <el-button type="primary" @click="dialogSubmit">确定
                </el-button>
            </template>
        </el-dialog>
    </el-container>
</template>
<script>
    import mock from "../../index.data.js"
    import Table_page from "../../../../../common/components/table_page/index";
    import QueryOptionItem from "../../../../../common/components/table_page/item";

    export default {
        name: "adBaidu",
        components: {QueryOptionItem, Table_page},
        data() {
            return {
                cityList: mock.allCity,
                multipleSelection: [],
                templateSelect: [],
                paramsList: {
                    product: "",
                    city: "",
                    templateId: ""
                },
                tableData: [],
                tableColumns: mock.columns,
                dialog: {
                    visible: false,
                    method: "",
                    data: {},
                    rules: {
                        commodity: [{required: true, message: "商品名称不能为空", trigger: 'blur'}],
                        price: [{required: true, message: "价格不能为空", trigger: 'blur'}],
                        city: [{required: true, message: "城市不能为空", trigger: 'blur'}],
                        tuneFee: [{required: true, message: "调测费不能为空", trigger: 'blur'}],
                        picturename: [{required: true, message: "请选择套图", trigger: 'blur'}],
                        product: [{required: true, message: "产品不能为空", trigger: 'blur'}, {
                            validator: (rule, value, callback) => {
                                this._productSearch(value).then(({productInfo}) => {
                                    if (productInfo) {
                                        callback()
                                    } else {
                                        callback(new Error("不是系统配置产品"))
                                    }
                                }).catch(reason => {
                                    callback(new Error("验证超时"))
                                })
                            }, trigger: 'blur'
                        },],
                    }
                },
            }
        },

        mounted() {
            this.init();
        },
        methods: {
            async init() {
                try {
                    this.templateSelect = (await this.$axios.post("dist_girquery", {}, {
                        showLoading: false
                    })).selectList
                } catch (e) {
                }
                this.table_select()
            },
            resetQuery() {
                this.paramsList.city = "";
                this.paramsList.product = "";
                this.paramsList.templateId = "";
                this.table_select();
            },
            table_insert(ok = false) {
                if (ok) {
                    this.$axios.post("dist_distsinsert", "", {
                        params: {
                            info: this.dialog.data
                        }
                    }).then(({message}) => {
                        this.$message({
                            message: message,
                            type: "success",
                            duration: 1500
                        })
                        this.dialog.visible = false
                        this.table_select();
                    })
                } else {
                    this.dialog.visible = true
                    this.dialog.method = 'insert';
                    this.$set(this.dialog, 'data', {
                        city: '',
                        commodity: '',
                        id: undefined,
                        price: '',
                        product: '',
                        tuneFee: '',
                        picturename: ''
                    })
                }
            },
            table_delete() {
                let getId = () => {
                    let p = []
                    this.multipleSelection.forEach(value => {
                        p.push(value.id)
                    })
                    return p;
                }
                this.$alert("", {
                    type: "success",
                    title: "提示",
                    message: "是否删除",
                }).then(value => {
                    this.$axios.post("dist_distsdele", {}, {
                        params: {
                            array: getId()
                        }
                    }).then(({message}) => {
                        this.$message({
                            message,
                            type: "success",
                            duration: 1500
                        })
                        this.table_select();
                    })
                })
            },

            table_select(callback = () => {
            }) {

                this.$axios.post("dist_distsquery", {}, {
                    params: {
                        ...this.paramsList
                    },
                    showLoading: false
                }).then(({tableData, message}) => {
                    this.tableData = tableData
                    callback();
                }).catch(reason => {
                    this.tableData = []
                })
            },
            table_update(ok = true, data) {
                if (ok) {
                    this.$axios.post("dist_distsupdate", "", {
                        params: {
                            info: this.dialog.data
                        }
                    }).then(({message}) => {
                        this.$message({
                            duration: 1500,
                            message,
                            type: "success"
                        })
                        this.dialog.visible = false;
                        this.table_select();
                    }).catch(reason => {

                    })
                } else {
                    this.dialog.visible = true
                    this.dialog.method = 'update';
                    this.$set(this.dialog, 'data', {
                        city: data.city,
                        commodity: data.commodity,
                        id: data.id,
                        price: data.price,
                        product: data.product,
                        tuneFee: data.tuneFee,
                        picturename: data.picturename
                    })
                }
            },
            productSearch(queryString, cd) {
                if (queryString) {
                    this._productSearch(queryString).then(({list}) => {
                        cd(list)
                        if (list.length <= 0) {
                            this.$message({
                                type: "warning",
                                duration: 1500,
                                message: "未查询到产品信息"
                            })
                        }
                    }).catch(reason => {
                        cd([])
                    })
                } else {
                    cd([])
                }
            },
            _productSearch(queryString) {
                return new Promise((resolve, reject) => {
                    this.$axios.post('query_chaproname', {}, {
                        params: {
                            queryString,
                            depaname: ""
                        },
                        showLoading: false
                    }).then(value => {
                        resolve(value)
                    }).catch(reason => {
                        reject(reason)
                    })
                })
            },
            dialogSubmit() {
                this.$refs['myForm'].validate(v => {
                    if (v) {
                        if (this.dialog.method === 'update') {
                            this.table_update(true)
                        } else {
                            this.table_insert(true)
                        }
                    }
                    return v
                })

            },
        },

        watch: {}
    }
</script>

<style lang="less">
    .adBaiduPage {

    }

    .adBaiduPageItemTop {
        p {
            display: flex;
            margin-bottom: 6px;
        }
    }

    .adBaiduPageItemBottom {
        p {
            display: flex;
        }
    }
</style>
