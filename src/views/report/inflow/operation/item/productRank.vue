<!--
 --@IDE      : WebStorm
 --@time     : 2021/2/8 16:22
 --@author   : 李艳鹏
 --@Software : app
 --@File     : productRank
 --@describe : 商品排行
-->
<template>
    <my-plat title="商品排行">
        <template #content>
            <my-report-table :column-arr="columnArr" :table-data="tableData"
                             :empty-text="emptyText"></my-report-table>
            <!--<el-pagination
                style="text-align: right;font-size: 14px"
                prev-text="< 上一页"
                next-text="下一页 >"
                layout="prev, pager, next"
                :current-page="options.pageCur"
                @current-change="(z)=>options.pageCur=z"
                :total="total">
            </el-pagination>-->
        </template>
    </my-plat>
</template>

<script>
    import MyPlat from "../../../components/MyPlat";

    import {getPromotionData} from "../data/mock"
    import MyReportTable from "../../../components/myReportTable";


    export default {
        name: "productRank",
        components: {MyReportTable, MyPlat},
        data() {
            const columnArr = [
                {label: "商品名称", prop: "product"},
                {label: "数量", prop: "num"},
            ]
            return {
                columnArr,
                options: {
                    city: "",
                    pageCur: 1,
                    dataRange: [],
                    serverName: "",
                    channel: ""
                },
                tableData: [],
                emptyText: "暂无数据",
                total: 0
            }
        },
        props: {
            statisticsTime: String,
            scope: null,
        },
        methods: {
            async init() {
                this.options.pageCur = 1;
                await this.getProductRank();
            },
            async getProductRank() {
                this.options.dataRange = this.scope.options.dataRange;
                this.options.city = this.scope.options.city;
                this.options.serverName = this.scope.options.serverName;
                this.options.channel = this.scope.options.channel;
                this.total = 0;
                try {
                    const {total, dataArr} = await getPromotionData();
                    this.tableData = dataArr;
                    this.total = total || 0;
                    this.emptyText = "暂无数据"
                } catch (e) {
                    this.emptyText = e.message
                    this.tableData = [];
                }
            }
        },
        watch: {
            async "options.pageCur"() {
                await this.getProductRank();
            }
        }
    }
</script>

<style scoped>

</style>
