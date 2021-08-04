/*
 * @IDE      : WebStorm
 * @time     : 2021/2/9 13:17
 * @author   : 李艳鹏
 * @Software : app
 * @File     : stateservicecount
 * @describe : 万号 查询业务员
*/


export default (baseURL, unit) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/tmall/showperformance",
            params: {
                statisticalTime: "",
                reducedTime: "",

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
                    servicename: channel,
                    areas: city,
                    statisticalTime: unit.timestamp(dateRange[0], "yyyy-MM-dd"),
                    reducedTime: unit.timestamp(dateRange[1], "yyyy-MM-dd"),
                }
            }
        }
    }
}
