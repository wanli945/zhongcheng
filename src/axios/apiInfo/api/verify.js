export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL || "",
            url: "/api/verify",
            params: {},
            data: {},
            headers: {
                token: ""
            },
            return: {
                code: 0,
                message: ""
            },
            parseData({code}) {
                let my_mess = "";
                let my_is = false;
                switch (code) {
                    case "000":
                        my_mess = "成功";
                        my_is = true;
                        break;
                    case "001":
                        my_mess = "缺少id";
                        break;
                    case "002":
                        my_mess = "缺少name";
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
            realParam(param) {
                return param
            }
        }
    }
}
