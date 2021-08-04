export default (baseURL, unit) => {
    return {
        /*
        *
        *
        * */
        post: {
            baseURL: baseURL,
            url: "/empl/queryAllde",
            params: {
                ename: ''
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry, message}) {
                let my_mess = "";
                let my_is = false;
                let obj = {
                    depaname: '',
                    did: '',
                    level: '',
                    lid: '',
                };
                switch (code) {
                    case 1:
                        my_is = true;
                        break;
                    default:
                        my_is = false;
                        my_mess = '未知code' + code;
                }
                try {
                    if (entry[0]) {
                        const {depasid, levelsid} = entry[0]
                        obj = {
                            depaname: depasid.dname,
                            did: depasid.id,
                            level: levelsid.lname,
                            lid: levelsid.id
                        }
                    } else {
                        my_is = false;
                        my_mess = "未获取到此业务员的信息"
                    }

                } catch (e) {
                    my_is = false
                    my_mess = "数据解析错误"
                }
                return {
                    my_mess,
                    my_is,
                    ...obj
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
