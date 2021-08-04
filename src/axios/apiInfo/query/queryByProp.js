export default (baseURL) => {
    /*插入工单 精准查询*/
    return {
        post: {
            baseURL: baseURL,
            url: "/auto/queryByProd",
            params: {
                productsName: "",
                depaname: "",
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                let list = []
                    , my_mess = ""
                    , my_is = false;
                switch (code) {
                    case 1:
                        my_mess = "成功";
                        my_is = true;
                        break;
                    default:
                        my_mess = "未知code:" + code
                }
                // console.log(entry)
                entry.forEach((item) => {
                    let depaname = item.depaname ? ("_" + item.depaname) : ""
                    list.push({
                        value: item.productsName,
                        label: item.productsName + depaname,
                        id: item.id,
                        depaname: item.depaname,
                        isAuto: item.isAuto,
                        payMethod: item.payMethod,
                        acceptMethod: item.acceptMethod,
                        lsname: item.slname
                    })
                });
                // console.log(list)

                return {
                    my_mess,
                    my_is,
                    // entry
                    list,
                    productInfo: list[0]
                };
            },
            realData(data) {
                return data
            },
            realParam({queryString, depaname }) {
                return {
                    // 产品名  部门
                    productsName: queryString,
                    depaname,
                }
            }
        }
    }
}

