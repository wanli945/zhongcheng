<template>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane v-for="item of tabList" :label="item.label" :key="item.name"
                         :name="item.name">
                <component class="customerBox" v-if="item.name===activeName" :ref="item.name"
                           :is="item.name"
                           :options="options"></component>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import first from "./editBox/first"
    import second from "./editBox/second"
    import third from "./editBox/third"
    import four from "./editBox/four.vue"
    // import five from "./editBox/five"

    export default {
        name: "editBox",
        components: {
            first,
            second,
            third,
            four,
            // five
        },
        props: {
            options: {
                Object,
                default() {
                    return {
                        workid: 0,
                        index: "",
                        scope: null,
                        type: '',
                        pageList: null
                    }
                }
            }
        },
        data() {
            const page = {
                first: {label: "基本信息", name: "first"},
                second: {label: "提成佣金轨迹（测试）", name: 'second'},
                four: {label: "附件列表", name: "four"},
                third: {label: "工单轨迹", name: "third"},

            };
            let pageError = ""
            const tabList = []
            try {
                for (let item of this.options.pageList) {
                    page[item] && tabList.push(page[item])
                }
                pageError = "无页面信息"
            } catch (e) {
                pageError = "未获取到对应格式的Tabs数值"
            }
            return {
                activeName: "first",
                tabList,
                pageError,
            }
        },
        methods: {
            changeTableState(state) {
                this.$parent.$refs.orderQueryTable.tableData[this.options.index].statos = state
            }
        }
    }
</script>

<style lang="less">
    .customerBox {
        overflow-y: auto;
        overflow-x: hidden;
        height: 100%;

        .el-form {
            display: flex;

            flex-wrap: wrap;
            justify-content: space-between;
            align-items: flex-start;

            .el-form-item {
                width: 45%;
                margin: 0;
                display: flex;
                flex-direction: column;
            }

            .mytextarea {
                width: 100%;
            }

            .el-input.is-disabled .el-input__inner {
                background-color: #F5F7FA;
                border-color: #888888;
                color: #888888;
            }

            .btnBox {
                margin-top: 16px;
                width: 100%;

                .el-form-item__content {
                    display: flex;
                    flex-wrap: wrap;

                    button {
                        margin-bottom: 10px;
                        margin-right: 10px;
                        margin-left: 0;
                    }
                }
            }

            .btnBox2 {
                width: 100%;
                margin-top: 16px;

                .el-form-item__content {
                    text-align: left;
                }
            }

            .el-form-item__label {
                line-height: 50px;
                text-align: left;
            }

            .el-form-item__content {
                text-align: right;
            }

            .el-autocomplete, .el-select {
                width: 100%;
            }

            .el-date-editor.el-input, .el-date-editor.el-input__inner, .el-cascader {
                width: 100% !important;
            }

            .noInput {
                flex-direction: row;
                align-items: center;

                .el-form-item__content {
                    flex-grow: 1;
                    text-align: left;
                    color: #888888;
                }
            }
        }

        .el-tabs__content {
            height: 100%;

            .el-tab-pane {
                height: 100%;
            }
        }
    }
</style>
