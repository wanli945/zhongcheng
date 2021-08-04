export default (baseURL, unit) => {
    return {
        /*
        *
        *  修改密码
        * */
        post: {
            baseURL: baseURL,
            url: "/empl/Gpwd",
            params: {
                oldpwd: '',
                ephone: '',
                epwd: '',
                id: ''
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
                    case 0:
                        my_mess = '旧密码错误';
                        break;
                    default:
                        my_is = false;
                        my_mess = '未知code'+code;
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
