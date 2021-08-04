export default (baseURL, unit) => {
    return {
        /*
        *
        * 导出 产品的
        * */
        post: {
            baseURL: baseURL,
            url: "/daoexcel/exceldata",
            params: {
                otime: "",
                ptime: "",
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry, message}) {
                let my_mess = "";
                let my_is = false;
                switch (code) {
                    case 0:
                        my_is = true;
                        break;
                    default:
                        my_is = false;
                        my_mess = '未知code' + code;
                }
                return {
                    my_mess,
                    my_is,
                    url: entry
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
