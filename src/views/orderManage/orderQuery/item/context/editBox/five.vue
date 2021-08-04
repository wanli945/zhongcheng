<template>
    <div>
        <el-form>
            <el-form-item class="noInput" label="7工单">
                <el-input :value="bss7.isaleorder"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: "five",
        props: {
            options: Object
        },
        data() {
            return {
                bss7: {
                    id: 0,
                    isaleorder: '7154265897551333'
                }
            }
        }
    }
</script>

<style scoped>

</style>
