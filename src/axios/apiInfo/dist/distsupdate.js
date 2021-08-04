/*
 * @IDE      : WebStorm
 * @time     : 2020/12/23 18:08
 * @author   : 李艳鹏
 * @Software : app
 * @File     : distsupdate
 * @describe :
*/


export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/dist/distsupdate",
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
                let my_mess = code === 1 ? '修改成功' : '修改失败';
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
                /*
                city: "嘉兴市"
                commodity: "嘉兴200MB"  商品名称
                id: undefined
                price: "700￥/年"       价格
                product: "单宽50M包年600新装(调测费100)【舟山】"  产品名称
                tuneFee: "itv 100￥"  调测费
                * */
                return {
                    terrain: info.city.trim(),  // 地市
                    productname: info.commodity.trim(), //商品名称
                    price: info.price, // 价格
                    abjustment: info.tuneFee, // 调测费
                    productsname: info.product.trim(), // 产品名称
                    id: info.id,
                    bottomid: info.picturename
                }
            }
        }
    }
}
