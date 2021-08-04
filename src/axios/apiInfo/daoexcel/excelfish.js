export default (baseURL, unit) => {
    return {
        /*
        *
        * 导出 工单的
        * */
        post: {
            baseURL: baseURL,
            url: "/daoexcel/excelfish",
            params: {
                otime: "",
                ptime: "",
                statos: "",
                nameofadvertiser: "广告主",
                channel: "渠道"
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry, message}) {
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
            realParam({queryOption, name}) {
                const {
                    area,
                    broadband,
                    channel,
                    customerName,
                    id,
                    idCard,
                    nameofadvertiser,
                    otime,
                    phone,
                    ptime,
                    servicename,
                    statos
                } = unit.queryConditionsParse(queryOption)
                return {
                    otime,
                    ptime,
                    statos,
                    nameofadvertiser,
                    channel,
                    name
                }
            }
        }
    }
}
