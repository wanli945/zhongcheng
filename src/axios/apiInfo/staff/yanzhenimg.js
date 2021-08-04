/*
 * @IDE      : WebStorm
 * @time     : 2021/2/4 17:48
 * @author   : 李艳鹏
 * @Software : app
 * @File     : yanzhenimg
 * @describe :
*/


export default (baseURL, unit) => {
    return {
        /*
        *  登录接口
        * */
        post: {
            /*
            * 是否需要验证
            * */
            verify: false,
            baseURL: baseURL,
            url: "/staff/yanzhenimg",
            params: {
                ephone: "",
            },
            data: {},
            header: {},
            return: {},
            parseData(data) {
                let my_mess = "验证码获取失败",
                    my_is = false;
                if (data instanceof Blob) {
                    my_mess = "验证码获取成功";
                    my_is = true;
                }
                return {
                    my_is,
                    my_mess,
                    data
                }
            },
            realData(data) {
                // console.log(data)
                return data
            },
            realParam({phone, password, code}) {
                return {
                    ephone: phone,
                }
            }
        }
    }
}
