export default (baseURL, unit) => {
    return {
        /*
        *
        * 工单批量分配
        * */
        post: {
            baseURL: baseURL,
            url: "/work/chaliu",
            params: {
                id: undefined
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                let my_is = false,
                    my_mess = '未获取模板流信息', data = {
                        flowName: "",
                        id: "",
                        stateName: []
                    };
                if (code === 1) {
                    my_is = true;
                    my_mess = "查询成功";
                    try {
                        data = {
                            flowName: entry.flowName,
                            id: entry.id,
                            stateName: JSON.parse(entry.stateName)
                        }
                    } catch (e) {
                        my_is = false;
                        my_mess = "模板流查询格式有误";
                    }
                }
                return {
                    my_is,
                    my_mess,
                    data
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
