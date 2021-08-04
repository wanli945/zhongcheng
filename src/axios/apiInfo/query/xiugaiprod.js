export default (baseURL) => {
    /*插入工单*/
    return {
        post: {
            baseURL: baseURL,
            url: "/query/xiugaiprod",
            params: {
                promoney: "",// 产品金额
                productsname: "", // 产品名称
                procount: "", // 产品数量
                otime: "", // 创建时间
                ptime: "", // 失效时间
                rate: "", // 佣金
                integral: "", // 积分
                deduct: "", // 提成
                id: "",
                enable: 0,
                depaname: "", // 部门

                subsidy: '', // 补贴
                isAuto: undefined,
                payMethod: undefined
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
                        my_mess = "修改成功";
                        my_is = true;
                        break;
                    case 0:
                        my_mess = "修改失败";
                        break;
                    default:
                        my_mess = "未知code:" + code
                }
                return {
                    my_mess,
                    my_is,
                    list
                };
            },
            realData(data) {
                return data
            },
            realParam({
                          productsName,   // 产品名称
                          proMoney,  // 价格
                          proCount,    // 数量
                          rate,     // 佣金
                          integral,      // 积分
                          deduct,    // 提成
                          otime,     // 生效日期
                          ptime,       // 失效日期
                          slname,   // 描述
                          id,
                          enable,
                          depaname, // 部门
                          subsidy, // 补贴
                          isAuto,
                          payMethod,
                          acceptMethod,
                          settlementratio
                      }) {
                return {
                    promoney: proMoney,// 产品金额
                    productsname: productsName, // 产品名称
                    procount: proCount, // 产品数量
                    otime, // 创建时间
                    ptime, // 失效时间
                    rate, // 佣金
                    integral, // 积分
                    deduct, // 提成
                    id,
                    slname,
                    enable,
                    depaname, // 部门
                    subsidy, // 补贴
                    isAuto,
                    payMethod,  //0  人工 | 自动 1
                    acceptMethod,
                    settlementratio
                }
            }
        }
    }
}
