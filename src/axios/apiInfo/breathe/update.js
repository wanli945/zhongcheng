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
            url: "/tamll/updateterminal",
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
                    secondaryCard,
                    kdBroadband,
                    terminalNumber,
                    terminalModel,
                    packageChange,
                    c4name,
                    nowDiscount,
                    nowPackageType,
                    areas,
                    userInfo,
                    oldStatus,
                    changeObj
                } = params;
                console.log(changeObj);
                /*
                accept: "信息流测试",
                accept2: "信息流测试",
                accept3: "信息流测试",
                address: "杭州市",
                appointmentime: undefined,
                area2: "",
                broadband: "sadsad",
                broadband2: "sada",
                broadband3: "asdada",
                c4name: "的撒大",
                channel: null,
                department: "杭州外呼部门",
                failure: "",
                id: 7,
                idcard: "142929199505211234",
                interior: "和平大厦",
                kdBroadband: undefined,
                name: "测试",
                nameofadvertiser: null,
                nowDiscount: "GGGG",
                nowPackageType: "asdad",
                orderTemplate: [],
                packageChange: "5G129套餐",
                packageContent: undefined,
                packageType: undefined,
                pageAddress: [],
                pagestatos: "待外呼",
                payment: "18",
                paymentmethod: "支付宝",
                phone: "15135052411",
                remark: "猜测是1",
                secondaryCard: undefined,
                servicename: "业务员",
                statos: null,
                terminalModel: "dsadad",
                terminalNumber: undefined,
                tmallId: "",
                toproomotelinks: undefined,
                trackingtime: "2021-01-28 12:00:00",
                workserved: 0,
                * */
                let workservedDate = orderTemplate[workserved];
                return {
                    productname: accept,
                    cname: c4name,
                    terminalseries: terminalNumber, // 终端串号
                    terminaltyp: terminalModel, //  终端类型
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
                    template: workservedDate && workservedDate.id,
                    trackingtime: trackingtime,
                    appointmenttime: appointmentime,
                    receivable: payment,
                    paymentterm: paymentmethod,
                    marketingresults: pagestatos || "",
                    remark,
                    secondaryCard,
                    broadband: kdBroadband,
                    packageChange,
                    nowDiscount,
                    nowPackageType,
                    productnametwo: accept2,
                    productnametree: accept3,
                    failure,
                    areas,
                    workid: id,
                    uploginno: "",
                    oldname: servicename,
                    curentname: userInfo.username,
                    oldstatus: oldStatus,
                    status: pagestatos,
                    isitright: 3,

                    historys: JSON.stringify(changeObj),
                }
            }
        }
    }
}
