<!--
 --@IDE      : WebStorm
 --@time     : 2021/1/29 15:37
 --@author   : 李艳鹏
 --@Software : app
 --@File     : index
 --@describe : 商机报表
-->
<template>
    <el-container style="height: calc(100vh - 120px);padding: 0;">
        <el-header height="50px">
            <div style="display: flex;justify-content: space-between">
                <el-select v-model="options.city" clearable>
                    <template v-for="(item,index) in headerData.citySelect">
                        <el-option :value="item.value" :label="item.label" :key="index"></el-option>
                    </template>
                </el-select>
                <div>
                    <query-option-item
                        type="daterange"
                        v-model="options.dateRange"
                        is-today
                        has-span
                        label="统计时间"
                        style="width: 100%"
                    ></query-option-item>
                    <!--<my-plat
                        :title="'统计时间：'+ $util.timestamp(Date.now(),'yyyy-MM-dd')"
                        title-style="font-size: 16px;line-height:40px;"
                        button-style="margin-left:10px"
                        @choose="chooseDayTypeClick"
                        :button-arr="[{name: '日', value: 'day'},{name: '周', value: 'week'},{name: '月', value: 'month'}]">
                        <template #title>
                            <h6 style="font-size: 16px;line-height:50px;">统计时间：</h6>
                            <el-date-picker
                                v-model="options.day"
                                align="right"
                                :type="chooseDayType.type"
                                placeholder="选择日期"
                                :clearable="false"
                                :picker-options="pickerOptions"
                                :format="chooseDayType.format"
                            >
                            </el-date-picker>
                        </template>
                        <template #right>
                            <my-xia-zai></my-xia-zai>
                        </template>
                    </my-plat>-->
                </div>
            </div>
        </el-header>
        <el-main>
            <kan-ban ref="kanBan"
                     :scope="this"
                     :statistics-time="options.statisticsTime"
            ></kan-ban>
            <channel-analysis
                ref="channelAnalysis"
                :scope="this"
                :statistics-time="options.statisticsTime">
            </channel-analysis>
            <performance-analysis
                ref="performanceAnalysis"
                :scope="this"
                :statistics-time="options.statisticsTime"
            ></performance-analysis>
            <city-analysis
                ref="cityAnalysis"
                :scope="this"

                :statistics-time="options.statisticsTime"
            ></city-analysis>
            <effect-analysis
                ref="effectAnalysis"
                :scope="this"

                :statistics-time="options.statisticsTime"
            ></effect-analysis>
        </el-main>
    </el-container>
</template>

<script>
    import {pickerOptions} from "./data/index"

    import {headerData} from "./data/mock"
    import QueryOptionItem from "../../../../common/components/table_page/item";
    import MyPlat from "../../components/MyPlat";
    import MyBlock from "../../components/MyBlock";

    import KanBan from "./item/kanBan";
    import ChannelAnalysis from "./item/channelAnalysis";
    import PerformanceAnalysis from "./item/performanceAnalysis";
    import CityAnalysis from "./item/cityAnalysis";
    import EffectAnalysis from "./item/effectAnalysis";
    import MyXiaZai from "../../components/myXiaZai";

    import {getInfoArr} from "../overall/data";

    export default {
        name: "index",
        components: {
            QueryOptionItem,
            MyBlock,
            MyPlat,
            KanBan,
            ChannelAnalysis,
            PerformanceAnalysis,
            CityAnalysis,
            EffectAnalysis,
            MyXiaZai
        },
        data() {
            return {
                pickerOptions,
                // 条件
                options: {
                    city: "", // 地市
                    day: new Date(), // 天
                    statisticsTime: "day", // 时间类型
                    dateRange: [new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date()],
                },
                headerData: {
                    citySelect: [],
                    dataArr: []
                },
                overAllData: [],
                cityObj: {},
                channelArr: []
            }
        },
        activated() {
            (async () => {
                await this.init();
            })()
        },
        methods: {
            async init() {
                await this.getHeader();
                await this.getInfoArr();
                await this.queryAllPlat();
            },
            /* async getInfoArr() {
                 if (this.channelArr.length === 0) {
                     this.channelArr = await getInfoArr(this);
                 }
                 this.$refs["kanBan"].$refs['plat'].generate(this.channelArr)
                 this.$refs["channelAnalysis"].$refs['plat'].generate(this.channelArr)
                 this.$refs["performanceAnalysis"].$refs['plat'].generate(this.channelArr)
                 this.$refs["cityAnalysis"].$refs['plat'].generate(this.channelArr)
                 this.$refs["effectAnalysis"].$refs['plat'].generate(this.channelArr)
             },*/
            async getInfoArr() {
                this.channelArr = await getInfoArr(this);
                await this.$refs["kanBan"].$refs['plat'].generate(this.channelArr)
                await this.$refs["channelAnalysis"].$refs['plat'].generate(this.channelArr)
                await this.$refs["performanceAnalysis"].$refs['plat'].generate(this.channelArr)
                await this.$refs["cityAnalysis"].$refs['plat'].generate(this.channelArr)
                await this.$refs["effectAnalysis"].$refs['plat'].generate(this.channelArr)
            },
            //todo 获取header条件
            async getHeader() {
                try {
                    const {cityObj, cityArr} = await this.$root.query_city2();
                    this.headerData.citySelect = cityArr;
                    this.cityObj = cityObj;
                    // this.options.city = cityArr[0] && cityArr[0].value
                    this.headerData.dataArr = headerData.dataArr;
                } catch (e) {
                }
            },
            chooseDayTypeClick({name, value}) {
                this.options.statisticsTime = value;
            },
            //查询所有的 plat信息
            async queryAllPlat() {
                await this.$refs["kanBan"].init()
                await this.$refs["channelAnalysis"].init()
                await this.$refs["performanceAnalysis"].init()
                await this.$refs["cityAnalysis"].init()
                await this.$refs["effectAnalysis"].init()
            },
        },
        computed: {
            /*chooseDayType() {
                let ms = "";
                let format = ""
                switch (this.options.statisticsTime) {
                    case "day":
                        ms = 'date';
                        format = "yyyy-MM-dd";
                        break;
                    case "week":
                        ms = 'week';
                        format = "yyyy第WW周";
                        break;
                    case 'month':
                        format = "yyyy年MM月";
                        ms = 'month';
                        break;
                }
                return {
                    type: ms,
                    format
                };
            },*/


        },
        watch: {
            async "options.city"() {
                await this.queryAllPlat();
            },
            /*async "options.day"(value) {
                await this.queryAllPlat();
            },*/
            async "options.statisticsTime"(value) {
                await this.queryAllPlat();
            },
            async "options.dateRange"(value) {
                await this.queryAllPlat();
            },

        }
    }
</script>

<style scoped lang="less">

</style>
