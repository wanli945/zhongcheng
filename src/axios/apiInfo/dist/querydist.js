/*
 * @IDE      : WebStorm
 * @time     : 2020/12/23 16:37
 * @author   : 李艳鹏
 * @Software : app
 * @File     : querydist
 * @describe :
*/

export default (baseURL, unit) => {
    /*
    * 查询商机单
    * */
    return {
        post: {
            baseURL: baseURL,
            url: "/dist/querydist",
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
                areas: '',
                channels: ''
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry, message}) {
                let my_mess = "",
                    my_is = false,
                    list = [];
                switch (code) {
                    case 1:
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
                                ok,
                                ordertime,
                                payment,
                                paymentmethod,
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
                                product,
                                commodity,
                                channels,
                                areas
                            } = item;
                            try {
                                interior = Object.values(JSON.parse(interior)).join("")
                            } catch {
                            }
                            list.push({
                                index,
                                id: id, // 商机单编号
                                commodity, // 商品名称
                                workid: workid, //
                                channel: channel, // 渠道
                                phone: phone, // 手机号码
                                name: name, // 客户姓名
                                idcard: idcard, // 身份证号
                                broadband, // 业务号
                                interior, // 安装地址
                                accept: product, // 受理业务
                                servicename, // 业务员
                                uploginno, // 创建工号
                                statos, // 状态
                                amount, //
                                ordertime, // 下单时间
                                payment, // 付款方式
                                remark, // 备注
                                toproomotelinks, // 订单url
                                nameofadvertiser, // 广告主名称
                                address: address || "", // 地区
                                area2: area2 || "",
                                appointmentime, //  预约时间
                                ok, //
                                trackingtime, //跟踪时间
                                failure: '', // 失败原因
                                uplogintime, // 更新时间
                                /*
                                *
                                * 地区Array
                                * */
                                pageAddress: null,
                                newOrder: isitnew,
                                repeatOrder: whethertorepeat,
                                orderStatus: wid ? (wid.status || "") : "",
                                paymentmethod,
                                channels: channels,
                                areas: areas
                            })
                        })
                        break;
                    case "001":
                        my_mess = "缺少id";
                        break;
                    case "002":
                        my_mess = "缺少name";
                        break;
                    default:
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
                        isOrder
                    } = unit.queryConditionsParse(queryOption)
                    return {
                        pageSize: pagination.pagesize,
                        pageNum: pagination.curpage,
                        random: random,
                        otime, // 开始时间
                        ptime, // 结束时间
                        id, // id
                        statos, // 状态
                        channel: channel[1], // 渠道
                        channels: channel[0], // 渠道

                        nameofadvertiser, // 广告主
                        phone, // 手机号
                        servicename: Servicename || servicename, // 业务员
                        name: customerName,// 客户名称
                        idcard: idCard, // 身份证号
                        broadband, // 资产号
                        importOrder: '', // 是否导入单
                        address: area[1],
                        areas: area[0],
                        desc: pagination.desc, // 是否升序
                        pageRight,
                        area2,
                        undistributed: isOrder
                    }
                }
            }
        }
    }
}
