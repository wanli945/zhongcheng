<template>
    <div>
        <el-container style="height: calc(100vh - 174px);margin: 0;padding: 0;">
            <el-aside width="50%">
                <el-row :gutter="20">
                    <el-col :span="12" :offset="12"
                            style="display: flex;justify-content: flex-end;margin-top: 10px;margin-bottom: 10px">
                        <el-button size="small" type="warning" @click="operate('select')">刷新
                        </el-button>
                        <el-button size="small" type="success" @click="operate('insert')">添加
                        </el-button>
                    </el-col>
                </el-row>
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
                    max-height="600px"
                    :empty-text="emptyText"
                >
                    <el-table-column label="编号" prop="id" width="80"></el-table-column>
                    <el-table-column label="角色名称" prop="lname"></el-table-column>
                    <el-table-column label="创建时间" prop="ltime" width="180"></el-table-column>
                    <el-table-column label="创建人" prop="laccept"></el-table-column>
                    <el-table-column label="操作" width="50">
                        <template slot-scope="prop">
                            <!--<el-button size="mini" type="success" icon="el-icon-delete-solid" circle
                                       @click="operate('delete',{...prop.row,index:prop.$index})"></el-button>-->
                            <el-button size="mini" type="danger" icon="el-icon-edit-outline" circle
                                       @click="operate('update',{...prop.row,index:prop.$index})"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-aside>
            <el-main v-show="showRight" style="margin: 0;padding: 0;">
                <el-container style="height: calc(100vh - 174px)">
                    <el-header height="30px">
                        <h3 style="font-size: 20px;line-height: 30px;font-weight: 600">
                            {{editTitle}}</h3>
                    </el-header>
                    <el-main>
                        <el-form>
                            <el-form-item label="角色名称：">
                                <el-input v-model.trim="setRigth.lname"
                                          style="width: 50%"></el-input>
                            </el-form-item>
                            <el-form-item label="订单池：" v-show="false">
                                <el-radio-group v-model="setRigth.pool">
                                    <el-radio :label="0">管理员池</el-radio>
                                    <el-radio :label="1">销售员池</el-radio>
                                    <el-radio :label="2">受理员池</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-row type="flex">
                                <el-col>
                                    <el-form-item label="数据加密：">
                                        <el-switch v-model="setRigth.ljiami"
                                                   :active-value="1"
                                                   :inactive-value="0"
                                        ></el-switch>
                                    </el-form-item>
                                </el-col>
                                <el-col>
                                    <el-form-item label="下载订单：">
                                        <el-switch v-model="setRigth.lxiazai"
                                                   :active-value="1"
                                                   :inactive-value="0"
                                        ></el-switch>
                                    </el-form-item>
                                </el-col>
                                <el-col>
                                    <el-form-item label="上传订单：">
                                        <el-switch v-model="setRigth.lshangchuang"
                                                   :active-value="1"
                                                   :inactive-value="0"
                                        ></el-switch>
                                    </el-form-item>
                                </el-col>
                                <el-col>
                                    <el-form-item label="是否可分配订单：">
                                        <el-switch v-model="setRigth.lfenpei"
                                                   :active-value="1"
                                                   :inactive-value="0"
                                        ></el-switch>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row type="flex">
                                <el-col>
                                   <el-form-item label="渠道：" >
                                        <el-checkbox-group v-model="lqudao" @change="goupChange">
                                            <el-checkbox-button v-for="(item,index) in channelArr" :label="item" :key="index">
                                                {{item}}
                                            </el-checkbox-button>
                                        </el-checkbox-group>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item>
                                <div>菜单栏展示：</div>
                                <el-row :gutter="24">
                                    <el-col :span="12">
                                        <el-tree
                                            :data="menuList"
                                            show-checkbox
                                            ref="menuTree"
                                            node-key="id"
                                            :props="treeProps"
                                            :default-checked-keys="[1]"
                                            :default-expand-all="false"
                                            @check="selectMenu"

                                        >
                                        </el-tree>
                                    </el-col>
                                    <!--<el-col :span="12">
                                        <el-menu style="width: 200px"
                                                 class="el-menu-vertical"
                                                 background-color="#F0F6F6"
                                                 text-color="#3C3F41"
                                                 active-text-color="black"
                                        >
                                            <auto-menu :nav-menus="navMenus"></auto-menu>
                                        </el-menu>
                                    </el-col>-->
                                </el-row>

                            </el-form-item>
                        </el-form>
                    </el-main>
                    <el-footer height="40px" style="text-align: right">
                        <el-button type="success" size="small"
                                   @click="operate(editTitle.trim()==='新增角色权限'?'insert':'update',{},true)">
                            提交
                        </el-button>
                    </el-footer>
                </el-container>
            </el-main>
        </el-container>
    </div>
</template>

<script>

    // import menuList from "../../../../data/menuList.data";
    import {mapState} from "vuex"
    import item from "../../../../common/components/table_page/item";

    export default {
        name: "first",
        data() {
            return {
                tableData: [],
                channelArr: [],
                lqudao: [],
                setRigth: {
                    lname: "",
                    pool: false,
                    ljiami: 0,
                    lxiazai: 0,
                    lshangchuang: 0,
                    lfenpei: 0,
                    laccept: this.$c_user.get().username,
                    index: undefined,
                    id: undefined,
                    arr: [1],
                    // lqudao: [],
                },
                emptyText: '',
                editTitle: '新增角色权限',
                showRight: false,
                menuList: [],//列表
                treeProps: {
                    label: "alias",
                    disabled: (data, node) => {
                        return data.alias === '首页'
                    }
                },
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            async init() {
                await this.operate('select');
                this.menuList = (await import("../../../../data/menuList.data")).default
                await this.queryChannel()
            },

            goupChange(value) { },
           async queryChannel() {
                const {channelDict} = await this.$root.query_channel();
               channelDict.forEach(v =>{
                    this.channelArr.push(v.value)
               })
               // console.log(this.channelArr)
            },
            operate(method, obj, ok = false) {
                this[`operate_${method}`](obj, ok)
            },
            operate_insert(obj, ok) {
                if (ok) {
                    this.submit('insert', () => {
                        this.operate("select")
                    })
                } else {
                    this.showRight = false
                    setTimeout(() => {
                        this.editTitle = '新增角色权限'
                        this.showRight = true
                        this.lqudao = []
                        this.setRigth = {
                            lname: '',
                            ljiami: 0,
                            receptionist: 1,
                            seller: 0,
                            lxiazai: 0,
                            admin: 0,
                            index: undefined,
                            lshangchuang: 0,
                            id: undefined,
                            lfenpei: 0,
                            // lqudao:[]
                        };
                        this.$refs.menuTree.setCheckedKeys(["1"])
                    })
                }
            },
            operate_delete(obj) {
                const {id} = obj;
                this.$axios.post("", {}, {}).then(value => {

                })
            },
            operate_update(obj, ok) {
                if (ok) {
                    this.submit('update', () => {
                        this.operate("select");
                    });
                } else {
                    this.showRight = true
                    this.editTitle = `修改 ${obj.lname} 的权限`
                    this.setRigth = {
                        ...obj
                    }
                    this.lqudao = JSON.parse(obj.lqudao)
                    this.$refs.menuTree.setCheckedKeys(obj.darr)
                }
            },
            operate_select() {
                this.$axios.post("staff_queryemply", {}, {
                    params: {
                        deparname: ""
                    },
                    showLoading: false
                }).then(({levels}) => {
                    this.tableData = levels;
                    this.emptyText = '无数据'
                }).catch(reason => {
                    this.tableData = [];
                    this.emptyText = reason.message
                })
            },
            submit(method, callback = () => {
            }) {
                console.log(this.setRigth)
                const {id, lname, ltime, laccept, ljiami, lxiazai, lshangchuang, pool, lfenpei, index, lqudao} = this.setRigth;
                // 对新增 角色的限制 重名会报错
                if (lname.trim()) {
                    let canSubmit = false
                    if (method === 'insert') {
                        canSubmit = !(this.tableData.some((item) => {
                            return item.lname === lname
                        }));

                    } else if (method === 'update') {
                        let dapsa = [];
                        this.tableData.forEach(value => {
                            dapsa.push(value.lname);
                        });
                        dapsa.splice(index, 1)
                        canSubmit = dapsa.indexOf(lname) < 0; // 不存在
                    }
                    if (!canSubmit) {
                        this.$message({
                            type: "warning",
                            duration: 1500,
                            message: "角色已存在"
                        });
                    } else {
                        // 获取级联选择器 选中的 数组
                        let arr = this.$refs.menuTree.getCheckedNodes(false, true)
                        let tree = this.$util.arrToTree(arr, 0)
                        this.$alert(`是否${method === 'insert' ? '新增' : '修改'} ${lname}`, {
                            type: "info",
                            title: "提示"
                        }).then(value => {
                            if (method === "insert") {
                                this.$axios.post('staff_chadepa', {
                                    lname,
                                    laccept: this.userInfo.username,
                                    ljiami: ljiami,
                                    lxiazai: lxiazai,
                                    lshangchuang: lshangchuang,
                                    lfenpei: lfenpei,
                                    rname: 1,
                                    arr: JSON.stringify(this.$refs.menuTree.getCheckedKeys()),
                                    data: JSON.stringify(tree),
                                    lqudao: JSON.stringify(this.lqudao)
                                }).then(({my_mess}) => {
                                    this.$message({
                                        message: my_mess,
                                        duration: 1500,
                                        type: "success"
                                    })
                                    callback();
                                })
                            }
                            /* 更新数据*/
                            else if (method === "update") {
                                this.$axios.post('staff_xiugailevels', {
                                    id: id,
                                    lname,
                                    ljiami: ljiami,
                                    lxiazai: lxiazai,
                                    lshangchuang: lshangchuang,
                                    lfenpei: lfenpei,
                                    rname: 1,
                                    arr: JSON.stringify(this.$refs.menuTree.getCheckedKeys()),
                                    data: JSON.stringify(tree),
                                    lqudao: JSON.stringify(this.lqudao)
                                }).then(({my_mess}) => {
                                    this.$message({
                                        message: my_mess,
                                        duration: 1500,
                                        type: "success"
                                    })
                                    callback();
                                })
                            }
                        })
                    }
                } else {
                    this.$message({
                        message: '请填写角色名称',
                        duration: 1000,
                        type: "warning"
                    })
                }
            },

            selectMenu(cur, arr) {
                let selected = arr.checkedKeys.indexOf(cur.id)
                console.log(selected)
            },
        },
        computed: {
            ...mapState({
                userInfo: z => z.userInfo,
                right: z => z.right
            })
        }
    }
</script>

<style scoped lang="less">
    .box {
        display: flex;
        justify-content: space-between;

        & > div {
            width: 48%;
            background-color: #888888;
        }

        .box-left {

        }
    }
</style>

