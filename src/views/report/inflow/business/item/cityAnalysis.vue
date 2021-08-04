<!--
 --@IDE      : WebStorm
 --@time     : 2021/2/3 13:26
 --@author   : 李艳鹏
 --@Software : app
 --@File     : CityAnalysis
 --@describe : 地域分析
-->
<template>
    <my-plat title="地域分析" ref="plat" :button-arr="productArr" @choose="chooseChannel">
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
    </my-plat>
</template>

<script>
    import MyPlat from "../../../components/MyPlat";
    import {infoFlowArr} from "../data/index"
    import {getCityData} from "../data/mock"
    import MyReportTable from "../../../components/myReportTable";
    import MyXiaZai from "../../../components/myXiaZai";

    export default {
        name: "channelAnalysis",
        components: {MyXiaZai, MyReportTable, MyPlat},
        data() {
            const columnArr = [
                {label: "地区", prop: "area"},
                {label: "商机数", prop: "num"},
                {label: "营销成功", prop: "success"},
                {label: "转化率", prop: "rate"},
                {label: "待二次外呼", prop: "twoCall"},
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
                    dateRange: [],
                },
                tableData: [],
                emptyText: "暂无数据",
                total: 0
            }
        },
        props: {
            statisticsTime: String,
            scope: null,
        },
        /*mounted() {
            this.init()
        },*/
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
                this.options.dateRange = this.scope.options.dateRange;
                this.options.city = this.scope.options.city;

                this.emptyText = "暂无数据"
                this.total = 0;
                try {
                    const {total, dataArr} = await getCityData(this);
                    this.tableData = dataArr;
                    this.total = total || 0;
                } catch (e) {
                    this.emptyText = e.message
                    this.tableData = [];
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
            }
        }
    }
</script>

<style scoped>

</style>

