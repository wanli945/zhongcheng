export default (baseURL, util) => {
    /*插入工单*/
    return {
        post: {
            baseURL: baseURL,
            url: "/money/chaxunduct",
            params: {
                keyword: "",
                otime: "",
                ptime: "",
                settlementstatus: ""
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                console.log(code)
                let my_mess = "";
                let my_is = false;
                switch (code) {
                    case 0:
                        my_is = true
                        my_mess = "导出成功";
                        break;
                    default:
                        my_mess = "未知code:" + code
                }
                return {
                    my_mess,
                    my_is,
                    url: "http://" + entry
                };
            },
            realData(data) {
                return data
            },
            realParam({
                          keyword,
                          timerange,
                          statos,

                          name
                      }) {
                return {
                    keyword: keyword,
                    name,
                    otime: util.timestamp(timerange[0], "yyyy-MM-dd"),
                    ptime: util.timestamp(timerange[1], "yyyy-MM-dd"),
                    settlementstatus: statos,
                }
            }
        }
    }
}
