export default (baseURL, unit) => {
    return {
        /*
        *  添加权限
        * */
        post: {
            baseURL: baseURL,
            url: "/uploads/workcount",
            params: {
                otime: "",
                ptime: ""
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry, message, status}) {
                let my_mess = "查询失败";
                let my_is = false;
                const listArea = [],
                    listChannel = [],
                    listServer = [];
                /*
                [['地区\\数量', '数量']]; listArea
                [['渠道\\数量', '数量']]; listChannel
                [['姓名\\数量', '总工单', '开通中', '已完成', '废弃']]  listServer
                * */
                const listServerDict = {}, statusNum = {
                    all: 0,
                    success: 0,
                    submit: 0,
                    discard: 0,
                    accept: 0,
                    check: 0,
                    qCheck: 0,
                    verify: 0
                };
                if (code === 1) {
                    my_is = true;
                    my_mess = "查询成功";

                    /*  生产报表
                   * 总数
                   * */
                    entry.worksernamecount.forEach(item => {
                        let num = item["count(`status`)"];
                        let state = item["status"]
                        statusNum.all += num;  // 总工单
                        switch (state) {
                            case "成功订单":
                                statusNum.success += num;  // 成功订单
                                break;
                            case "待财务质检":
                            case "待录音质检":
                            case "待图片质检":
                                statusNum.qCheck += num; // 待质检
                                break;
                            case "已提交":
                                statusNum.submit += num; // 已提交
                                break;
                            case "废弃":
                                statusNum.discard += num; // 废弃
                                break;
                            case "待受理":
                                statusNum.accept += num; // 待受理
                                break;
                            case "待核实":
                                statusNum.verify += num; // 待核实
                                break;
                            case "待处理":
                                statusNum.check += num; // 待处理
                                break;
                        }
                    });
                    /*
                    * 渠道业绩
                    * */
                    entry.workchannlcount && entry.workchannlcount.forEach(item => {
                        (item["channl"] !== undefined && typeof item["channl"] === "string") && listChannel.push([item["channl"].trim() || "未知", item["count(w"]["channl)"]])
                    });
                    /*
                    * 地市业绩
                    * */
                    entry.workareacount && entry.workareacount.forEach(item => {
                        (item["custarea"] !== undefined && typeof item["custarea"] === "string") && listArea.push([item["custarea"].trim() || "未知", item["count(custarea)"]])
                    });

                    /*
                    *  销售人员业绩
                    * */
                    entry.workstatuscount.forEach(item => {
                        !!listServerDict[item["servicename"]] || (listServerDict[item["servicename"]] = {});
                        (listServerDict[item["servicename"]][item["status"]] = item["num"])
                    });

                    for (const [name, nData] of Object.entries(listServerDict)) {
                        let all = 0, submitted = 0, success = 0, discard = 0;
                        for (const [status, num] of Object.entries(nData)) {
                            all += num
                            switch (status) {
                                case "已提交":
                                    submitted += num;
                                    break;
                                case "成功订单":
                                    success += num;
                                    break;
                                case "废弃":
                                    discard += num
                            }
                        }
                        listServer.push([name, all, submitted, success, discard])
                    }
                }
                // console.log(listServer)
                // console.log(listChannel)
                // console.log(listArea)

                return {
                    my_mess: my_mess,
                    my_is,
                    listArea,
                    listChannel,
                    statusNum,
                    listServer
                };
            },
            realData(data) {
                return data
            },
            realParam({timeRage, city, channel}) {
                return {
                    otime: unit.timestamp(timeRage[0], "yyyy-MM-dd"),
                    ptime: unit.timestamp(timeRage[1], "yyyy-MM-dd"),
                    area: city[1] || "",
                    areas: city[0] || "",
                    channel: channel[1] || "",
                    // channels: channel[0] || "",
                    channels: channel[0] === '全部' ? '' : (channel[0] ? channel[0] : '')
                }
            }
        }
    }
}
