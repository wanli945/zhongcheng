<template>
    <el-row type="flex" justify="space-between">
        <el-col :span="11">
            <el-row>
                <el-col :span="3">

                </el-col>
            </el-row>
        </el-col>
        <el-col :span="11">

        </el-col>
    </el-row>
</template>
<script>
    export default {
        name: "second",
        data() {
            return {}
        },
        beforeCreate() {
            this.$root.dataManage.second = this;
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.operate('select')
            },
            operate(method, option, ok = false) {
                this[`operate_${method}`](option, ok)
            },
            operate_insert() {
            },
            operate_delete() {
            },
            operate_update() {
            },
            operate_select() {
            },
        }
    }
</script>

<style lang="less" scoped>

</style>
