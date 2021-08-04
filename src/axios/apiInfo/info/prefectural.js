/*
 * @IDE      : WebStorm
 * @time     : 2021/2/19 16:59
 * @author   : 李艳鹏
 * @Software : app
 * @File     : prefectural
 * @describe :
*/


export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/info/prefectural",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                let my_mess = "未知code" + code, my_is = false, cityObj = {}, cityArr = [];
                if (code === 1) {
                    my_is = true;
                    my_mess = "查询成功";
                    entry.forEach(item => {
                        let arrItem = {
                            label: item.areaname,
                            value: item.areaname,
                            id: item.id,
                            city: item.areaname,
                            children: []
                        };

                        cityObj[item.areaname] || (cityObj[item.areaname] = []);
                        item.pcid && item.pcid.forEach(item2 => {
                            let ojj = {
                                label: item2.areaname,
                                value: item2.areaname,
                                id: item2.id,
                                pid: item2.pid,
                                cityId: item2.id,
                                cityName: item2.areaname,
                                createTime: ""
                            }
                            cityObj[item.areaname].push(ojj);
                            arrItem.children.push(ojj)
                        })
                        cityArr.push(arrItem)
                    })
                }
                // console.log(cityArr)  // 地市数组 c2  c3
                return {
                    my_mess,
                    my_is,
                    cityArr,
                    cityObj
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
