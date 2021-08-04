<!--
 --@IDE      : WebStorm
 --@time     : 2021/2/3 10:51
 --@author   : 李艳鹏
 --@Software : app
 --@File     : commodityRank
 --@describe : 商品排行
-->
<template xmlns:el-col="http://www.w3.org/1999/html">
    <my-plat title="商品排行" :button-arr="productArr" @choose="chooseChannel">
        <template #content>
            <my-report-table :column-arr="columnArr" :table-data="tableData"
                             :empty-text="emptyText"></my-report-table>
            <el-pagination
                style="text-align: right;font-size: 14px"
                prev-text="< 上一页"
                next-text="下一页 >"
                layout="prev, pager, next"
                :current-page="options.pageCur"
                @current-change="(z)=>options.pageCur=z"
                :total="total">
            </el-pagination>
        </template>
        <template #center>
            <el-row :gutter="24" style="width: 50%;margin:0;" type="flex" justify="end">
                <el-col :span="10">
                    <el-input @keyup.enter.native="init" v-model="options.commodity"
                              clearable></el-input>
                </el-col>
                <el-col :span="10">
                    <i style="display: inline-block;font-size: 18px">地市：</i>
                    <el-select placeholder="请选择地市" clearable v-model="options.c4name">
                        <template v-for="(item,index) of c4nameList">
                            <el-option :value="item.value" :label="item.label"
                                       :key="index"></el-option>
                        </template>
                    </el-select>
                </el-col>
            </el-row>
        </template>
        <template #right>
            <my-xia-zai></my-xia-zai>
        </template>
    </my-plat>
</template>

<script>
    import MyPlat from "../../../components/MyPlat";
    import {infoFlowArr} from "../data/index"
    import {getProduct} from "../data/mock"
    import MyReportTable from "../../../components/myReportTable";
    import MyXiaZai from "../../../components/myXiaZai";

    export default {
        name: "commodityRank",
        components: {MyXiaZai, MyReportTable, MyPlat},
        data() {
            const columnArr = [
                {
                    label: "产品名称",
                    prop: "commodityName"
                },

                {
                    label: "销售量",
                    prop: "num"
                },

                {
                    label: "占比",
                    prop: "rate"
                },
            ]
            return {
                c4nameList: [],
                columnArr,
                productArr: infoFlowArr,

                options: {
                    channel: "全部",
                    commodity: "",
                    time: "",
                    timeType: "",
                    pageCur: 1,
                    city: "",
                    c4name: "",
                    dataRange: []
                },
                total: 0,
                tableData: [],
                emptyText: "暂无数据"
            }
        },
        props: {
            statisticsTime: String,
            scope: null,
        },

        methods: {
            async init() {
                this.options.pageCur = 1;
                await this.getProductRank();
            },
            chooseChannel({name, value}) {
                this.options.pageCur = 1;
                this.options.channel = value;
            },
            async getProductRank() {
                this.options.time = this.scope.options.day;
                this.options.timeType = this.scope.options.statisticsTime;
                this.options.dataRange = this.scope.options.dataRange;
                this.options.city = this.scope.options.city;
                this.tableData = [];
                this.options.total = 0;
                this.emptyText = "暂无数据"
                this.c4nameList = []
                try {
                    const {total, dataArr, c4List} = getProduct(this.options);
                    this.total = total
                    this.tableData = dataArr;
                    this.c4nameList = c4List
                } catch (e) {
                    this.emptyText = e.message
                }
            }
        },
        watch: {
            async "options.channel"() {
                if (this.options.pageCur === 1) {
                    await this.getProductRank();
                } else {
                    this.options.pageCur = 1
                }

            },
            async "options.pageCur"() {
                await this.getProductRank();
            },
            async "options.c4name"() {
                if (this.options.pageCur === 1) {
                    await this.getProductRank();
                } else {
                    this.options.pageCur = 1
                }
            }
        }
    }
</script>

<style scoped>

</style>
