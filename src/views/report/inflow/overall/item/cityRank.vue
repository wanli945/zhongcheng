<!--
 --@IDE      : WebStorm
 --@time     : 2021/2/2 17:41
 --@author   : 李艳鹏
 --@Software : app
 --@File     : cityRank
 --@describe : 地市看板
-->
<template>
    <my-plat title="地市看板" ref="plat" @choose="chooseChannel">
        <template #content>
            <v-echarts autoresize style="height: 450px !important;margin-top: 10px"
                       :options="echertOptions"></v-echarts>
        </template>
    </my-plat>
</template>

<script>
    import MyPlat from "../../../components/MyPlat";

    import {echertOptions, getCityRank} from "../data/index"

    export default {
        name: "cityRank",
        props: {
            statisticsTime: String,
            scope: null,
        },
        components: {
            MyPlat
        },
        data() {
            return {
                options: {
                    channel: "信息流",
                    time: "",
                    timeType: "",
                    city: "",
                    dateRange: []
                },
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
                    xAxis: [{
                        type: 'value',
                        axisLine: {show: true},
                        axisTick: {show: true},
                        splitLine: {show: true},
                    }],
                    tooltip: Object.assign({}, echertOptions.tooltip, {
                        trigger: "item",
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            "type": "line" // 默认为直线，可选为："line" | "shadow"
                        }
                    }),
                    toolbox: Object.assign({}, echertOptions.toolbox,
                        {
                            feature: Object.assign({}, {
                                /*myReset: {
                                    show: true,
                                    title: '查询',
                                    icon: 'path://M609.376 654.816A239.264 239.264 0 0 1 464 704a240 240 0 1 1 240-240 239.264 239.264 0 0 1-49.472 145.728L790.4 745.6A32 32 0 0 1 768 800a32 32 0 0 1-22.72-9.28l-135.904-135.904zM464 288a176 176 0 1 0 176 176A176.32 176.32 0 0 0 464 288z',
                                    onclick: () => {
                                        this.arearankQuery()
                                    }
                                },*/
                            }, echertOptions.toolbox.feature, {
                                dataView: {
                                    show: false
                                },
                                restore: {
                                    show: false,
                                    title: '重置'
                                },
                            }),
                        }),
                    grid: [
                        {
                            top: 0,
                            width: '66%',
                            bottom: 0,
                            left: 0,
                            containLabel: true
                        },
                    ],
                    yAxis: [{type: 'category'}],
                    series: [
                        {
                            type: 'bar',
                            tooltip: {
                                formatter: (rest) => {
                                    const {data, marker} = rest
                                    return `${marker} ${data.city}：${data.num}`
                                }
                            },
                            itemStyle: {
                                color: 'rgba(22,155,213,.9)'
                            },
                            name: "地市",
                            barMaxWidth: "60"
                        },
                        {
                            type: 'pie',
                            radius: ['30%', '70%'],
                            center: ['82%', '50%'],
                            right: 0,
                            name: "地市",
                            tooltip: {
                                formatter: (rest) => {
                                    // alert(JSON.stringify(rest));
                                    const {data, marker, percent} = rest
                                    return `${marker} ${data.city}：${data.num}（${percent}%）`
                                }
                            },
                            label: {
                                formatter: "{b}({d}%)"
                            },
                            avoidLabelOverlap: true
                        }
                    ]
                },
            }
        },

        methods: {
            async init() {

                await this.getCityRank()
            },

            chooseChannel({name, value}) {
                // console.log(value)
                this.options.channel = value;
            },
            async getCityRank() {
                this.options.time = this.scope.options.day;
                this.options.timeType = this.scope.options.statisticsTime;
                this.options.dateRange = this.scope.options.dateRange;
                this.options.city = this.scope.options.city;
                try {
                    const {dataArr} = await getCityRank(this);
                    this.echertOptions.dataset.source = dataArr
                } catch (e) {
                    this.echertOptions.dataset.source = []
                }
            }
        },
        watch: {
            async "options.channel"() {
                await this.getCityRank();
            }
        }
    }
</script>

<style scoped>

</style>
