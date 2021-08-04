/*
 * @IDE      : WebStorm
 * @time     : 2021/2/1 15:54
 * @author   : 李艳鹏
 * @Software : app
 * @File     : index
 * @describe : 整体看板数据获取
*/
import data from "../../data/index.js"


export const pickerOptions = data.pickerOptions;
export const echertOptions = data.echertOptions;
export const getInfoArr = data.getInfoArr;

export const dataZoom = data.dataZoom

export const headerData = {
    citySelect: [
        {label: "浙江", value: "浙江"},
        {label: "福建", value: "福建"},
    ],
    dataArr: [
        {name: '今天', value: 'day'},
        {name: '日', value: 'day'},
        {name: '周', value: 'week'},
        {name: '月', value: 'month'},
    ]
}
/*
*
* 整体看板 数量+比对
* */
export const overAllData = async (that) => {
    let objData = {
        "id": 0,  //

        "marketingSucceed": "0", // 营销成功
        "marketingSucceedChina": "0", // 成功环比


        "workorder": "0", // 工单数
        "workorderChina": "0", //  环比


        "completionrate": "0", //竣工率


        "pending": "0", // 待受理
        "pendingChina": "0", // 环比

        "abandoned": "0", // 废弃单
        "abandonedChina": "0", // 环比


        "archived": "0", // 已归档
        "archivedChina": "0", // 已归档环比

        "chargeback": "0", // 退单
        "chargebackChina": "0", // 退单环比


        "refund": "0.0", // 退单率

        "verify":"0", // 待核实
        "verifyChina":"0", // 环比


        "servicename": null, // 业务员名
        "worknum": null, // 工单总数
        "succdorders": null, // 竣工数
        "abas": null // 退单数
    }

    // 获取 整体看板数据
    try {
        objData = (await that.$axios.post("tenthousand_showtenthousandView", {}, {
            params: that.options,
            showLoading: false
        })).data;
    } catch (e) {
    }
    return [

        {
            title: '营销成功',
            category: "success",
            disable: false,
            total: objData.marketingSucceed,
            rate: objData.marketingSucceedChina
        },

        {
            title: '工单数',
            category: "order",
            total: objData.workorder,
            rate: objData.workorderChina,
            disable: false
        },
        {
            title: '竣工率',
            category: "completion",
            disable: false,
            total: parseFloat(objData.completionrate).toFixed(2) + "%",
            rate: null
        },
        /*{
            title: '工单营销成本',
            category: "orderMarketing",
            ...objData.orderMarketing,
            disable: true
        },*/
        {
            title: '待受理',
            category: "accepted",
            disable: false,
            total: objData.pending,
            rate: objData.pendingChina

        },
        {
            title: '废弃单',
            category: "discarded",
            disable: false,
            total: objData.abandoned,
            rate: objData.abandonedChina
        },
        {
            title: '成功订单',
            category: "archived",
            disable: false,
            total: objData.archived,
            rate: objData.archivedChina
        },
        /*{
            title: '已提交',
            ...objData.submit,
            category: "submit",
            disable: false
        },*/
        {
            title: '退单',
            category: "chargeback",
            disable: false,
            total: objData.chargeback,
            rate: objData.chargebackChina
        },
        {
            title: '退单率',
            category: "chargebackRate",
            disable: false,
            total: parseFloat(objData.refund).toFixed(2) + "%",
            rate: null
        },
        {
            title: '待核实',
            category: "chargebackRate",
            disable: false,
            total: objData.verify,
            rate: objData.verifyChina
        }
    ]
}

/*
* 获取折线图   fly_stateqxt
* */
export const getPolyline = async (that) => {
    const timeArr = that.options.dateRange
    let start = timeArr[0].setHours(0, 0, 0, 0)
    let end = timeArr[1].setHours(0, 0, 0, 0)
    let diffDay = Math.floor((end - start) / (1000 * 60 * 60 * 24))
    let dataArr = [], total = 0, title = `${diffDay + 1}天数据累计：`;
    try {
        const {data} = await that.$axios.post("tenthousand_showgraph", {}, {
            params: that.options,
            showLoading: false
        });
        // console.log(data)
        for (let i = diffDay; i >= 0; i--) {
            let _time = new Date(end);
            _time.setHours(0, 0, 0)
            _time.setDate(_time.getDate() - i);
            let date = that.$util.timestamp(_time, "yy-MM-dd");
            let num = data[date] || 0;
            if (num) {
                dataArr.push({
                    xAxis: date,
                    num
                })
            }
            total += num;
        }
    } catch (e) {

    }
    return {
        dataArr,
        total,
        title
    }
}


/*
*
* 地市排行
* */
export const getCityRank = async (that) => {
    let dataArr = [];
    try {
        const {data} = await that.$axios.post("tenthousand_showterrain", {}, {
            params: that.options,
            showLoading: false
        })
        data.forEach(value => {
            if (value["businessarea"]) {
                dataArr.push({
                    city: value["businessarea"],
                    num: value["count( businessarea )"],
                });
            }
        })
    } catch (e) {

    }
    return {
        dataArr
    }
}
/*
* 查询业务员  总工单  竣工  退单 业绩 柱状图
* */
export const getRank = async (that) => {
    let dataArr = [];
    try {
        const {data} = await that.$axios.post("tenthousand_showperformance", {}, {
            params: that.options,
            showLoading: false
        })
        data.forEach(value => {
            if (value.servicename) {
                dataArr.push({
                    serverName: value.servicename,
                    "工单总数": value.worknum || 0,
                    "竣工数": value.succdorders || 0,
                    "退单数": value.abas || 0,
                    "竣工率": value.worknum ? (value.succdorders * 100 / value.worknum).toFixed(2) : "--"
                });
            }
        })
    } catch (e) {
    }
    return {
        dataArr
    }
}
//  万号 业务员 业绩看板 table
export const getService = async (that) => {
    let dataArr = [];
    let total_ = 0;
    try {
        const {data, total} = await that.$axios.post("tenthousand_showQuota", {}, {
            params: that.options,
            showLoading: false,
        });
        // console.log(data)
        data.forEach(value => {
            let MN = 180;
            dataArr.push({
                serverName: value.servicename,   // 👍👎
                MonthNum: MN, // 月指标量
                work: value.worknum, // 工单
                archived:value.succdorders, // 归档
                MonthRate: value.succdorders ? ((value.succdorders * 100  / MN).toFixed(2) + "%") : "--", // 归档*100/月度指标 条件换成月指标量
                MonthDiff: MN - value.succdorders > 0 ? '-  ' + (MN - value.succdorders) : '+  ' + (value.succdorders - MN), // 月底指标 减 归档量
            })
        })
        total_ = total
    } catch (e) {

    }

    return {
        dataArr,
        total: total_
    };
}

/*
*
* 查询产品 销量+占比 totalAll总销售额
* */
export const getProduct = async (that) => {
    let dataArr = [];
    let total_ = 0;
    try {
        const {data, total} = await that.$axios.post("tenthousand_showProd", {}, {
            params: that.options,
            showLoading: false
        });
        data.forEach(value => {
            dataArr.push({
                productName: value.prodctone,
                num: value.number,
                // archived: value.,
                rate:(value.proportion - 0).toFixed(2) + "%"
            })
        })
        total_ = total
    } catch (e) {

    }
    return {
        dataArr,
        total: total_
    };
}
