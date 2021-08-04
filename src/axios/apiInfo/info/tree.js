export default (baseURL) => {
    /*插入工单*/
    return {
        post: {
            baseURL: baseURL,
            url: "/info/tree",
            params: {
                areaname: ""
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry, message}) {
                let my_mess = message || entry;
                let my_is = false;
                switch (code) {
                    case 1:
                        my_is = true;
                        break;
                    default:
                        my_mess = "未知code:" + code
                }
                return {
                    my_mess,
                    my_is
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
