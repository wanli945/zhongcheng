<!--// 资料配置 组件-->
<template>
    <el-tabs v-model="activeName">
        <el-tab-pane v-for="item of tabsList" :label="item.label" :key="item.components"
                     :name="item.components">
            <component :ref="item.components" v-if="item.components===activeName && tabShow"
                       :is="item.components"></component>
        </el-tab-pane>
    </el-tabs>
</template>

<script>

    import third from "./item/third.vue"
    import five from "./item/five.vue"
    import six from "./item/six.vue"

    export default {
        name: "index",
        data() {
            return {
                tabShow: true,
                activeName: "third",
                tabsList: [
                    /*{components: "first", label: "字段配置"},
                    {components: "second", label: "客户模板"},*/
                    {components: "third", label: "工单流模板"},

                    {components: "five", label: "渠道设置"},
                    {components: "six", label: "地市设置"},
                ]
            }
        },
        beforeCreate() {
            this.$root.dataManage.index = this;
        },
        methods: {
            init() {
                this.tabShow = false;
                setTimeout(z => {
                    this.tabShow = true;
                }, 0);
            }
        },
        components: {
            /*first: c => import("./item/first.vue"),
            second: c => import("./item/third.vue"),*/
            third,
            five,
            six,
        }
    }
</script>

<style scoped>

</style>
