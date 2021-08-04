<!--
 --@IDE      : WebStorm
 --@time     : 2021/2/8 9:14
 --@author   : 李艳鹏
 --@Software : app
 --@File     : headerItem
 --@describe : describe
-->
<template>
    <el-card class="headerItem" body-style="padding:0 30px 10px;">
        <template #header>
            <h6 style="font-size: 20px;font-weight: bolder;text-indent: 1em">{{title}}</h6>
        </template>
        <ul class="ulHeader">
            <template v-for="(item,index) of rangeData">
                <li :key="index">{{item.name}}：{{item.num}}</li>
            </template>
        </ul>
    </el-card>
</template>

<script>
    export default {
        name: "headerItem",
        props: {
            title: String,
            rangeData: {
                type: Array,
                default() {
                    return [{
                        name: "",
                        num: 0
                    }]
                }
            }
        }
    }
</script>
<style lang="less">
    .headerItem {
        .el-card__header {
            padding: 14px 20px 0;
        }
    }
</style>
<style scoped lang="less">
    .ulHeader {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: self-start;
        flex-wrap: wrap;
        height: 160px;
        padding-bottom: 10px;

        li {
            list-style: none;
            line-height: 40px;
            font-size: 16px;
        }
    }
</style>
