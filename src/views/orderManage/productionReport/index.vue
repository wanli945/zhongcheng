<!--
 --@IDE      : WebStorm
 --@time     : 2021/2/18 9:25
 --@author   : 李艳鹏
 --@Software : app
 --@File     : index
 --@describe : 生产报表
-->
<template>
    <page container :pagination="false" :container-style="pageStyle">
        <template #paramsList>
            <query-option-item label="下单时间" type="daterange"
                               v-model="options.timeArr"></query-option-item>
        </template>
        <template #body>
            <template v-for="(value,key,index) of pageItemObj">
                <item-table style="margin-bottom: 50px" :table-columns="value.columns"
                            :table-data="value.data"
                            :key="index"></item-table>
            </template>
        </template>
    </page>
</template>

<script>
    import page from "../../../common/components/table_page/index";
    import QueryOptionItem from "../../../common/components/table_page/item";
    import ItemTable from "./components/itemTable";
    import {getData} from "./data/index"

    export default {
        name: "index",
        data() {
            return {
                pageStyle: {
                    style: 'height:calc(100vh - 110px);padding:0',
                    header: {
                        height: '50px',
                        style: 'padding:0'
                    },
                    footer: {
                        height: '0px',
                        style: 'padding:0;display:none'
                    },
                    main: {
                        style: ""
                    }
                },
                options: {
                    timeArr: [new Date(), new Date()]
                },
                pageItemObj: {}

            }
        },
        components: {
            ItemTable,
            QueryOptionItem,
            page
        },
        activated() {
            this.init();
        },
        methods: {
            async init() {
                await this.getTableAllData();
            },
            async getTableAllData() {
                try {
                    const data = await getData(this);
                    this.$set(this, "pageItemObj", data)
                } catch (e) {

                }
            }
        },
        watch: {
            async "options.timeArr"() {
                await this.getTableAllData();
            }
        }

    }
</script>

<style scoped>

</style>
