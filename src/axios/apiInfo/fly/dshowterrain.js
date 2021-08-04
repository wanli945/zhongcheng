/*
 * @IDE      : WebStorm
 * @time     : 2021/2/9 12:32
 * @author   : 李艳鹏
 * @Software : app
 * @File     : stateaddresscount
 * @describe : 地市看板
*/

export default (baseURL, unit) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/distribution/showterrain",
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
            realParam({disname, dateRange, city}) {
                return {
                    servicename: disname,
                    areas: city,
                    statisticalTime: unit.timestamp(dateRange[0], "yyyy-MM-dd"),
                    reducedTime: unit.timestamp(dateRange[1], "yyyy-MM-dd"),

                }
            }
        }
    }
}
