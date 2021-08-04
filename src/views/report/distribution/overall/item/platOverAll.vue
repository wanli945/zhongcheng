<!--

  万号 子 整体看板
-->
<template>
    <my-proplat title="整体看板" ref="plat" @choose="chooseChannel" @seleChange="selechange">
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
            <!-- 天数据展示-->
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
    </my-proplat>
</template>

<script>
    import MyBlock from "../../../components/MyBlock";
    import MyProplat from "../../../components/MyProplat";
    import {overAllData,  getPolyline, dataZoom} from "../data/index"
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
            MyProplat
        },
        data() {
            return {
                // 整体看板数据
                overAllData: [],
                // 获取整体数据的 请求参数
                options: {
                    city: "",
                    time: null, // 天
                    timeType: null, // statisticsTime   // 下 对比时间
                    endRange: [new Date(new Date().setDate(new Date().getDate() - 1)), new Date(new Date().setDate(new Date().getDate() - 1))],
                    disname: "", // 分销名
                    platType: "business", // card title
                    dateRange: [],

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
            // 全部 按钮事件
            async chooseChannel() {
                this.options.disname = ''
                await this.getOverAllData();
            },
            // 下拉改变事件
            async selechange(e) {
                console.log(e)
                this.options.disname = e
                await this.getOverAllData();
            },
            async getPolyline() {
                try {
                    // 获取 折线图
                    const {dataArr, title, total} = await getPolyline(this)
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
