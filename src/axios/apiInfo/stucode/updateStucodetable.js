export default (baseURL) => {
    /*修改sku*/
    return {
        post: {
            baseURL: baseURL,
            url: "/stucode/updateStucodetable",
            params: {
                stuCode : "",
                stuBusinessType: '',    // 业务类型
                productsName: '',   // 产品名称
                stupackagesType: '',  // 可选包类型
                isoocp: undefined,    // 是否需要oocp支付
                bsspay: '',     // BSS订单类型
                bssType: '',      // BSS订单支付类型

                contractcharge: '', // 合同号收费方式
                plugType: '',     // 插件类型
                isDiscount: '',       // 关联优惠
                flowType: '',   // 流程类型

                goodsType: '', // 商品类型

                paymentType : "", // oocp支付类型
                upAttachment: "", // 是否需要上传附件
                nameType: "", // 实名类型
                masterCard:"",
                secondaryCard:"",
                bradbandCard:"",
                twobradbandCard:"",
                remark: "",
                unitwidth: "",
                pid: undefined,
                id: undefined
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
                          id,
                          pid
                      }) {
                return {
                    stuCode,
                    stuBusinessType,    // 业务类型
                    productsName,   // 产品名称
                    stupackagesType,  // 可选包类型
                    isoocp: isoocp === '是' ? 1 : 2,    // 是否需要oocp支付
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
                    pid,
                    id
                }
            }
        }
    }
}
