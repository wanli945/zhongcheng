export default (baseURL, unit) => {
    return {
        /*
        *  登录接口2
        * */
        post: {
            /*
            * 是否需要验证
            * */
            verify: false,
            baseURL: baseURL,
            url: "/auto/login",
            params: {
                username: "",
                password: ""
            },
            data: {},
            header: {},
            return: {},
            parseData({
                          code,
                          entry,
                          message
                      }) {
                // console.log(code,                    entry,                    message)
                let my_mess = "", my_is = false
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
                if (my_is) {
                    try {

                    } catch (e) {
                        my_is = false;
                        my_mess = "验证码或密码错误"
                    }
                }
                return {
                    my_mess,
                    my_is,
                    entry
                };
            },
            realData(data) {
                return data
            },
            realParam({username, password, code}) {
                return {
                    username: username,
                    password: password,
                    code: code,
                }
            }
        }
    }
}
