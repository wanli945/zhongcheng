<template>
    <my-settle ref="released" :statos="'已发放'"></my-settle>
</template>

<script>
    import MySettle from "./item/index";

    export default {
        name: "released",
        components: {MySettle},

        methods: {
            init() {
                this.$refs["released"].init()
            }
        }
    }
</script>

<style scoped>

</style>
