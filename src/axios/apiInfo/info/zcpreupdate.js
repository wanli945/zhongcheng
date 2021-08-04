/*
 * @IDE      : WebStorm
 * @time     : 2021/2/20 17:27
 * @author   : 李艳鹏
 * @Software : app
 * @File     : zcpreupdate
 * @describe : 地市的修改
*/


export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/info/zcpreupdate",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({code}) {
                let my_mess = "未知code" + code;
                let my_is = false;
                if (code === 1) {
                    my_is = true;
                    my_mess = "修改成功"
                }
                return {
                    my_mess,
                    my_is
                };
            },
            realData(data) {
                return data
            },
            realParam({id, areaname}) {
                return {
                    areaname,
                    id
                }
            }
        }
    }
}
