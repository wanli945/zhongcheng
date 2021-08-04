/*coding:utf-8
 * @IDE      : WebStorm
 * @time     : 2020/11/26 14:30
 * @author   : 李艳鹏
 * @Software : app
 * @File     : example
 * @describe : 接口解析的例子
*/
export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url: "",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({code}) {
                let my_mess = "未知code" + code;
                let my_is = false;
                if (code === 1) {
                    my_is = true;
                    my_mess = "查询成功"
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
