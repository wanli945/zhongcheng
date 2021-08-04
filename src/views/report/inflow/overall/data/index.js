/*
 * @IDE      : WebStorm
 * @time     : 2021/2/1 15:54
 * @author   : 李艳鹏
 * @Software : app
 * @File     : index
 * @describe : 整体看板数据获取
*/
import data from "../../data/index"

export const infoFlowArr = data.infoFlowArr;
export const pickerOptions = data.pickerOptions;
export const echertOptions = data.echertOptions;
export const getInfoArr = data.getInfoArr;

export const dataZoom = data.dataZoom
/*
*
* 整体看板 数量+比对
* */
export const overAllData = async (that) => {
    let objData = {
        "id": 0,  //
        "businessparameters": "0", // 商机数
        "businessparameterslv": "0", // 环比

        "vmarketing": "0", // 营销成功
        "pigeonholenumlv": "0", // 成功环比


        "workingodd": "0", // 工单数
        "workingoddlv": "0", //  环比

        "calloutinto": "0", // 外呼转化率
        "completime": "0", //竣工率


        "acceptnum": "0", // 待受理
        "acceptnumlv": "0", // 环比


        "pigeonholenum": "0", // 已归档
        "archivedlv": "0", // 已归档环比

        "chargebacknum": "0", // 退单
        "chargebacknumlv": "0", // 退单环比


        "chargeback": "0.0", // 退单率


        "servicename": null,
        "worknum": null,
        "succdorders": null,
        "abas": null
    }

    try {
        objData = (await that.$axios.post("fly_fishordCount", {}, {
            params: that.options,
            showLoading: false
        })).data;
    } catch (e) {
    }
    return [
        {
            title: '商机数',
            category: "business",
            cur: true,
            disable: false,
            total: objData.businessparameters,
            rate: objData.businessparameterslv
        },
        {
            title: '营销成功',
            category: "success",
            disable: false,
            total: objData.vmarketing,
            rate: objData.pigeonholenumlv
        },

        {
            title: '外呼转化率',
            category: "conversion",
            total: parseFloat(objData.calloutinto).toFixed(2) + "%",
            rate: null,
            disable: false
        },
        {
            title: '工单数',
            category: "order",
            total: objData.workingodd,
            rate: objData.workingoddlv,
            disable: false
        },
        {
            title: '竣工率',
            category: "completion",
            disable: false,
            total: parseFloat(objData.completime).toFixed(2) + "%",
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
            total: objData.acceptnum,
            rate: objData.acceptnumlv

        },
        {
            title: '已归档',
            category: "archived",
            disable: false,
            total: objData.pigeonholenum,
            rate: objData.pigeonholenumlv
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
            total: objData.chargebacknum,
            rate: objData.chargebacknumlv
        },
        {
            title: '退单率',
            category: "chargebackRate",
            disable: false,
            total: parseFloat(objData.chargeback).toFixed(2) + "%",
            rate: null
        }
    ]
}

/*
* 获取折线图
* */
export const getPolyline = async (that) => {
    const timeArr = that.options.dateRange
    let start = timeArr[0].setHours(0, 0, 0, 0)
    let end = timeArr[1].setHours(0, 0, 0, 0)
    let diffDay = Math.floor((end - start) / (1000 * 60 * 60 * 24))
    let dataArr = [], total = 0, title = `${diffDay + 1}天数据累计：`;
    try {
        const {data} = await that.$axios.post("fly_stateqxt", {}, {
            params: that.options,
            showLoading: false
        });

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
        const {data} = await that.$axios.post("fly_stateaddresscount", {}, {
            params: that.options,
            showLoading: false
        })
        data.forEach(value => {
            if (value["address"]) {
                dataArr.push({
                    city: value["address"],
                    num: value["count(address)"],
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
* 查询业务员  总工单  竣工  退单
* */
export const getRank = async (that) => {
    let dataArr = [];
    try {
        const {data} = await that.$axios.post("fly_stateservicecount", {}, {
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

/*
*
* 查询产品 销量+占比
* */
export const getProduct = async (that) => {
    let dataArr = [];
    let total_ = 0;
    try {
        const {data, total, totalAll} = await that.$axios.post("fly_stateprod", {}, {
            params: that.options,
            showLoading: false
        });
        // console.log(data, total, totalAll);
        data.forEach(value => {
            dataArr.push({
                productName: value.accept,
                num: value.acceptcount,
                rate: totalAll ? ((value.acceptcount * 100 / totalAll).toFixed(2) + "%") : "--"
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
