export default (baseURL, unit) => {
    /*
    *
    * */
    return {
        post: {
            baseURL: baseURL,
            url: "/fley/queryFi",
            params: {
                pageSize: '10',
                pageNum: '1',
                otime: '', // 开始时间
                ptime: '', // 结束时间
                id: '', // id
                statos: '', // 状态
                channel: '', // 渠道
                nameofadvertiser: '', // 广告主
                phone: '', // 手机号
                servicename: '', // 业务员
                desc: 2, // 是否升序
                name: '',// 客户名称
                idcard: '', // 身份证号
                broadband: '', // 资产号
                importOrder: '', // 是否导入单
                random: 0, //加密
                address: "", //
                areas: "",
                channels: "",
                pageRight:"zhang"
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry, message}) {
                let my_mess = "",
                    my_is = false,
                    list = [];
                if (code === 1) {
                    my_mess = "成功";
                    my_is = true;
                    entry.list.forEach((item, index) => {
                        let {
                            accept,
                            address,
                            amount,
                            appointmentime,
                            channel,
                            failure,
                            flow,
                            id,
                            idcard,
                            interior,
                            name,
                            nameofadvertiser,
                            paymentstate,
                            ok,
                            ordertime,
                            payment,
                            phone,
                            remark,
                            servicename,
                            statos,
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
                            channels,
                            areas,
                            oocp
                        } = item;
                        try {
                            interior = Object.values(JSON.parse(interior)).join("")
                        } catch {
                        }
                        list.push({
                            index,
                            id: id, // 商机单编号
                            workid: workid, //
                            channel: channel, // 渠道
                            phone: phone, // 手机号码
                            name: name, // 客户姓名
                            idcard: idcard, // 身份证号
                            broadband, // 业务号
                            interior, // 安装地址
                            accept, // 受理业务
                            servicename, // 业务员
                            uploginno, // 创建工号
                            statos, // 状态
                            amount, //
                            ordertime, // 下单时间
                            payment, // 付款金额
                            remark, // 备注
                            toproomotelinks, // 订单url
                            nameofadvertiser, // 广告主名称
                            address: address || "", // 地区
                            area2: area2 || "",
                            appointmentime, //  预约时间
                            ok, //
                            trackingtime, //跟踪时间
                            failure: failure === null ? '' : failure.trim(), // 失败原因
                            uplogintime, // 更新时间
                            /*
                            *
                            * 地区Array
                            * */
                            pageAddress: null,
                            newOrder: isitnew,
                            repeatOrder: whethertorepeat,
                            orderStatus: wid ? (wid.status || "") : "",
                            paymentmethod: paymentstate,
                            channels: channels,
                            areas: areas,
                            oocp,
                            oldMessage: {
                                name,
                                phone,
                                remark,
                                idcard,
                                interior,
                            }
                        })
                    })
                } else {
                    my_mess = "未知code:" + code
                }
                return {
                    my_mess,
                    my_is,
                    list,
                    message,
                    total: entry.total
                };
            },
            realData(data) {
                return data
            },
            realParam({queryOption, pagination, id = undefined, random = 0, userInfo, pageRight} = {}) {
                if (id) {
                    return {
                        id,
                    }
                } else {
                    // const {ServerName, AssignName} = unit.poolLimit(userInfo)
                    let Servicename = ""
                    if (pageRight === 'all') { // 公共·
                        Servicename = ""
                    } else if (pageRight === 'oneself') { // 个人
                        Servicename = userInfo.username
                    }
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
                        failure,
                        isOrder,
                        appointment,
                        tailafter,
                        appointments,
                        tailafters,
                    } = unit.queryConditionsParse(queryOption)
                    return {
                        pageSize: pagination.pagesize,
                        pageNum: pagination.curpage,
                        random: random,
                        otime, // 开始时间
                        ptime, // 结束时间
                        id, // id
                        statos: failure ? '待二次外呼' : statos, // 状态
                        nameofadvertiser, // 广告主
                        phone, // 手机号
                        servicename: Servicename || servicename, // 业务员
                        name: customerName,// 客户名称
                        idcard: idCard, // 身份证号
                        broadband, // 资产号
                        importOrder: '', // 是否导入单
                        desc: pagination.desc, // 是否升序
                        pageRight,
                        area2,

                        channels: channel[0] || '', // 一级渠道
                        channel: channel[1] || '',  // 二级渠道
                        areas: area[0] || '', // 一级地市
                        address: area[1] || '', // 二级地市
                        failure,
                        undistributed: isOrder,
                        appointment,
                        appointments,
                        tailafter,
                        tailafters,
                    }
                }
            }
        }
    }
}
