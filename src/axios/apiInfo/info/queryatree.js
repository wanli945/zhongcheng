export default (baseURL) => {
    /*插入工单*/
    return {
        post: {
            baseURL: baseURL,
            url: "/info/queryatree",
            params: {
                areaname: ""
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                let my_mess = "";
                let my_is = false;
                const list = []
                const cityDict = []
                switch (code) {
                    case 1:
                        my_mess = "成功";
                        my_is = true;
                        break;
                    default:
                        my_mess = "未知code:" + code
                }
                try {
                    entry.forEach((item, index) => {
                        list.push({
                            city: item.areaname,
                            id: item.id,
                            createTime: item.createtime,
                            createPeople: "创建人",
                            isOpen: item.isopen ? '启用' : "禁用",
                            cityItem: item.cityItem
                        },)
                        if (item.isopen === 1) {
                            /*let cityItem = item.cityItem
                            let children = []
                            if (typeof cityItem === "string") {
                                cityItem = cityItem.split("|")
                                cityItem.forEach(value => {
                                    children.push({
                                        label: value,
                                        value: value
                                    })
                                })
                            } else {
                                children = undefined
                            }*/
                            cityDict.push({
                                label: item.areaname,
                                value: item.areaname,
                            })
                        }
                    })
                } catch (e) {

                }
                return {
                    my_mess,
                    my_is,
                    list,
                    cityDict
                };
            },
            realData(data) {
                return data
            },
            realParam(data) {
                return data
            }
        }
    }
}
