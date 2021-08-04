/*
 * @IDE      : WebStorm
 * @time     : 2021/2/9 10:21
 * @author   : 李艳鹏
 * @Software : app
 * @File     : statement
 * @describe : 信息流 整体看板数据
*/
export default (baseURL, unit) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/fly/fishordCount",
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
                // console.log(entry)
                let my_mess = "未知错误" + code;
                let my_is = false;
                let data = {};
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
                    channels: "信息流",
                    areas: city,
                    otime: unit.timestamp(dateRange[0], "yyyy-MM-dd"),
                    ptime: unit.timestamp(dateRange[1], "yyyy-MM-dd"),
                    dotime: unit.timestamp(endRange[0], "yyyy-MM-dd"),
                    dptime: unit.timestamp(endRange[1], "yyyy-MM-dd"),
                }
            }
        }
    }
}
