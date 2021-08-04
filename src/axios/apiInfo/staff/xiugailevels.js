export default (baseURL) => {
    return {
        /*
        *  添加 角色的修改
        * */
        post: {
            baseURL: baseURL,
            url: "/staff/xiugailevels",
            params: {},
            data: {
                id: "",
                darr: "[1,2,21,3,31]",
                djson: "",
                rname: 0,// 1 角色  0部门
                dname: "", // 部门名
                /*laccept: "", // 创建人*/

                lname: "", // 角色名
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
                // console.log(data)
                return {...data, djson: data.data, darr: data.arr, data: undefined, arr: undefined}
            },
            realParam(param) {
                return param
            }
        }
    }
}
