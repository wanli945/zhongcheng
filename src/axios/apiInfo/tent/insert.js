/*
 * @IDE      : WebStorm
 * @time     : 2020/12/31 9:21
 * @author   : 李艳鹏
 * @Software : app
 * @File     : insert
 * @describe :
*/

export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/tent/increasetheconfiguration",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({code}) {
                let my_mess = code === 1 ? "添加成功" : "添加失败";
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
                console.log(param)
                return {...param, channl: param.channel, channel: undefined, area: param.city[1],areas: param.city[0]}
            }
        }
    }
}
