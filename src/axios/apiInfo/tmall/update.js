/*
 * @IDE      : WebStorm
 * @time     : 2020/12/31 9:21
 * @author   : 李艳鹏
 * @Software : app
 * @File     : update
 * @describe :
*/
export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/tamll/updatetamll",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({code}) {
                let my_mess = code === 1 ? "修改成功" : "修改失败";
                let my_is = code === 1;
                return {
                    my_mess,
                    my_is
                };
            },
            realData(data) {
                return data
            },
            realParam(params) {
                const {
                    id,
                    name,
                    idcard,
                    accept,
                    payment,
                    remark,
                    interior,
                    failure,
                    channel,
                    phone,
                    toproomotelinks,
                    appointmentime,
                    servicename,
                    trackingtime,
                    address,
                    statos,
                    orderTemplate,
                    broadband,
                    department,
                    workserved,
                    pageAddress,
                    pagestatos,
                    area2,
                    paymentmethod,
                    accept2,
                    accept3,
                    broadband2,
                    broadband3,
                    packageType,
                    packageContent,
                    tmallId,
                    terminalNumber,
                    terminalModel,
                    packageChange,
                    secondaryCard,
                    kdBroadband,
                    channels,
                    areas,
                    userInfo,
                    oldStatus,
                    changeObj
                } = params;
                console.log(params)
                let workservedDate = orderTemplate[workserved];
                return {
                    id,
                    custname: name,
                    idcard: idcard,
                    phone: phone,
                    businessnumber: broadband,
                    businessnumbertwo: broadband2,
                    businessnumbertree: broadband3,
                    area: address,
                    address: interior,
                    tmallordernumber: tmallId,

                    prodctname: accept,

                    template: workservedDate ? workservedDate.id : undefined,
                    trackingtime: trackingtime,
                    appointmenttime: appointmentime,
                    paymentmoney: payment,
                    paymentterm: paymentmethod,
                    marketingresults: pagestatos || "",
                    remark,
                    secondaryCard,
                    broadband: kdBroadband,
                    areas,

                    workid: id,
                    uploginno: "",
                    oldname: servicename,
                    curentname: userInfo.username,
                    oldstatus: oldStatus,
                    status: pagestatos,
                    isitright: 2,
                    historys: JSON.stringify(changeObj),
                }
            }
        }
    }
}
