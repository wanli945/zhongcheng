<!--
 --@IDE      : WebStorm
 --@time     : 2021/3/9 11:32
 --@author   : 李艳鹏
 --@Software : app
 --@File     : orderHistory
 --@describe : 历史轨迹的组件
-->
<template>
    <el-container style="height: calc(100vh - 117px)">
        <el-main>
            <el-table
                :data="historyList"
                :cell-style="{'text-align':'center'}"
                :empty-text="historyListMess"
                max-height="650px"
                border
                :header-cell-style="{'text-align':'center','background-color':'rgba(193, 206, 214, 1)','fontSize':'14px',color:'black',fontWeight:600}"
            >
                <template v-for="(item,index) in columnList">
                    <el-table-column :label="item.label" :key="index" :prop="item.prop"
                                     :min-width="item.width"></el-table-column>
                </template>
            </el-table>
        </el-main>
        <el-footer height="50px">
        </el-footer>
    </el-container>
</template>

<script>
    export default {
        name: "orderHistory",
        props: {
            options: {
                type: Object,
                required: true,
                default() {
                    return {
                        workid: "",
                        isitright: 0,
                    }
                }
            },
            columnList: {
                type: Array,
                required: true,
            }
        },
        mounted() {
            this.query();
        },
        data() {
            return {
                historyListMess: '暂无历史轨迹',
                historyList: [],
            }
        },
        methods: {
            query() {
                this.historyListMess = '暂无历史轨迹';
                this.$axios.post('work_historyqueryll', {}, {
                    params: {
                        id: parseInt(this.options.workid),
                        isitright: this.options.isitright
                    },
                    showLoading: false,
                    showMessage: false
                }).then(({historyAll, my_mess}) => {
                    this.historyListMess = '暂无历史轨迹'
                    this.historyList = historyAll;
                }).catch(reason => {
                    this.historyList = [];
                    this.historyListMess = '历史轨迹' + "失败报错：" + reason.message
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .cardBox {
        .reason {
            font-size: 18px;
            padding: 10px 0;
            /*text-indent: 2em;*/
        }

        .state7 {
            font-size: 16px;
            line-height: 50px;
        }

        .operator {
            display: flex;
            flex-direction: column;
            font-size: 14px;
            color: #999999;
        }
    }
</style>


