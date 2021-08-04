export default (baseURL, unit) => {
    return {
        /*
        *
        * 修改工单的备注
        * */
        post: {
            baseURL: baseURL,
            url: "/work/remarks",
            params: {
                remark: "",
                workid: ""
            },
            data: {},
            header: {},
            return: {},
            parseData({code}) {
                let my_is = false,
                    my_mess = '未知状态' + code;
                if (code === 1) {
                    my_is = true;
                    my_mess = "修改成功"
                } else if (code === 0) {
                    my_mess = "修改失败"
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
