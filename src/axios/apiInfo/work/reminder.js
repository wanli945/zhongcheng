export default (baseURL, unit) => {
    return {
        /*
        *
        * 催单 ？
        * */
        post: {
            baseURL: baseURL,
            url: "/work/reminder",
            params: {
                reminder: 0,
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
                } else if (code === 0) {
                }
                return {
                    my_is,
                    my_mess,
                };
            },
            realData(data) {
                return data
            },
            realParam({cui = false, workid} = {}) {
                return {
                    reminder: Number(!cui),
                    workid
                }
            }
        }
    }
}
