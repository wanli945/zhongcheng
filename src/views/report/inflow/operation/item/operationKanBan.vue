<!--
 --@IDE      : WebStorm
 --@time     : 2021/2/8 10:44
 --@author   : 李艳鹏
 --@Software : app
 --@File     : operationKanBan
 --@describe : 运营看板
-->
<template>
    <my-plat title="运营看板" :button-arr="[]">
        <template #right>
            <el-button :disabled="!options.serverName" @click="setGoal"
                       style="display: inline-block;font-size: 20px;margin-right: 10px;line-height: 50px;padding: 0;border: none;"
                       plain>设置目标 <i class="iconfont icon-shezhi"
                                     style="display: inline-block; vertical-align: middle; color: rgb(121,121,121);font-size: 34px;"></i>
            </el-button>
        </template>
        <template #content>
            <el-row type="flex" :gutter="24">
                <el-col :span="18" style="display: flex;flex-wrap: wrap">
                    <template v-for="(item,index) in blockData">
                        <my-block style="width: 25%" :card-data="item" :key="index"></my-block>
                    </template>
                </el-col>
                <el-col :span="6" style="height: 272px;">
                    <v-echarts v-if="showCanvas" :options="echartOption"></v-echarts>
                </el-col>
            </el-row>
        </template>
    </my-plat>
</template>
<script>
    import MyPlat from "../../../components/MyPlat";
    import MyBlock from "../../../components/MyBlock";
    import {getBlockData} from "../data/mock"

    export default {
        name: "operationKanBan",
        components: {MyBlock, MyPlat},
        props: {
            scope: {
                type: Object,
                default: null,
            }
        },
        data() {
            return {
                showCanvas: false,
                blockData: [],
                echartOption: {
                    title: {
                        text: '本月目标：500',
                        left: 'center',
                        bottom: 0,
                        textStyle: {
                            color: '#000'
                        }
                    },
                    tooltip: {
                        trigger: 'item',

                    },
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            center: ['50%', '50%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '20',
                                    fontWeight: 'bold',
                                    formatter: "{b}\n{d}%",
                                }
                            },
                            radius: ["40%", "70%"],
                            data: []
                        }
                    ]
                },
                options: {
                    dateRange: [], // 时间
                    operation: "", // 运营名
                    city: "", // 城市
                    channel: "", // 渠道
                    serverName: ""
                },
                curTotal: 0
            }
        },
        methods: {
            async init() {
                await this.getBlockData();
            },
            async getBlockData() {
                this.showCanvas = false
                try {
                    this.options.city = this.scope.options.city;
                    this.options.channel = this.scope.options.channel;
                    this.options.dateRange = this.scope.options.dateRange;
                    this.options.serverName = this.scope.options.serverName;
                    const {block, fanShaped} = await getBlockData();
                    this.blockData = block;
                    const {data, total} = fanShaped;
                    this.echartOption.series[0].data = data;
                    this.echartOption.title.text = "本月目标：" + total;
                    this.curTotal = total;
                } catch (e) {
                    this.blockData = [];
                    this.echartOption.series[0].data = [];
                    this.echartOption.title.text = e.message;
                } finally {
                    setTimeout(() => {
                        this.showCanvas = true
                    }, 200)
                }
            },
            setGoal() {
                this.$prompt(`给${this.options.serverName}设定目标`, "提示", {
                    inputType: "number",
                    inputValue: this.curTotal,
                    inputValidator: (value) => {
                        if (value <= 0) {
                            return "设定的目标要大于0"
                        }
                        return true;
                    },
                    beforeClose: async (action, instance, done) => {
                        if (action === 'confirm') {
                            try {
                                await this.setGoal_();
                                done();
                            } catch (e) {

                            }
                        } else {
                            done();
                        }
                    }
                })
            },
            async setGoal_(num) {
                try {
                    this.$message({
                        duration: 1500,
                        type: "success",
                        message: "设定目标成功"
                    })
                } catch (e) {

                }
            }
        }
    }
</script>

<style scoped lang="less">

</style>
