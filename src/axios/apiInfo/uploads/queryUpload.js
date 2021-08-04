export default (baseURL) => {
    return {
        /*
        *  添加权限
        * */
        post: {
            baseURL: baseURL,
            url: "/uploads/queryUpload",
            params: {
                wid: undefined
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry, message, status}) {
                let my_mess = "";
                let my_is = false;
                const list = [];
                switch (code) {
                    case 1:
                        my_mess = "查询成功";
                        my_is = true;
                        entry.forEach(item => {
                            let name = item.commodityt.split("/")
                            let type = item.commodityt.split(".")
                            list.push({
                                id: item.id,
                                fileUrl: item.commodityt,
                                operator: item.uploadname,
                                uploadtime: item.uploadtime,
                                wid: item.wid,
                                fileName: name[name.length - 1],
                                fileType: type[type.length - 1].toLowerCase()
                            });
                        })
                        break;
                    case 0:
                        my_mess = "订单无附件信息";
                        my_is = false;
                        break;
                    default:
                        my_mess = "未知code:" + code
                }
                return {
                    my_mess: my_mess,
                    my_is,
                    list
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
