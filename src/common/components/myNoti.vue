<template>
<!--    顶部 重要通知  公告-->
    <div class="notibox" v-show="notifyList.length">
       <span class="title">
           <i class="el-icon-message-solid"></i>
            {{title}}
       </span>
        <el-carousel :interval="5000" arrow="never" height="50" indicator-position="none" loop>
            <el-carousel-item v-for="item in notifyList" :key="item.id"
                              @click.native="openTitle(item)">
                <el-alert
                    :title="item.title"
                    :type="item.type"
                    :closable="false"
                    show-icon>
                    <template #title>
                        <div class="notiTitle">{{item.title}}</div>
                        <!--<el-tooltip class="item" style="overflow: hidden; display: block; white-space: nowrap; text-overflow: ellipsis;"
                                    effect="light" :content="item.title"
                                    placement="top-start">
                            <div class="notiTitle">{{item.title}}</div>
                        </el-tooltip>-->
                    </template>
                </el-alert>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>
    export default {
        name: "myNoti",
        props: {
            title: {
                type: String,
                default: "重要通知"
            },
        },

        data() {
            return {
                notifyList: [],
                timer: null,
                stop: false
            }
        },
        mounted() {
            this.$util.loopTask({
                immediate: true,
                task: this.operaQuery,
                that: this,
                switchFlag: "stop",
                timeout: 1000 * 60
            });
        },
        methods: {
            operaQuery() {
                this.$axios.post("info_chaxun", {}, {
                    showLoading: false,
                    showMessage: false
                }).then(({notiList}) => {
                    this.notifyList = notiList
                });
            },
            openTitle({title, type = "success"}) {
                const h = this.$createElement;
                this.$notify({
                    title: '公告',
                    message: h('div', {style: 'color: teal;text-indent:2em'}, title),
                    type: type,
                    duration: "5000"
                });
            },
            showTop(list = []) {
                list.forEach(({top, title}) => {
                    if (top) {
                        this.openTitle({title})
                    }
                })
            }
        },
        destroyed() {
            this.stop = false;
        }
    }
</script>
<style lang="less">
    .notibox {
        .el-carousel {
            height: 30px;
            background-color: #3a85e1;
            flex-grow: 1;
            align-self: center;
            overflow: hidden;
        }

        .el-carousel__container {
            height: 30px;
        }

        .el-alert {
            padding: 0 20px;
            background-color: #FFFFFF;
            height: 30px;
        }

        .el-alert__content {
            width: 100%;
        }

        .el-alert__title {
            display: block;
            width: 100%;
        }
    }
</style>
<style lang="less" scoped>
    .notibox {
        display: flex;

        .title {
            height: 30px;
            line-height: 30px;
            background-color: rgb(18, 123, 242);
            color: white;
            display: inline-block;
            font-size: 12px;
            padding: 0 10px;
            border-radius: 15px;
            margin: 0 30px 0 20px;
            align-self: center;

        }

        i {
            font-size: 14px;
        }

        .content {
            font-size: 14px;
            line-height: 30px;
        }

        .notiTitle {
            width: 100%;
            word-break: keep-all; /* 不换行 */
            white-space: nowrap; /* 不换行 */
            overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
            text-overflow: ellipsis; /*溢出时显示省略标记...；需与overflow:hidden;一起使用*/
        }
    }
</style>
