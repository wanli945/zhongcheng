<!--
 --@IDE      : WebStorm
 --@time     : 2020/12/11 15:58
 --@author   : 李艳鹏
 --@Software : app
 --@File     : oneself
 --@describe : 个人池子
-->
<template>
    <page page-right="oneself" ref="oneself"></page>
</template>

<script>
    import page from "./index"

    export default {
        name: "oneself",
        components: {
            page
        },
        methods: {
            init() {
                this.$refs['oneself'].init();
            }
        },
        /*activated() {
            let scope = this.$refs['oneself'].$refs['pageOne'];
            scope.init_activated() && scope.init_query();
        },
        deactivated() {
            let scope = this.$refs['oneself'].$refs['pageOne'];
            scope.destroyed__()
        }*/

    }
</script>

<style scoped>

</style>
