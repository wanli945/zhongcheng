/*
 * @IDE      : WebStorm
 * @time     : 2020/12/23 10:22
 * @author   : 李艳鹏
 * @Software : app
 * @File     : distsinsert
 * @describe : 分销商广告新增插入
*/

export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/dist/distsinsert",
            params: {
                terrain: '',
                productname: '',
                price: '',
                abjustment: '',
                productsname: '',
            },
            data: {},
            header: {},
            return: {},
            parseData({code, message, entry}) {
                let my_mess = message || entry;
                let my_is = code === 1;
                return {
                    my_mess,
                    my_is
                };
            },
            realData(data) {
                return data
            },
            realParam({info}) {

                return {
                    terrain: info.city.trim(),  // 地市
                    productname: info.commodity.trim(), //商品名称
                    price: info.price, // 价格
                    abjustment: info.tuneFee, // 调测费
                    productsname: info.product.trim(), // 产品名称
                    bottomid: info.picturename
                }
            }
        }
    }
}
