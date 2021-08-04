/*
 * @IDE      : WebStorm
 * @time     : 2021/2/9 12:54
 * @author   : 李艳鹏
 * @Software : app
 * @File     : stateprod
 * @describe : 信息流产品排行
*/

export default (baseURL, unit) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/fly/stateprod",
            params: {
                channel: "信息流",
                otime: "",
                ptime: "",
                totime: "",
                tptime: "",
                pageNum: 1,
                pageSize: 10
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                let my_mess = "未知错误" + code;
                let my_is = false;
                let data = [];
                let total = 0;
                if (code === 1) {
                    data = entry;
                    my_is = true;
                    my_mess = "查询成功"
                    data = entry.list
                    total = entry.total
                }
                return {
                    my_mess,
                    my_is,
                    data,
                    total,
                    totalAll: entry ? entry.nextPage : 0
                };
            },
            realData(data) {
                return data
            },
            realParam({channel, dateRange, endRange, pageCur, pageSize, city}) {
                return {
                    channel: ["信息流", "全部"].indexOf(channel) >= 0 ? "" : channel,
                    areas: city,
                    otime: unit.timestamp(dateRange[0], "yyyy-MM-dd"),
                    ptime: unit.timestamp(dateRange[1], "yyyy-MM-dd"),
                    pageNum: pageCur,
                    pageSize,
                    channels: "信息流"
                }
            }
        }
    }
}
