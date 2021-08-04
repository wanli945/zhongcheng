<!--
 --@IDE      : WebStorm
 --@time     : 2021/2/18 14:20
 --@author   : 李艳鹏
 --@Software : app
 --@File     : five
 --@describe : 渠道配置
-->
<template>
    <el-container style="padding: 0;height: calc(100vh - 164px)">
        <el-aside width="400px" style="padding: 0; margin-right: 40px">
            <el-container style="padding: 0;height: calc(100vh - 164px)">
                <el-header height="40px" style="text-align: right;padding: 0;">
                    <el-button size="mini" type="primary" @click="getChannel('')">刷新
                    </el-button>
                    <el-button size="mini" type="success" @click="operate_insertC2">新增</el-button>
                </el-header>
                <el-main style="padding: 0;">
                    <el-table ref="leftTable"
                              :show-header="false"
                              :data="channelData"
                              :border="false"
                    >
                        <!-- 渠道列-->
                        <el-table-column prop="channel"></el-table-column>
                        <el-table-column width="200">
                            <template slot-scope="prop">
                             <!-- 左table 右按钮-->
                                <div style="text-align: right">
                                    <el-button size="mini" type="warning" icon="el-icon-view"
                                               @click="switchChannel(prop.row.channel)"
                                               circle></el-button>
                                    <template
                                        v-if="!~['信息流','万号','电商平台','终端外呼','分销商'].indexOf(prop.row.channel)">
                                        <!--todo 修改一级级渠道-->
                                        <!--<el-button size="mini" type="success" icon="el-icon-edit"
                                                   @click="operate_updateC2(prop.row)"
                                                   circle></el-button>-->

                                        <!--todo 删除一级渠道-->
                                        <!--<el-button size="mini" type="primary" icon="el-icon-delete"
                                                   @click="operate_deleteC2(prop.row)"
                                                   circle></el-button>-->
                                    </template>

                                    <el-button size="mini" type="danger" icon="el-icon-plus"
                                               @click="operate_insertC3(prop.row)"
                                               circle></el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-main>
            </el-container>
        </el-aside>
        <el-main style="padding: 0;">
            <el-container style="padding: 0;height: calc(100vh - 164px)">
                <el-header height="40px" style="padding: 0;">
                    <h3 style="line-height: 40px;font-size: 20px;font-weight: bolder">
                        {{curChannel}}</h3>
                </el-header>
                <el-main style="padding: 0;">
                    <el-table :data="curChannelArr"
                              style="width: 100%;cursor: pointer;"
                              :header-cell-style="{'text-align':'center','background-color':'rgba(193, 206, 214, 1)','fontSize':'14px',color:'black',fontWeight:600}"
                              :cell-style="{'text-align':'center'}"
                    >
                        <el-table-column prop="channelId" label="渠道编号"
                                         width="100"></el-table-column>
                        <el-table-column prop="channelName" label="渠道名称"></el-table-column>
                        <!-- <el-table-column prop="createTime" label="创建时间"></el-table-column>-->
                        <el-table-column label="操作" width="200">
                            <template slot-scope="prop">
                                <!--todo 修改二级渠道-->
                                <!--<el-button size="small" type="success" icon="el-icon-edit"
                                           @click="operate_updateC3(prop.row)"
                                           circle></el-button>-->
                                <!--<template v-if=" !~['信息流','万号','电商平台','终端外呼','分销商'].indexOf(curChannel) || prop.$index">
                                    <el-button size="small" type="primary" icon="el-icon-delete"
                                               @click="operate_deleteC3(prop.row)"
                                               circle></el-button>
                                </template>-->
                                <el-button size="small" type="primary" icon="el-icon-delete"
                                           @click="operate_deleteC3(prop.row)"
                                           circle></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-main>
            </el-container>
        </el-main>
    </el-container>
</template>

<script>
    import {
        getChannel,
        c2Insert,
        c2Update,
        c2Delete,
        c3Insert,
        c3Delete,
        c3Update
    } from "../data/five"

    export default {
        name: "five",
        data() {
            return {
                channelData: [],
                curChannelObj: {},
                // 渠道数组
                curChannelArr: [],
                // 一级渠道
                curChannel: ""
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.getChannel();
            },
            async getChannel(channel) {
                try {
                    const {channelData, curChannelObj} = await getChannel(this)
                    this.channelData = channelData;
                    this.curChannelObj = curChannelObj;
                    channelData[0] && await this.switchChannel(channel || channelData[0].channel)
                } catch (e) {
                }
            },
            //  todo 显示二级渠道按钮
            async switchChannel(channel) {
                this.curChannel = channel;
                this.curChannelArr = this.curChannelObj[channel]
            },
            operate_insertC2() {
                this.$prompt("新增一级渠道",
                    "提示", {
                        closeOnClickModal: false,
                        closeOnPressEscape: false,
                        type: "info",
                        inputPlaceholder: "请输入一级渠道名称",
                        inputValidator: (message = "") => {
                            try {
                                if (message.trim()) {
                                    return true
                                }
                            } catch (e) {
                            }
                            return "请输入渠道名"
                        },
                        beforeClose: (action, instance, done) => {
                            if (action === "confirm") {
                                c2Insert(this, instance.inputValue).then(value => {
                                    done();
                                    this.getChannel(instance.inputValue)
                                }).catch(error => {
                                })
                            } else {
                                done()
                            }
                        }
                    })
            },
            operate_updateC2({channel, id}) {
                this.$prompt("修改一级渠道 " + channel,
                    "提示", {
                        closeOnClickModal: false,
                        closeOnPressEscape: false,
                        type: "info",
                        inputValue: channel,
                        inputPlaceholder: "请输入一级渠道名称",
                        inputValidator: (message = "") => {
                            try {
                                if (message.trim()) {
                                    return true
                                }
                            } catch (e) {
                            }
                            return "请输入渠道名"
                        },
                        beforeClose: (action, instance, done) => {
                            if (action === "confirm") {
                                c2Update(this, instance.inputValue, id).then(value => {
                                    done();
                                    this.getChannel(instance.inputValue)
                                }).catch(error => {

                                })
                            } else {
                                done()
                            }
                        }
                    })
            },
            operate_deleteC2({channel, id}) {
                this.$alert("是否删除一级渠道" + channel, "提示（对应的二级渠道也会被删除）", {
                    beforeClose: (action, instance, done) => {
                        if (action === "confirm") {
                            c2Delete(this, channel, id).then(value => {
                                done();
                                this.getChannel()
                            })
                        } else {
                            done()
                        }
                    }
                })
            },

            operate_insertC3({channel, id}) {
                this.$prompt(`新增（${channel}）的二级渠道`,
                    "提示", {
                        closeOnClickModal: false,
                        closeOnPressEscape: false,
                        type: "info",
                        inputValue: "",
                        inputPlaceholder: "请输入二级渠道名称",
                        inputValidator: (message = "") => {
                            try {
                                if (message.trim()) {
                                    return true
                                }
                            } catch (e) {
                            }
                            return "请输入二级渠道名"
                        },
                        beforeClose: (action, instance, done) => {
                            if (action === "confirm") {
                                c3Insert(this, instance.inputValue, channel).then(value => {
                                    done();
                                    this.getChannel(channel)
                                }).catch(error => {

                                })
                            } else {
                                done()
                            }
                        }
                    })
            },

            operate_updateC3({channelName, channelId}) {
                this.$prompt("修改二级级渠道 " + channelName,
                    "提示", {
                        closeOnClickModal: false,
                        closeOnPressEscape: false,
                        type: "info",
                        inputValue: channelName,
                        inputPlaceholder: "请输入二级渠道名称",
                        inputValidator: (message = "") => {
                            try {
                                if (message.trim()) {
                                    return true
                                }
                            } catch (e) {
                            }
                            return "请输入二级渠道名称"
                        },
                        beforeClose: (action, instance, done) => {
                            if (action === "confirm") {
                                c3Update(this, instance.inputValue, channelId).then(value => {
                                    done();
                                    this.getChannel(this.curChannel);
                                }).catch(error => {

                                })
                            } else {
                                done()
                            }
                        }
                    })
            },
            operate_deleteC3({channelName, channelId}) {
                console.log(...arguments)
                this.$alert("是否删除二级渠道" + channelName, "提示", {
                    beforeClose: (action, instance, done) => {
                        if (action === "confirm") {
                            c2Delete(this, channelName, channelId).then(value => {
                                done();
                                this.getChannel(this.curChannel)
                            })
                        } else {
                            done()
                        }
                    }
                })
            },

        },
        watch: {}
    }
</script>

<style scoped>

</style>
