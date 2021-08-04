export default (baseURL, unit) => {
    return {
        /*
        *
        * 修改工单的备注
        * */
        post: {
            baseURL: baseURL,
            url: "/work/remark",
            params: {
                orderid: "",
                workid: "",
                statosname: "", // 旧状态
                servicename: '', // 操作人
                oldname: '', // 受理员
                statue: "", // 新状态
                historys: "", // 原因
                statos: "" // 7工单状态
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry, message}) {
                let my_is = false,
                    my_mess = '未知状态' + code;
                if (code === 1) {
                    my_is = true;
                    my_mess = "状态修改成功"
                } else if (code === 0) {
                    my_mess = entry || message
                }
                return {
                    my_is,
                    my_mess,

                };
            },
            realData(data) {
                return data
            },
            realParam(data) {
                return data
            }
        }
    }
}
