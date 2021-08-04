export default (baseURL, unit) => {
    return {
        /*
        *
        * 查询流
        * */
        post: {
            baseURL: baseURL,
            url: "/fley/liu",
            params: {
                flowName: "",
                enble: -1
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                let my_mess = "", my_is = false, list = [], select = [], selectIndex = {};
                if (code === 1) {
                    my_mess = "查询成功";
                    try {
                        let i = 0;
                        entry.forEach((item, index) => {
                            list.push({
                                id: item.id,
                                templateName: item.flowName,
                                enable: item.enble,
                                templateData: JSON.parse(item.stateName)
                            });
                            selectIndex[item.flowName] = index;
                            select.push({
                                id: item.id,
                                label: item.flowName,
                                value: index,
                                enable: item.enble,
                                state: JSON.parse(item.stateName)[0].title
                            });
                        });
                        my_is = true
                    } catch (e) {
                        my_mess = "数据格式有误不能被解析"
                    }
                }
                console.log(list)
                console.log(select)
                return {
                    my_mess,
                    my_is,
                    list,
                    select,
                    selectIndex
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
