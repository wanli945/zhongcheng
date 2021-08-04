<template>
    <my-settle ref="failurePending" :statos="'审核失败'"></my-settle>
</template>

<script>
    import MySettle from "./item/index";

    export default {
        name: "failurePending",
        components: {MySettle},
        methods: {
            init() {
                this.$refs["failurePending"].init()
            }
        }
    }
</script>

<style scoped>

</style>
