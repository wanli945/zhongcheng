/*
 * @IDE      : WebStorm
 * @time     : 2020/12/23 10:22
 * @author   : 李艳鹏
 * @Software : app
 * @File     : distsquery
 * @describe : 分销广告配置查询
*/

export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/dist/distsquery",
            params: {
                terrain: '',
                productname: '',
                price: '',
                abjustment: '',
                productsname: '',
                picturename: ""
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                let my_mess = code === 1 ? '查询成功' : "查询失败";
                let my_is = code === 1;
                let tableData = []
                if (code === 1) {
                    entry.forEach(v => {
                        tableData.push({
                            id: v.id,
                            commodity: v.productname,
                            price: v.price,
                            city: v.terrain,
                            tuneFee: v.adjustment,
                            product: v.productsname,
                            createTime: v.createtime,
                            picturename: v.botid.picturename
                        })
                    })
                }
                return {
                    my_mess,
                    my_is,
                    tableData
                };
            },
            realData(data) {
                return data
            },
            realParam({
                          product = '',
                          city = '',
                          templateId = ''
                      } = {}) {
                return {
                    terrain: city.trim(),
                    productsname: product.trim(),
                    picturename: templateId || ""
                }
            }
        }
    }
}
