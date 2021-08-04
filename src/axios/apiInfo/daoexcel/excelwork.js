export default (baseURL, unit) => {
    return {
        /*
        *
        * 导出 工单的
        * */
        post: {
            baseURL: baseURL,
            url: "/daoexcel/excelwork",
            params: {
                otime: "",
                ptime: "",
                serviceName: "",
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry, message}) {
                console.log(path)
                let my_mess = "";
                let my_is = false;
                switch (code) {
                    case 0:
                        my_is = true;
                        break;
                    default:
                        my_is = false;
                        my_mess = '未知code' + code;
                }
                return {
                    my_mess,
                    my_is,
                    url: entry
                };
            },
            realData(data) {
                return data
            },
            realParam({queryOption, userInfo, name}) {
                const {ServerName, AssignName} = unit.poolLimit(userInfo)
                /*
                "id",
                "customerName",
                "idCard",
                 "phone",
                  "businessNumber",
                 "area",
                  "importOrder",
                 "states",
                 "otime",
                 "ptime",
                 "channel",
                 "assignName",
                "serverName"*/

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
                } = unit.queryConditionsParse(queryOption)
                return {
                    status: states,
                    otime,
                    ptime,
                    serviceName: ServerName || serverName,
                    assignname: AssignName || assignName,
                    custarea: area[1] || "",
                    custname: customerName,
                    productsName: productName,
                    name,
                    channel: channel[1] || "",
                    channels: channel[0] || "",
                    areas: area[0] || ""
                }
            }
        }
    }
}
