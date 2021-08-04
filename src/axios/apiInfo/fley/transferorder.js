export default (baseURL, unit) => {
    return {
        /*
        *
        * 商机单流转到 待受理分配
        * 提交工单的接口,原来的
        * */
        post: {
            baseURL: baseURL,
            url: "/fley/transferorder",
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
                    orderTemplate, // 模板 传
                    broadband,
                    department,
                    pageAddress,
                    workserved,
                    paymentmethod, // 传
                    nameofadvertiser, // 传
                    lsname,                 // 传
                    areas,
                    channels
                } = data
                console.log(data)
                let custarea = address
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
                    prodctsName: accept, //
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
                    prodacceptthemethod: lsname,
                    channels,
                    areas
                }
            }
        }
    }
}
