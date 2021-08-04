/*
 * @IDE      : WebStorm
 * @time     : 2021/2/4 17:48
 * @author   : 李艳鹏
 * @Software : app
 * @File     :
 * @describe :
*/
import instance from "../../../ola";

export default (baseURL, unit) => {
    return {

        post: {
            verify: true,
            baseURL: baseURL,
            url: "/auto/randomCode",
            params: {
                username: "",
                password: ""
            },
            data: {},
            header: {},
            return: {},
            parseData(data) {
                let my_mess = "",
                    my_is = true;

                return {
                    my_mess,
                    my_is,
                    data

                };
            },
            realData(data) {
                // console.log(data)
                return data
            },
            realParam({username, password, code, token}) {
                return {
                    username: username,
                    password: password,
                }
            }
        }
    }
}
