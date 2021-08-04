export default (baseURL) => {
    /*插入工单 只有一个参数的 精准查询*/
    return {
        post: {
            baseURL: baseURL,
            url: "/auto/queryByProds",
            params: {
                productName: "",
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                let list = []
                    , my_mess = ""
                    , my_is = true;
                switch (code) {
                    case 1:
                        my_mess = "成功";
                        my_is = true;
                        break;
                    case 0 :
                        my_mess = '';
                        my_is = true;
                        break;
                    default:
                        my_is = true;
                        my_mess = "未知code:" + code
                }
                console.log(entry)
                if(entry === 0) {
                    return undefined
                } else {
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
                    console.log(list)
                    console.log(list[0].id)
                }
                console.log(my_is,my_mess)
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
            realParam({queryString}) {
                return {
                    // 产品名  部门
                    productsName: queryString,

                }
            }
        }
    }
}

