<!--
 --@IDE      : WebStorm
 --@time     : 2020/12/25 14:02
 --@author   : 李艳鹏
 --@Software : app
 --@File     : index
 --@describe : describe
-->
<template>
    <el-container style="height: calc(100vh - 174px)">
        <el-header>
            <el-row :gutter="24">
                <el-col :span="12" style="text-align: right;margin-top: 10px;">
                    <el-button size="small" type="success"
                               @click="()=>(this.one_show=false,table_select())">刷新
                    </el-button>
                    <el-button size="small" type="primary" @click="one_insert({})">新增</el-button>
                </el-col>
                <el-col :span="12">
                    <h5 v-if="one_show" style="font-size: 18px;line-height: 42px;font-weight: bold">
                        {{one_method==='insert'? '新增产品':'修改产品'}}</h5>
                </el-col>
            </el-row>
        </el-header>
        <el-main style="padding: 0;">
            <el-container style="padding: 0;">
                <el-aside width="50%">
                    <el-table
                        max-height="720px"
                        border
                        :data="table_data"
                        ref="materialTable"
                        row-key="id"
                        :cell-style="{textAlign:'center'}"
                        :header-cell-style="{'text-align':'center','background-color':'rgba(193, 206, 214, 1)','fontSize':'14px',color:'black',fontWeight:600}"
                    >
                        <template v-for="(item,index) of table_columns">
                            <el-table-column :key="index" :prop="item.prop" :width="item.width"
                                             :label="item.label"></el-table-column>
                        </template>
                        <el-table-column label="操作" width="100">
                            <template slot-scope="prop">
                                <el-button size="mini" type="primary" round circle
                                           icon="el-icon-edit" @click="one_update({data:{
                                               ...prop.row,
                                               index:prop.$index,
                                           }})"></el-button>
                                <el-button size="mini" type="success" round circle
                                           icon="el-icon-delete" @click="table_delete({
                                           ...prop.row
                                           })"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-aside>
                <el-main v-if="one_show" style="padding-top: 0;">
                    <el-form ref="formDD" size="small" :model="one_data" :rules="one_rules"
                             label-width="auto">
                        <el-form-item label="产品名称：" prop="productName">
                            <el-autocomplete
                                style="width: 300px;"
                                v-model="one_data.productName"
                                :fetch-suggestions="(queryString, cd)=>productSearch(queryString, cd)"
                                :disabled="!one_data.department"
                                :trigger-on-focus="true"
                                :hide-loading="false"
                                popper-class="autocompleteProduct"
                                :debounce="500"
                                popper-append-to-body
                                clearable
                            >
                                <template slot-scope="{ item }">
                                    <el-tooltip effect="light" :content="item.value"
                                                placement="top"><p style="width: 400px">
                                        {{ item.value}}</p>
                                    </el-tooltip>
                                </template>
                            </el-autocomplete>
                        </el-form-item>

                        <el-form-item label="订单地市：" prop="city">
                            <el-cascader style="width: 300px" :props="{expandTrigger:'hover'}"
                                         :options="cityDict" v-model="one_data.city" append-to-body
                                         separator="-" placeholder="请选择地市"></el-cascader>
                            <!--<el-select style="width: 300px;" v-model="">
                                <template v-for="(item,index) of ">
                                    <el-option :label="item.value" :value="item.value"
                                               :key="index"></el-option>
                                </template>
                            </el-select>-->
                        </el-form-item>
                        <el-form-item label="部门名称：" prop="department">
                            <el-select style="width: 300px" v-model="one_data.department"
                                       @change="one_data.productName = ''"
                                       placeholder="请选择分配人员">
                                <template v-for="(item,index) of serverSelect">
                                    <el-option :label="item.value" :value="item.value"
                                               :key="index"></el-option>
                                </template>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <el-row>
                        <el-col :span="6" :push="6" style="text-align: right">
                            <el-button v-if="one_method==='insert'" type="success" size="small"
                                       @click="one_insert({form:'formDD'})">确定
                            </el-button>
                            <el-button @click="one_update({form:'formDD'})"
                                       v-if="one_method==='update'" type="success" size="small">确定
                            </el-button>
                        </el-col>
                    </el-row>
                </el-main>
            </el-container>
        </el-main>
    </el-container>
</template>
<script>
    import tableData from "./js/tableData.js";
    import oneData from "./js/oneData.js"
    import {cityDict} from "./index.data"
    // import QueryOptionItem from "../../../common/components/table_page/item";

    export default {
        name: "index",
        components: {
            // QueryOptionItem
        },
        data() {
            return {
                cityDict: cityDict,
                ...tableData.data,
                ...oneData.data,
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            async init() {
                // 获取业务员
                this.cityDict = []
                try {
                    const data = await this.$root.query_city()
                    this.cityDict.push(...data)
                } catch (e) {
                    console.log(e)
                }
                await this.getServerList();
                await this.table_select();
            },
            ...tableData.methods,
            ...oneData.methods,
        },
        computed: {
            ...tableData.computed,
            ...oneData.computed,
        }
    }
</script>

<style scoped>

</style>
