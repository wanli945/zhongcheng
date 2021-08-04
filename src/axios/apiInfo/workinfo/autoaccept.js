/*coding:utf-8
 * @IDE      : WebStorm
 * @time     : 2020/11/26 15:36
 * @author   : 李艳鹏
 * @Software : app
 * @File     : autoaccept
 * @describe : 商机单的自动受理
*/

export default (baseURL) => {
    // 局向接口
    return {
        post: {
            baseURL: baseURL,
            url: "/fley/transferorders",
            params: {
                paymentstate: "",
                businessnumber:"",

                region: '',
                existingpreferential: '',
                existingPackageTypes: '',
                terminaltype: '',
                changedPackagetype: '',
                vicecardnumber: '',

                prodctsName: '',
                prodacceptthemethod: '',
                terminalseries: "",
                Jaddress: ""
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry, message}) {
                let my_mess = "", my_is = false;
                if (code === 1) {
                    my_mess = "订单受理成功"
                    my_is = true
                } else {
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
                Jaddress,
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
                const {code, address, jxid} = selectJx
                const {c3, c4, c_address, isAuto, payMethod } = jxBox

                const {
                    id, // 商机单编号
                    name, // 姓名
                    idcard, // 身份证号
                    accept, // 产品名称
                    payment, // 产品金额
                    remark, // 备注
                    custremark,
                    interior, // 安装地址
                    // address,// 地区
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
                    acceptType
                } = editBoxData;
                console.log(editBoxData)
                return {
                    id,
                    custidcard: idcard,
                    custphone: phone,
                    custaddress: interior,
                    custarea: c3,
                    custremark: remark,
                    accept: accept,
                    orderno: "",
                    channel: channel,
                    serviceName: servicename,
                    remark: remark,
                    broadband: broadband ? broadband : '',
                    appointmenttime: appointmentime ? appointmentime : '',
                    failure,
                    custcreater: servicename,
                    paymentamount: payment,
                    depaname: department,
                    status: orderTemplate[workserved].state,
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
                    prodctsName: accept,
                    prodacceptthemethod: lsname,
                    acceptType,
                    Jaddress,

                    /* ------------------todo 虚假信息----------------------------- */
                    ...other
                    /* ---------------------------------------------------------- */
                }
            }

        }
    }
}
