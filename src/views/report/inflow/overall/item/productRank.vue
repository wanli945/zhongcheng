<!--
 --@IDE      : WebStorm
 --@time     : 2021/2/3 10:51
 --@author   : 李艳鹏
 --@Software : app
 --@File     : productRank
 --@describe : 产品排行
-->
<template>
    <my-plat title="产品排行" ref="plat" @choose="chooseChannel">
        <template #content>
            <my-report-table :column-arr="columnArr" :table-data="tableData"
                             :empty-text="emptyText"></my-report-table>
            <el-pagination
                style="text-align: right;font-size: 14px"
                prev-text="< 上一页"
                next-text="下一页 >"
                layout="sizes,prev, pager, next"
                :current-page="options.pageCur"
                @current-change="(z)=>options.pageCur=z"
                @size-change="(z)=>options.pageSize=z"
                :page-sizes="[10, 30, 50]"
                :page-size="options.pageSize"
                :total="total">
            </el-pagination>
        </template>
    </my-plat>
</template>

<script>
    import MyPlat from "../../../components/MyPlat";
    import {getProduct} from "../data/index"

    import MyReportTable from "../../../components/myReportTable";

    export default {
        name: "productRank",
        components: {MyReportTable, MyPlat},
        data() {
            const columnArr = [
                {
                    label: "产品名称",
                    prop: "productName"
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
                columnArr,
                options: {
                    channel: "信息流",
                    time: "",
                    timeType: "",
                    pageCur: 1,
                    pageSize: 10,
                    city: "",
                    dateRange: []
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
                this.options.city = this.scope.options.city;
                this.options.dateRange = this.scope.options.dateRange;
                this.emptyText = "暂无数据"
                try {
                    const {total, dataArr} = await getProduct(this);
                    this.total = total
                    this.tableData = dataArr;
                } catch (e) {
                    this.emptyText = e.message
                    this.tableData = [];
                    this.total = 0;
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
            async "options.pageSize"() {
                this.options.pageCur === 1 ? await this.getProductRank() : this.options.pageCur = 1
            },
        }
    }
</script>

<style scoped>

</style>
