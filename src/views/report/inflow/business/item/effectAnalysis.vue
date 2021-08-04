<!--
 --@IDE      : WebStorm
 --@time     : 2021/2/3 13:26
 --@author   : 李艳鹏
 --@Software : app
 --@File     : effectAnalysis
 --@describe : 效果分析
-->
<template>
    <my-plat title="效果分析" ref="plat" :button-arr="productArr" @choose="chooseChannel">
        <template #content>
            <div style="display: flex;justify-content: space-between;width: 100%">
                <my-report-table style="width: 60%" :column-arr="columnArr"
                                 :table-data="tableData"
                                 :empty-text="emptyText">
                </my-report-table>
                <div style="width: 40%;height: 500px">
                    <v-echarts v-if="showCanvas"
                               style="display: inline-block;height: 500px!important;"
                               :options="echertOptions"></v-echarts>
                </div>
            </div>
        </template>
        <template #right>
            <my-xia-zai></my-xia-zai>
        </template>
    </my-plat>
</template>

<script>
    import MyPlat from "../../../components/MyPlat";
    import {infoFlowArr} from "../data/index"
    import {getEffect} from "../data/mock"
    import MyReportTable from "../../../components/myReportTable";
    import MyXiaZai from "../../../components/myXiaZai";
    import {echertOptions} from "../../overall/data";

    export default {
        name: "effectAnalysis",
        components: {MyXiaZai, MyReportTable, MyPlat},
        data() {
            const columnArr = [
                {label: "失败原因", prop: "failure"},
                {label: "数量", prop: "num"},
                {label: "占比", prop: "rate"},
            ]
            return {
                showCanvas: false,
                columnArr,
                productArr: infoFlowArr,
                options: {
                    channel: "全部",
                    time: "",
                    timeType: "",
                    city: "",
                    pageCur: 1,
                    dateRange: []
                },
                tableData: [],
                emptyText: "暂无数据",
                total: 0,
                echertOptions: {
                    title: {
                        name: "地市报表",
                        show: false,
                        top: 'top',
                        left: 'center'
                    },
                    dataset: {
                        source: []
                    },

                    tooltip: Object.assign({}, echertOptions.tooltip, {
                        trigger: "item",
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            "type": "line" // 默认为直线，可选为："line" | "shadow"
                        }
                    }),
                    grid: [
                        {
                            top: 0,
                            bottom: 0,
                            left: 0,
                            containLabel: true
                        },
                    ],
                    series: [
                        {
                            type: 'pie',
                            radius: ['30%', '70%'],
                            right: 0,
                            name: "失败原因",
                            tooltip: {
                                formatter: (rest) => {
                                    const {data, marker, percent} = rest
                                    return `${marker} ${data.failure}：${data.num}（${percent}%）`
                                }
                            },
                            label: {
                                formatter: "{b}({d}%)"
                            }
                        }
                    ]
                },
            }
        },
        props: {
            statisticsTime: String,
            scope: null,
        },
        /*mounted() {
            this.init();
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
                this.showCanvas = false
                try {
                    const {total, dataArr, dataArr2} = await getEffect(this);
                    this.tableData = dataArr2;
                    this.echertOptions.dataset.source = dataArr;
                    this.total = total || 0;
                } catch (e) {
                    this.emptyText = e.message
                    this.tableData = [];
                } finally {
                    this.showCanvas = true
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

