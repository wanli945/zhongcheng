/*
 * @IDE      : WebStorm
 * @time     : 2020/12/31 9:20
 * @author   : 李艳鹏
 * @Software : app
 * @File     : select
 * @describe : 查询万号产品
*/
export default (baseURL, unit) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/tent/configurationinformation",
            params: {
                pageSize: 1,
                pageNum: 1,
                otime: "", // 开始时间
                ptime: "", // 结束时间
                id: "", // id
                statos: "", // 状态
                channl: "", // 渠道
                nameofadvertiser: "", // 广告主
                phone: "", // 手机号
                servicename: "", // 业务员
                name: "",// 客户名称
                idcard: "", // 身份证号
                businessnumberone: "", // 业务号码
                importOrder: '', // 是否导入单
                address: "", //
                desc: "", // 是否升序
                pageRight: "",
                area2: "",
                accept: "",
                businessarea: "",
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

                            failure,
                            flow,
                            id,
                            businessidcard,
                            interior,
                            businessname,
                            advertiser,
                            ok,
                            createtime,
                            payment,
                            businessphone,
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
                            businessnumberone,
                            businessnumbertwo,
                            businessnumbertree,
                            address,
                            channl,
                            channels,
                            areas
                        } = item;
                        try {
                            interior = Object.values(JSON.parse(interior)).join("")
                        } catch {
                        }
                        // 属性为 自己定义 的 ，后期模板中 需要的数据 ，属性值 为后台接口 的赋值
                        list.push({
                            index,
                            id: id, // 商机单编号
                            workid: workid, //
                            channel: channl, // 渠道
                            phone: businessphone, // 手机号码
                            name: businessname, // 客户姓名
                            idcard: businessidcard, // 身份证号
                            broadband: businessnumberone, // 业务号
                            broadband2: businessnumbertwo, // 业务号
                            broadband3: businessnumbertree, // 业务号
                            interior: address, // 安装地址
                            accept: prodctone, // 受理业务
                            accept2: prodcttwo, // 受理业务
                            accept3: prodcttree, // 受理业务
                            servicename, // 业务员
                            uploginno, // 创建工号
                            statos: marketing, // 状态
                            amount, //
                            ordertime: createtime, // 下单时间
                            payment: receivable, // 付款金额
                            remark, // 备注
                            toproomotelinks: source, // 订单url
                            nameofadvertiser: advertiser, // 广告主名称
                            address: businessarea || "", // 地区
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
                            template,
                            paymentmethod: payment,
                            secondaryCard,
                            kdBroadband: broadband,
                            channels: channels,
                            areas: areas,
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
            realParam({queryOption, pagination, id = undefined, random = 0, userInfo, pageRight} = {}) {
                if (id) {
                    return {
                        id,
                        random: random,
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
                        accept,
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

                        nameofadvertiser, // 广告主
                        phone, // 手机号
                        servicename: Servicename || servicename, // 业务员
                        name: customerName,// 客户名称
                        idcard: idCard, // 身份证号
                        businessnumberone: broadband, // 业务号码
                        importOrder: '', // 是否导入单

                        channl: channel[1], // 渠道
                        channels: channel[0], // 渠道
                        businessarea: area[1], //
                        areas: area[0],

                        desc: pagination.desc, // 是否升序
                        pageRight,
                        area2,
                        accept,
                        marketing: statos,
                        undistributed: isOrder
                    }
                }
            }
        }
    }
}
