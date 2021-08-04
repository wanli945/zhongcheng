/*
 * @IDE      : WebStorm
 * @time     : 2020/12/15 15:00
 * @author   : 李艳鹏
 * @Software : app
 * @File     : remind
 * @describe : 定时提醒
*/

export default (baseURL, Unit) => {
    return {
        /*
        *
        * 修改商机单信息
        * */
        post: {
            baseURL: baseURL,
            url: "/fley/remind",
            params: {
                servicename: ""
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry, message}) {
                let my_mess = "";
                let my_is = false;
                const alarmList = []
                if (code === 1) {
                    my_is = true
                    my_mess = "查询成功"
                    alarmList.push(...Unit.messData(entry, "信息流_待二次外呼"));
                } else {
                    my_mess = "未查询到"
                }
                return {
                    my_mess,
                    my_is,
                    alarmList,
                    messType: "信息流待二次外呼"
                };
            },
            realData(data) {
                return data
            },
            realParam({servicename}) {
                return {
                    servicename
                }
            }
        }
    }
}
