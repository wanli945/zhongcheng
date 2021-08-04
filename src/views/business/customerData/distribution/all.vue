<!--
 --@IDE      : WebStorm
 --@time     : 2020/12/11 15:57
 --@author   : 李艳鹏
 --@Software : app
 --@File     : all.vue
 --@describe : 公共池子
-->
<template>
    <page page-right="all" ref="all"></page>
</template>

<script>
    import page from "./index"

    export default {
        name: "all",
        components: {
            page
        },
        methods: {
            init() {
                this.$refs['all'].init();
            }
        },
        /*activated() {
            let scope = this.$refs['all'].$refs['pageOne'];
            scope.init_activated() && scope.init_query();
        },
        deactivated() {
            let scope = this.$refs['all'].$refs['pageOne'];
            scope.destroyed__()
        }*/
    }
</script>

<style scoped>

</style>
