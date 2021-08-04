/*coding:utf-8
 * @IDE      : WebStorm
 * @time     : 2020/11/26 14:30
 * @author   : 李艳鹏
 * @Software : app
 * @File     : example
 * @describe : 接口解析的例子
*/
export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/bssverify/queryAll",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({code,entry,message}) {
                // console.log(data)
                let my_mess = "未知code" + code;
                let my_is = false;
                let seleList = [];
                if (code === 1) {
                    my_is = true;
                    my_mess = "查询成功"
                }
                entry.forEach(item => {
                    seleList.push({
                        id: item.id,
                        logintime: item.logintime,
                        ordertoken: item.ordertoken,
                        password: item.password,
                        // success: item.success === '0' ? '否' : '是',
                        tel: item.tel,
                        token: item.token,
                        uinfo: item.uinfo
                    })
                })
                return {
                    my_mess,
                    my_is,
                    seleList,
                    message
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
