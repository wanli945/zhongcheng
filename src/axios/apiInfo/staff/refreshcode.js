export default (baseURL, unit) => {
    return {
        /*
        *  登录接口2
        * */
        post: {
            /*
            * 是否需要验证
            * */
            verify: true,
            baseURL: baseURL,
            url: "/cust/refreshcode",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({
                          code,
                          entry,
                          message
                      }) {
                console.log(code,                    entry,                    message)
                let my_mess = "", my_is = true
                switch (code) {
                    case 1:
                        my_is = true;
                        my_mess = "";
                        break;
                    case 0:
                        my_mess = entry || message;
                        break;
                    default:
                        my_mess = "未知code:" + code
                }
                // if (my_is) {
                //     try {
                //     } catch (e) {
                //         my_is = false;
                //         my_mess = "验证码或密码错误"
                //     }
                // }
                console.log(code,message)
                return {
                    my_mess,
                    my_is,
                    entry,
                    code,
                    message
                };

            },
            realData(data) {
                return data
            },
            realParam(params) {
                return params
            }
        }
    }
}
