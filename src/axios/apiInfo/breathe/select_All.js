/*
 * @IDE      : WebStorm
 * @time     : 2021/1/6 15:49
 * @author   : 李艳鹏
 * @Software : app
 * @File     : querytamll
 * @describe :
*/


export default (baseURL, unit) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/tamll/queryterminls",
            params: {
                pageSize: 1,
                pageNum: 1,
                random: 0,
                otime: "", // 开始时间
                ptime: "", // 结束时间
                id: "", // id
                statos: "", // 状态
                channel: "", // 渠道
                advertiser: "", // 广告主
                phone: "", // 手机号
                servicename: "", // 业务员
                custname: "",// 客户名称
                idcard: "", // 身份证号
                businessnumber: "", // 业务号码
                importOrder: '', // 是否导入单
                address: "", //
                desc: "", // 是否升序
                pageRight: "",
                area2: "",
                accept: "",
                tmallordernumber: "",
                channl: "",
                terminalseries: "",
                terminaltyp: "",
                marketingresults: "",
                areas: "",
                channels: ""
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                let my_mess = "",
                    my_is = false,
                    list = [];
                if (code === 1) {
                    my_mess = "成功";
                    my_is = true;
                    entry.list.forEach((item, index) => {
                        let {
                            prodctone,
                            prodcttree,
                            prodcttwo,

                            businessarea,
                            amount,
                            appointmentime,
                            channel,
                            failure,
                            flow,
                            id,
                            idcard,
                            interior,
                            custname,
                            advertiser,
                            ok,
                            createtime,
                            payment,
                            phone,
                            remark,
                            servicename,
                            marketing,
                            toproomotelinks,
                            trackingtime,
                            uploginno,
                            uplogintime,
                            workid,
                            broadband,
                            isitnew,
                            whethertorepeat,
                            wid,
                            area2,
                            template,
                            receivable,
                            secondaryCard,
                            source,
                            businessnumber,
                            businessnumbertwo,
                            businessnumbertree,
                            address,
                            appointmenttime,
                            tmallordernumber,
                            prodctname,
                            prodctnametree,
                            prodctnametwo,
                            area,
                            channl,
                            paymentterm,
                            paymentmoney,
                            marketingresults,

                            nowPackageType,
                            productname,

                            nowDiscount,
                            cname,
                            packageChange,
                            productnametwo,
                            productnametree,
                            terminaltyp,
                            terminalseries,
                            channels,
                            areas
                        } = item;
                        try {
                            interior = Object.values(JSON.parse(interior)).join("")
                        } catch {
                        }
                        list.push({
                            index,
                            nowPackageType,
                            nowDiscount,

                            id: id, // 商机单编号
                            workid: workid, //
                            channel: channl, // 渠道
                            phone: phone, // 手机号码
                            name: custname, // 客户姓名
                            idcard: idcard, // 身份证号


                            broadband: businessnumber, // 业务号
                            broadband2: businessnumbertwo, // 业务号
                            broadband3: businessnumbertree, // 业务号

                            interior: address, // 安装地址

                            accept: productname, // 受理业务
                            accept2: productnametwo, // 受理业务
                            accept3: productnametree, // 受理业务
                            servicename, // 业务员
                            uploginno, // 创建工号
                            statos: marketingresults, // 状态
                            amount, //

                            ordertime: createtime, // 下单时间

                            paymentmethod: paymentterm, // 方式
                            payment: receivable, // 付款金额
                            remark, // 备注
                            toproomotelinks: source, // 订单url
                            nameofadvertiser: advertiser, // 广告主名称
                            address: area || "", // 地区
                            area2: area2 || "",
                            appointmentime: appointmenttime, //  预约时间
                            ok, //
                            trackingtime, //跟踪时间
                            failure, // 失败原因
                            uplogintime, // 更新时间
                            /*
                            *
                            * 地区Array
                            * */
                            pageAddress: null,
                            newOrder: isitnew,
                            repeatOrder: whethertorepeat,
                            orderStatus: wid ? (wid.status || "") : "",
                            template,
                            secondaryCard,

                            kdBroadband: broadband,
                            tmallId: tmallordernumber || "",

                            c4name: cname,
                            packageChange,

                            terminalModel: terminaltyp,
                            terminalNumber: terminalseries,
                            channels: channels,
                            areas: areas
                        })
                    })
                } else {
                    my_mess = "未知code:" + code
                }
                return {
                    my_mess,
                    my_is,
                    list,
                    total: entry.total
                };
            },
            realData(data) {
                return data
            },
            realParam({queryOption, pagination, random = 0, pageRight} = {}) {
                const {
                    area,
                    broadband,
                    channel,
                    customerName,
                    id,
                    idCard,
                    nameofadvertiser,
                    otime,
                    phone,
                    ptime,
                    servicename,
                    statos,
                    area2,
                    accept,
                    failure,
                    tmallId,
                    isOrder
                } = unit.queryConditionsParse(queryOption)
                return {
                    pageSize: pagination.pagesize,
                    pageNum: pagination.curpage,
                    random: random,
                    otime, // 开始时间
                    ptime, // 结束时间
                    id, // id
                    marketingresults: failure ? '待二次外呼' : statos, // 状态

                    advertiser: nameofadvertiser, // 广告主
                    phone, // 手机号
                    servicename: "", // 业务员
                    custname: customerName,// 客户名称
                    idcard: idCard, // 身份证号
                    businessnumber: broadband, // 业务号码
                    importOrder: '', // 是否导入单
                    desc: pagination.desc, // 是否升序
                    pageRight,


                    channels: channel[0] || '', // 一级渠道
                    channl: channel[1] || '',  // 二级渠道
                    areas: area[0] || '', // 一级地市
                    area: area[1] || '', // 二级地市

                    accept,
                    tmallordernumber: tmallId,
                    terminalseries: "",
                    terminaltyp: "",
                    failure,
                    undistributed: isOrder
                }
            }
        }
    }
}
