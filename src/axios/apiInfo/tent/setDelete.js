/*
 * @IDE      : WebStorm
 * @time     : 2020/12/31 9:24
 * @author   : 李艳鹏
 * @Software : app
 * @File     : setDelete
 * @describe :
*/


export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/tent/deletetenthousan",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({code}) {
                let my_mess = code === 1 ? "删除成功" : "删除失败";
                let my_is = code === 1;
                return {
                    my_mess,
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
