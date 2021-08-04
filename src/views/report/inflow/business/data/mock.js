/*
 * @IDE      : WebStorm
 * @time     : 2021/2/1 15:24
 * @author   : 李艳鹏
 * @Software : app
 * @File     : mock
 * @describe :
*/
// import Mock from "mockjs"

// import {getD2D} from "../../data/mock"


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

export const kanBanData = async (that) => {
    /*
    *  this.options.timeType = .statisticsTime;
    * this.options.city = this.scope.options.city;
    * this.options.dateRange = this.scope.options.dateRange;
    *
    *
    * */
    let data = {
        businessCount: 0,
        businessCountChina: "0",
        marketingSucceed: 0,
        marketingSucceedChina: "0",
        marketinglose: 0,
        marketingloseChina: "0",
        noAnswer: 0,
        noAnswerChina: "除数不能为零",
        outbound: "0",
        repetitionBusiness: 0,
        repetitionBusinessChina: "0",
        twoTrack: 0,
        twoTrackChina: "0"
    }
    try {
        const {endRange, city, dateRange, channel} = that.options
        data = (await that.$axios.post("business_showBusinessView", {
            areas: city,
            statisticalTime: that.$util.timestamp(dateRange[0], "yyyy-MM-dd"),
            reducedTime: that.$util.timestamp(dateRange[1], "yyyy-MM-dd"),
            channel: ['信息流', '全部'].indexOf(channel) >= 0 ? '' : channel,
            chainStart: that.$util.timestamp(endRange[0], "yyyy-MM-dd"),
            chainEnd: that.$util.timestamp(endRange[1], "yyyy-MM-dd"),
        }, {
            showLoading: false,
        })).data
    } catch (e) {
    }
    return [
        {
            title: '商机数',
            "total": data.businessCount,
            "rate": data.businessCountChina,
            category: "business",
            cur: true
        },
        /* {
             title: '外呼数',
             "total": Mock.mock('@integer(100, 800)'),
             "rate": Mock.mock('@float(-1, 1, 2)'),
             category: "outbound"
         },*/

        {
            title: '营销成功',
            "total": data.marketingSucceed,
            "rate": data.marketingSucceedChina,
            category: "success"
        },
        {
            title: '外呼转化率',
            "total": parseFloat(data.outbound).toFixed(2) + "%",
            "rate": null,
            category: "success"
        },
        /*{
            title: '转受理',
            "total": Mock.mock('@integer(60, 100)') + "%",
            "rate": Mock.mock('@float(-1, 1, 2)'),
            category: "acceptance"
        },*/
        {
            title: '营销失败',
            "total": data.marketinglose,
            "rate": data.marketingloseChina,
            category: "failure"
        },

        {
            title: '待二次跟踪',
            "total": data.twoTrack,
            "rate": data.twoTrackChina,
            category: "tracked"
        },
        {
            title: '无人接听',
            "total": data.noAnswer,
            "rate": data.noAnswerChina,
            category: "NoOneHeard"
        },
        /*   {
               title: '二次营销成功',
               "total": Mock.mock('@integer(100, 800)'),
               "rate": Mock.mock('@float(-1, 1, 2)'),
               category: "marketingSuccess"
           },*/
        {
            title: '重复商机',
            "total": data.repetitionBusiness,
            "rate": data.repetitionBusinessChina,
            category: "repeatBusiness"
        },
    ]
}

// export const getPolyline = async ({time, timeType, dateRange}, that) => {
//     return getD2D(dateRange, that);
// }

export const getChannelData = async (that) => {
    let dataArr = [], total = 0;
    try {
        const {endRange, city, dateRange, channel} = that.options

        dataArr = (await that.$axios.post("business_queryAdvertisingView", {
            areas: city,
            statisticalTime: that.$util.timestamp(dateRange[0], "yyyy-MM-dd"),
            reducedTime: that.$util.timestamp(dateRange[1], "yyyy-MM-dd"),
        }, {
            params: {
                channel4: ['信息流', '全部'].indexOf(channel) >= 0 ? '' : channel,
            },
            showLoading: false
        })).data

    } catch (e) {

    }
    let _dataArr = [];
    dataArr.forEach(value => {
        _dataArr.push({
            advertisers: value.advertising,
            num: value.advertisingCount,
            rate: parseFloat(value.advertisingpercent).toFixed(2) + "%",
            success: value.advertisingSuccess,
            twoCall: value.advertisingSecond,
        });
        total += parseInt(value.advertisingCount);
    });

    return {
        dataArr: _dataArr,
        total
    };
}


export const getPerformance = async (that) => {
    let dataArr = [], total = 0;
    const {city, dateRange, channel} = that.options;
    // console.log(that.options)
    try {
        dataArr = (await that.$axios.post("business_showPerformanceView", {
            areas: city,
            statisticalTime: dateRange[0] ? that.$util.timestamp(dateRange[0], "yyyy-MM-dd") : "",
            reducedTime: dateRange[1] ? that.$util.timestamp(dateRange[1], "yyyy-MM-dd") : "",
        }, {
            params: {
                channel1: ['信息流', '全部'].indexOf(channel) >= 0 ? '' : channel,
            },
            showLoading: false
        })).data;
    } catch (e) {
        console.log(e)
    }
    let _dataArr = [];
    dataArr.forEach(value => {
        _dataArr.push({
            serverName: value.salesman,  // 业务员
            callNum: value.outboundQuantity, // 外呼量
            rate: parseFloat(value.percentConversion).toFixed(2) + "%", // 转化率
            success: value.marketingSuccess, // 营销成功
            twoCall: value.secondarydevelopment, // 待二次外呼
        })
    })
    return {
        dataArr: _dataArr,
        total: 0
    };
}

export const getCityData = async (that) => {
    let dataArr = [];
    const {city, dateRange, channel} = that.options;
    try {
        dataArr = (await that.$axios.post("business_querReginView", {
            areas: city,
            statisticalTime: dateRange[0] ? that.$util.timestamp(dateRange[0], "yyyy-MM-dd") : "",
            reducedTime: dateRange[1] ? that.$util.timestamp(dateRange[1], "yyyy-MM-dd") : "",
        }, {
            params: {
                channel2: ['信息流', '全部'].indexOf(channel) >= 0 ? '' : channel,
            },
            showLoading: false
        })).data
    } catch (e) {

    }
    const _dataArr = [];
    dataArr.forEach(value => {
        _dataArr.push({
            area: String(value.address), // 地市
            num: value.outboundQuantity, //数量
            rate: parseFloat(value.percentConversion).toFixed(2) + "%", // 转化率
            success: value.marketingSuccess, //
            twoCall: value.secondarydevelopment,
        })
    })

    return {
        dataArr: _dataArr,
        total: 0
    };
}

export const getEffect = async (that) => {
    let dataArr = [];
    const {city, dateRange, channel} = that.options;
    try {
        dataArr = (await that.$axios.post("business_queryFailureType", {
            areas: city,
            statisticalTime: dateRange[0] ? that.$util.timestamp(dateRange[0], "yyyy-MM-dd") : "",
            reducedTime: dateRange[1] ? that.$util.timestamp(dateRange[1], "yyyy-MM-dd") : "",
        }, {
            params: {
                channel3: ['信息流', '全部'].indexOf(channel) >= 0 ? '' : channel,
            },
            showLoading: false
        })).data
    } catch (e) {

    }
    let _dataArr = [], _dataArr2 = [], totalAll = {};
    dataArr.forEach(value => {
        if (value.failurename !== "合计") {
            if (value.failureSum) {
                _dataArr.push({
                    failure: value.failure,
                    num: value.failureSum,
                    rate: parseFloat(value.failureRatio).toFixed(2) + "%",
                })
                _dataArr2.push({
                    failure: value.failure,
                    num: value.failureSum,
                    rate: parseFloat(value.failureRatio).toFixed(2) + "%",
                })
            }
        } else {
            totalAll = {
                failure: "合计",
                num: value.failureCount,
                rate: "100%",
            }
        }
    })
    _dataArr2.push(totalAll)
    return {
        dataArr: _dataArr,
        dataArr2: _dataArr2,
        total: 0
    };
}
