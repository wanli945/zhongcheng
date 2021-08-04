<template>
    <item statos="已发放" ref="issued"></item>
</template>

<script>
    import item from "./item/index";

    export default {
        name: "issued",
        components: {
            item,
        },
        methods: {
            init() {
                this.$refs['issued'].init()
            }
        }
    }
</script>

<style scoped>

</style>
