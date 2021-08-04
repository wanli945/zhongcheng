<template>
    <el-tabs v-model="activeName">
        <el-tab-pane v-for="item of tabsList" :label="item.label" :key="item.components"
                     :name="item.components">
            <component style="height: calc(100vh - 174px)" :ref="item.components"
                       v-if="item.components===activeName && tabShow"
                       :is="item.components"></component>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import first from "./item/first.vue"
    import second from "./item/second.vue"

    export default {
        name: "index",
        data() {
            return {
                tabShow: true,
                activeName: "first",
                tabsList: [
                    {components: "first", label: "部门"},
                    {components: "second", label: "角色"},
                ]
            }
        },
        methods: {
            init() {
                this.tabShow = false;
                setTimeout(z => {
                    this.tabShow = true;
                }, 0);
            },
        },
        components: {
            first,
            second,
        }
    }
</script>

<style scoped>

</style>
