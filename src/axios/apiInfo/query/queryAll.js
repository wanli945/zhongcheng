import {product_config_parsing} from "../../../data/product.data";

export default (baseURL) => {
    /*插入工单*/
    return {
        post: {
            baseURL: baseURL,
            url: "/query/queryAll",
            params: {
                productsName: "",
                pageNum: 1,
                pageSize: 10
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry, message}) {
                let my_mess = "";
                let my_is = false;
                const list = [];
                switch (code) {
                    case 1:
                        my_mess = "成功";
                        my_is = true;
                        break;
                    default:
                        my_mess = "未知code:" + code
                }
                try {
                    /*
                       *
                       * 1200 后付费
                       * 1201 准实时预付费
                       * 2100 预付费
                       *
                       * */

                    const payMethodDict = product_config_parsing.payMethod,
                        isAutoDict = product_config_parsing.isAuto,
                        enableDict = product_config_parsing.enable,
                        acceptMethodDict = product_config_parsing.acceptMethod;
                    console.log(entry)

                    entry.list.forEach((item, index) => {
                        list.push({
                            id: item.id, //
                            productsName: item.productsName, // 产品名
                            depaname: item.depaname || "", // 部门
                            proMoney: item.proMoney, // 金额
                            proCount: item.proCount, // 数量
                            otime: item.otime,
                            ptime: item.ptime,

                            rate: item.rate,  //  佣金
                            integral: item.integral,    //   积分
                            deduct: item.deduct,      //   提成
                            subsidy: item.subsidy,   // 补贴
                            enable: enableDict[item.enable], // 是否启用  0启用  1不启用
                            slname: item.slname,
                            index,
                            // todo 2020-11-25 付费方式 + 是否自动单
                            payMethod: payMethodDict[item.payMethod] || "", //
                            isAuto: isAutoDict[item.isAuto] || "",
                            acceptMethod: acceptMethodDict[item.acceptMethod] || "",  // 受理方式
                            settlementratio: item.settlementratio, // 倍率
                            originalData: {
                                payMethod: item.payMethod || "", //
                                isAuto: item.isAuto || "",
                                enable: item.enable,
                                acceptMethod: item.acceptMethod
                            }
                        })
                    });
                } catch (e) {
                    my_mess = "数据解析错误";
                    my_is = false
                }
                return {
                    my_mess,
                    my_is,
                    list: list,
                    total: entry.total,
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
