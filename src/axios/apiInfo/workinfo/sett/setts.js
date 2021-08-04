/*
 * @IDE      : WebStorm
 * @time     : 2021/1/20 14:29
 * @author   : 李艳鹏
 * @Software : app
 * @File     : setts
 * @describe : 结算分析页面
*/


export default (baseURL, unit) => {
    return {
        post: {
            baseURL: baseURL,
            url: "sett/setts",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                let my_mess = "", my_is = false, list = [], total = 0;
                if (code === 1) {
                    try {
                        my_mess = "查询成功";
                        my_is = true;
                        total = entry.total
                        entry.list.forEach(value => {
                            const querylist = [];
                            try {
                                querylist.push(...JSON.parse(value.querylist))
                            } catch (e) {
                            }
                            let oneData = {
                                "orderId": value.orderno,
                                "accept": value.productsName,
                                channel: value.channl,
                                "acceptChannel": value.acceptthechannel,
                                "deveName": value.developingperson,
                                "payMethod": value.tollcollectionmanner,
                                "city": value.prefectural,
                                "T0": value.t1,
                                "T1": value.t2,
                                "T2": value.t3,
                                "T3": value.t4,
                                "T4": value.t5,
                                "T5": value.t6,
                                "T6": value.t7,
                                "T7": value.t8,
                                "T8": value.t9,
                                "T9": value.t10,
                                "T10": value.t11,
                                "T11": value.t12,
                                "T12": value.t213,
                                "total": value.commissionsubtotal,
                                "shouldEnd": value.shouldbecommission,
                                "status": value.statucts,
                                "id": value.id,
                                "every": querylist,
                                "everyOrigin": value.querylist
                            }
                            list.push(oneData)
                        })
                    } catch (e) {
                        my_mess = String(e) + "数据解析错误";
                    }
                } else {

                }
                return {
                    my_mess,
                    my_is,
                    list,
                    total
                };
            },
            realData(data) {
                return data
            },
            realParam({pagination, paramsList}) {
                const {
                    accept,
                    accountPeriod,
                    area,
                    channel,
                    settlementStatus,
                } = unit.queryConditionsParse(paramsList)
                const {curpage, pagesize, months} = pagination

                return {
                    accept,
                    accountPeriod: unit.timestamp(accountPeriod, "yyyyMM"),
                    area,
                    channel,
                    settlementStatus,
                    pageNum: curpage,
                    pageSize: pagesize,
                    T1: months.T0,
                    T2: months.T1,
                    T3: months.T2,
                    T4: months.T3,
                    T5: months.T4,
                    T6: months.T5,
                    T7: months.T6,
                    T8: months.T7,
                    T9: months.T8,
                    T10: months.T9,
                    T11: months.T10,
                    T12: months.T11,
                    T213: months.T12,
                }
            }
        }
    }
}
