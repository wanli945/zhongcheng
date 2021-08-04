<!--
 --@IDE      : WebStorm
 --@time     : 2021/2/2 17:41
 --@author   : 李艳鹏
 --@Software : app
 --@File     : cityKanBan
 --@describe : 地市看板
-->
<template>
    <my-plat title="地市看板" :button-arr="otherArr" @choose="chooseChannel">
        <template #content>
            <v-echarts autoresize style="height: 500px!important; margin-top: 10px"
                       :options="performanceOption"></v-echarts>
        </template>
        <template #right>
            <my-xia-zai></my-xia-zai>
        </template>
    </my-plat>
</template>

<script>
    import MyPlat from "../../../components/MyPlat";
    import {getCityRank} from "../data/mock"
    import {infoFlowArr, echertOptions} from "../data/index"
    import MyXiaZai from "../../../components/myXiaZai";

    export default {
        name: "cityKanBan",
        props: {
            statisticsTime: String,
            scope: null,
        },
        components: {
            MyXiaZai,
            MyPlat
        },
        data() {
            return {
                otherArr: infoFlowArr,
                options: {
                    channel: "全部",
                    time: "",
                    timeType: "",
                    city: "",
                    dataRange: []
                },
                performanceOption: {
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
                        axisLine: {show: false},
                        axisTick: {show: false},
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
                            name: "地市"
                        },
                        {
                            type: 'pie',
                            radius: ['30%', '70%'],
                            center: ['82%', '50%'],
                            right: 0,
                            name: "地市",
                            tooltip: {
                                formatter: (rest) => {
                                    const {data, marker, percent} = rest
                                    return `${marker} ${data.city}：${data.num}（${percent}%）`
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

        methods: {
            async init() {
                await this.getCityRank()
            },
            chooseChannel({name, value}) {
                this.options.channel = value;
            },
            async getCityRank() {
                this.options.time = this.scope.options.day;
                this.options.timeType = this.scope.options.statisticsTime;
                this.options.dataRange = this.scope.options.dataRange;
                this.options.city = this.scope.options.city;
                try {
                    const {dataArr} = await getCityRank();
                    this.performanceOption.dataset.source = dataArr
                } catch (e) {

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
