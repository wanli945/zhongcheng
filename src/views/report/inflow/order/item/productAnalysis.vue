<!--
 --@IDE      : WebStorm
 --@time     : 2021/2/3 13:26
 --@author   : 李艳鹏
 --@Software : app
 --@File     : productAnalysis
 --@describe : 产品分析
-->
<template>
    <my-plat title="产品分析" :button-arr="productArr" @choose="chooseChannel">
        <template #content>
            <my-report-table :column-arr="columnArr" :table-data="tableData"
                             :empty-text="emptyText"></my-report-table>
            <!--<el-pagination
                style="text-align: right;font-size: 14px"
                prev-text="< 上一页"
                next-text="下一页 >"
                layout="prev, pager, next"
                :current-page="options.pageCur"
                @current-change="(z)=>options.pageCur=z"
                :total="total">
            </el-pagination>-->
        </template>
        <template #right>
            <my-xia-zai></my-xia-zai>
        </template>

        <template #center>
            <el-row :gutter="24" style="width: 50%;margin:0;" type="flex" justify="end">
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
    </my-plat>
</template>

<script>
    import MyPlat from "../../../components/MyPlat";
    import {infoFlowArr} from "../data/index"
    import {productAnalysis} from "../data/mock"
    import MyReportTable from "../../../components/myReportTable";
    import MyXiaZai from "../../../components/myXiaZai";

    export default {
        name: "productAnalysis",
        components: {MyXiaZai, MyReportTable, MyPlat},
        data() {
            const columnArr = [
                {label: "产品速率", prop: "productRate"},
                {label: "销售量", prop: "num"},
                {label: "占比", prop: "rate"},
            ]
            return {
                columnArr,
                productArr: infoFlowArr,
                options: {
                    channel: "全部",
                    time: "",
                    timeType: "",
                    city: "",
                    pageCur: 1,
                    c4name: [],
                    dataRange: []
                },
                tableData: [],
                emptyText: "暂无数据",
                total: 0,
                c4nameList: []
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
                this.options.channel = value;
            },
            async getProductRank() {
                this.options.time = this.scope.options.day;
                this.options.timeType = this.scope.options.statisticsTime;
                this.options.dataRange = this.scope.options.dataRange;
                this.options.city = this.scope.options.city;
                this.tableData = [];
                this.emptyText = "暂无数据"
                this.total = 0;
                this.c4nameList = []
                try {
                    const {total, dataArr, c4List} = productAnalysis();
                    this.tableData = dataArr;
                    this.total = total || 0;
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

