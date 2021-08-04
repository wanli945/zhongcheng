<template>
    <div>
        <template v-if="!container">
            <!--条件盒子-->
            <div class="params-box" style="transition: height ease-in-out .5s"
                 :style="{height: currOptionHeight,overflow:'hidden'}">
                <slot name="paramsList">
                    <!--查询列表-->
                </slot>
            </div>
            <!--按钮盒子-->
            <div class="btn-box" style="margin-bottom: 10px;">
                <div>
                    <slot name="left_btn"></slot>
                </div>
                <div>
                    <el-button type="primary"
                               v-if="showFold"
                               @click="changeHeight"
                               :icon="folded ? 'el-icon-caret-bottom':'el-icon-caret-top'">
                        {{folded ? "展开":"折叠" }}
                    </el-button>
                    <slot name="right_btn"></slot>
                </div>
            </div>
            <!--状态的选择-->
            <div class="orderType" v-if="status instanceof Array">
                <el-badge v-for="(item) in status"
                          :value="item.num"
                          :key="item.id"
                          class="item">
                    <el-button @click="statusClick(item.label)" size="small">{{item.label}}
                    </el-button>
                </el-badge>
            </div>
            <!--table 主体部分-->
            <div>
                <slot name="body"></slot>
            </div>
            <!--分页部分-->
            <slot name="pagination">
                <el-pagination
                    v-if="pagination"
                    style="margin-top:30px;"
                    @size-change="pageSizeChange"
                    @current-change="pageCurrentChange"
                    :page-sizes="[10,20,30,50]"
                    :page-size="pageSize"
                    :current-page="currentPage"
                    layout="total,sizes, prev, pager, next, jumper,->"
                    :total="total">
                </el-pagination>
            </slot>
            <!--其他部分-->
            <slot name="other">
            </slot>
        </template>
        <template v-else>
            <!--条件盒子-->
            <el-container :style="containerStyle.style">
                <el-header :height="parseInt(currOptionHeight)"
                           :style="containerStyle.header.style">
                    <div class="params-box">
                        <slot name="paramsList">
                            <!--查询列表-->
                        </slot>
                    </div>
                    <!--按钮盒子-->
                    <div class="btn-box">
                        <div>
                            <slot name="left_btn"></slot>
                        </div>
                        <div>
                            <slot name="right_btn"></slot>
                        </div>
                    </div>
                    <!--状态的选择-->
                    <div class="orderType" v-show="status">
                        <el-badge v-for="(item) in status"
                                  :value="item.num"
                                  :key="item.id" class="item">
                            <el-button @click="statusClick(item.label)" size="small">
                                {{item.label}}
                            </el-button>
                        </el-badge>
                    </div>
                </el-header>
                <!--table 主体部分-->
                <el-main :style="containerStyle.main.style">
                    <slot name="body"></slot>
                </el-main>
                <!--分页部分-->
                <el-footer :height="containerStyle.footer.height"
                           :style="containerStyle.footer.style">
                    <slot name="pagination">
                        <el-pagination
                            style="padding: 0;"
                            @size-change="pageSizeChange"
                            @current-change="pageCurrentChange"
                            :page-sizes="[10, 20, 30,50]"
                            :page-size="pageSize"
                            :current-page="currentPage"
                            layout="total,sizes, prev, pager, next, jumper,->"
                            :total="total">
                        </el-pagination>
                    </slot>
                </el-footer>

                <!--其他部分-->
                <slot name="other"></slot>
            </el-container>
        </template>
    </div>
</template>
<script>
    export default {
        name: "table_page",
        props: {
            /*
            * 状态 栏
            * */

            containerStyle: {
                type: Object,
                default() {
                    return {
                        style: "",
                        header: {
                            height: '80px',
                            style: 'padding:0'
                        },
                        footer: {
                            height: '80px',
                            style: 'padding:0'
                        },
                        main: {
                            style: 'calc(100vh - 100px);'
                        }
                    }
                }
            },
            container: {
                type: Boolean,
                default: false
            },
            status: {
                type: [Array, Boolean],
                default: false
            },
            /*
            *
            *  一页多少个
            * */
            pageSize: {
                default: 10,
                type: [Number, String]
            },
            /*
            *
            * 当前页
            * */
            currentPage: {
                default: 1,
                type: [Number, String]
            },
            /*
            * 一共多少个
            * */
            total: {
                default: 0,
                type: [Number, String]
            },
            pagination: {
                type: Boolean,
                default: true
            },
            showFold: {
                type: Boolean,
                default: true
            }
        },
        data() {
            let currOptionHeight = "auto";
            if (this.container) {
                currOptionHeight = this.containerStyle.header.height
            }
            return {
                currOptionHeight,
                folded: false
            }
        },
        mounted() {

        },
        methods: {
            /*
            * 点击状态
            * */
            statusClick(status) {
                this.$emit("status-click", status)
            },
            /*
            *
            * 个数的改变触发
            * */
            pageSizeChange(pageSize) {
                this.$emit("size-change", pageSize)
            },
            /*
            * 页面发生变化触发
            *
            * */
            pageCurrentChange(curPage) {
                this.$emit("current-change", curPage)
            },
            changeHeight() {
                this.folded = !this.folded;
                if (this.folded) {
                    this.currOptionHeight = "50px"
                } else {
                    if (this.container) {
                        this.currOptionHeight = this.containerStyle.header.height
                    } else {
                        this.currOptionHeight = "auto"
                    }
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .params-box {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        user-select: none;
    }

    .btn-box {
        display: flex;
        justify-content: space-between;
    }

    .orderType {
        display: flex;
        margin-top: 20px;
        flex-wrap: wrap;

        .item {
            margin-right: 15px;
            margin-left: 15px;
            margin-bottom: 10px;
        }
    }
</style>
