export default (baseURL, unit) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/crm/crmorder",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                console.log(code, entry)
                let my_is = false,
                    my_mess = '未知状态' + code;
                if (code === 1) {
                    my_is = true;
                    my_mess = entry;
                }
                return {
                    my_is,
                    my_mess,
                    entry
                };
            },
            realData(data) {
                return data
            },
            realParam({crmOrder}) {
                return {
                    crmOrder
                }
            }
        }
    }
}
