import {product_config_parsing} from "../../../data/product.data";

export default (baseURL) => {
    /*插入工单*/
    return {
        post: {
            baseURL: baseURL,
            url: "/stucode/queryByskuNameOrskuCode",
            params: {
                productsName: "",
                pageNum: 1,
                pageSize: 10
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry, message}) {
                console.log(entry)
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
                    entry.list.forEach((item, index) => {
                        let product = item.productsName.split('_')
                        list.push({
                            id: item.id, //
                            productsName: item.productsName, // 产品名
                            // productsName: item.productsName ? product[0] : '', // 产品名

                            stuCode: item.stuCode ,
                            stuBusinessType: item.stuBusinessType, // 业务类型
                            stupackagesType: item.stupackagesType ==='1' ? '集团' : (item.stupackagesType==='2' ? '省内':'本地'), // 可选包类型

                            isoocp: item.isoocp === 1 ? '是' : '否', // 是否oocp支付

                            bsspay: item.bsspay,  // BSS订单支付类型
                            bssType: item.bssType === '1' ? '人工单' : '自动单', //
                            contractcharge: item.contractcharge, // 合同号收费方式
                            plugType: item.plugType, // 插件类型
                            isDiscount: item.isDiscount === '1' ? '是' : '否', // 关联优惠

                            flowType: item.flowType,  // 流程类型
                            index,
                            goodsType: item.goodsType === '0' ? '人工受理' : '自动受理', // 商品类型
                            paymentType: item.paymentType || "",  // Oocp支付类型
                            upAttachment:  item.upAttachment,   // 是否需要上传附件
                            nameType: item.nameType,   // 实名类型
                            masterCard:item.masterCard,   // 主卡添加包
                            secondaryCard:item.secondaryCard,   // 副卡
                            bradbandCard:item.bradbandCard,  // 宽带
                            twobradbandCard:item.twobradbandCard, // 二宽
                            remark: item.remark, // 备注
                            unitwidth: item.unitwidth=== '1' ? '单宽' : '融合', // 套餐类型
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
            realParam({pageNum, pageSize,productsName, stuCode}) {
                return {
                    pageNum,
                    pageSize,
                    productsName,
                    stuCode
                }
            }
        }
    }
}
