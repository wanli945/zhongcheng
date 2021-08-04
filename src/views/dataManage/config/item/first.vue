<template>
    <el-row :gutter="24" type="flex" justify="space-between">
        <el-col :span="12">
            <el-row :gutter="24" style="margin-bottom: 30px" type="flex" justify="space-between">
                <el-col :span="12">
                    <el-select v-model="sortList.value" placeholder="请选择">
                        <el-option
                                v-for="item in sortList.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="8" style="text-align: right">
                    <el-button size="small" type="success" @click="operate('select')">刷新</el-button>
                    <el-button size="small" type="primary" @click="operate('insert')">添加</el-button>
                </el-col>
            </el-row>
            <div class="content">
                <el-table
                        ref="materialTable"
                        :data="tableData"
                        :stripe="true"
                        :highlight-current-row="true"
                        style="width: 100%;cursor: pointer;"
                        row-key="id"
                        :header-cell-style="{'text-align':'center','background-color':'rgba(193, 206, 214, 1)','fontSize':'14px',color:'black',fontWeight:600}"
                        :cell-style="{'text-align':'center'}"
                        :tooltip-effect="'light'"
                        border
                >
                    <el-table-column label="分类" prop="sort"></el-table-column>
                    <el-table-column label="名称" prop="name"></el-table-column>
                    <el-table-column label="字段类型" prop="fieldTypeName"></el-table-column>
                    <el-table-column label="创建时间" prop="createTime"></el-table-column>
                    <el-table-column label="默认值" prop="default"></el-table-column>
                    <el-table-column label="排序" prop="id"></el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="prop">
                            <el-button size="mini" type="success" icon="el-icon-delete-solid" circle
                                       @click="operate('delete',{...prop.row,index:prop.$index})"></el-button>
                            <el-button size="mini" type="danger" icon="el-icon-edit-outline" circle
                                       @click="operate('update',{...prop.row,index:prop.$index})"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        style="margin-top: 50px"
                        @size-change="pageSizeChange"
                        @current-change="pageCurrentChange"
                        :page-sizes="[10, 30, 50]"
                        :page-size="pageInfo.pageSize | number"
                        :current-page="pageInfo.currentPage | number"
                        layout="total,sizes, prev, pager, next, jumper,->"
                        :total="pageInfo.total |number">
                </el-pagination>
            </div>
        </el-col>
        <el-col :span="12" class="box-right" v-show="rightBox.rightShow">
            <h3 style="font-size: 20px;font-weight: 600;line-height: 50px">{{rightBox.rightTitle}}</h3>
            <el-form>
                <el-form-item v-for="(item,index) of optionList" :key="item.field" :label="item.label">
                    <from-item
                            :has-span="false"
                            v-model="item.value"
                            :type="item.type"
                            :index="index"
                            :select-list="item.selectList||[]"
                            :cascader-list="item.cascaderList|| []"
                            :disabled="item.disable"
                            :required="item.required"
                            :placeholder="item.placeholder"
                            @change="changeFormItem"
                    ></from-item>
                </el-form-item>
                <el-form-item v-for="(item,index) of otherOption" :key="item.field" :label="item.label"
                >
                    <from-item
                            :has-span="false"
                            v-model="item.value"
                            :type="item.type"
                            :index="index"
                            :select-list="item.selectList||[]"
                            :cascader-list="item.cascaderList|| []"
                            :disabled="item.disable"
                            :required="item.required"
                            @change="changeFormItem"
                    ></from-item>
                </el-form-item>
            </el-form>
            <div v-show="optionValue.fieldClass==='select' || optionValue.fieldClass==='cascader'" class="showTree">
                <span class="title">下拉/联级 节点配置</span>
                <div class="ThreeInput">
                    <el-input clearable v-model="TreeData.value"></el-input>
                    <el-button type="success" @click="addOne">增加一级节点</el-button>
                </div>
                <el-tree :data="TreeData.data"
                         node-key="value"
                         highlight-current
                         default-expand-all
                         :indent="20"
                         :expand-on-click-node="false">
                          <span class="custom-tree-node" slot-scope="{ node, data }">
                              <span class="title">{{ node.label }}</span>
                              <span class="btnBox">
                                  <el-button icon="el-icon-document-add" type="success" v-show="TreeData.children"
                                             @click="appendTree(data)"
                                             size="mini" circle/>
                                  <el-button size="mini" type="danger" icon="el-icon-delete"
                                             @click="removeTree(node, data)" circle/>
                              </span>
                          </span>
                </el-tree>
            </div>
            <div class="createItem">
                <el-button type="warning" @click="createItem(rightBox.method)">生成并查看演示</el-button>
            </div>
            <el-dialog destroy-on-close :close-on-click-modal="false" :visible.sync="dialog.lookExample" append-to-body
                       custom-class="dialogExample">
                <template #title>
                    <div>
                        <i style="font-size: 20px">是否{{rightBox.method==='insert' ? '提交' : '修改'}}字段信息</i> <span
                            style="font-size: 14px"> (注意：此处选择的值会被作为默认值)</span>
                    </div>
                </template>
                <el-form :rules="exampleRule.rules" :model="exampleRule.fromRule">
                    <el-form-item v-for="(item,index) of dialog.example" :prop="item.field" :label="item.field"
                                  :key="index">
                        <from-item
                                :has-span="false"
                                v-model="item.value"
                                :type="item.type"
                                :index="index"
                                :select-list="item.selectList||[]"
                                :cascader-list="item.cascaderList|| []"
                                :disabled="item.disabled"
                                :is-today="!!item.isToday"
                                :required="item.required"></from-item>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <el-button @click="operate(rightBox.method,{},true)">提交信息</el-button>
                </template>
            </el-dialog>
        </el-col>
    </el-row>
</template>

<script>
    import fromItem from "../../../../common/components/table_page/item.vue"

    export default {
        name: "first",
        components: {
            fromItem
        },
        beforeCreate() {
            this.$root.dataManage.first = this;
        },
        data() {
            return {

                /*
                * 分页的条件
                * */
                pageInfo: {
                    pageSize: "10",
                    currentPage: 1,
                    total: 50
                },
                /*
                *
                * 左边盒子的信息
                * */
                rightBox: {
                    rightTitle: "",
                    method: "insert",
                    rightShow: false,
                },

                /*
                * 树形图
                * */
                TreeData: {
                    data: [],
                    value: "",
                    showText: false,
                    children: false
                },

                id: undefined,
                optionList: [
                    {
                        label: "字段分类",
                        type: "input",
                        field: "sort",
                        value: "客户",
                        disable: true,
                        required: true,
                    },
                    {
                        label: "默认值",
                        type: "input",
                        field: "default",
                        value: "",
                        disable: true,
                        required: false,
                        placeholder: ''
                    },
                    {
                        label: "字段名称",
                        type: "input",
                        field: "field",
                        value: "",
                        required: true
                    },
                    {
                        label: "字段类型",
                        type: "select",
                        field: "fieldClass",
                        value: "",
                        required: true,
                        selectList: [
                            {'value': 'input', 'label': '输入框'},
                            {'value': 'number', 'label': '数字'},
                            {'value': 'textarea', 'label': '文本域'},
                            {'value': "date", 'label': "日期"},
                            {'value': 'select', 'label': '下拉选择器'},
                            {'value': "cascader", 'label': "联级选择器"}
                        ]
                    },

                    {
                        label: "是否必选",
                        type: "select",
                        field: "required",
                        value: "",
                        selectList: [
                            {value: true, label: '是'},
                            {value: false, label: '否'},
                        ]
                    },

                ],
                /*
                * 分类
                * */
                sortList: {
                    value: "客户",
                    options: [
                        {label: "客户", id: 0, value: "客户"},
                        {label: "工单", id: 1, value: "工单"},
                    ],
                },
                /*
                * 输入框
                * 时间选择器
                * 下拉框
                * 多级联框
                *
                * */
                tableData: [
                    {
                        id: 1,
                        name: "创建时间",
                        field: "createTime",
                        fieldTypeName: "时间选择器",
                        fieldType: 'date',
                        createTime: "2020-05-12",
                        required: true,
                        default: "2020-05-12",
                        sort: "客户",
                        list: {
                            isToday: true
                        }
                    },
                    {
                        id: 2,
                        name: "身份证号",
                        field: "idcard",
                        createTime: "2020-05-12",
                        fieldTypeName: "文本框",
                        fieldType: 'input',
                        required: true,
                        sort: "客户",
                        default: "",
                        list: false
                    },
                    {
                        id: 3,
                        name: "预约时间",
                        field: "time",
                        createTime: "2020-05-12",
                        fieldTypeName: "时间选择器",
                        fieldType: 'date',
                        required: true,
                        default: "",
                        sort: "客户",
                        list: {
                            isToday: true
                        },
                    },
                    {
                        id: 4,
                        name: "创建时间",
                        field: "createTime",
                        createTime: "2020-05-12",
                        fieldTypeName: "文本框",
                        fieldType: 'input',
                        required: true,
                        default: "",
                        sort: "客户",
                        list: ''
                    },
                    {
                        id: 5,
                        name: "创建时间",
                        field: "createTime",
                        createTime: "2020-05-12",
                        fieldTypeName: "文本框",
                        fieldType: 'input',
                        required: true,
                        default: "",
                        sort: "客户",
                        list: ''
                    },
                    {
                        id: 6,
                        name: "城市",
                        field: "城市",
                        createTime: "2020-05-12",
                        fieldTypeName: "下拉框",
                        fieldType: 'select',
                        required: true,
                        sort: "客户",
                        default: "杭州市",
                        list: {
                            selectList: [
                                {'value': '杭州市', 'label': '杭州市'},
                                {'value': 'number', 'label': '数字'},
                                {'value': 'textarea', 'label': '文本域'},
                                {'value': "date", 'label': "日期"},
                                {'value': 'select', 'label': '下拉选择器'},
                                {'value': "cascader", 'label': "联级选择器"}
                            ]
                        }
                    },
                ],
                otherOption: [],
                /*
                * 查看例子
                * */
                dialog: {
                    lookExample: false,
                    example: [],
                    id: undefined
                },
                createExample: [],
                submitExampleItem: {},
                fieldName: {
                    'input': '输入框',
                    'number': '数字',
                    'textarea': '文本框',
                    "date": "日期",
                    'select': '下拉框',
                    "cascader": "联级级选择器",
                }
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.operate("select");
            },

            operate(method, option, ok = false) {
                this[`operate_${method}`](option, ok)
            },
            /*
            * 查询
            * */
            operate_select() {
                this.rightBox.rightShow = false;
                this.tableData = [];
                let sort = this.sortList.value
                const success = ({list, total}) => {
                    this.rightBox.rightShow = false;
                    this.tableData = []
                    this.tableData.push(...list)
                    this.pageInfo.total = total
                }
                this.$axios.post("", {}, {
                    params: {
                        sort: this.optionValue.sort,
                        ...this.pageInfo
                    }
                }).then(({my_mess, list, total}) => {
                    this.$message({
                        duration: 1500,
                        type: "success",
                        message: my_mess
                    })
                    success({list, total})
                }).catch(reason => {
                })
                    /*
                    * test.m
                    * */
                    .finally(() => {
                        this.rightBox.rightShow = false;
                        this.tableData = [];
                        this.tableData.push(...[
                            {
                                id: Math.floor(Math.random() * 1000),
                                name: "创建时间",
                                field: "createTime",
                                fieldTypeName: "时间选择器",
                                fieldType: 'date',
                                createTime: "2020-05-12",
                                required: true,
                                default: "2020-05-12",
                                sort: sort,
                                list: {
                                    isToday: true
                                }
                            },
                            {
                                id: Math.floor(Math.random() * 1000),
                                name: "身份证号",
                                field: "idcard",
                                createTime: "2020-05-12",
                                fieldTypeName: "文本框",
                                fieldType: 'input',
                                required: true,
                                sort: sort,
                                default: "",
                                list: false
                            },
                            {
                                id: Math.floor(Math.random() * 1000),
                                name: "预约时间",
                                field: "time",
                                createTime: "2020-05-12",
                                fieldTypeName: "时间选择器",
                                fieldType: 'date',
                                required: true,
                                default: "",
                                sort: sort,
                                list: {
                                    isToday: true
                                },
                            },
                            {
                                id: Math.floor(Math.random() * 1000),
                                name: "创建时间",
                                field: "createTime",
                                createTime: "2020-05-12",
                                fieldTypeName: "文本框",
                                fieldType: 'input',
                                required: true,
                                default: "",
                                sort,
                                list: ''
                            },
                            {
                                id: Math.floor(Math.random() * 1000),
                                name: "创建时间",
                                field: "createTime",
                                createTime: "2020-05-12",
                                fieldTypeName: "文本框",
                                fieldType: 'input',
                                required: true,
                                default: "",
                                sort,
                                list: ''
                            },
                            {
                                id: Math.floor(Math.random() * 1000),
                                name: "城市",
                                field: "城市",
                                createTime: "2020-05-12",
                                fieldTypeName: "下拉框",
                                fieldType: 'select',
                                required: true,
                                sort,
                                default: "杭州市",
                                list: {
                                    selectList: [
                                        {'value': '杭州市', 'label': '杭州市'},
                                        {'value': 'number', 'label': '数字'},
                                        {'value': 'textarea', 'label': '文本域'},
                                        {'value': "date", 'label': "日期"},
                                        {'value': 'select', 'label': '下拉选择器'},
                                        {'value': "cascader", 'label': "联级选择器"}
                                    ]
                                }
                            },
                        ])
                        this.pageInfo.total = 50
                    })
            },
            /*
            * 插入
            * */
            operate_insert(option, ok = false) {
                if (ok) {
                    this.submit('update', () => {
                        this.operate('select');
                    })
                } else {
                    this.dialog.id = undefined;
                    this.rightBox.rightTitle = "新增字段"
                    this.rightBox.method = 'insert'
                    this.rightBox.rightShow = true
                    this.optionList[1].value = ''
                    this.optionList[2].value = ''
                    this.optionList[3].value = ''
                    this.optionList[4].value = ''
                    this.otherOption = []
                    this.TreeData.data = [];
                }
            },
            /*
            *
            * 更新数据
            * */
            operate_update(option, ok) {
                if (ok) {
                    this.submit('update', () => {
                        this.operate('select');
                    })
                } else {
                    this.rightBox.rightTitle = "修改字段"
                    this.rightBox.method = "update"
                    const {
                        createTime,
                        field,
                        fieldType,
                        fieldTypeName,
                        id,
                        list,
                        name,
                        required,
                        sort,
                    } = option;
                    this.rightBox.rightShow = true;
                    this.dialog.id = id;
                    this.optionList[0].value = sort;
                    this.optionList[1].value = option.default || ' '
                    this.optionList[2].value = name
                    this.optionList[3].value = fieldType
                    this.optionList[4].value = required
                    this.otherOption = []
                    fieldType === 'date' ? this.otherOption.push({
                        label: "日期限制",
                        type: "select",
                        field: "isToday",
                        value: !!list.isToday,
                        selectList: [
                            {value: true, label: '是'},
                            {value: false, label: '否'},
                        ]
                    }) : void 0;
                    this.TreeData.data = [];
                    fieldType === 'select' ? this.TreeData.data.push(...(list.selectList || [])) : void 0;
                    fieldType === 'cascader' ? this.TreeData.data.push(...(list.cascaderList || [])) : void 0;
                    this.TreeData.children = fieldType === 'cascader';
                }
            },

            /*
            * 删除信息
            * */
            operate_delete({name, id}) {
                this.$alert("", {type: "info", message: `是否删除  ${name}`, title: "提示"}).then(() => {
                    this.$axios.post("", {}, {}).then(value => {
                        this.$message({
                            message: "删除成功",
                            type: "success",
                            duration: 1000
                        })
                        this.operate('select')
                    });
                })
            },
            /*
            * 分页
            * */
            pageSizeChange(pageSize) {
                this.pageInfo.currentPage = 1
                this.pageInfo.pageSize = pageSize
            },
            pageCurrentChange(curPage) {
                this.pageInfo.currentPage = curPage
            },

            /*
            *  右侧表单的变化
            * */
            changeFormItem(value, index) {
                if (this.optionList[index].field === 'fieldClass') {
                    this.TreeData = {
                        data: [],
                        value: "",
                        showText: false,
                        children: false
                    };
                    this.otherOption = []
                    this.fieldCode = ''
                    if (value === 'select' || value === 'cascader') {
                        this.TreeData.children = value === 'cascader'
                    } else if (value === 'date') {
                        this.otherOption.push({
                            label: "日期限制",
                            type: "select",
                            field: "isToday",
                            value: true,
                            selectList: [
                                {value: true, label: '是'},
                                {value: false, label: '否'},
                            ]
                        })
                    }
                }
            },

            /*
            *
            * 创建 要提交的字段
            * */
            createItem(method) {
                if (!this.optionValue.field) { /*无字段名*/ // 字段类型为 下拉框 或 为多级选择器 值为空
                    this.$message({
                        message: "请填写字段名称",
                        duration: 1000,
                        type: 'warning',
                    })
                    return void 0;
                } else if (!this.optionValue.fieldClass) {
                    this.$message({
                        message: "请选择字段类型",
                        duration: 1000,
                        type: 'warning',
                    })
                    return void 0;
                }
                let obj = {};
                this.dialog.example = [];
                switch (this.optionValue.fieldClass) {
                    case "date":
                        obj = {
                            isToday: !!this.optionValue.isToday
                        }
                        break;
                    case "input":
                    case "number":
                    case 'textarea':
                        obj = {}
                        break;
                    case  "select":
                        obj = {
                            selectList: [].concat(this.TreeData.data)
                        }
                        break;
                    case "cascader":
                        obj = {
                            cascaderList: [].concat(this.TreeData.data)
                        }
                        break;
                }
                const createExample = {
                    name: this.optionValue.field,
                    field: this.optionValue.field,
                    fieldTypeName: this.fieldName[this.optionValue.fieldClass],
                    fieldType: this.optionValue.fieldClass,
                    required: this.optionValue.required || false,
                    sort: this.optionValue.sort,
                    list: obj,
                    default: this.optionValue.default.trim()
                }
                this.submitExampleItem = createExample
                this.dialog.example.push(Object.assign({}, {
                    label: createExample.field,
                    type: createExample.fieldType,
                    field: (createExample.id ? createExample.id + "_" : "") + createExample.field,
                    value: createExample.default,
                    disabled: false,
                    required: createExample.required,
                    isToday: !!createExample.list.isToday,
                    selectList: createExample.list.selectList || [],
                    cascaderList: createExample.list.cascaderList || [],
                }))
                this.dialog.lookExample = true
            },


            /*
            * 树形图的事件
            * */
            //①添加父节点
            addOne() {
                if (this.TreeData.value) {
                    this.TreeData.data.push({
                        value: this.TreeData.value, label: this.TreeData.value, children: undefined
                    });
                    this.TreeData.value = ""
                } else {
                    this.$message({
                        duration: 1000,
                        type: "warning",
                        message: "节点值不能为空"
                    });
                }
            },
            //②添加子节点
            appendTree(data) {
                if (this.TreeData.value) {
                    const newChild = {value: this.TreeData.value, label: this.TreeData.value, children: undefined};
                    if (!data.children) {
                        this.$set(data, 'children', []);
                    }
                    data.children.push(newChild);
                    this.TreeData.value = ""
                } else {
                    this.$message({
                        duration: 1000,
                        type: "warning",
                        message: "节点值不能为空"
                    })
                }
            },
            // ③移除子节点
            removeTree(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.value === data.value);
                children.splice(index, 1);
                try {
                    if (!parent.data.children.length) {
                        parent.data.children = undefined
                    }
                } catch (e) {

                }

            },

            /*
            * 提交信息
            * */
            submit(method, callback = () => {
            }) {
                let submitExample = Object.assign({}, this.submitExampleItem, {
                    default: this.dialog.example[0].value.trim() || '',
                });
                console.log(submitExample)
                this.$alert("", {
                    message: `是否${method === 'insert' ? '提交' : '修改'}字段信息`,
                    title: "提示"
                }).then(value => {
                    /*
                    * 新增数据
                    * */
                    if (method === 'insert') {
                        this.$axios.post("", {}, {params: submitExample}).then(value => {
                            this.rightBox.rightShow = false
                            this.$message({
                                duration: 1000,
                                type: "success",
                                message: "提交成功"
                            })
                            callback();
                        }).catch(reason => {

                        })
                    }
                    /*
                     * 更新数据
                     * */
                    else if (method === 'update') {
                        this.$axios.post("", {}, {params: {...submitExample, id: this.dialog.id}}).then(value => {
                            this.rightBox.rightShow = false
                            this.$message({
                                duration: 1000,
                                type: "success",
                                message: "提交成功"
                            })
                            callback();
                        }).catch(reason => {

                        })
                    }
                })
            },
        },
        computed: {
            optionValue() {
                let dd = {}
                this.optionList.forEach(value => {
                    dd[value.field] = value.value
                });
                this.otherOption.forEach(value => {
                    dd[value.field] = value.value
                })
                return dd;
            },
            exampleRule() {
                let ps = {
                    fromRule: {},
                    rules: {}
                }
                this.dialog.example.forEach(value => {
                    ps.fromRule[value.field] = value.value
                    if (value.required) {
                        ps.rules[value.field] = {
                            required: true,
                            message: `${value.field}是必填项`,
                            trigger: 'blur'
                        }
                    }
                })
                return ps;
            },
        },
        filters: {
            number(num) {
                return parseInt(num)
            }
        },
        watch: {
            "pageInfo.currentPage"() {
                this.operate("select")
            },
            "pageInfo.pageSize"() {
                this.operate("select")
            },
            /*
            * 分类切换时触发
            * */
            "sortList.value"(now) {
                this.optionList[0].value = now;
                /*
                * 当前页为1时
                * */
                if (this.pageInfo.currentPage === 1) {
                    this.operate("select")
                }
                this.pageInfo.currentPage = 1
            }
        }
    }
</script>
<style lang="less">

</style>
<style scoped lang="less">
    .box-right {
        .el-form {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .el-form-item {
                margin-bottom: 5px;
            }


            & > div {
                width: 50%;
            }

            .param {
                width: 100%;
            }
        }
    }

    .showTree {
        .title {
            font-size: 14px;
        }

        .ThreeInput {
            margin-top: 10px;
            display: flex;

            .el-input {
                width: 30%;
                margin-right: 20px;
            }

        }

        .custom-tree-node {
            height: 30px;
            display: flex;
            width: 300px;
            justify-content: space-between;

            .title {
                font-size: 16px;
            }

            .btnBox {
                vertical-align: middle;
                display: flex;
                justify-content: space-between;
                height: 30px;
            }
        }
    }

</style>

<style lang="less">
    .showTree {
        .el-tree {
            height: 200px;
            overflow-y: auto;
            border: 2px solid rgb(224, 230, 234);
            margin: 20px auto;
            padding: 10px 20px;
        }

        .el-tree-node__content {
            line-height: 35px;
            height: 35px;
        }
    }

    .dialogExample {
        .el-form-item {
            display: flex;
            padding-left: 60px;

            label {
                font-size: 16px;
            }

            .el-form-item__content {
                width: 220px;

                .param {
                    width: 100%;

                    & > div {
                        width: 100%;
                    }
                }

            }
        }
    }
</style>
