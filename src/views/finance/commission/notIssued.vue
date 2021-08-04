<template>
    <item statos="未发放" ref="notIssued"></item>
</template>

<script>
    import item from "./item/index";

    export default {
        name: "notIssued",
        components: {
            item,
        },
        methods: {
            init() {
                this.$refs['notIssued'].init()
            }
        }
    }
</script>

<style scoped>

</style>
