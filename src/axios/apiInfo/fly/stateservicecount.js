/*
 * @IDE      : WebStorm
 * @time     : 2021/2/9 13:17
 * @author   : 李艳鹏
 * @Software : app
 * @File     : stateservicecount
 * @describe : 信息流 查询业务员
*/


export default (baseURL, unit) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/fly/stateservicecount",
            params: {
                channel: "信息流",
                otime: "",
                ptime: "",
                totime: "",
                tptime: "",
                pageNum: 1
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                let my_mess = "未知错误" + code;
                let my_is = false;
                let data = [];

                if (code === 1) {
                    data = entry;
                    my_is = true;
                }
                return {
                    my_mess,
                    my_is,
                    data,
                };
            },
            realData(data) {
                return data
            },
            realParam({channel, dateRange, city}) {
                return {
                    channel: ["信息流", "全部"].indexOf(channel) >= 0 ? "" : channel,
                    areas: city,
                    otime: unit.timestamp(dateRange[0], "yyyy-MM-dd"),
                    ptime: unit.timestamp(dateRange[1], "yyyy-MM-dd"),
                    channels: "信息流"
                }
            }
        }
    }
}
