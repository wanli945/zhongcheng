<!--
 --@IDE      : WebStorm
 --@time     : 2021/1/29 15:36
 --@author   : 李艳鹏
 --@Software : app
 --@File     : index
 --@describe : 整体看板

-->
<template>
    <el-container style="height: calc(100vh - 120px);padding: 0;">
        <el-header height="50px">
            <div style="display: flex;justify-content: space-between">
                <el-select clearable v-model="options.city">
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
                        :clearable="false"
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
                         :statistics-time="options.statisticsTime">
            </performance>
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
            <!--<product-analysis
                ref="productAnalysis"
                :scope="this"
                :statistics-time="options.statisticsTime"
            ></product-analysis>-->
        </el-main>
    </el-container>
</template>

<script>


    import {pickerOptions, getInfoArr} from "./data/index"
    import {headerData} from "./data/mock"
    import QueryOptionItem from "../../../../common/components/table_page/item";
    import MyPlat from "../../components/MyPlat"

    import MyBlock from "../../components/MyBlock";

    import PlatOverAll from "./item/platOverAll";
    import Performance from "./item/performance";
    import cityRank from "./item/cityRank";
    import ProductRank from "./item/productRank";

    // import ProductAnalysis from "./item/productAnalysis";


    export default {
        name: "index",
        components: {
            QueryOptionItem,
            MyPlat,
            // ProductAnalysis,
            ProductRank,
            Performance,
            PlatOverAll,
            MyBlock,
            cityRank
        },
        data() {
            return {
                pickerOptions,
                // 条件
                options: {
                    city: "", // 地市
                    day: new Date(), // 天
                    statisticsTime: "day", // 时间类型
                    dateRange: [new Date(), new Date()],
                },

                //
                headerData: {
                    citySelect: [],
                    dataArr: []
                },
                overAllData: [],
                channelArr: [],
                cityObj: {}
            }
        },
        created() {
            this.init()
        },
        async activated() {
            await this.queryAllPlat();
        },
        methods: {
            async init() {
                await this.getHeader();
                await this.getInfoArr();
            },
            async getInfoArr() {

                // todo 各渠道信息  按钮组的

                this.channelArr = await getInfoArr(this);

                this.$refs["overAll"].$refs['plat'].generate(this.channelArr)
                this.$refs["performance"].$refs['plat'].generate(this.channelArr)
                this.$refs["cityRank"].$refs['plat'].generate(this.channelArr)
                this.$refs["productRank"].$refs['plat'].generate(this.channelArr)
                // this.$refs["productAnalysis"].$refs['plat'].generate(this.channelArr)
            },
            //todo 获取header条件
            async getHeader() {
                try {

                    // todo 查询地市.

                    const {cityObj, cityArr} = await this.$root.query_city2();
                    this.headerData.citySelect = cityArr;
                    this.cityObj = cityObj;
                    this.headerData.dataArr = headerData.dataArr;
                } catch (e) {

                }
            },
            chooseDayTypeClick({name, value}) {
                this.options.statisticsTime = value;
            },
            //查询所有的 plat信息
            async queryAllPlat() {
                await this.$refs["overAll"].init()
                await this.$refs["performance"].init()
                await this.$refs["cityRank"].init()
                await this.$refs["productRank"].init()
                // await this.$refs["productAnalysis"].init()
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
            async "options.city"(value) {
                await this.queryAllPlat();
                // this.$refs["productAnalysis"].options.c3name = "";
                // this.$refs["productAnalysis"].c3nameList = this.cityObj[value]
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
