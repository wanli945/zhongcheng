export default (baseURL, unit) => {
    return {
        /*
        *
        * 更新
        * */
        post: {
            baseURL: baseURL,
            url: "/fley/updateliu",
            params: {
                flowName: "", enble: 0, id: 0
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry, message}) {
                let my_mess = entry || message, my_is = code === 1;
                return {
                    my_mess,
                    my_is,
                };
            },
            realData(data) {
                return data
            },
            realParam(data) {
                return data
            }
        }
    }
}
