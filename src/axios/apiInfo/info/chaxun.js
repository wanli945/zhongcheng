export default (baseURL) => {
    /*插入工单*/
    return {
        post: {
            baseURL: baseURL,
            url: "/info/chaxun",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({code, entry = []} = {}) {
                let my_mess = "", my_is = false, list = [], notiList = [];
                switch (code) {
                    case 1:
                        my_mess = "查询成功";
                        my_is = true;
                        break;
                    case 0:
                        my_mess = "查询失败";
                        break;
                    default:
                        my_mess = "未知code:" + code
                }

                if (entry) {
                    entry.forEach(({
                                       ctime,
                                       disno,
                                       id,
                                       isoffor,
                                       name,
                                   }) => {
                        list.push({
                            id,
                            text: name,
                            time: ctime,
                            top: isoffor, //置顶
                            enable: disno, // 开启
                        })
                        if (isoffor) {
                            notiList.push({
                                title: name,
                                type: "success",
                                id
                            })
                        }
                    })
                } else {
                    my_is = false;
                    my_mess = "查询失败";
                }
                return {
                    my_mess,
                    my_is,
                    list,
                    notiList
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
