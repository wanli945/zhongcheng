<!--

 --@describe : 分销 业绩看板
-->
<template>
    <my-proplat title="业绩看板" ref="plat" @choose="chooseChannel" @seleChange="selechange">
        <template #content>
            <v-echarts autoresize style="height: 450px !important;margin-top: 10px"
                       :options="performanceOption"></v-echarts>
        </template>
    </my-proplat>
</template>

<script>
    import MyProplat from "../../../components/MyProplat";
    import {echertOptions, getRank, dataZoom} from "../data/index"


    export default {
        name: "Performance",
        props: {
            statisticsTime: String,
            scope: null,

        },
        data() {
            return {
                options: {
                    disname: "",
                    time: "",
                    timeType: "",
                    city: "",
                    dateRange: []
                },
                performanceOption: {
                    grid: {
                        show: false,
                        left: '5%',
                        right: '5%',
                        top: 60,
                        containLabel: true,
                        tooltip: {
                            show: true,
                            trigger: "axis",
                        },

                    },
                    title: {
                        text: '销售人员排行',
                        show: false,
                        top: 'top',
                        left: 'center'
                    },
                    legend: Object.assign({}, echertOptions.legend),
                    dataset: {
                        source: [],
                        dimensions: ['serverName', '工单总数', '竣工数', '退单数', "竣工率"],
                    },
                    tooltip: Object.assign({}, echertOptions.tooltip, {
                        axisPointer: {
                            type: "shadow",
                            shadowStyle: {
                                shadowColor: 'rgba(0,0,0,.2)'
                            }
                        }
                    }),
                    toolbox: Object.assign({}, echertOptions.toolbox, {
                        feature: Object.assign({}, {
                            /*myReset: {
                                show: false,
                                title: '查询',
                                icon: 'path://M609.376 654.816A239.264 239.264 0 0 1 464 704a240 240 0 1 1 240-240 239.264 239.264 0 0 1-49.472 145.728L790.4 745.6A32 32 0 0 1 768 800a32 32 0 0 1-22.72-9.28l-135.904-135.904zM464 288a176 176 0 1 0 176 176A176.32 176.32 0 0 0 464 288z',
                                onclick: () => {}
                            }*/
                        }, echertOptions.toolbox.feature, {
                            dataView: {
                                show: false,
                                readOnly: true,
                                optionToContent: function (opt) {
                                    /*console.log(opt)*/
                                    const axisData = opt.dataset[0].source;
                                    axisData.sort((x, y) => {
                                        return -(x[1] - y[1])
                                    });
                                    let table = '<table style="width:100%;text-align:center;border-collapse: collapse" border><tbody>'
                                    const column = (arr = [], isd) => {
                                        let text = '<tr>';
                                        if (isd === 'th') {
                                            arr.forEach(value => {
                                                text += `<th style="text-align: center;font-weight: bolder">${value}</th>`
                                            });
                                        } else {
                                            arr.forEach(value => {
                                                text += `<td>${value}</td>`
                                            })
                                        }
                                        return text + `</tr>`
                                    }
                                    axisData.forEach((value, index) => {
                                        if (!index) {
                                            table += column(value, 'th')
                                        } else {
                                            table += column(value, 'td')
                                        }
                                    });
                                    table += '</tbody></table>';
                                    return table;
                                }
                            },
                        }),
                    }),
                    xAxis: {
                        type: 'category',
                    },
                    yAxis: [
                        {type: 'value', name: '数量', nameLocation: 'end'},
                        {
                            type: 'value',
                            name: '竣工率',
                            min: 0,
                            show: false,
                            max: 100,
                            interval: 20,
                            axisLabel: {
                                formatter: '{value} %'
                            }
                        }
                    ],
                    series: [
                        {
                            type: 'bar',
                            name: "工单总数",
                            backgroundStyle: {
                                color: "rgba(0,204,0,1)"
                            }
                        },
                        {
                            type: 'bar',
                            name: "竣工数",
                            backgroundStyle: {
                                color: "rgba(215,215,215,1)"
                            },
                        },
                        {
                            type: 'bar',
                            name: "退单数",
                            backgroundStyle: {
                                color: "rgba(255,0,0,1)"
                            }
                        },
                        {
                            type: 'line',
                            name: "竣工率",
                            yAxisIndex: 1,
                            backgroundStyle: {
                                color: "rgba(89,56,213,1)"
                            },
                            emphasis: {
                                focus: 'series',
                                blurScope: 'coordinateSystem'
                            }
                        },

                    ],
                    dataZoom: dataZoom(100),
                }
            }
        },

        components: {MyProplat},
        methods: {
            async init() {
                await this.getPerformanceData();
            },
            // 全部 按钮事件
            async chooseChannel() {
                this.options.disname = ''
                await this.getPerformanceData();
            },
            // 下拉改变事件
            async selechange(e) {
                // console.log(e)
                this.options.disname = e
                await this.getPerformanceData();
            },
            async getPerformanceData() {
                this.options.time = this.scope.options.day;
                this.options.timeType = this.scope.options.statisticsTime;
                this.options.city = this.scope.options.city;
                this.options.dateRange = this.scope.options.dateRange;
                try {
                    const {dataArr} = await getRank(this);
                    this.performanceOption.dataset.source = dataArr
                    this.performanceOption.dataZoom = dataZoom(800 / Object.values(dataArr).length)
                } catch (e) {
                    console.log(e)
                }
            }
        },

    }
</script>

<style scoped>

</style>
