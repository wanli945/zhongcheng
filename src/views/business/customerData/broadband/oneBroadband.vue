<!--
单宽维系
-->
<template>
    <page page-right="oneBroadband" ref="oneBroadband"></page>
</template>

<script>
    import page from "../infoFlow/index"

    export default {
        name: "oneBroadband",
        components: {
            page
        },
        methods: {
            init() {
                this.$refs['oneBroadband'].init();
            }
        },
    }
</script>

<style scoped>

</style>
