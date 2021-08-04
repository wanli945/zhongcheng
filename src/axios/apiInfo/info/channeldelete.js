/*
 * @IDE      : WebStorm
 * @time     : 2021/2/19 16:02
 * @author   : 李艳鹏
 * @Software : app
 * @File     : channelDelete
 * @describe : 删除 二级 渠道
*/

export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/info/channeldelete",
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
            realParam({id}) {
                return {
                    id
                }
            }
        }
    }
}
