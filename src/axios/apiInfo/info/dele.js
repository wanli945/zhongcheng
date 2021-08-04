export default (baseURL) => {
    /*删除公告*/
    return {
        post: {
            baseURL: baseURL,
            url: "/info/dele",
            params: {
                id: 0
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry = []} = {}) {
                let my_mess = "", my_is = false, list = [], notiList = [];
                switch (code) {
                    case 1:
                        my_mess = "删除成功";
                        my_is = true;
                        break;
                    case 0:
                        my_mess = "删除失败";
                        break;
                    default:
                        my_mess = "未知code:" + code
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
