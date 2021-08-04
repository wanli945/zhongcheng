export default (baseURL, unit) => {
    return {

        post: {
            baseURL: baseURL,
            url: "/homepage/queryAreas",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({code, entry, message, status}) {
                console.log(entry)
                let my_mess = "查询失败";
                let my_is = false;
                const  cityArr = [],
                       index = 0;

                if (code === 1) {
                    my_is = true;
                    my_mess = "查询成功";

                    entry[0] && entry[0].forEach((item,index)=> {
                        (item["custarea"] !== undefined && typeof item["custarea"] === "string") && cityArr.push({
                            area: item["custarea"].trim() || "未知",
                            num: item["cust"],
                            rate: (item["cust"] / entry[1] * 100).toFixed(2),
                            index: index
                        })
                    })
                }

                return {
                    // my_mess: my_mess,
                    my_is,
                    cityArr
                };
            },
            realData(data) {
                return data
            },
            realParam({timeRage, city, channel, options}) {
                return {
                    statisticalTime: unit.timestamp(timeRage[0], "yyyy-MM-dd"),
                    reducedTime: unit.timestamp(timeRage[1], "yyyy-MM-dd"),
                    area: city[1] || "",
                    areas: city[0] || "",
                    channel: channel[0] === '全部' ? '' : (channel[0] ? channel[0] : '')
                }
            }
        }
    }
}
