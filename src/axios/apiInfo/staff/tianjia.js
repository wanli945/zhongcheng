export default (baseURL) => {
    return {
        /*
        *  添加权限
        * */
        post: {
            baseURL: baseURL,
            url: "/staff/tianjia",
            params: {
                ename: "", // 用户名称
                ephone: "", // 手机
                lname: "", // 角色
                dname: "" // 部门
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry, message, status}) {
                console.log(arguments[0])
                let my_mess = "";
                let my_is = false;
                switch (code) {
                    case 1:
                        my_mess = "成功";
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
            realParam(param) {
                return param
            }
        }
    }
}
