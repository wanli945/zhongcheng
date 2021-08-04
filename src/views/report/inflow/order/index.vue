<!--
 --@IDE      : WebStorm
 --@time     : 2021/1/29 15:37
 --@author   : 李艳鹏
 --@Software : app
 --@File     : index
 --@describe : 订单报表
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
            <plat-over-all ref="overAll"
                           :scope="this"
                           :statistics-time="options.statisticsTime"
            ></plat-over-all>
            <performance ref="performance"
                         :scope="this"
                         :statistics-time="options.statisticsTime"
            >
            </performance>
            <channel-kanban
                ref="channelKanban"
                :scope="this"
                :statistics-time="options.statisticsTime"
            ></channel-kanban>
            <city-rank
                ref="cityRank"
                :scope="this"
                :statistics-time="options.statisticsTime"
            ></city-rank>
            <product-rank
                ref="productRank"
                :scope="this"
                :statistics-time="options.statisticsTime"
            ></product-rank>
            <product-analysis
                ref="productAnalysis"
                :scope="this"
                :statistics-time="options.statisticsTime"
            ></product-analysis>
        </el-main>
    </el-container>
</template>

<script>


    import {pickerOptions} from "./data/index"
    import {headerData} from "./data/mock"
    import QueryOptionItem from "../../../../common/components/table_page/item";
    import MyPlat from "../../components/MyPlat";
    import MyBlock from "../../components/MyBlock";

    import PlatOverAll from "./item/orderBoard";
    import Performance from "./item/performanceKanban";
    import cityRank from "./item/cityKanban";
    import ProductRank from "./item/commodityRank";
    import MyXiaZai from "../../components/myXiaZai";
    import ChannelKanban from "./item/channelKanban";
    import ProductAnalysis from "./item/productAnalysis";


    export default {
        name: "index",
        components: {
            MyPlat,
            QueryOptionItem,
            MyBlock,
            PlatOverAll,
            Performance,
            cityRank,
            ProductRank,
            MyXiaZai,
            ChannelKanban,
            ProductAnalysis
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

                //
                headerData: {
                    citySelect: [],
                    dataArr: []
                },

                overAllData: [],
            }
        },
        async activated() {
            await this.init()
        },
        methods: {
            async init() {
                await this.getHeader();
                await this.queryAllPlat();
            },
            //todo 获取header条件
            async getHeader() {
                try {
                    this.headerData.citySelect = headerData.citySelect;
                    this.headerData.dataArr = headerData.dataArr;
                } catch (e) {

                }
            },
            chooseDayTypeClick({name, value}) {
                if (name === "今天") {
                    this.options.day = new Date();
                }
                this.options.statisticsTime = value;
            },
            //查询所有的 plat信息
            async queryAllPlat() {
                await this.$refs["overAll"].init()
                await this.$refs["performance"].init()
                await this.$refs["channelKanban"].init()
                await this.$refs["cityRank"].init()
                await this.$refs["productRank"].init()
                await this.$refs["productAnalysis"].init()
            },
        },
        computed: {
            chooseDayType() {
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
            },


        },
        watch: {
            async "options.city"() {
                await this.queryAllPlat();
            },
            async "options.day"(value) {
                await this.queryAllPlat();
            },
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
