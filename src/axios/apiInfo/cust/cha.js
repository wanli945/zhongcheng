export default (baseURL) => {
    return {
        /*
        *
        * 反刷7工单接口 参数map
        * */
        post: {
            baseURL: baseURL,
            url: "/cust/cha",
            params: {
                orderNo: "",
                tel: 18072892408,
                workid: ''
            },
            timeout: 60 * 1000,
            data: {},
            header: {},
            return: {},
            parseData({code, entry, message}) {
                let my_mess = entry ? entry : message;
                let my_is = false;
                if (code === 1) {
                    if (entry === '反刷成功') {
                        my_is = true;
                        my_mess = '反刷成功';
                    } else if (entry === '运行结束') {
                        my_mess = '受理单已经存在，请勿重复';
                    }
                }
                return {
                    my_mess,
                    my_is
                };
            },
            realData(data) {
                return data
            },
            realParam({bss7, workid}) {
                return {
                    orderNo: bss7,
                    workid
                }
            }
        }
    }
}
