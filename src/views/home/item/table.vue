
<template>
    <el-container style="padding: 0;">
        <el-table :data="tableData"
                  :empty-text="emptyText"
                  :cell-style="{'text-align':'left','font-size':'16px'}"
                  :header-cell-style="{
                      'text-align':'left',
                      'font-size':'18px',
                      color:'rgb(109, 110, 112)',
                      'background-color': 'rgb(225, 227, 237)'
                      }"
                  max-height="600px"
                  :border="false"
                  @sort-change="sortChange">
            <el-table-column
                type="index">
                <template slot-scope="scope">
                    <div style="height: 22px;width: 22px;border-radius: 50%;color: #FFFFFF;background-color: #F58E72;text-align: center;font-size: 15px">11</div>
                </template>
            </el-table-column>

            <template v-for="(item,index) in columnArr">
                <el-table-column v-if="item.prop !== 'rate'" :prop="item.prop" :label="item.label" :key="index" :sortable="item.sortable ? item.sortable : false"
                                 :min-width="item.width"></el-table-column>
                <el-table-column v-else :prop="item.prop" :label="item.label" :key="index">
                    <template slot-scope="scope">
                        <el-progress :text-inside="true" :stroke-width="24" :percentage="11.22" :color="color"></el-progress>
                    </template>
                </el-table-column>
            </template>
        </el-table>

    </el-container>
</template>

<script>
    export default {
        name: "homeTable",
        props: {
            tableData: {type: Array, required: true},
            columnArr: {type: Array, required: true},
            emptyText: {type: [String, undefined]},
        },

        data() {
            return {
                color: '#F58E72'
            }
        },
        methods: {
            sortChange(c,p,o) {
                this.$emit('sortChange',c,p,o)
            }
        },
        watch: {

        }
    };
</script>
<style scoped lang="less">
.cell {
    div {
        color: pink;

    }
}
</style>
