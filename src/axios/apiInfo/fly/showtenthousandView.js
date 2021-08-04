
// 万号 整体看板
export default (baseURL, unit) => {
    return {
        post: {
            // verify: true,
            baseURL: baseURL,
            url: "/tenthousand/showtenthousandView",
            params: {
                statisticalTime: "",
                reducedTime: "",
                chainStart: "",
                chainEnd: ""
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
            realParam({product, dateRange, endRange, city}) {
                return {
                    prodctone: product,
                    areas: city,
                    statisticalTime: unit.timestamp(dateRange[0], "yyyy-MM-dd"),
                    reducedTime: unit.timestamp(dateRange[1], "yyyy-MM-dd"),
                    chainStart: unit.timestamp(endRange[0], "yyyy-MM-dd"),
                    chainEnd: unit.timestamp(endRange[1], "yyyy-MM-dd"),
                }
            }
        }
    }
}
