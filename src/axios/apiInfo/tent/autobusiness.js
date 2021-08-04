/*
 * @IDE      : WebStorm
 * @time     : 2021/5/5 22:12
 * @author   : 李艳鹏
 * @Software : app
 * @File     : autobusiness
 * @describe :
*/



export default (baseURL, unit) => {
    return {
        /*
        *
        * 商机单流转到 待受理分配  万号自动受理
        * */
        post: {
            baseURL: baseURL,
            url: "/tent/aboutbusiness",
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
                region: '',
                businessnumber: '',
                existingpreferential: '',
                existingPackageTypes: '',
                terminaltype: '',
                changedPackagetype: '',
                vicecardnumber: '',
                prodctsName: '',
                prodacceptthemethod: '',
                terminalseries: "",
                businessAcceptType: "",
                kdBroadband:""
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
            realParam({
                          jxBox,
                          selectJx,
                          editBoxData,
                          orderTemplate,
                          other
                      }) {
                /*
                * area	地市	如:杭州市		1
                * idcred	身份证号			4
                * custname	客户姓名			2
                * proname	产品名称/模板名称		特殊字符不可用	3
                * bureauNbr	局向编号
                * area	地市			1
                * c4name	c4地址
                * bureauaddre	局向地址/安装地址
                * selectedBookingTime	预约时间
                * phone	手机/联系方式			5
                * payMethod	/付费方式
                * custname	客户姓名			2
                * proname	产品名称			3
                * depaname	部门名称
                * serviceName	业务人员名称
                * remark	备注
                * status	状态
                * broadband	宽带账号
                * appointmenttime	预约时间
                * paymentamount	付款金额
                * channl	渠道
                * workserved	工单模板
                * id	商机单ID
                * custname	客户姓名			2
                * custidcard	客户身份证号			4
                * custphone	客户手机号			5
                * custaddress	客户地址
                * area	地市			1
                * custremark	备注s
                * custcreater	业务员 *
                * */
                const {code,  jxid} = selectJx   // address,
                const {c3, c4, c_address, isAuto, payMethod } = jxBox

                const {
                    id, // 商机单编号
                    name, // 姓名
                    idcard, // 身份证号
                    accept, // 产品名称
                    payment, // 产品金额
                    remark, // 备注
                    custremark, //

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
                    broadband,
                    department,
                    pageAddress,
                    workserved,
                    channels,
                    areas,
                    paymentmethod,
                    businessAcceptType,
                    lsname,
                    acceptType,
                    kdBroadband
                } = editBoxData;
                console.log(editBoxData)
                return {
                    id,
                    custidcard: idcard,
                    custphone: phone,
                    custaddress: interior,
                    custarea: address,
                    custremark: remark,
                    accept: accept,
                    orderno: "",
                    channel: channel,
                    serviceName: servicename,
                    remark: remark,
                    broadband: broadband ? broadband : '', // 业务号码
                    appointmenttime: appointmentime ? appointmentime : '',
                    failure,
                    custcreater: servicename,
                    paymentamount: payment,
                    depaname: department,
                    status: orderTemplate[workserved].state, //  订单状态
                    workserved: orderTemplate[workserved].id,//工单模板
                    bureauNbr: code,// 局向编号
                    area: c3, // c3Name
                    c4name: c4, // c4Name
                    bureauaddre: address, // 局向地址
                    selectedBookingTime: appointmentime, // 预约时间
                    isAuto: isAuto, //是否自动单
                    payMethod: payMethod, // 收费方式
                    /*  todo 真实信息 */
                    idcred: idcard,//身份证号
                    custname: name,//客户姓名
                    proname: accept,//产品名称/模板名称
                    phone: phone,//手机/联系方式
                    installAddr: interior,// 安装地址
                    channels,
                    areas,
                    paymentstate: paymentmethod,
                    businessnumber:kdBroadband,
                    prodctsName: accept,
                    prodacceptthemethod: lsname,
                    acceptType,
                    kdBroadband,
                    /* ------------------todo 虚假信息----------------------------- */
                    ...other
                    /* ---------------------------------------------------------- */
                }
            }

        }
    }
}
