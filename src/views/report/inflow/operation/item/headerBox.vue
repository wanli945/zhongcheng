<!--
 --@IDE      : WebStorm
 --@time     : 2021/2/8 9:24
 --@author   : 李艳鹏
 --@Software : app
 --@File     : headerBox
 --@describe : 头部信息
-->
<template>
    <div class="box">
        <template v-for="(item,index) in headerBox">
            <header-item class="boxItem" :title="item.title" :key="index"
                         :range-data="item.data"></header-item>
        </template>
    </div>
</template>

<script>
    import HeaderItem from "../../../components/headerItem.vue"
    import {getHeaderBox} from "../data/mock"

    export default {
        name: "headerBox",
        components: {
            HeaderItem,
        },
        props: {
            scope: {
                type: Object,
                default() {
                    return null
                }
            }
        },
        data() {
            return {
                options: {
                    city: "",
                    channel: ""
                },
                headerBox: []
            }
        },
        methods: {
            async init() {
                await this.getHeaderBox();
            },

            async getHeaderBox() {
                try {
                    this.options.city = this.scope.options.city;
                    this.options.channel = this.scope.options.channel;
                    this.headerBox = await getHeaderBox();
                } catch (e) {
                    console.log(e)
                }
            },
        }
    }
</script>

<style scoped lang="less">
    .box {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }

    .boxItem {
        width: 30%;
        background-color: rgb(242, 242, 242);
    }
</style>
