/*

 * @describe : 分销员
*/

export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url:"/distribution/queryDepartment",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                // console.log(entry)
                let my_mess = code === 1 ? "查询成功" : "查询失败";
                let my_is = code === 1;
                let list = []
                entry.forEach(v =>{
                    const dname = v.split("-")
                    // console.log(dname)
                    list.push({
                        value: dname[1],
                        label:dname[1]
                    })
                  })
                // console.log(list)
                return {
                    my_mess,
                    my_is,
                    list,
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
