export default (baseURL) => {
    /*插入sku*/
    return {
        post: {
            baseURL: baseURL,
            url: "/stucode/addStucodetable",
            params: {
                stuCode : "",
                stuBusinessType: '',    // 业务类型
                productsName: '',   // 产品名称
                stupackagesType: '',  // 可选包类型
                isoocp: '',    // 是否需要oocp支付
                bsspay: '',     // BSS订单类型
                bssType: '',      // BSS订单支付类型

                contractcharge: '', // 合同号收费方式
                plugType: '',     // 插件类型
                isDiscount: '',       // 关联优惠
                flowType: '',   // 流程类型

                goodsType: '', // 商品类型

                paymentType : "", // Oocp支付类型
                upAttachment: "", // 是否需要上传附件
                nameType: "", // 实名类型
                masterCard:"",
                secondaryCard:"",
                bradbandCard:"",
                twobradbandCard:"",
                remark: "",
                unitwidth: "",
                pid: undefined
            },
            data: {},
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
            realData(data) {
                return data
            },
            realParam({
                          stuCode,
                          stuBusinessType,    // 业务类型
                          productsName,   // 产品名称
                          stupackagesType,  // 可选包类型
                          isoocp,    // 是否需要oocp支付
                          bsspay,     // BSS订单类型
                          bssType,      // BSS订单支付类型
                          contractcharge, // 合同号收费方式
                          plugType,     // 插件类型
                          isDiscount,       // 关联优惠
                          flowType,   // 流程类型
                          goodsType, // 商品类型
                          paymentType, // Oocp支付类型
                          upAttachment, // 是否需要上传附件
                          nameType, // 实名类型
                          masterCard,
                          secondaryCard,
                          bradbandCard,
                          twobradbandCard,
                          remark,
                          unitwidth,
                          pid
                      }) {
                return {
                    stuCode,
                    stuBusinessType,    // 业务类型
                    productsName,   // 产品名称
                    stupackagesType,  // 可选包类型
                    isoocp,    // 是否需要oocp支付
                    bsspay,     // BSS订单类型
                    bssType,      // BSS订单支付类型
                    contractcharge, // 合同号收费方式
                    plugType,     // 插件类型
                    isDiscount,       // 关联优惠
                    flowType,   // 流程类型
                    goodsType, // 商品类型
                    paymentType, // Oocp支付类型
                    upAttachment, // 是否需要上传附件
                    nameType, // 实名类型
                    masterCard,
                    secondaryCard,
                    bradbandCard,
                    twobradbandCard,
                    remark,
                    unitwidth,
                    pid
                }
            }
        }
    }
}
