<!--
      外呼整体看板

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
            <service-Rank ref="serviceRank"
                          :scope="this"
                          :statistics-time="options.statisticsTime"
            ></service-Rank>
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

        </el-main>
    </el-container>
</template>

<script>


    import {pickerOptions, getInfoArr, headerData} from "./data/index"
    import QueryOptionItem from "../../../../common/components/table_page/item";
    import MyPlat from "../../components/MyPlat"

    import MyBlock from "../../components/MyBlock";

    import PlatOverAll from "./item/platOverAll";
    import Performance from "./item/performance";
    import cityRank from "./item/cityRank";
    import ProductRank from "./item/productRank";
    import serviceRank from "./item/serviceRank"



    export default {
        name: "index",
        components: {
            QueryOptionItem,
            MyPlat,
            ProductRank,
            Performance,
            PlatOverAll,
            MyBlock,
            cityRank,
            serviceRank
        },
        data() {
            return {
                pickerOptions,
                // 条件
                options: {
                    city: "", // 地市
                    day: new Date(), // 天
                    statisticsTime: "day", // 时间类型
                    dateRange: [new Date(), new Date()], // 统计时间
                },

                //
                headerData: {
                    citySelect: [],
                    dataArr: []
                },
                overAllData: [],
                productArr: [],
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

                // todo 各 产品数组

                this.productArr = await getInfoArr(this);

                this.$refs["overAll"].$refs['plat'].generate(this.productArr)
                this.$refs["performance"].$refs['plat'].generate(this.productArr)
                this.$refs["cityRank"].$refs['plat'].generate(this.productArr)
                this.$refs["productRank"].$refs['plat'].generate(this.productArr)
                this.$refs["serviceRank"].$refs['plat'].generate(this.productArr)
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
                await this.$refs["serviceRank"].init()
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
