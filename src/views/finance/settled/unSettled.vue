<template>
    <my-settle ref="unSettled" :statos="'待结算'"></my-settle>
</template>

<script>
    import MySettle from "./item/index";

    export default {
        name: "unSettled",
        components: {MySettle},

        methods: {
            init() {
                this.$refs["unSettled"].init()
            }
        }
    }
</script>

<style scoped>

</style>
