export default (baseURL, unit) => {
    return {
        /*
        *
        * 工单批量分配
        * */
        post: {
            baseURL: baseURL,
            url: "/work/changeuploginno",
            params: {
                data: {
                    data: {},
                    length: 0,
                    uploginno: "",
                    status: '',
                }
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                let my_is = false,
                    my_mess = '未知状态' + code;
                if (code === 1) {
                    my_is = true;
                    my_mess = entry;
                }
                return {
                    my_is,
                    my_mess
                };
            },
            realData(data) {
                return data
            },
            realParam({data, name, editname}) {
                let arr = []
                data.forEach(({workid, status}) => {
                    arr.push({workid, status, curentname: name, uploginno: editname, isitright: 0})
                });
                return {
                    data: JSON.stringify({
                        data: {...arr},
                        length: arr.length,
                        uploginno: name,
                        status: '待受理',
                        isitright: 0
                    })
                }
            }
        }
    }
}
