<template>
    <div>
        <slot name="body"></slot>
    </div>
</template>

<script>
    export default {
        name: "VueToastPlugin",
        props:{
            name:String
        }
    }
</script>

<style scoped>

</style>
