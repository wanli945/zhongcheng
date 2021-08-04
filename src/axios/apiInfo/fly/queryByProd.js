
//  外呼 产品
export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/terminal/queryByProd",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                // console.log(entry)
                let my_mess = code === 1 ? "查询成功" : "查询失败";
                let my_is = code === 1;

                return {
                    my_mess,
                    my_is,
                    entry,
                };
            },
            realData(data) {
                return data
            },
            realParam(param) {
                return param
            }
        }
    }
}
