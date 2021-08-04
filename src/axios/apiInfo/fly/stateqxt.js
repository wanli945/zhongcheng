/*
 * @IDE      : WebStorm
 * @time     : 2021/2/9 13:36
 * @author   : 李艳鹏
 * @Software : app
 * @File     : stateqxt
 * @describe : 信息流 折线图
*/


export default (baseURL, unit) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/fly/stateqxt",
            params: {

                otime: "",
                ptime: "",
                totime: "",
                tptime: "",
                platType: ""
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                // console.log(entry)
                let my_mess = "未知错误" + code;
                let my_is = false;
                let data = {};
                if (code === 1 && entry instanceof Array) {
                    my_is = true;
                    my_mess = "查询成功";
                    entry.forEach(value => {
                        if (value.d) {
                            data[value.d] = value["count(*)"]
                        }
                    })
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
            realParam({channel, dateRange, platType, city}) {
                return {
                    channel: ["信息流", "全部"].indexOf(channel) >= 0 ? "" : channel,
                    areas: city,
                    otime: unit.timestamp(dateRange[0], "yyyy-MM-dd"),
                    ptime: unit.timestamp(dateRange[1], "yyyy-MM-dd"),
                    platType,
                    channels: "信息流"
                }
            }
        }
    }
}
