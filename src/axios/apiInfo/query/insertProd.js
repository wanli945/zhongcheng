export default (baseURL) => {
    /*插入工单*/
    return {
        post: {
            baseURL: baseURL,
            url: "/query/insertProd",
            params: {},
            data: {
                promoney: "",// 产品金额
                productsName: "", // 产品名称
                proCount: "", // 产品数量
                otime: "", // 创建时间
                ptime: "", // 失效时间
                rate: "", // 佣金
                integral: "", // 积分
                deduct: "", // 提成
                slanme: "", // 创建人

                enable: 0,
                depaname: "", // 部门
                subsidy: '', // 补贴
                isAuto: undefined,
                payMethod: undefined
            },
            header: {},
            return: {},
            parseData({code, entry, message}) {
                let my_mess = entry ? entry : message;
                let my_is = false;
                switch (code) {
                    case 1:
                        my_is = true;
                        break;
                    case 0:
                        my_is = false;
                        break
                    default:
                        my_mess = "未知code:" + code
                }
                return {
                    my_mess,
                    my_is
                };
            },
            realData({
                         productsName,
                         proMoney,
                         proCount,
                         rate,
                         integral,
                         deduct,
                         subsidy,
                         otime,
                         ptime,
                         slname,
                         enable,
                         depaname,
                         title,
                         payMethod,
                         isAuto,
                         acceptMethod,
                         mutile,
                         settlementratio
                     }) {
                return {
                    productsName,
                    proMoney,
                    proCount,
                    rate,
                    integral,
                    deduct,
                    subsidy,
                    otime,
                    ptime,
                    slname,
                    enable,
                    depaname: JSON.stringify({...mutile}),
                    length: mutile.length,
                    title,
                    payMethod,
                    isAuto,
                    acceptMethod,
                    settlementratio
                }
            },
            realParam({
                          productsName,
                          proMoney,
                          proCount,
                          rate,
                          integral,
                          deduct,
                          subsidy,
                          otime,
                          ptime,
                          slname,
                          enable,
                          depaname,
                          title,
                          payMethod,
                          isAuto,
                          acceptMethod,
                          mutile,
                      }) {
                return {}
            }
        }
    }
}
