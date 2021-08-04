
import store from '../../../store/state'

// console.log(store.right.channel)
export default (baseURL, unit) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/work/cha",
            params: {},
            data: {
                pageNum: 1,
                pageSize: 10,
                status: "", // 工单状态
                custcreatertime: "", // 客户创建时间
                workid: "", // 工单id
                broadband: "", // 业务号码
                serviceName: "", // 业务员
                assigneeName: '',// 受理员
                ostats: "",  // 受理状态
                orderNo: "", // 受理单号
                custcreate: "", // 客户创建人
                custidcard: "", // 客户身份证号
                custphone: "", // 联系号码
                custarea: "", // 地区
                custname: "", // 客户名称
                productsName: "", //产品名
                otime: "", // 下单时间 s
                ptime: "", //下单时间 e
                random: 0,
                reminder: 0,
                abnormal: "",
                channl: "",
                custareas: "",
                channels: "",
                chan:[]
            },
            header: {},
            return: {},
            parseData({code, entry}) {
                let my_mess = "", my_is = false, list = [], total = 0, oneInfo = null, qudaoList = [];
                switch (code) {
                    case 1:
                        my_mess = "查询成功";
                        my_is = true;
                        break;
                    default:
                        my_mess = "未知code:" + code
                }
                try {
                    entry.list.forEach(item => {
                        const {
                            cid,
                            oid,
                            pid,
                            remark,
                            serviceName,
                            paymentamount,
                            xdtime,
                            status, //人工
                            statos, // 7工单状态
                            broadband,
                            appointmenttime,
                            channl,
                            workid,
                            assigneeName,
                            orderid,
                            reminder,
                            workserved,
                            hid,
                            paymentstate,
                            soundverify,

                            region,  // 地区
                            businessnumber, // 宽带证号
                            existingpreferential, // 现有优惠
                            existingPackageTypes, // 现有套餐类型
                            terminaltype, // 终端类型
                            changedPackagetype, // 需更改套餐类型
                            vicecardnumber, // 副卡号码
                            custaddress, // 地址
                            prodctsName, // 产品名
                            prodacceptthemethod, // 产品受理方案
                            terminalseries, //终端串号
                            areas,
                            channels,
                            jsonstr,
                            oocp,
                            paymentDiff,
                        } = item
                        list.push({
                            region,  // 地区
                            businessnumber, // 宽带证号
                            existingpreferential, // 现有优惠
                            existingPackageTypes, // 现有套餐类型
                            terminaltype, // 终端类型
                            changedPackagetype, // 需更改套餐类型
                            vicecardnumber, // 副卡号码
                            prodacceptthemethod,// 产品受理方案
                            tmallId: soundverify,
                            cid: cid.id,
                            workid: workid,
                            phone: cid.custphone,
                            name: cid.custname,
                            interior: custaddress || cid.custaddress, //安装地址
                            address: cid.custarea ? cid.custarea : '', // 地市
                            c_remark: jsonstr || cid.custremark, // 客户信息备注
                            servicename: serviceName, // 业务员
                            remark: remark ? remark : '', // 工单备注
                            product: pid.productsName || prodctsName, // 产品
                            createTime: xdtime ? xdtime : '', // 下单时间
                            idcard: cid.custidcard ? cid.custidcard : '', // 身份证号
                            channel: channl ? channl : '', // 渠道
                            /* accept: "300MB 宽带", // 受理业务*/
                            uploginno: "", // 创建工号

                            status: status ? status : '', // 状态
                            statos: statos ? statos : '', // 受理状态
                            reason: hid && hid.historys,

                            ordertime: xdtime ? xdtime : '', // 下单时间
                            payment: paymentamount, // 付款金额
                            toproomotelinks: null, // 订单url
                            nameofadvertiser: "", // 广告主名称
                            broadband, // 业务号码
                            assigneeName, //受理人

                            ok: null, //
                            appointmenttime, //
                            uplogintime: "", // 更新时间
                            cui: Boolean(reminder),
                            /*
                            * 7工单信息
                            * */
                            orderid,
                            bssPhone: "15135052416",
                            bss7: oid.orderNo ? oid.orderNo : '',
                            no7: oid.orderNo && `${oid.orderNo}--（${oid.ostats}）`,
                            st7: oid.ostats,
                            cwno7: oid.cwangno && `${oid.cwangno}--（${oid.cwangstatos}）`,
                            cwst7: "",
                            gwno7: oid.guwangno && `${oid.guwangno}--（${oid.guwangstatos}）`,
                            gwst7: "",
                            ydno7: oid.yuandanno && `${oid.yuandanno}--（${oid.yuandanstatos}）`,
                            ydst7: "",
                            sc7: oid.fphone, // 安装电话
                            chargemethod: oid.chargemethod, //  计费方式
                            acceptchannal: oid.acceptchannal, // 受理渠道
                            acceptancetype: oid.acceptancetype, // 受理方式
                            workserved,
                            paymentstate, //   收费方式
                            productBox: {
                                slname: pid.slname,
                                name: pid.productsName,
                                otime: pid.otime,
                                ptime: pid.ptime
                            },
                            /*
                            * todo 2020-12-19
                            *  1异常 2正常
                            * */
                            abnormal: parseInt(oid.abnormal) === 1 ? "是" : "否",
                            terminalNumber: terminalseries,
                            channels: channels,
                            areas: cid.custareas,
                            oocp,
                            paymentDiff,
                            isAuto: pid.isAuto,
                            acceptMethod: pid.acceptMethod
                        });
                    })
                    total = entry.total

                } catch (e) {
                    // console.log(e)
                    my_mess = "数据解析错误";
                    my_is = false;
                }
                if (list[0]) {
                    oneInfo = {
                        ...list[0],
                        accountList: [],
                        leftList:[],
                    }
                    try {
                        const {oid} = entry.list[0];
                        // console.log(oid.rowstate)

                       let arr = oid.rowstate.split('**')
                        // console.log(arr)
                        // console.log(arr.length===2)
                        // console.log( JSON.parse(arr[0]))
                        // console.log( JSON.parse(arr[1]))
                        // console.log( JSON.parse(arr[2]))

                        let newObj = {}
                        if(arr.length===2) {
                            let one = JSON.parse(arr[0])

                            if(one.hasOwnProperty('addrAttrVos')) {
                                // console.log('否')
                                let one = JSON.parse(arr[0])
                                let two = JSON.parse(arr[1])
                                Object.assign(newObj,one,two)
                            } else {
                                let oone = one[0]
                                if(oone.hasOwnProperty('accNum')) {
                                    // console.log('是')
                                    let one = JSON.parse(arr[0])
                                    let oone = one[0]
                                    let two = JSON.parse(arr[1])
                                    Object.assign(newObj,oone,two)
                                }
                            }
                        } else {
                            let one = JSON.parse(arr[0])
                            let oone = one[0]
                            let two = JSON.parse(arr[1])
                            let three = JSON.parse(arr[2])
                            Object.assign(newObj,oone,two,three)
                        }
                        console.log(newObj)

                        // one.forEach(val =>{
                        //     oneInfo.leftList.push({
                        //         accNum:val.accNum,
                        //         serviceOfferName: val.serviceOfferName,
                        //         statusName: val.statusName,
                        //         prodName: val.prodName,
                        //         staffInfo: val.staffInfo
                        //     })
                        // })
                        // console.log(oneInfo.leftList)
                        let oobj = {
                            refreshFlag: newObj.refreshFlag, // false
                            serviceOfferName: newObj.serviceOfferName, // 新装
                            staffInfo: newObj.staffInfo,
                            statusCd: newObj.statusCd,
                            statusName: newObj.statusName,
                            accNum: newObj.accNum,   // 057170826556
                            cancelFlag: newObj.cancelFlag,  // false
                            catgType: newObj.catgType,
                            custOrderId: newObj.custOrderId,
                            orderProdItemId: newObj.orderProdItemId,
                            prodId: newObj.prodId,
                            prodName: newObj.prodName,
                            prodOrderItem: {
                                addrAttrVos: newObj.addrAttrVos,
                                orderMainProdAttrVos: newObj.orderMainProdAttrVos,
                                invalidOrderSubPackVos: newObj.invalidOrderSubPackVos,
                                orderOwnCustVo: newObj.orderOwnCustVo,
                                orderSubPackVos: newObj.orderSubPackVos,
                                orderSubProdVos: newObj.orderSubProdVos,
                                prodInforVo: newObj.prodInforVo,
                                subPackSize: newObj.subPackSize
                            },
                            account97: {
                                mess: newObj.statusList ? "已获取97信息" : "97信息为空",
                                list: newObj.statusList
                            },

                        }
                        if(newObj.contacts){
                            oobj.account97.list.push({
                                workPosition: "外线施工人",
                                status2: newObj.contacts.join("")
                            })
                        }
                        oneInfo.accountList.push(oobj)
                        console.log(oneInfo.accountList)
                        // console.log(oobj)
                        // JSON.parse(oid.rowstate).forEach(item => {
                        //     console.log(item)
                        //     let obj = {
                        //         refreshFlag: item.refreshFlag, // false
                        //         serviceOfferName: item.serviceOfferName, // 新装
                        //         staffInfo: item.staffInfo,
                        //         statusCd: item.statusCd,
                        //         statusName: item.statusName,
                        //         accNum: item.accNum,   // 057170826556
                        //         cancelFlag: item.cancelFlag,  // false
                        //         catgType: item.catgType,
                        //         custOrderId: item.custOrderId,
                        //         orderProdItemId: item.orderProdItemId,
                        //         prodId: item.prodId,
                        //         prodName: item.prodName,
                        //         account97: {
                        //             mess: "97信息为空",
                        //             list: []
                        //         },
                        //         prodOrderItem: item.prodOrderItem,
                        //
                        //     };
                        //     // console.log(obj)
                        //     if (item["97_status_data"].code === 0) {
                        //         obj.account97 = {
                        //             mess: item["97_status_data"].data.statusList ? "已获取97信息" : "97信息为空",
                        //             list: item["97_status_data"].data.statusList || []
                        //         }
                        //         if (item["97_status_data"].data.contacts) {
                        //             obj.account97.list.push({
                        //                 workPosition: "外线施工人",
                        //                 status2: item["97_status_data"].data.contacts.join("")
                        //             })
                        //         }
                        //     }
                        //     // console.log(obj)
                        //     oneInfo.accountList.push(obj)
                        // })
                    } catch (e) {
                        oneInfo.accountList = []
                    }
                }

                // console.log(oneInfo.accountList)
                // console.log(list)
                // console.log(store.right.channel)
                store.right.channel.forEach(val =>{
                    list.forEach(item => {
                        if (item.channels === val) {
                            qudaoList.push(item)
                        }
                    })
                })

                // console.log(qudaoList)
                // console.log(oneInfo.leftList)
                return {
                    my_mess,
                    my_is,
                    list,
                    total,
                    oneInfo,
                    qudaoList,
                };
            },
            realParam(data) {
                return data
            },
            realData({queryOption, pagination, id, random, userInfo, loginA, status, lqudao}) { //
                // console.log(lqudao)
                // 限定业务员 和 受理员
                const {ServerName, AssignName} = unit.poolLimit(userInfo)

                if (id !== undefined) {
                    return {
                        workid: id,
                        random,
                        status
                    }
                } else {

                    const {
                        area,
                        businessNumber,
                        channel,
                        customerName,
                        id,
                        idCard,
                        importOrder,
                        orderNo7,
                        otime,
                        phone,
                        productName,
                        ptime,
                        serverName,
                        states,
                        creater,
                        assignName,
                        abnormal,
                        cotime,
                        cptime,
                        area2
                    } = unit.queryConditionsParse(queryOption)
                    // console.log(unit.queryConditionsParse(queryOption))
                    return {
                        pageSize: pagination.pagesize,
                        pageNum: pagination.curpage,
                        status: states,
                        otime,
                        ptime,
                        workid: id, //
                        serviceName: ServerName || serverName,
                        assigneeName: AssignName || (assignName === "无受理员" ? "" : assignName),
                        orderNo: orderNo7,
                        custidcard: idCard,
                        custphone: phone,

                        custname: customerName,
                        broadband: businessNumber,
                        productsName: productName,
                        random,
                        abnormal,
                        cotime,
                        cptime,
                        channl: channel[1] || "",
                        channels: channel[0] || "",

                        custarea: area[1] || "",
                        custareas: area[0] || "",
                        area2,
                        undistributed: assignName === "无受理员" ? 9 : '',
                        loginA,
                        chan: channel.length === 0 ? lqudao : [],
                    }

                }
            }
        }
    }
}
