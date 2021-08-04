export default (baseURL) => {
    /*插入工单*/
    return {
        post: {
            baseURL: baseURL,
            url: "/info/xiugai",
            params: {},
            data: {
                rname: "",
                lname: "",
                dname: "",
                id: ""
            },
            header: {},
            return: {},
            parseData(code) {
                let my_mess = "";
                let my_is = false;
                switch (code) {
                    case 0:
                        my_mess = "成功";
                        my_is = true;
                        break;
                    case "001":
                        my_mess = "缺少id";
                        break;
                    case "002":
                        my_mess = "缺少name";
                        break;
                    default:
                        my_mess = "未知code:" + code
                }
                return {
                    my_mess,
                    my_is
                };
            },
            realData(data) {
                return data
            },
            realParam({
                          id,
                          text, top, enable
                      }) {

                return {
                    id,
                    name: text,
                    isoffor: top,
                    disno: enable
                }
            }
        }
    }
}
