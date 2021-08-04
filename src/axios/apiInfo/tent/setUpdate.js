/*
 * @IDE      : WebStorm
 * @time     : 2020/12/31 9:23
 * @author   : 李艳鹏
 * @Software : app
 * @File     : setUpdate
 * @describe :
*/


export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/tent/updatetenthousan",
            params: {
                prodctname: "",
                servicename: "",
                area: "",
                id: "",
            },
            data: {},
            header: {},
            return: {},
            parseData({code}) {
                let my_mess = code === 1 ? "修改成功" : "修改失败";
                let my_is = code === 1;
                return {
                    my_mess,
                    my_is
                };
            },
            realData(data) {
                return data
            },
            realParam({productName, department, city, id}) {
                return {
                    prodctname: productName,
                    servicename: department,
                    area: city[1],
                    areas: city[0],
                    id
                }
            }
        }
    }
}
