export default (baseURL, util) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/workinfo/chaxunre",
            params: {
                keyword: "",
                otime: '',
                ptime: '',
                settlementstatus: "",
                verify: "",
                pageNum: "",
                pageSize: "",
            },

            data: {},
            header: {},
            return: {},
            parseData({code, entry, message}) {
                let my_mess = '', totalMoney = 0, my_is = false, total = 0, rateMoney = 0;
                const list = [];
                if (code === 1) {
                    try {
                        const lists = entry.lists
                        my_is = true;
                        my_mess = "查询成功"
                        totalMoney = entry.countRate;
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
                                sevenNo: item.orderNo, // CRM单号
                                commissionStatus: item.statusType, // 状态 佣金状态
                                deduct: item.deduct, // 提成
                                integral: item.integral, // 积分
                                commission: item.rate, // 佣金
                                subsidy: item.subsidy // 补贴
                            });
                            if (item.rate && !isNaN(parseFloat(item.rate))) {
                                rateMoney += parseFloat(item.rate)
                            }
                        })
                    } catch (e) {
                        my_mess = "数据解析错误"
                    }
                } else {
                    my_mess = "查询失败"
                }
                // console.log(rateMoney)
                return {
                    my_is,
                    my_mess,
                    totalMoney,
                    list,
                    total,
                    rateMoney
                }
            },
            realData(data) {
                return data
            },
            realParam({
                          keyword,
                          timerange,
                          statos,
                          curpage,
                          pageSize,
                      }) {
                return {
                    keyword: keyword,
                    otime: util.timestamp(timerange[0], "yyyy-MM-dd"),
                    ptime: util.timestamp(timerange[1], "yyyy-MM-dd"),
                    verify: statos,
                    pageNum: curpage,
                    pageSize: pageSize,
                }
            }
        }
    }
}
