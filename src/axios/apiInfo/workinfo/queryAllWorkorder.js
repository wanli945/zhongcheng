/*
 * @IDE      : WebStorm
 * @time     : 2021/1/15 17:18
 * @author   : 李艳鹏
 * @Software : app
 * @File     : queryAllWorkorder
 * @describe :  工单清单查询
*/


export default (baseURL, unit) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/workinfo/queryAllWorkorder",
            params: {
                pageNum: "1",
                pageSize: "10",
                channl: "",
                prodctsName: "",
                orderon: "",
                theassetnumber: "",
                orderstatus: "",
                currentstatus: ""
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry, message}) {
                let my_mess = '查询失败' + code, my_is = false, list = [], total = 0;
                if (code === 1) {
                    my_is = true;
                    my_mess = '查询成功';
                    let automatilmarking = {
                        "true": "是",
                        "false": "否"
                    };
                    try {
                        entry.list.forEach(value => {
                            let __dd = {
                                id: value.id,
                                createTime: value.createtime,
                                accept: value.prodctsName,
                                channel: value.channl,
                                orderId: value.orderon,
                                name: value.custname,
                                orderStatus: value.orderstatus,
                                payMethod: value.chargemanner,
                                payChannel: value.acceptchannel,
                                remark: value.remark,
                                autoOrder: automatilmarking[value.automatilmarking] || "",
                                developerName: value.firstdeveloppeople,
                                developerId: value.firstdeveloppeopleno,
                                reason: "",
                                commission: value.paymoney,
                                accountList: []
                            };
                            try {
                                value.orderdetailsInfoid.forEach(value1 => {
                                    __dd.accountList.push(
                                        {
                                            id: value1.id,
                                            account: value1.assetnumber,
                                            behavior: value1.behavior,
                                            curStatus: value1.currentstate,
                                        }
                                    )
                                })
                            } catch (e) {

                            }
                            list.push(__dd)
                        })
                        total = entry.total;
                    } catch (e) {
                        my_is = false;
                        my_mess = String(e)
                    }

                }
                return {
                    my_is,
                    my_mess,
                    list,
                    total
                }
            },
            realData(data) {
                return data
            },
            realParam({params, pagination}) {
                const {
                    accept,
                    assets,
                    channel,
                    curStatus,
                    orderId,
                    orderStatus,
                } = unit.queryConditionsParse(params)

                return {
                    currentPage: pagination.curpage,
                    pageSize: pagination.pagesize,
                    pageNum: pagination.curpage,
                    channl: channel,
                    prodctsName: accept,
                    orderon: orderId,
                    theassetnumber: assets,
                    orderstatus: orderStatus,
                    currentstatus: curStatus
                }
            }
        }
    }
}
