/*
 * @IDE      : WebStorm
 * @time     : 2021/2/19 15:38
 * @author   : 李艳鹏
 * @Software : app
 * @File     : channelinsert
 * @describe :
*/


export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/info/channelinsert",
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
            realParam({channels, twoChannel}) {
                return {
                    channels: channels, // 一级渠道名
                    channelnames: twoChannel // 二级渠道名
                }
            }
        }
    }
}
