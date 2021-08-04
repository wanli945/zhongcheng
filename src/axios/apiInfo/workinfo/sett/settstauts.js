/*
 * @IDE      : WebStorm
 * @time     : 2021/1/29 9:40
 * @author   : 李艳鹏
 * @Software : app
 * @File     : settstauts
 * @describe :
*/

export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url: "sett/settstauts",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({code}) {
                let my_mess = "";
                let my_is = false;
                return {
                    my_mess,
                    my_is
                };
            },
            realData({tableArr, status}) {
                return {
                    data: JSON.stringify({...tableArr}),
                    length: tableArr.length,
                    status
                }
            },
            realParam(data) {
                return data;
            }
        }
    }
}
