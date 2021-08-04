/*
 * @IDE      : WebStorm
 * @time     : 2020/12/24 17:54
 * @author   : 李艳鹏
 * @Software : app
 * @File     : girquery
 * @describe :  分销商查询套图
*/

export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/dist/girquery",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                let my_mess = code === 1 ? '查询成功' : "查询失败";
                let my_is = code === 1;
                const selectList = []
                if (code === 1) {
                    entry.forEach(v => {
                        selectList.push({
                            value: v.picturename,
                            label: v.picturename,
                            id: v.id
                        })
                    })
                }
                return {
                    my_mess,
                    my_is,
                    pictureList: entry,
                    selectList
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
