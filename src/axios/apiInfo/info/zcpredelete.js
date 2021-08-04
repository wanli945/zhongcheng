/*
 * @IDE      : WebStorm
 * @time     : 2021/2/20 17:26
 * @author   : 李艳鹏
 * @Software : app
 * @File     : zcpredelete
 * @describe : 地市删除
*/


export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/info/zcpredelete",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({code}) {
                let my_mess = "未知code" + code;
                let my_is = false;
                if (code === 1) {
                    my_is = true;
                    my_mess = "删除成功"
                }
                return {
                    my_mess,
                    my_is
                };
            },
            realData(data) {
                return data
            },
            realParam({id}) {
                return {id}
            }
        }
    }
}
