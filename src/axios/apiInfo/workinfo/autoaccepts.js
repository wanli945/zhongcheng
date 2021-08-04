/*coding:utf-8
 * @IDE      : WebStorm
 * @time     : 2020/11/26 14:29
 * @author   : 李艳鹏
 * @Software : app
 * @File     : autoaccepts
 * @describe : 局向地址查询
*/
export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/workinfo/autoaccepts",
            params: {
                c4name: "",
                c3name: "",
                address: "",
                page: 1
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                let my_mess = "";
                let my_is = false;
                const list = []
                if (code === 1) {
                    try {
                        if (entry.code) {
                            my_mess = "BSS验证失效"
                        } else {
                            const {data, message, success} = entry
                            my_mess = message
                            if (success && data && data["resCoverAddrList"]) {
                                list.push(...data["resCoverAddrList"])
                            }
                            my_is = true
                        }
                    } catch (e) {
                        my_mess = "局向信息解析错误"
                    }
                } else {
                    my_mess = "查询错误"
                }
                return {
                    my_mess,
                    my_is,
                    list
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
