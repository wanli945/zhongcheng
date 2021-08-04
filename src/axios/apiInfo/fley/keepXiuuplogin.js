export default (baseURL) => {
    return {
        /*
        *
        * 商机单分配
        * */
        post: {
            baseURL: baseURL,
            url: "/keep/xiuuplogin",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({code, message, entry}) {
                let my_mess = "";
                let my_is = false;
                switch (code) {
                    case 1:
                        my_is = true;
                        my_mess = "订单分配成功";
                        break;
                    case 0:
                        my_mess = entry ? entry : message;
                        break;
                    default:
                        my_mess = "未知code" + code
                }
                return {
                    my_mess,
                    my_is
                };
            },
            realData(data) {
                return data
            },
            realParam({servicename, data, userInfo}) {
                let idArr = []
                data.forEach(item => {
                    idArr.push(item.id)
                });

                return {
                    data: JSON.stringify({
                        servicename,
                        data: {...idArr},
                        length: idArr.length,
                        curentname: userInfo.username
                    })
                }
            }
        }
    }
}
