import {orderStatus} from "../../../data/status.data.js"

export default (baseURL, unit) => {
    return {
        /*
        *
        * 工单批量分配
        * */
        post: {
            baseURL: baseURL,
            url: "/work/goury",
            params: {
                id: undefined
            },
            data: {
                id: undefined
            },
            header: {},
            return: {},
            parseData(data) {
                let my_is = true;
                let dds = [];
                let _dds = {};
                let alert = [];
                orderStatus.select.forEach(value => {
                    _dds[value.label] = 0;
                })
                let p = Math.floor(Math.floor(Math.random() * 100))
                data.grouy.forEach(item => {
                    _dds[item.status || "其他"] = item["count(status)"];
                    // if(item.status === '待核实' ) {
                    //
                    // }
                });
                for (let item of Object.entries(_dds)) {
                    dds.push({
                        label: item[0],
                        num: item[1],
                        id: p++
                    })
                }
                return {
                    my_is,
                    my_mess: "查询成功",
                    data: dds
                };
            },
            //  realData   realParam
            realParam({data}) {
                return data
            },
            realData({queryOption, pagination, id, random, userInfo, lqudao}) {
                // 限定业务员 和 受理员
                const {ServerName, AssignName} = unit.poolLimit(userInfo)
                if (id !== undefined) {
                    return {
                        workid: id,
                        random
                    }
                } else {

                    const {
                        area,
                        businessNumber,
                        channel,
                        customerName,
                        id,
                        idCard,
                        importOrder,
                        orderNo7,
                        otime,
                        phone,
                        productName,
                        ptime,
                        serverName,
                        states,
                        creater,
                        assignName,
                        cotime,
                        cptime,
                        abnormal,
                    } = unit.queryConditionsParse(queryOption);
                    // console.log(unit.queryConditionsParse(queryOption))
                    return {
                        otime,                                 // 开始时间
                        ptime,                                 // 结束时间
                        serviceName: ServerName || serverName, // 业务员
                        assignname: AssignName || (assignName === "无受理员" ? "" : assignName),  // 受理员

                        cotime,                               // 未竣工时间 开始
                        cptime,                               // 未竣工时间 结束
                        abnormal: abnormal || "",             // 是否异常
                        orderNo: orderNo7,                   // 7工单
                        custidcard: idCard,                   //身份证号
                        custphone: phone,                    // 手机号

                        custname: customerName,              // 客户名
                        broadband: businessNumber,           // 业务号
                        productsName: productName,            //产品名称

                        channl: channel[1] || "",                       // 二级渠道
                        channels: channel[0] || "",                       // 一级渠道
                        custarea: area[1] || "",                      // 地区
                        areas: area[0] || "",                      // 地区

                        // 无受理员
                        undistributed: assignName === "无受理员" ? 9 : '',

                        chan: channel.length === 0 ? lqudao : [],
                    }
                }
            }
        }
    }
}
