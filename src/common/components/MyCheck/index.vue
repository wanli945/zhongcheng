<!--
 --@IDE      : WebStorm
 --@time     : 2021/3/22 13:23
 --@author   : 李艳鹏
 --@Software : app
 --@File     : index
 --@describe : describe
-->
<template>
    <div class="button-group">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "index",
        props: {
            array: {
                type: Array,
                require: true,
            }
        }
    }
</script>

<style scoped>

</style>
