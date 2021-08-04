/*
 * @IDE      : WebStorm
 * @time     : 2020/12/23 18:23
 * @author   : 李艳鹏
 * @Software : app
 * @File     : transferlist
 * @describe :
*/


export default (baseURL, unit) => {
    return {
        /*
        *
        * 商机单流转到
        * */
        post: {
            baseURL: baseURL,
            url: "/dist/transferlist",
            params: {
                custname: "",
                custidcard: "",
                custphone: "",
                custaddress: "",
                custarea: "",
                custremark: "",
                accept: "",
                orderno: "",
                serviceName: "",
                remark: "",
                status: "",
                broadband: "",
                appointmenttime: "",
                failure: "",
                paymentamount: 0,
                depaname: "",
                paymentstate: "",
                region: '',
                businessnumber: '',
                existingpreferential: '',
                existingPackageTypes: '',
                terminaltype: '',
                changedPackagetype: '',
                vicecardnumber: '',
                prodctsName: '',
                prodacceptthemethod: '',
                terminalseries: ""
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
                    case 2:
                        my_is = false;
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
            realParam(data) {
                const {
                    id, // 商机单编号
                    name, // 姓名
                    idcard, // 身份证号
                    accept, // 产品名称
                    payment, // 产品金额
                    remark, // 备注
                    custremark,
                    interior, // 安装地址
                    address,// 地区
                    failure,//失败原因
                    channel,//渠道
                    phone,
                    toproomotelinks,
                    appointmentime,
                    servicename,
                    trackingtime,
                    city,  // 城市
                    statos, // 状态
                    orderTemplate, // 模板
                    broadband,
                    department,
                    pageAddress,
                    workserved,
                    paymentmethod,
                    nameofadvertiser,
                    accept2,
                    accept3,
                    lsname,
                    areas,
                    channels
                } = data
                /*if (pageAddress[0] && pageAddress[1]) {
                    custarea = pageAddress[0] + "-" + pageAddress[1]
                }*/
                let workservedDate = orderTemplate[workserved];
                return {
                    id,
                    custname: name,
                    custidcard: idcard,
                    custphone: phone,
                    custaddress: interior,
                    custarea: address,
                    custremark: unit.field2remark(data),
                    accept: accept,
                    prodctsName: accept,
                    orderno: "",
                    channel: channel,
                    serviceName: servicename,
                    remark: "",
                    broadband: broadband ? broadband : '',
                    appointmenttime: appointmentime ? appointmentime : '',
                    failure,
                    custcreater: servicename,
                    paymentamount: payment,
                    depaname: department,
                    workserved: workservedDate.id,
                    status: workservedDate.state,
                    paymentstate: paymentmethod,
                    advertiser: nameofadvertiser,
                    productnametwo: accept2,
                    productnametree: accept3,
                    prodacceptthemethod: lsname,
                    areas,
                    channels
                }
            }
        }
    }
}
