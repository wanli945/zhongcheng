<!--
 --@IDE      : WebStorm
 --@time     : 2020/12/11 16:12
 --@author   : 李艳鹏
 --@Software : app
 --@File     : management
 --@describe : 管理员池子
-->
<template>
    <page page-right="managementB" ref="managementB"></page>
</template>

<script>
    import page from "./index"

    export default {
        name: "managementB",
        components: {
            page
        },
        methods: {
            init() {
                this.$refs['managementB'].init();
            }
        },
        /*activated() {
            let scope = this.$refs['management'].$refs['pageOne'];
            scope.init_activated() && scope.init_query();
        },
        deactivated() {
            let scope = this.$refs['management'].$refs['pageOne'];
            scope.destroyed__()
        }*/
    }
</script>

<style scoped>

</style>
