
//  产品排行

export default (baseURL, unit) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/terminal/showProd",
            params: {

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
                };
            },
            realData(data) {
                return data
            },
            realParam({product, dateRange, endRange, pageCur, pageSize, city}) {
                return {
                    prodctone: product,
                    areas: city,
                    statisticalTime: unit.timestamp(dateRange[0], "yyyy-MM-dd"),
                    reducedTime: unit.timestamp(dateRange[1], "yyyy-MM-dd"),
                    pageNum: pageCur,
                    pageSize,

                }
            }
        }
    }
}
