export default (baseURL) => {
    return {
        /*
        *
        * 修改商机单信息
        * */
        post: {
            baseURL: baseURL,
            url: "/fley/xiugai",
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
                trackingtime: '',
                areas: ""
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
                          failure,
                          id,
                          idcard,
                          interior,
                          name,
                          payment,
                          phone,
                          remark,
                          servicename,
                          trackingtime,
                          broadband,
                          pagestatos,
                          paymentmethod,
                          areas,
                          userInfo,
                          oldStatus,
                          changeObj,
                          channels,
                          statos,
                          toproomotelinks,
                          orderTemplate,
                          channel, // 渠道不可改
                      }) {
                console.log(
                    accept,
                    address,
                    appointmentime,
                    failure,
                    id,
                    idcard,
                    interior,
                    name,
                    payment,
                    phone,
                    remark,
                    servicename,
                    trackingtime,
                    broadband,
                    pagestatos,
                    paymentmethod,
                    areas,
                    userInfo,
                    oldStatus,

                    channels,
                    statos,
                    toproomotelinks,
                    orderTemplate,
                    channel, // 渠道不可改
                )
                console.log(changeObj)
                return {
                    id: id,
                    name,
                    interior,
                    phone,
                    idcard: idcard && String(idcard).toUpperCase(),
                    accept,
                    payment,
                    remark: remark,
                    /*
                    * todo 地市调整
                    * */
                    address: address,
                    appointmentime: appointmentime || '',

                    failure: failure || ' ',
                    trackingtime: trackingtime || '',
                    broadband: broadband || '',
                    paymentstate: paymentmethod,
                    areas,
                    workid: id,
                    uploginno: "",
                    oldname: servicename,
                    curentname: userInfo.username,

                    statos: pagestatos,
                    oldstatus: oldStatus,
                    status: pagestatos,
                    isitright: 1,
                    historys: JSON.stringify(changeObj),
                }
            }
        }
    }
}
