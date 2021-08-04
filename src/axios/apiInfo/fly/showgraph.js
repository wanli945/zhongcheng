/*
 * @IDE      : WebStorm
 * @time     : 2021/2/9 13:36
 * @author   : 李艳鹏
 * @Software : app
 * @File     : stateqxt
 * @describe : 万号 折线图
*/


export default (baseURL, unit) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/tenthousand/showgraph",
            params: {
                statisticalTime: "",
                reducedTime: "",
                chainStart: "",
                chainEnd: "",
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
                console.log(data)
                return {
                    my_mess,
                    my_is,
                    data
                };
            },
            realData(data) {
                return data
            },
            realParam({product, dateRange, platType, city}) {
                return {
                    prodctone: product,
                    areas: city,
                    statisticalTime: unit.timestamp(dateRange[0], "yyyy-MM-dd"),
                    reducedTime: unit.timestamp(dateRange[1], "yyyy-MM-dd"),
                    platType,
                }
            }
        }
    }
}
