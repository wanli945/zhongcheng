export default (baseURL) => {
    return {
        /*
        *  添加 角色的修改
        * */
        post: {
            baseURL: baseURL,
            url: "/staff/xiugaidepa",
            params: {
                id: "",
                dname: ""
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry, message, status}) {
                let my_mess = "";
                let my_is = false;
                switch (code) {
                    case 1:
                        my_is = true;
                        break;
                    default:
                        my_mess = "未知code:" + code
                }
                return {
                    my_mess: entry ? entry : message,
                    my_is
                };
            },
            realData(data) {
                return data
            },
            realParam({
                          id,
                          dname,
                          secondname
                      }) {
                return {
                    id,
                    dname: dname + (secondname ? ("-" + secondname) : ""),
                }
            }
        }
    }
}
