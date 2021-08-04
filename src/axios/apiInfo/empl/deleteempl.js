export default (baseURL, unit) => {
    return {
        /*
        *
        * 反刷7工单接口 参数map
        * */
        post: {
            baseURL: baseURL,
            url: "/empl/deleteempl",
            params: {
                id: undefined,
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
                        my_mess = '未知code' + code;
                }

                return {
                    my_mess,
                    my_is
                };
            },
            realData(data) {
                return data
            },
            realParam({
                          id,
                      }) {
                return {
                    id,
                }
            }
        }
    }
}
