export default (baseURL) => {
    return {
        get: {
            verify: false,
            baseURL: baseURL || "",
            url: "/api/login",
            params: {
                username: "",
                password: "",
            },
            data: {},
            headers: {},
            return: {
                code: 0,
                message: ""
            },
            parseData({code, data,
                          phone,
                          token,
                          username,
                      }) {
                /*
                *
                *
                * */
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
                    my_is,
                    code,
                    data,
                    phone,
                    token,
                    username,
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
