export default (baseURL, unit) => {
    return {
        /*
        *
        * 获取商机单的状态分类数量
        * */
        post: {
            baseURL: baseURL,
            url: "/fley/grouby",
            params: {
                manage:""
            },
            data: {},
            header: {},
            return: {},
            parseData({grouby, track}) {
                let my_mess = "", my_is = false, _list = {}, list = [],
                    p = Math.floor(Math.random() * 1000 + 200);
                try {
                    grouby.forEach(item => {
                        if (item.statos === undefined) {
                            // _list["无"] = item['count(statos)']
                        } else {
                            _list[item.statos] = item['count(statos)']
                        }
                    });
                    (track instanceof Array) && track.forEach(item => {
                        _list["待跟踪"] = item['count(1)']
                    });
                    my_is = true
                } catch (e) {

                }
                console.log(_list)
                for (let item of Object.entries(_list)) {
                    list.push({
                        label: item[0],
                        num: item[1],
                        id: p++
                    })
                }
                return {
                    my_mess,
                    my_is,
                    list,
                    dict: _list
                };
            },
            realData(data) {
                return data
            },
            realParam({queryOption, userInfo, pageRight}) {
                const {ServerName, AssignName} = unit.poolLimit(userInfo)
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
                } = unit.queryConditionsParse(queryOption)
                pageRight
                return {
                    otime, // 开始时间
                    ptime, // 结束时间
                    channels: channel[0] || "", // 渠道
                    channel: channel[1] || "",
                    nameofadvertiser, // 广告主
                    areas: area[0] || "", // 地市
                    area: area[1] || "", // 地市
                    servicename: ServerName || servicename, // 业务员
                    manage:"a",
                    pageRight
                }
            }
        }
    }
}
