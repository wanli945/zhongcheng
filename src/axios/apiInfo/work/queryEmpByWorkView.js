
export default (baseURL, unit) => {
    return {

        post: {
            // verify: true,
            baseURL: baseURL,
            url: "/work/queryEmpByWorkView",
            params: {
                name: '',
            },
            data: {},
            header: {},
            return: {},
            parseData({code,entry}) {
                // console.log(code,entry)
                let my_is = true;
                let obj = {};
                let arr = [];
                entry.forEach(val => {
                    obj[val.status] = val["count(1)"];
                })
                // console.log(obj)
                for (let item of Object.entries(obj)) {
                    arr.push({
                        status: item[0],
                        num: item[1],
                    })
                }
                // console.log(arr)
                return {
                    my_is,
                    my_mess: "查询成功",
                    code,
                    entry,
                    obj,
                    arr
                };
            },
            realData(data) {
                return data
            },

            realParam({name}) {
                return  {
                    name
                }
            },

        }
    }
}
