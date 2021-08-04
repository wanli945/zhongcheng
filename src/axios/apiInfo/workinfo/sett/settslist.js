/*
 * @IDE      : WebStorm
 * @time     : 2021/1/29 17:13
 * @author   : 李艳鹏
 * @Software : app
 * @File     : settslist
 * @describe : 触发生成信息
*/

export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url: "sett/settslist",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({code}) {
                let my_mess = "";
                let my_is = false;
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
