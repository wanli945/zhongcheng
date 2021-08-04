<!--
 --@IDE      : WebStorm
 --@time     : 2021/3/5 12:40
 --@author   : 李艳鹏
 --@Software : app
 --@File     : myCache
 --@describe : describe
-->
<template>
    <keep-alive :include="[]">
        <slot name="default"></slot>
    </keep-alive>
</template>

<script>
    export default {
        name: "myCache",
        data() {
            return {}
        },

    }
</script>

<style scoped>

</style>
