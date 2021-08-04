<!--
 --@IDE      : WebStorm
 --@time     : 2020/12/15 17:32
 --@author   : 李艳鹏
 --@Software : app
 --@File     : messBox
 --@describe : 消息盒子的显示
-->
<template>
    <transition name="fade">
        <el-container v-show="parent.messBox.show" class="box">
            <el-header class="boxHeader">
                <div class="listDrop">
                    <el-dropdown trigger="click">
                            <span class="el-dropdown-link">{{curMessType}}<i
                                class="el-icon-caret-bottom el-icon--right"></i></span>
                        <el-dropdown-menu slot="dropdown">
                            <template v-for="(item,index) of Object.keys(dataTest)">
                                <el-dropdown-item :key="index"
                                                  @click.native="switchCurData(item)">
                                    <span>{{item}}</span>
                                    <el-badge class="mark" :value="dataTest[item].length"/>
                                </el-dropdown-item>
                            </template>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <span @click="parent.messBox.show=false" class="el-icon-close"></span>
            </el-header>
            <el-main style="padding-top: 4px">
                <template v-for="(item,index) in curData">
                    <el-card class="messBoxCard" :body-style="{ padding: '0px' }" shadow="never"
                             :key="item.id + curMessType.length">
                        <template #header>
                            <h3 v-show="curMessType.trim()==='所有消息'">{{item.type}}</h3>
                        </template>
                        <div style="padding: 14px;">
                            <div class="messBoxCardmess">{{item.message}}</div>
                        </div>
                    </el-card>
                </template>
            </el-main>
        </el-container>
    </transition>
</template>
<script>
    export default {
        name: "messBox",
        data() {
            const parent = this.$root.main.index
            return {
                parent: parent,
                curMessType: "所有消息",
                dataTest: this.$root.main.index.messBox.data,
                curData: []
            }
        },
        created() {
            this.curData = []
        },
        methods: {
            switchCurData(value) {
                this.curData = [];
                this.curMessType = value
                this.curData.push(...this.dataTest[value])
            }
        }
    }
</script>

<style lang="less">
    .messBoxCard {
        margin-top: 10px;

        &:first-child {
            margin-top: 0;
        }

        .el-card__header {
            padding: 0;
            padding-left: 10px;

            h3 {
                font-weight: bold;
                line-height: 34px;
            }
        }

        .messBoxCardmess {
            font-size: 14px;
            line-height: 26px;
        }

        .time {
            font-size: 12px;

            span {
                color: #999;
            }

        }
    }
</style>

<style scoped lang="less">
    @keyframes fadeA {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes fadeB {
        0% {
            height: 0;
        }
        100% {
            height: 500px;
        }
    }

    .fade-enter-active {
        animation: fadeB .5s;
    }

    .fade-leave-active {
        animation: fadeB .5s reverse;
    }

    .box {
        background: white;
        position: fixed;
        z-index: 1000;
        border: 1px #8e9cde solid;
        right: 10px;
        bottom: 10px;
        height: 500px;
        width: 500px;
    }

    .boxHeader {
        height: 50px;
        line-height: 50px;
        background: #8e9cde;
        padding: 0 20px;
        font-size: 18px;
        color: #fff;
        display: flex;
        justify-content: space-between;

        .listDrop {
            .el-dropdown-link {
                font-size: 20px;
                color: white;
                line-height: 52px;
            }
        }

        span:last-child {
            font-size: 30px;
            line-height: 50px;
            cursor: pointer;
        }
    }

    .messContent {

    }


</style>

