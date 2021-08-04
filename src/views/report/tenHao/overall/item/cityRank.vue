<!--
万号 子 地市看板
-->
<template>
    <my-proplat title="地市看板" ref="plat" @choose="chooseChannel" @seleChange="selechange">
        <template #content>
            <v-echarts autoresize style="height: 450px !important;margin-top: 10px"
                       :options="echertOptions"></v-echarts>
        </template>
    </my-proplat>
</template>

<script>
    import MyProplat from "../../../components/MyProplat";

    import {echertOptions, getCityRank} from "../data/index"

    export default {
        name: "cityRank",
        props: {
            statisticsTime: String,
            scope: null,
        },
        components: {
            MyProplat
        },
        data() {
            return {
                options: {
                    product: "", // 产品
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
                    // 数据源
                    dataset: {
                        source: []
                    },
                    xAxis: [{
                        type: 'value',
                        axisLine: {show: true}, // 坐标轴 轴线
                        axisTick: {show: true}, // 是否显示坐标轴刻度
                        splitLine: {show: true}, // 是否显示分隔线。默认数值轴显示，类目轴不显示。
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
                    grid: [ // 网格
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
                            radius: ['30%', '70%'], // 饼形状 1，中间空隙  2，整饼大小
                            center: ['85%', '50%'], // 大向右 大向下
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
             // 全部 按钮事件
            async chooseChannel() {
                this.options.product = ''
                await this.getCityRank();
            },

            // 下拉改变事件
            async selechange(e) {
                console.log(e)
                this.options.product = e
                // await this.getCityRank();
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
            async "options.product"() {
                await this.getCityRank();
            }
        }
    }
</script>

<style scoped>

</style>
