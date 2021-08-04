/*
 * @IDE      : WebStorm
 * @time     : 2020/12/15 14:45
 * @author   : 李艳鹏
 * @Software : app
 * @File     : deleteorder
 * @describe : 删除7工单号
*/

export default (baseURL) => {
    return {

        post: {
            baseURL: baseURL,
            url: "/cust/deleteorder",
            params: {
                orderno: "",
                tel: 18072892408,
                workid: ''
            },
            timeout: 60 * 1000,
            data: {},
            header: {},
            return: {},
            parseData({code, entry, message}) {
                let my_mess = entry ? entry : message;
                let my_is = false;
                if (code === 1) {
                    my_is = true
                }
                return {
                    my_mess,
                    my_is
                };
            },
            realData(data) {
                return data
            },
            realParam({bss7, workid}) {
                return {
                    orderno: bss7,
                    workid
                }
            }
        }
    }
}
