export default (baseURL) => {
    return {
        /*
        *
        * 反刷7工单接口 参数map
        * */
        post: {
            baseURL: baseURL,
            url: "/workinfo/pxiu",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({code, entry, message}) {
                let my_mess = '提交失败' + code, my_is = false;

                if (code === 1) {
                    my_is = true;
                    my_mess = '提交成功'
                }
                
                return {
                    my_is,
                    my_mess,

                }
            },
            realData(data) {
                return data
            },
            realParam({arr, status, userInfo, reason = ''} = {}) {
                const data = [];
                /*
                     id: item.id,
                     custname: "张三", // 客户姓名
                     phone: '13362896380', // 联系电话
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
                */
                arr.forEach(item => {
                    data.push({
                        workid: item.id,
                        oldstatos: item.settledStatus,
                        status: status,
                        historys: reason,
                        servicename: item.serviceName,
                        operator: userInfo.username
                    });
                });
                return {
                    data: JSON.stringify({
                        data: {
                            ...data
                        },
                        length: data.length
                    }),
                }
            }
        }
    }
}
