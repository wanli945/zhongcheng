<!--
 --@IDE      : WebStorm
 --@time     : 2021/2/2 9:25
 --@author   : 李艳鹏
 --@Software : app
 --@File     : paltOverAll
 --@describe : describe
-->
<template>
    <my-plat title="整体看板" ref="plat" @choose="chooseChannel">
        <template #content>
            <div class="overAllBox" ref="overAll">
                <template v-for="(item,index) in overAllData">
                <!-- calss 选中时显示 上蓝边框-->
                    <my-block @click.native="item.disable || chooseOverData(index)"
                              :class="item.cur?'curLine':''"
                              style="width: calc(20% - 2px)"
                              :statistics-time="statisticsTime"
                              :key="index" :card-data="item">
                    </my-block>
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
                :clearable="false"
            >
            </query-option-item>
        </template>
    </my-plat>
</template>

<script>
    import MyBlock from "../../../components/MyBlock";
    import MyPlat from "../../../components/MyPlat";
    import {overAllData, infoFlowArr, getPolyline, dataZoom} from "../data/index"
    import QueryOptionItem from "../../../../../common/components/table_page/item";

    export default {
        name: "platOverAll",
        props: {
            statisticsTime: String,
            scope: null
        },
        components: {
            QueryOptionItem,
            MyBlock,
            MyPlat
        },
        data() {
            return {

                overAllData: [],
                options: {
                    city: "",
                    time: null,
                    timeType: null,
                    endRange: [new Date(new Date().setDate(new Date().getDate() - 1)), new Date(new Date().setDate(new Date().getDate() - 1))],
                    channel: "信息流",
                    platType: "business",
                    dateRange: []
                },
                echartsData: {
                    title: {
                        text: "",
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
                    dataset: {
                        source: [],
                    },
                    toolbox: {
                        feature: {
                            restore: {
                                show: true,
                                title: '重置'
                            },
                        }
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
                    dataZoom: dataZoom(100)
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
                    this.options.dateRange = this.scope.options.dateRange;
                    this.options.timeType = this.scope.options.statisticsTime;
                    this.options.city = this.scope.options.city;
                    this.overAllData = await overAllData(this);
                    this.options.platType = this.overAllData[0].title;
                    await this.getPolyline();
                } catch (e) {

                }
            },
            //todo 点击整体看板
            async chooseOverData(index) {
                await this.overAllData.forEach((value, index1) => {
                    this.$set(this.overAllData[index1], 'cur', index === index1);
                    if (index1 === index) {
                        this.options.platType = value.title;
                    }
                });
                await this.getPolyline();
            },
            async chooseChannel(item) {
                console.log(item)
                this.options.channel = item.value;
                await this.getOverAllData();
            },
            async getPolyline() {
                try {
                    const {dataArr, title, total} = await getPolyline(this)
                    console.log(dataArr)
                    if (dataArr.length > 0) {
                        this.echartsData.dataset.source = dataArr;
                        this.echartsData.title.text = title + total;
                        this.echartsData.dataZoom = dataZoom(2000 / dataArr.length)
                    }

                } catch (e) {
                    console.log(e)
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
