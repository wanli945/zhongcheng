export default (baseURL, util) => {
    return {
        /*
        *
        * 反刷7工单接口 参数map
        * */
        post: {
            baseURL: baseURL,
            url: "/workinfo/chaxun",
            params: {
                keyword: "",
                otime: '',
                ptime: '',
                pageNum: "",
                pageSize: "",
                settlementstatus: ""
            },

            data: {},
            header: {},
            return: {},
            parseData({code, entry, message}) {

                let my_mess = '', totalMoney = 0, my_is = false, total = 0;
                const list = [];
                if (code === 1) {
                    try {
                        const lists = entry.lists
                        my_is = true;
                        my_mess = "查询成功"
                        totalMoney = entry.countMoney;
                        total = lists.total
                        lists.list.forEach(item => {
                            list.push({
                                id: item.id,
                                custname: item.custName, // 客户姓名
                                phone: item.phone, // 联系电话
                                productName: item.prodName, // 产品名称
                                servericename: item.serviceName, // 业务员
                                assigneename: item.uploginName, // 受理员
                                states: item.status, // 订单状态
                                dealthetime: item.dealthetime, // 竣工时间
                                department: item.depaName, // 渠道 极为部门名称
                                commission: item.rate, // 佣金
                                sevenNo: item.orderNo, // CRM单号
                                deduct: item.deduct, // 提成
                                settledStatus: item.statusType, // 状态 提成状态
                            });
                        })
                    } catch (e) {
                        my_mess = "数据解析错误"
                    }
                } else {
                    my_mess = "查询失败"
                }
                return {
                    my_is,
                    my_mess,
                    totalMoney,
                    list,
                    total
                }
            },
            realData(data) {
                return data
            },
            realParam({
                          keyword,
                          timerange,
                          statos,
                          dbstatos,
                          curpage,
                          pageSize,
                      }) {

                return {
                    keyword: keyword,
                    otime: util.timestamp(timerange[0], "yyyy-MM-dd"),
                    ptime: util.timestamp(timerange[1], "yyyy-MM-dd"),
                    settlementstatus: statos + (dbstatos && '_' + dbstatos),
                    pageNum: curpage,
                    pageSize: pageSize,
                }
            }
        }
    }
}
