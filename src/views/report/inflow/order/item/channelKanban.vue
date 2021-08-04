<!--
 --@IDE      : WebStorm
 --@time     : 2021/2/3 15:43
 --@author   : 李艳鹏
 --@Software : app
 --@File     : channelKanban
 --@describe : 渠道看板
-->
<template>
    <my-plat title="渠道看板" :button-arr="productArr" @choose="chooseChannel">
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
    import {getPerformanceKanBan} from "../data/mock"
    import MyReportTable from "../../../components/myReportTable";
    import MyXiaZai from "../../../components/myXiaZai";

    export default {
        name: "channelKanban",
        components: {MyXiaZai, MyReportTable, MyPlat},
        data() {
            const columnArr = [
                {label: "广告来源", prop: 'advertisers'},
                {label: "工单", prop: 'orderNum'},
                {label: "归档", prop: 'archiveNum'},
                {label: "竣工率", prop: 'completionRate'},
                {label: "退单", prop: 'chargeback'},
                {label: "退单率", prop: 'chargebackRate'},
            ];
            return {
                columnArr,
                productArr: infoFlowArr,
                options: {
                    channel: "全部",
                    time: "",
                    timeType: "",
                    city: "",
                    pageCur: 1,
                    dataRange: []
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
                try {
                    const {total, dataArr} = getPerformanceKanBan();
                    this.tableData = dataArr;
                    this.total = total || 0;
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
            }
        }
    }
</script>

<style scoped>

</style>
