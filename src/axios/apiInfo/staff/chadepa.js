export default (baseURL) => {
    return {
        /*
        *  添加权限
        * */
        post: {
            baseURL: baseURL,
            url: "/staff/chadepa",
            params: {},
            data: {
                arr: "[]",
                data: "",
                laccept: "", // 创建人
                rname: 0,// 1 角色  0部门
                dname: "", // 部门
                lname: "", // 角色
                ljiami: 0, // 加密
                lshangchuang: 0,//上传
                lxiazai: 0, // 下载
                lfenpei: 0, // 分配
                lqudao:[]
            },
            header: {},
            return: {},
            parseData({code, entry, message, status}) {
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
            realData(rest) {
                console.log(rest)
                const {dname, secondname} = rest
                return {
                    ...rest,
                    dname: dname && (dname + (secondname ? "-" + secondname : "")),
                }
            },
            realParam(param) {
                return param
            }
        }
    }
}
