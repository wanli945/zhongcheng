<!--
 --@IDE      : WebStorm
 --@time     : 2021/2/2 9:25
 --@author   : 李艳鹏
 --@Software : app
 --@File     : orderBoard
 --@describe : 订单看板
-->
<template>
    <my-plat title="整体看板" :button-arr="infoFlowArr" @choose="chooseChannel">
        <template #content>
            <div class="overAllBox" ref="overAll">
                <template v-for="(item,index) in orderBoardData">
                    <my-block @click.native="chooseOverData(index)"
                              :class="item.cur?'curLine':''"
                              style="width: calc(20% - 2px)"
                              :statistics-time="statisticsTime"
                              :key="index" :card-data="item"></my-block>
                </template>
            </div>
            <v-echarts style="height: 450px !important;margin-top: 10px" autoresize
                       :options="echartsData"></v-echarts>
        </template>
        <template #left>
            <query-option-item
                type="daterange"
                v-model="options.endRange"
                is-today
                label="对比"
                style="width: 100%;margin: 0;"
            >
            </query-option-item>
        </template>
    </my-plat>
</template>

<script>
    import MyBlock from "../../../components/MyBlock";
    import MyPlat from "../../../components/MyPlat";
    import {orderBoardData, getPolyline} from "../data/mock";
    import {infoFlowArr} from "../data/index"
    import MyXiaZai from "../../../components/myXiaZai";
    import QueryOptionItem from "../../../../../common/components/table_page/item";

    export default {
        name: "orderBoard",
        props: {
            statisticsTime: String,
            scope: null,
        },
        components: {
            MyXiaZai,
            MyBlock,
            MyPlat,
            QueryOptionItem
        },
        data() {
            return {
                orderBoardData: [],
                infoFlowArr,
                options: {
                    city: "",
                    time: null,
                    timeType: null,
                    channel: "全部",
                    platType: "business",
                    endRange: [new Date(new Date().setMonth(new Date().getMonth() - 2)), new Date(new Date().setMonth(new Date().getMonth() - 1))],
                    dateRange: []
                },
                echartsData: {
                    title: {
                        text: "最近30天累计：4560",
                        top: 'top',
                        left: 'left',
                        textStyle: {
                            fontSize: 20,
                            fontWeight: "normal",
                            lineHeight: 30,
                        }
                    },
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
                    xAxis: {
                        type: 'category',

                    },
                    toolbox: {
                        feature: {
                            restore: {
                                show: true,
                                title: '重置'
                            },
                        }
                    },
                    dataset: {
                        source: [],
                    },
                    yAxis: {
                        type: 'value',
                        show: true,
                        axisLine: {
                            show: true
                        },
                        axisPointer: {
                            show: false
                        }
                    },
                    series: {
                        type: 'line',
                        smooth: true,
                        /*tooltip: {
                            trigger: "item",

                        }*/
                    },
                    tooltip: [
                        {
                            trigger: "item",
                            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                "type": "shadow" // 默认为直线，可选为："line" | "shadow"
                            },
                            formatter: (rest) => {
                                const {data, marker} = rest[0];
                                return `${marker}${data.xAxis}<br/>数量：${data.num}`
                            }
                        }
                    ],
                    dataZoom: [
                        {
                            type: 'inside',
                            show: true,
                            rangeMode: ['percent', 'percent'],
                            start: 0,
                            end: 30,
                            handleSize: 8,
                            xAxisIndex: 0,
                            zoomLock: false,
                            orient: 'horizontal',
                            moveOnMouseMove: true,
                            preventDefaultMouseMove: false,
                            zoomOnMouseWheel: false,
                        }, {
                            type: 'slider',
                            show: true,
                            rangeMode: ['percent', 'percent'],
                            start: 0,
                            end: 30,
                            xAxisIndex: 0,
                            zoomLock: false,
                            orient: 'horizontal',
                            moveOnMouseMove: true,
                            preventDefaultMouseMove: false,
                            zoomOnMouseWheel: false,
                        },
                    ]
                }
            }
        },

        methods: {
            async init() {
                await this.getOverAllData();
            },
            //todo 获取 整体看板的数据
            async getOverAllData() {
                try {
                    this.options.time = this.scope.options.day;
                    this.options.timeType = this.scope.options.statisticsTime;
                    this.options.dateRange = this.scope.options.dateRange;
                    this.options.city = this.scope.options.city;
                    this.orderBoardData = orderBoardData();
                    this.options.platType = this.orderBoardData[0].category;
                    await this.getPolyline();
                } catch (e) {

                }
            },
            //todo 点击整体看板
            async chooseOverData(index) {
                await this.orderBoardData.forEach((value, index1) => {
                    this.$set(this.orderBoardData[index1], 'cur', index === index1);
                    if (index1 === index) {
                        this.options.platType = value.category;
                    }
                });
                await this.getPolyline();
            },
            async chooseChannel(item) {
                this.options.channel = item.value;
                await this.getOverAllData();
            },
            async getPolyline() {
                try {
                    const {dataArr, title, total} = await getPolyline(this.options, this)
                    if (dataArr.length > 1) {
                        this.echartsData.dataset.source = dataArr;
                        this.echartsData.title.text = title + total;
                        this.echartsData.dataZoom.forEach((value, index) => {
                            this.echartsData.dataZoom[index].end = 2000 / dataArr.length
                        });
                    }
                } catch (e) {

                }
            }
        },
        watch: {
            async "options.endRange"() {
                await this.getOverAllData();
            }
        }
    }
</script>

<style scoped lang="less">
    .overAllBox {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        margin-top: -10px;

        .curLine {
            position: relative;

            &::after {
                position: absolute;
                content: "";
                border-top: 6px rgb(71, 189, 239) solid;
                width: 100%;
                display: block;
                top: 0;
                left: 0;
            }
        }
    }
</style>
