<template>
    <my-settle ref="pending" :statos="'待审核'"></my-settle>
</template>

<script>
    import MySettle from "./item/index";

    export default {
        name: "pending",
        components: {MySettle},

        methods: {
            init() {
                this.$refs["pending"].init()
            }
        }
    }
</script>

<style scoped>

</style>
