<!--
 --@IDE      : WebStorm
 --@time     : 2020/12/24 15:32
 --@author   : 李艳鹏
 --@Software : app
 --@File     : index
 --@describe : 分销商H5页面信息配置
-->
<template>
    <el-tabs v-model="activeName" @tab-click="tabClick">
        <template v-for="(item,index) of pageArr">
            <el-tab-pane :label="item.label" :name="item.name" :key="index">
                <component :ref="item.name" v-if="activeName===item.name"
                           :is="item.components"></component>
            </el-tab-pane>
        </template>
    </el-tabs>
</template>

<script>
    import first from "./context/first/index.vue"
    import second from "./context/second/index.vue"

    export default {
        name: "index",
        components: {
            first,
            second,
        },
        data() {
            return {
                pageArr: [
                    {name: "first", label: "页面数据配置", components: 'first'},
                    {name: "second", label: "页面图片配置", components: 'second'},
                ],
                activeName: "first",

            }
        },
        methods: {
            init() {
                this.$refs[this.activeName][0].init()
            },
            tabClick(tab) {
                this.activeName = tab.name;
            }
        }

    }
</script>

<style scoped>

</style>
