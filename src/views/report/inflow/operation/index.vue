<!--
 --@IDE      : WebStorm
 --@time     : 2021/1/29 15:38
 --@author   : 李艳鹏
 --@Software : app
 --@File     : index
 --@describe : 运营报表
-->
<template>
    <el-container style="height: calc(100vh - 120px);padding: 0;">
        <el-header height="50px">
            <my-plat title="" ref="plat" :button-arr="channelArr" @choose="chooseChannel">
                <template #title>
                    <div>
                        <h6 style="line-height: 50px;display: inline-block;font-size: 18px;font-weight: bolder;margin-right: 10px">
                            运营报表</h6>
                        <span class="iconfont icon-dizhi"
                              style="font-size: 34px;vertical-align: middle;color: rgb(204,204,204)"></span>
                        <el-select v-model="options.city" style="display: inline-block">
                            <template v-for="(item,index) in cityArr">
                                <el-option :value="item.value" :label="item.label"
                                           :key="index"></el-option>
                            </template>
                        </el-select>
                    </div>
                </template>
                <template #content>
                </template>
            </my-plat>
        </el-header>
        <el-main style="padding-right: 0">
            <header-box ref="headerBox" :scope="this"></header-box>
            <el-container style="height: calc(100vh - 200px);margin-top: 20px">
                <el-header height="50px" style="display: flex;justify-content: space-between">
                    <query-option-item
                        v-model="options.serverName"
                        :select-list="serverNameArr"
                        type="select"
                        :has-span="false"
                    ></query-option-item>
                    <query-option-item
                        v-model="options.dateRange"
                        is-today
                        type="daterange"
                        label="统计周期"
                    ></query-option-item>
                </el-header>
                <el-main style="padding: 0;">
                    <operation-kan-ban ref="kanBan" :scope="this"></operation-kan-ban>
                    <promotion-analysis ref="promotion" :scope="this"></promotion-analysis>
                    <div style="display: flex;justify-content: space-between">
                        <city-rank style="width: 48%" ref="city" :scope="this"></city-rank>
                        <product-rank style="width: 48%" ref="product" :scope="this"></product-rank>
                    </div>
                </el-main>
            </el-container>
        </el-main>
    </el-container>
</template>

<script>


    import QueryOptionItem from "../../../../common/components/table_page/item";
    import MyPlat from "../../components/MyPlat";

    import {headerData, getCityAndOperation} from "./data/mock"
    import HeaderBox from "./item/headerBox";

    import OperationKanBan from "./item/operationKanBan";
    import PromotionAnalysis from "./item/promotionAnalysis";
    import CityRank from "./item/cityRank";
    import ProductRank from "./item/productRank";
    import {getInfoArr} from "../overall/data";

    export default {
        name: "index",
        components: {
            MyPlat,
            ProductRank,
            CityRank,
            PromotionAnalysis,
            OperationKanBan,
            QueryOptionItem,
            HeaderBox,
        },
        data() {
            return {
                channelArr: [],
                options: {
                    channel: "全部",
                    city: "",
                    serverName: "",
                    dateRange: []
                },
                cityArr: [],
                serverNameArr: [],
                cityObj: {}
            }
        },
        async activated() {
            await this.getInfoArr()
            await this.init()
        },
        methods: {
            async init() {
                await this.getOverAllData();
                await this.getCityAndOperation();
            },
            async getInfoArr() {
                this.channelArr = await getInfoArr(this);
                await this.$refs['plat'].generate(this.channelArr)
            },

            async getCityAndOperation() {
                try {
                    const {optArr} = await getCityAndOperation();
                    const {cityObj, cityArr} = await this.$root.query_city2();
                    this.cityArr = cityArr;
                    this.cityObj = cityObj;
                    this.options.city = cityArr[0] && cityArr[0].value
                    this.serverNameArr = optArr;
                } catch (e) {
                    this.cityArr = [];
                    this.serverNameArr = [];
                }
            },
            async chooseChannel(item) {
                this.options.channel = item.value;
            },
            async getOverAllData() {
                await this.$refs['headerBox'].init();
                await this.getOverAllData2()
            },
            async getOverAllData2() {
                await this.$refs['kanBan'].init();
                await this.$refs['promotion'].init();
                await this.$refs['city'].init();
                await this.$refs['product'].init();
            }
        },
        watch: {
            async "options.channel"() {
                await this.getOverAllData();
            },
            async "options.city"() {
                await this.getOverAllData();
            },
            async "options.serverName"() {
                await this.getOverAllData2();
            },
            async "options.dateRange"() {
                await this.getOverAllData2();
            },
        }
    }
</script>

<style scoped>

</style>
