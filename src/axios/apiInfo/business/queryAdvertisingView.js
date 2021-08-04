/*
 * @IDE      : WebStorm
 * @time     : 2021/3/23 16:52
 * @author   : 李艳鹏
 * @Software : app
 * @File     : queryAdvertisingView
 * @describe :
*/


export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/business/queryAdvertisingView",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                let my_mess = "未知code" + code;
                let my_is = false;
                if (code === 1) {
                    my_is = true;
                    my_mess = "查询成功"
                }
                return {
                    my_mess,
                    my_is,
                    data: entry
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
