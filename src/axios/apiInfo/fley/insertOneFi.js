export default (baseURL) => {
    return {
        /*
        *
        * 插入一个商机单
        * */
        post: {
            baseURL: baseURL,
            url: "/fley/insertOneFi",
            params: {
                channel: "",
                phone: "",
                nameofadvertiser: "",
                remark: "",
                name: "",
                idcard: "",
                interior: "",
                broadband: "",
                servicename: ""
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry, message}) {
                let my_mess = "";
                let my_is = false;
                switch (code) {
                    case 1:
                        my_is = true;
                        break;
                    default:
                        my_is = false;
                }

                return {
                    my_mess: entry ? entry : message,
                    my_is
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
