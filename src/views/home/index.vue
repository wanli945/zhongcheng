<!--
首页
展示工单统计信息
得数而筹
-->

<template>
    <el-container style="height: calc(100vh - 120px);padding: 0;">
        <el-header height="40px" style="padding: 0;">

            <el-row :gutter="24" type="flex" align="center" justify="space-between">
                <!--                <el-col :span="6">-->
                <!--                    <query-option-item-->
                <!--                        style="width: 100%;margin-bottom: 0;"-->
                <!--                        v-model="condition.time"-->
                <!--                        :has-span="false"-->
                <!--                        type="daterange"-->
                <!--                        index="1"-->
                <!--                    ></query-option-item>-->
                <!--                </el-col>-->
                <el-col :span="6">
                    <el-date-picker
                        v-model="condition.time"
                        type="daterange"
                        align="center"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-col>
                <el-col :span="6">
                    <query-option-item
                        style="width: 100%;margin-bottom: 0;"
                        v-model="condition.channels"
                        :has-span="false"
                        type="cascader"
                        placeholder="请选择渠道"
                        :cascader-props="{ expandTrigger: 'hover',emitPath:true,checkStrictly: true }"
                        :cascader-list="select.channels"
                        index="2"
                        show-all-levels
                        clearable
                    ></query-option-item>
                </el-col>

                <el-col :span="6">
                    <query-option-item
                        style="width: 100%;margin-bottom: 0;"
                        v-model="condition.areas"
                        :has-span="false"
                        type="cascader"
                        :cascader-props="{ expandTrigger: 'hover',emitPath:true,checkStrictly: true }"
                        placeholder="请选择地市"
                        :cascader-list="select.areas"
                        index="3"
                        show-all-levels
                        clearable
                    ></query-option-item>
                </el-col>

                <!--   <el-col :span="4">
                       <el-button size="small" @click="rankQuery" type="primary">刷新</el-button>
                   </el-col>-->
            </el-row>
        </el-header>

        <el-main class="box" style="padding: 0;">
            <!--生产简报-->
            <div class="plat">
                <el-row>
                    <el-col :span="10">
                        <h5>生产简报</h5>
                    </el-col>
                    <!--<el-col :span="12" style="margin-top: 5px">
                        <query-option-item
                                style="width: 100%;margin-bottom: 0;"
                                v-model="condition.staffran.time"
                                :has-span="false"
                                type="daterange"
                                index="1"
                        ></query-option-item>
                    </el-col>-->
                </el-row>

                <div class="content">
                    <!--销售量-->
                    <!-- <div>
                         <span>今日销售额</span>
                         <span>今日订单量</span>
                         <span>昨日订单量</span>
                     </div>-->
                    <div class="pro_brief">
                        <div class="item">
                            <h6>业绩展示</h6>
                            <ul class="item_content">
                                <li v-for="(item,index) of performance" :key="index">
                                    <!--                                    <p @click="toCom(item.num)">{{item.num}}</p>-->
                                    <p>{{item.num}}</p>
                                    <p>{{item.name}}</p>
                                </li>
                            </ul>
                        </div>
                        <div class="item">
                            <h6>代办事项</h6>
                            <ul class="item_content">
                                <li v-for=" (item,index) of agent" :key="index">
                                    <p>{{item.num}}</p>
                                    <p>{{item.name}}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="plat">
                <el-row>
                    <el-col :span="10">
                        <h5>渠道业绩</h5>
                    </el-col>
                    <!--<el-col :span="12" style="margin-top: 5px">
                        <query-option-item
                                style="width: 100%;margin-bottom: 0;"
                                v-model="condition.channel.time"
                                :has-span="false"
                                type="daterange"
                                index="1"
                                @change="channelrankQuery"
                        ></query-option-item>
                    </el-col>-->
                </el-row>
                <div class="content">
                    <v-echarts autoresize :init-options="{renderer: 'canvas',}"
                               :options="channekrank"></v-echarts>
                </div>
            </div>

            <div style="width: 100%">
                <img :src="img" style="width: 100%"/>
            </div>

            <div class="plat" style="width: 100%">
                <el-row>
                    <el-col :span="10">
                        <h5>总工单</h5>
                    </el-col>
                </el-row>
                <div class="content">
                    <v-echarts :init-options="{renderer: 'canvas',}"
                               autoresize
                               :options="staffNum"/>
                </div>
            </div>

            <div class="plat" style="width: 100%">
                <el-row>
                    <el-col :span="10">
                        <h5>销售人员排行</h5>
                    </el-col>
                    <!--<el-col :span="12" style="margin-top: 5px">
                        <query-option-item
                                style="width: 100%;margin-bottom: 0;"
                                v-model="condition.staffran.time"
                                :has-span="false"
                                type="daterange"
                                @change="staffrankQuery"
                                index="1"
                        ></query-option-item>
                    </el-col>-->
                </el-row>
                <div class="content">
                    <v-echarts :init-options="{renderer: 'canvas',}"
                               autoresize
                               :options="staffrank"/>
                </div>
            </div>

            <div class="plat" >
                <el-row>
                    <el-col :span="10">
                        <h5>地市报表</h5>
                    </el-col>
                </el-row>
                <div class="content" style="height: 600px">
                    <my-table :column-arr="columnArr" :table-data="tableData"
                              :empty-text="emptyText">
                    </my-table>
                </div>
            </div>

<!--            <div class="plat" style="width: 100%">-->
<!--                <el-row>-->
<!--                    <el-col :span="10">-->
<!--                        <h5>地市报表</h5>-->
<!--                    </el-col>-->
<!--                    &lt;!&ndash; <el-col :span="12" style="margin-top: 5px">-->
<!--                         <query-option-item-->
<!--                                 style="width: 100%;margin-bottom: 0;"-->
<!--                                 v-model="condition.area.time"-->
<!--                                 :has-span="false"-->
<!--                                 type="daterange"-->
<!--                                 @change="arearankQuery"-->
<!--                                 index="1"-->
<!--                         ></query-option-item>-->
<!--                     </el-col>&ndash;&gt;-->
<!--                </el-row>-->
<!--                <div class="content">-->
<!--                    <v-echarts autoresize :init-options="{renderer: 'canvas',}" width="100%"-->
<!--                               :options="arearank"></v-echarts>-->
<!--                </div>-->
<!--            </div>-->
        </el-main>
    </el-container>
</template>

<script>
    import {mapMutations} from "vuex"
    import QueryOptionItem from "../../common/components/table_page/item";
    import myTable from "./item/table"
    import moment from 'moment'

    let echertOptions = {
        legend: {
            type: 'scroll',
            left: "left",
            top: 'top'
        },
        tooltip: {
            show: true, // 必须引入 tooltip 组件
            trigger: "axis",
            axisPointer: {
                type: 'cross'
            },
        },
        toolbox: {
            feature: {
                saveAsImage: {
                    show: false,
                },
                restore: {
                    show: true,
                    title: '重置'
                },
            }
        },
        dataZoom: [
            {
                type: 'inside',
                show: true,
                rangeMode: ['percent', 'percent'],
                start: 0,
                end: 12,
                handleSize: 8,
                xAxisIndex: 0,
                zoomLock: false,
                orient: 'horizontal',
                preventDefaultMouseMove: true
            }, {
                type: 'slider',
                show: true,
                rangeMode: ['percent', 'percent'],
                start: 0,
                end: 12,
                handleSize: 8,
                xAxisIndex: 0,
                zoomLock: false,
                orient: 'horizontal',
                preventDefaultMouseMove: true
            },
        ]
    };
    export default {
        name: "home",
        components: {
            QueryOptionItem,
            myTable
        },
        data() {
            const columnArr = [
                {
                    label: "地区",
                    prop: "area"
                },

                {
                    label: "销售量",
                    prop: "num"
                },

                {
                    label: "占比",
                    prop: "rate"
                },
            ]
            return {
                img:[
                    require('../../assets/image/dianxin.jpg'),
                ],
                columnArr,
                tableData: [],
                emptyText: "暂无数据",
                channelArr: [],
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            picker.$emit('pick', [start, end]);
                        }
                    },{
                        text: '昨天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', [start, end]);
                        }
                    },{
                        text: '本周',
                        onClick(picker) {
                            const start = new Date();
                            const week = start.getDay() === 0 ?
                                7 : start.getDay()
                            const startTop = new Date(start.getFullYear(),start.getMonth(),start.getDate()-week+1) //开始
                            // const startDowm = new Date(start.getFullYear(),start.getMonth(),start.getDate()+(6-start.getDay()))
                            picker.$emit('pick', [startTop, start]);
                        }
                    },{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    },{
                        text: '上月',
                        onClick(picker) {
                            const start = new Date();
                            const startTop = new Date(start.getFullYear(),start.getMonth(),1) // 本
                            const startDown = new Date(start.getFullYear(),start.getMonth()-1,1) // 上
                            const end = new Date(startTop.getTime()-1000*60*24)
                            // start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [startDown, end]);
                        }
                    }, {
                        text: '本月',
                        onClick(picker) {
                            const start = new Date();
                            const startTop = new Date(start.getFullYear(),start.getMonth(),1)
                            picker.$emit('pick', [startTop, start]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    },{
                        text: '最近六个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                performance: {
                    all: {name: "总工单", num: 0},
                    success: {name: "成功订单", num: 0},
                    submit: {name: "已提交", num: 0},
                    discard: {name: "废弃单", num: 0},
                },
                agent: {
                    accept: {name: "待受理", num: 0},
                    check: {name: "待处理", num: 0},
                    qCheck: {name: "待质检", num: 0},
                    verify: {name: "待核实", num: 0},
                },
                /*条件*/
                condition: {
                    time: [new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date()],
                    channels: [],
                    areas: []
                },
                staffrank: {
                    title: {
                        text: '销售人员排行',
                        show: false,
                        top: 'top',
                        left: 'center'
                    },
                    legend: Object.assign({}, echertOptions.legend),
                    dataset: {
                        source: []
                    },
                    tooltip: Object.assign({}, echertOptions.tooltip, {
                        axisPointer: {
                            type: "shadow",
                            shadowStyle: {
                                shadowColor: 'rgba(0,0,0,.2)'
                            }
                        }
                    }),
                    toolbox: Object.assign({}, echertOptions.toolbox, {
                        feature: Object.assign({}, {
                            /*myReset: {
                                show: false,
                                title: '查询',
                                icon: 'path://M609.376 654.816A239.264 239.264 0 0 1 464 704a240 240 0 1 1 240-240 239.264 239.264 0 0 1-49.472 145.728L790.4 745.6A32 32 0 0 1 768 800a32 32 0 0 1-22.72-9.28l-135.904-135.904zM464 288a176 176 0 1 0 176 176A176.32 176.32 0 0 0 464 288z',
                                onclick: () => {}
                            }*/
                        }, echertOptions.toolbox.feature, {
                            dataView: {
                                show: false,
                                readOnly: true,
                                optionToContent: function (opt) {
                                    /*console.log(opt)*/
                                    const axisData = opt.dataset[0].source;
                                    axisData.sort((x, y) => {
                                        return -(x[1] - y[1])
                                    });
                                    let table = '<table style="width:100%;text-align:center;border-collapse: collapse" border><tbody>'
                                    const column = (arr = [], isd) => {
                                        let text = '<tr>';
                                        if (isd === 'th') {
                                            arr.forEach(value => {
                                                text += `<th style="text-align: center;font-weight: bolder">${value}</th>`
                                            });
                                        } else {
                                            arr.forEach(value => {
                                                text += `<td>${value}</td>`
                                            })
                                        }
                                        return text + `</tr>`
                                    }
                                    axisData.forEach((value, index) => {
                                        if (!index) {
                                            table += column(value, 'th')
                                        } else {
                                            table += column(value, 'td')
                                        }
                                    });
                                    table += '</tbody></table>';
                                    return table;
                                }
                            },
                        }),
                    }),
                    xAxis: {
                        type: 'category',
                        name: '销售员',
                        nameLocation: 'end',
                    },
                    yAxis: {type: 'value', name: '数量', nameLocation: 'end'},
                    series: [
                        {
                            type: 'bar',
                            /*label: {
                                rotate: '72',
                                show: true,
                                position: ['10%', '-10'],
                                textStyle: {
                                    color: '#000'
                                }
                            },*/
                        },
                        {
                            type: 'bar',
                            /* label: {
                                 rotate: '72',
                                 show: true,
                                 position: ['10%', '-10'],
                                 textStyle: {
                                     color: '#000'
                                 }
                             },*/
                        },
                        {
                            type: 'bar',
                            /*label: {
                                rotate: '72',
                                show: true,
                                position: ['10%', '-10'],
                                textStyle: {
                                    color: '#000'
                                }
                            },*/
                        },
                        {
                            type: 'bar', /*label: {
                                rotate: '72',
                                show: true,
                                position: ['10%', '-10'],
                                textStyle: {
                                    color: '#000'
                                }
                            },*/
                        },
                    ],
                    dataZoom: [
                        {
                            type: 'inside',
                            show: true,
                            rangeMode: ['percent', 'percent'],
                            start: 0,
                            end: 100,
                            handleSize: 8,
                            xAxisIndex: 0,
                            zoomLock: false,
                            orient: 'horizontal',
                            moveOnMouseMove: true,
                            preventDefaultMouseMove: false,
                            zoomOnMouseWheel: false,
                        }, {
                            type: 'slider',
                            show: true,
                            rangeMode: ['percent', 'percent'],
                            start: 0,
                            end: 100,
                            xAxisIndex: 0,
                            zoomLock: false,
                            orient: 'horizontal',
                            moveOnMouseMove: true,
                            preventDefaultMouseMove: false,
                            zoomOnMouseWheel: false,
                        },
                    ],
                },
                staffNum: {
                    legend: Object.assign({}, echertOptions.legend),
                    dataset: {
                        source: []
                    },
                    tooltip: Object.assign({}, echertOptions.tooltip, {
                        axisPointer: {
                            type: "shadow",
                            shadowStyle: {
                                shadowColor: 'rgba(0,0,0,.2)'
                            }
                        }
                    }),
                    toolbox: {

                    },
                    xAxis: {
                        type: 'category',
                        name: '日期',
                        nameLocation: 'end',

                    },
                    yAxis: {type: 'value', name: '数量', nameLocation: 'end',

                    },
                    series: [
                        { type: 'line', },
                        { type: 'line', },

                    ],
                    dataZoom: [
                        {
                            type: 'inside',
                            show: true,
                            rangeMode: ['percent', 'percent'],
                            start: 0,
                            end: 100,
                            handleSize: 8,
                            xAxisIndex: 0,
                            zoomLock: false,
                            orient: 'horizontal',
                            moveOnMouseMove: true,
                            preventDefaultMouseMove: false,
                            zoomOnMouseWheel: false,
                        }, {
                            type: 'slider',
                            show: true,
                            rangeMode: ['percent', 'percent'],
                            start: 0,
                            end: 100,
                            xAxisIndex: 0,
                            zoomLock: false,
                            orient: 'horizontal',
                            moveOnMouseMove: true,
                            preventDefaultMouseMove: false,
                            zoomOnMouseWheel: false,
                        },
                    ],
                },
                arearank: {
                    title: {
                        name: "地市报表",
                        show: false,
                        top: 'top',
                        left: 'center'
                    },
                    dataset: {
                        source: []
                    },
                    xAxis: [{
                        type: 'value',
                        axisLine: {show: false},
                        axisTick: {show: false},
                        splitLine: {show: true},
                    }],
                    tooltip: Object.assign({}, echertOptions.tooltip, {
                        trigger: "item",
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            "type": "line" // 默认为直线，可选为："line" | "shadow"
                        }
                    }),
                    toolbox: Object.assign({}, echertOptions.toolbox,
                        {
                            feature: Object.assign({}, {
                                /*myReset: {
                                    show: true,
                                    title: '查询',
                                    icon: 'path://M609.376 654.816A239.264 239.264 0 0 1 464 704a240 240 0 1 1 240-240 239.264 239.264 0 0 1-49.472 145.728L790.4 745.6A32 32 0 0 1 768 800a32 32 0 0 1-22.72-9.28l-135.904-135.904zM464 288a176 176 0 1 0 176 176A176.32 176.32 0 0 0 464 288z',
                                    onclick: () => {
                                        this.arearankQuery()
                                    }
                                },*/
                            }, echertOptions.toolbox.feature, {
                                dataView: {
                                    show: false
                                },
                                restore: {
                                    show: false,
                                    title: '重置'
                                },
                            }),
                        }),
                    grid: [
                        {
                            top: 0,
                            width: '60%',
                            bottom: 0,
                            left: 0,
                            containLabel: true
                        },
                    ],
                    yAxis: [{type: 'category'}],
                    series: [
                        {
                            type: 'bar',
                            barMaxWidth: '25',
                            tooltip: {
                                formatter: ({value, percent}) => {
                                    return `${value[0]}: ${value[1]}`
                                }
                            },
                            itemStyle: {
                                color: 'rgba(255,220,80,.9)'
                            },
                        },
                        {
                            type: 'pie',
                            radius: ['30%', '70%'],
                            center: ['78%', '50%'],
                            avoidLabelOverlap: true,
                            tooltip: {
                                formatter: ({value, percent}) => {
                                    return `${value[0]}:<br/>${value[1]} (${percent}%)`
                                }
                            }
                        }
                    ]
                },
                channekrank: {
                    title: {
                        name: "渠道业绩",
                        show: false,
                        top: 'top',
                        left: 'center'
                    },
                    dataset: {
                        source: []
                    },
                    xAxis: [{
                        type: 'value',
                        axisLine: {show: false},
                        axisTick: {show: false},
                        splitLine: {show: true},
                    }],
                    tooltip: Object.assign({}, echertOptions.tooltip, {
                        trigger: "item",
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            "type": "line" // 默认为直线，可选为："line" | "shadow"
                        }
                    }),
                    toolbox: Object.assign({}, echertOptions.toolbox,
                        {
                            feature: Object.assign({}, {
                                /* myReset: {
                                     show: true,
                                     title: '查询',
                                     icon: 'path://M609.376 654.816A239.264 239.264 0 0 1 464 704a240 240 0 1 1 240-240 239.264 239.264 0 0 1-49.472 145.728L790.4 745.6A32 32 0 0 1 768 800a32 32 0 0 1-22.72-9.28l-135.904-135.904zM464 288a176 176 0 1 0 176 176A176.32 176.32 0 0 0 464 288z',
                                     onclick: () => {
                                         this.channelrankQuery()
                                     }
                                 },*/
                            }, echertOptions.toolbox.feature, {
                                dataView: {
                                    show: false
                                },
                                restore: {
                                    show: false,
                                    title: '重置'
                                },
                            }),
                        }),
                    yAxis: [{type: 'category'}],
                    series: [
                        {
                            type: 'bar',
                            barMaxWidth: '25',
                            tooltip: {
                                formatter: ({value, percent}) => {
                                    return `${value[0]}: ${value[1]}`
                                }
                            },
                        },
                    ]
                },

                select: {
                    areas: [],
                    channels: []
                }
            }
        },
        activated() {
            document.title = "众诚互联网平台管理系统";
            this.init();
        },

        mounted() {
            this.getSelect();
            this.onContextmenuFn();
        },
        methods: {
            async getSelect() {
                this.select.areas = await this.$root.query_city();
                this.select.channels = (await this.$root.query_channel()).channelDict
                this.select.channels.unshift({
                    label:'全部',
                    value:'全部'
                })
            },
            async init() {
                this.rankQuery()
                this.staffAll()
                this.cityReport()
                // await this.queryChannel()
            },
            // async queryChannel() {
            //     const {channelDict} = await this.$root.query_channel();
            //     console.log(channelDict)
            //     channelDict.forEach(v =>{
            //         this.channelArr.push(v.value)
            //     })
            //     console.log(this.channelArr)
            // },
            toCom(num) {
                this._toCom({title: num, options: "", components: "", name: num})
            },
            onContextmenuFn(event) {
                this._addContextMenu([])
            },
            ...mapMutations({
                _toCom: "addTab",
                _addContextMenu: "addContextMenu"
            }),
            rankQuery() {
                this.arearank.dataset.source = [['地区\\数量', '数量']];
                this.channekrank.dataset.source = [['渠道\\数量', '数量']];
                this.staffrank.dataset.source = [['姓名\\数量', '总工单', '已提交', '成功订单', '废弃']]

                this.$axios.post('uploads_workcount', {}, {
                    params: {
                        timeRage: this.condition.time,
                        city: this.condition.areas,
                        channel: this.condition.channels,
                    },
                    showLoading: false
                }).then(({
                             listArea,
                             listChannel,
                             statusNum,
                             listServer
                         }) => {
                    this.arearank.dataset.source = [['地区\\数量', '数量']];
                    this.channekrank.dataset.source = [['渠道\\数量', '数量']];
                    this.staffrank.dataset.source = [['姓名\\数量', '总工单', '已提交', '成功订单', '废弃']];
                    this.arearank.dataset.source.push(...listArea);
                    this.channekrank.dataset.source.push(...listChannel);
                    this.staffrank.dataset.source.push(...listServer);

                    this.staffrank.dataZoom.forEach((value, index) => {
                        this.staffrank.dataZoom[index].end = 800 / listServer.length
                    })

                    const {all, success, submit, discard, accept, check, qCheck, verify} = statusNum;
                    this.performance.all.num = all;
                    this.performance.success.num = success;
                    this.performance.submit.num = submit;
                    this.performance.discard.num = discard;
                    this.agent.accept.num = accept;
                    this.agent.check.num = check;
                    this.agent.qCheck.num = qCheck;
                    this.agent.verify.num = verify;
                })
            },
            //  总工单
            staffAll() {
              this.$axios.post('homepage_businessSinge',{},{
                  params: {
                      timeRage: this.condition.time,
                      city: this.condition.areas,
                      channel: this.condition.channels,
                  },
                  showLoading: false
              }).then(({listPro}) => {
                  this.staffNum.dataset.source = [['日期\\数量', '总工单', '成功订单']]
                  this.staffNum.dataset.source.push(...listPro)
                  this.staffNum.dataZoom.forEach((val, index) => {
                      this.staffNum.dataZoom[index].end = 1500 / listPro.length
                  })
              })
            },
            // 地市
            cityReport() {
                this.tableData = [{
                    num: 20,
                    area: '杭州市',
                    rate: 1.11
                },{
                    num: 55,
                    area: '丽水市',
                    rate: 12.11
                }]
                this.$axios.post('homepage_queryAreas',{},{
                    params: {
                        timeRage: this.condition.time,
                        city: this.condition.areas,
                        channel: this.condition.channels,
                    },
                    showLoading: false
                }).then(({cityArr}) => {
                    // this.tableData = cityArr

                    console.log(this.tableData)
                })
            },
            /*
            * 销售人员排行 的查询
            * */
            staffrankQuery(show) {
                this.staffrank.dataset.source = []
                this.$axios.post('', {}).then(value => {
                    if (show === false) {

                    } else {
                        this.$message({
                            message: '查询成功',
                            type: 'success'
                        })
                    }
                }).catch(reason => {

                }).finally(() => {
                    this.staffrank.dataset.source = [];
                    this.staffrank.dataset.source = [
                        ['姓名\\数量', '总工单', '开通中', '已完成', '废弃'],
                    ]
                })
            },
            arearankQuery(show) {
                this.arearank.dataset.source = [];
                this.channekrank.dataset.source = [];
                this.$axios.post('uploads_workcount', {}).then(({
                                                                    listArea,
                                                                    listChannel
                                                                }) => {
                    this.arearank.dataset.source = [];
                    this.arearank.dataset.source.push(...listArea);
                    this.channekrank.dataset.source = []
                    this.channekrank.dataset.source.push(...listChannel)
                })
            },
            channelrankQuery(show) {
                this.channekrank.dataset.source = [];
                this.$axios.post('uploads_workcount', {}, {
                    showLoading: false
                }).then(({
                             listArea,
                             listChannel
                         }) => {
                    this.channekrank.dataset.source = []
                    this.channekrank.dataset.source.push(...listChannel)
                }).catch(reason => {
                })
            },
        },
        watch: {
            "condition.time"() {
                this.rankQuery()
                this.staffAll()
                this.cityReport()
            },
            "condition.areas"() {
                this.rankQuery()
                this.staffAll()
                this.cityReport()
            },
            "condition.channels"() {
                this.rankQuery()
                this.staffAll()
                this.cityReport()
            },
        }
    };
</script>
<style scoped lang="less">
    .box {
        display: flex;
        flex-wrap: wrap;
        background-color: rgb(249, 250, 252);
        justify-content: space-between;
    }

    .plat {
        width: 49%;
        box-sizing: content-box;
        background-color: #FFFFFF;
        border: 1px solid rgb(243, 243, 243);
        margin-bottom: 10px;

        .el-row {
            h5 {
                font-size: 16px;
                text-indent: 2em;
                line-height: 50px;
            }

            border-bottom: 1px solid rgb(243, 243, 243);
        }
    }

    .content {
        padding: 10px;
        width: 100%;
        height: 420px;
        box-sizing: border-box;
    }

    .pro_brief {
        display: flex;

        .item {
            width: 50%;

            h6 {
                font-weight: normal;
                font-size: 16px;
                color: rgb(83, 157, 245);
                border-left: 4px solid rgb(153, 196, 245);
                text-indent: 1.5em;
                line-height: 30px;
                background: linear-gradient(to right, rgb(230, 240, 255) 0%, #ffffff 100%);
            }
        }

        .item_content {
            display: flex;
            flex-wrap: wrap;

            li {
                width: 49%;
                border-right: 1px solid rgb(243, 243, 243);
                padding-bottom: 50px;
            }

            p {
                text-align: center;

                &:first-child {
                    font-size: 20px;
                }

                &:last-child {
                    font-size: 16px;
                }
            }
        }
    }
</style>
