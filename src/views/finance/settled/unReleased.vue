<template>
    <my_settle ref="unReleased" statos="待发放"></my_settle>
</template>

<script>
    import my_settle from "./item/index.vue"

    export default {
        name: "unReleased",
        components: {
            my_settle
        },

        methods: {
            init() {
                this.$refs["unReleased"].init()
            }
        }
    }
</script>

<style scoped>

</style>

