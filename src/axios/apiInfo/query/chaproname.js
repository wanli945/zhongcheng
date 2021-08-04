export default (baseURL) => {
    /*插入工单*/
    return {
        post: {
            baseURL: baseURL,
            url: "/query/chaproname",
            params: {
                productName: "",
                depaname: "",
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                let list = []
                    ,Plist = []
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

                        Plist.push({
                            value: item.productsName + depaname,
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
                    list,
                    Plist,  //  202012-5G融合套餐169新装包年【杭州】_分销-李伟泽

                    productInfo: list[0]

                };
            },
            realData(data) {
                return data
            },
            realParam({queryString, depaname, acc}) {
                return {
                    // 产品名  部门
                    productsName: queryString,
                    depaname,
                }
            }
        }
    }
}

