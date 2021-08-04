/*
 * @IDE      : WebStorm
 * @time     : 2021/2/19 17:22
 * @author   : 李艳鹏
 * @Software : app
 * @File     : prefecturalin
 * @describe :  新增 一二级地市
*/


export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/info/prefecturalin",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({code}) {
                let my_mess = "未知code" + code;
                let my_is = false;
                if (code === 1) {
                    my_is = true;
                    my_mess = "查询成功"
                }
                return {
                    my_mess,
                    my_is
                };
            },
            realData(data) {
                return data
            },
            realParam({areaname, pid = undefined} = {}) {
                return {
                    areaname,
                    pid: pid || 0
                }
            }
        }
    }
}
