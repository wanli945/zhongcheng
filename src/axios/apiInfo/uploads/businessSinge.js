export default (baseURL, unit) => {
    return {

        post: {
            baseURL: baseURL,
            url: "/homepage/businessSinge",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({code, entry, message, status}) {
                console.log(entry)
                let my_mess = "查询失败";
                let my_is = false;
                const  listPro = [],
                      listPro1 = [];


                if (code === 1) {
                    my_is = true;
                    my_mess = "查询成功";

                    // entry[0].forEach(item => {
                    //     (item["d"] !== undefined && typeof item["d"] === "string") && listPro1.push([item["d"].trim() || "未知", item["count(*)"]])
                    // });
                    // entry[1].forEach(item => {
                    //     (item["d"] !== undefined && typeof item["d"] === "string") && listPro2.push([item["d"].trim() || "未知", item["count(*)"]])
                    // });

                    entry[0].forEach(val => {
                        entry[1].forEach(value => {
                            if(val["d"] === value["d"]) {
                                listPro.push([val["d"].trim() || "未知", val["count(*)"], value["count(*)"]])
                            }
                        })
                    })

                }
                return {
                    // my_mess: my_mess,
                    my_is,
                    listPro
                };
            },
            realData(data) {
                return data
            },
            realParam({timeRage, city, channel}) {
                return {
                    statisticalTime: unit.timestamp(timeRage[0], "yyyy-MM-dd"),
                    reducedTime: unit.timestamp(timeRage[1], "yyyy-MM-dd"),
                    area: city[1] || "",
                    areas: city[0] || "",
                    // channel: channel[1] || "",
                    // channels: channel[0] === '全部' ? '' : (channel[0] ? channel[0] : '')
                    channel: channel[0] === '全部' ? '' : (channel[0] ? channel[0] : '')
                }
            }
        }
    }
}
