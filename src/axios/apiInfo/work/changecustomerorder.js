/*
 * @IDE      : WebStorm
 * @time     : 2021/2/5 13:24
 * @author   : 李艳鹏
 * @Software : app
 * @File     : changecustomerorder
 * @describe :
*/


export default (baseURL, unit) => {
    return {
        /*
        *
        * 工单批量分配
        * */
        post: {
            baseURL: baseURL,
            url: "/work/changecustomerorder",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                let my_is = false,
                    my_mess = '未知状态' + code;
                if (code === 1) {
                    my_is = true;
                    my_mess = entry;
                }
                return {
                    my_is,
                    my_mess
                };
            },
            realData(data) {
                return data
            },
            realParam({
                          workid,
                          custid,
                          businessnumber,
                          broadband,
                          custname,
                          custphone,
                          custidcard,
                          diffMess,
                          uploginno
                      }) {
                return {
                    workid,
                    custid,
                    businessnumber,
                    broadband,
                    custname,
                    custphone,
                    custidcard,
                    historys: JSON.stringify(diffMess),
                    uploginno,
                    isitright: 0
                }
            }
        }
    }
}
