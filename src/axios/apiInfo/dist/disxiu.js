/*
 * @IDE      : WebStorm
 * @time     : 2020/12/23 19:36
 * @author   : 李艳鹏
 * @Software : app
 * @File     : disxiu
 * @describe :
*/


export default (baseURL) => {
    return {
        /*
        *
        * 修改商机单信息
        * */
        post: {
            baseURL: baseURL,
            url: "/dist/disxiu",
            params: {
                id: '',
                name: "",
                interior: "",
                phone: "",
                idcard: "",
                accept: '',
                payment: 0,
                remark: "",
                address: '',
                appointmentime: '',
                statos: '',
                failure: '',
                trackingtime: ''
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry, message}) {
                let my_mess = "";
                let my_is = false;
                switch (code) {
                    case 1:
                        my_is = true;
                        break;
                    default:
                        my_is = false;
                }

                return {
                    my_mess: entry ? entry : message,
                    my_is
                };
            },
            realData(data) {
                return data
            },
            realParam({
                          accept,
                          address,
                          appointmentime,
                          channel, // 渠道不可改
                          failure,
                          id,
                          idcard,
                          interior,
                          name,
                          orderTemplate,
                          payment,
                          phone,
                          remark,
                          servicename,
                          statos,
                          toproomotelinks,
                          trackingtime,
                          broadband,
                          pagestatos,
                          paymentmethod,
                          areas,
                          userInfo,
                          oldStatus,
                          changeObj
                      }) {

                return {
                    id: id,
                    name,
                    interior,
                    phone,
                    idcard,
                    product: accept,
                    payment,
                    remark,
                    address: address,
                    appointmentime: appointmentime || '',
                    statos: pagestatos,
                    failure: failure || ' ',
                    trackingtime: trackingtime || '',
                    broadband: broadband || '',
                    paymentmethod,
                    areas,


                    workid: id,
                    uploginno: "",
                    oldname: servicename,
                    curentname: userInfo.username,
                    oldstatus: oldStatus,
                    status: pagestatos,
                    isitright: 5,

                    historys: JSON.stringify(changeObj),
                }
            }
        }
    }
}
