
export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/tent/queryAlltenthousan",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                console.log(entry)
                let my_mess = code === 1 ? "查询成功" : "查询失败";
                let my_is = code === 1;
                let list = [], proList = [], proDict = {};
                code === 1 && entry.forEach(v => {

                    list.push({
                            id: v.id,
                            productName: v.prodctname,
                            area: v.area,
                            areas: v.areas,
                            department: v.servicename
                        }
                    );

                    proList.push({
                        product: v.prodctname, // 产品名称  *
                        area: v.area, // 地市 *
                        areas: v.areas,
                        marketing: "营销成功", // 行销结果 *
                        department: v.servicename, // 业务员 *
                    })
                    if (proDict[v.servicename] instanceof Array) {
                        proDict[v.servicename].push({
                            product: v.prodctname, // 产品名称  *
                            area: v.area, // 地市 *
                            areas: v.areas,
                            marketing: "营销成功", // 行销结果 *
                            serviceName: '', // 业务员 *
                        })
                    } else {
                        proDict[v.servicename] = [];
                        proDict[v.servicename].push({
                            product: v.prodctname, // 产品名称  *
                            area: v.area, // 地市 *
                            areas: v.areas,
                            marketing: "营销成功", // 行销结果 *
                            serviceName: '', // 业务员 *
                        })
                    }
                })
                console.log(list)
                console.log(proList)
                console.log(proDict)  // 以 部门 为 数组， 包含 地市 营销成功  产品
                return {
                    my_mess,
                    my_is,
                    list,
                    proList,
                    proDict
                };
            },
            realData(data) {
                return data
            },
            realParam(param) {
                return param
            }
        }
    }
}
