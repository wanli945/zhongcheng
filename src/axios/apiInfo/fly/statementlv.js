/*
 * @IDE      : WebStorm
 * @time     : 2021/2/9 11:13
 * @author   : 李艳鹏
 * @Software : app
 * @File     : statementlv
 * @describe : 整体看板率
*/
export default (baseURL, unit) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/fly/statementlv",
            params: {
                channel: "信息流",
                otime: "",
                ptime: "",
                totime: "",
                tptime: ""
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                let my_mess = "未知错误" + code;
                let my_is = false;
                let data = {
                    "businessparameters": 0,
                    "workingodd": 0,
                    "calloutinto": 0,
                    "completime": 0,
                    "acceptnum": 0,
                    "pigeonholenum": 0,
                    "submitnum": 0,
                    "chargebacknum": 0,
                    "chargeback": 0,
                    "servicename": null,
                    "worknum": null,
                    "succeedorder": null,
                    "abandon": null
                };
                if (code === 1) {
                    data = entry;
                    my_is = true;
                    my_mess = "查询成功"
                }
                return {
                    my_mess,
                    my_is,
                    data
                };
            },
            realData(data) {
                return data
            },
            realParam({channel, dateRange, endRange, city}) {
                return {
                    channel: ["信息流", "全部"].indexOf(channel) >= 0 ? "" : channel,
                    areas: city,
                    otime: unit.timestamp(dateRange[0], "yyyy-MM-dd"),
                    ptime: unit.timestamp(dateRange[1], "yyyy-MM-dd"),
                    totime: unit.timestamp(endRange[0], "yyyy-MM-dd"),
                    tptime: unit.timestamp(endRange[1], "yyyy-MM-dd"),
                    channels: "信息流"
                }
            }
        }
    }
}
