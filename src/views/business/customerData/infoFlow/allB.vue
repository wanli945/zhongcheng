
<template>
    <page page-right="allB" ref="allB"></page>
</template>

<script>
    import page from "./index"

    export default {
        name: "allB",
        components: {
            page
        },
        methods: {
            init() {
                this.$refs['allB'].init();
            }
        },
    }
</script>

<style scoped>

</style>
