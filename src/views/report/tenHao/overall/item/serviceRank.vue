<!--

          万号 子  业务员 业绩看板
-->
<template>
    <my-proplat title="业务员业绩看板" ref="plat" @choose="chooseChannel" @seleChange="selechange">
        <template #content>
            <my-report-table :column-arr="columnArr" :table-data="tableData" @sortChange = "sortChange"
                             :empty-text="emptyText"></my-report-table>
<!--            <el-pagination-->
<!--                style="text-align: right;font-size: 14px"-->
<!--                prev-text="< 上一页"-->
<!--                next-text="下一页 >"-->
<!--                layout="sizes,prev, pager, next"-->
<!--                :current-page="options.pageCur"-->
<!--                @current-change="(z)=>options.pageCur=z"-->
<!--                @size-change="(z)=>options.pageSize=z"-->
<!--                :page-sizes="[10, 30, 50]"-->
<!--                :page-size="options.pageSize"-->
<!--                :total="total">-->
<!--            </el-pagination>-->
        </template>
    </my-proplat>
</template>

<script>
    import MyProplat from "../../../components/MyProplat";
    import {getService} from "../data/index"

    import MyReportTable from "../../../components/myReportTable";

    export default {
        name: "productRank",
        components: {MyReportTable, MyProplat},
        data() {
            const columnArr = [
                {
                    label: "业务员",
                    prop: "serverName"
                },

                {
                    label: "月度指标量",
                    prop: "MonthNum"
                },

                {
                    label: "工单量",
                    prop: "work",
                    sortable: 'custom'

                },
                {
                    label: "成功订单",
                    prop: "archived",
                    // sortable: 'custom'
                },
                {
                    label: "月指标完成率",
                    prop: "MonthRate",
                },
                {
                    label: "月指标差额",
                    prop: "MonthDiff",
                },
            ]
            return {
                columnArr,
                options: {
                    product: "", // 产品
                    time: "",
                    timeType: "",
                    pageCur: 1,
                    pageSize: 10,
                    city: "",
                    dateRange: [],
                    column: '',
                    ord:'',
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
                await this.getServiceRank();
            },
            chooseChannel() {
                this.options.product = ''
                this.options.pageCur = 1;
                // this.options.channel = value;   {name, value}
            },
            // 下拉改变事件
            async selechange(e) {
                console.log(e)
                this.options.product = e
                this.options.pageCur = 1;
                // await this.getServiceRank();
            },
            async getServiceRank() {
                this.options.time = this.scope.options.day;
                this.options.timeType = this.scope.options.statisticsTime;
                this.options.city = this.scope.options.city;
                this.options.dateRange = this.scope.options.dateRange;
                this.emptyText = "暂无数据"
                try {
                    const {total, dataArr} = await getService(this);
                    this.total = total
                    this.tableData = dataArr;
                } catch (e) {
                    this.emptyText = e.message
                    this.tableData = [];
                    this.total = 0;
                }
            },
            async sortChange(c) {
                // console.log(c)
                this.options.column = c.column.label
                this.options.ord = c.column.order,
                // console.log(this.options.column)
                // console.log(this.options.ord)  // ascending 上升 descending 下
                await this.getServiceRank();
            }
        },
        watch: {
            async "options.product"() {
                if (this.options.pageCur === 1) {
                    await this.getServiceRank();
                } else {
                    this.options.pageCur = 1
                }
            },
            async "options.pageCur"() {
                await this.getServiceRank();
            },
            async "options.pageSize"() {
                this.options.pageCur === 1 ? await this.getServiceRank() : this.options.pageCur = 1
            },
        }
    }
</script>

<style scoped>

</style>
