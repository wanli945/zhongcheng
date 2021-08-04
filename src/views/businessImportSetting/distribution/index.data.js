/*
 * @IDE      : WebStorm
 * @time     : 2020/12/18 17:16
 * @author   : 李艳鹏
 * @Software : app
 * @File     : index.data
 * @describe : 模拟数据
*/
export default {
    allCity: [
        {value: '杭州市', label: '杭州市'},
        {value: '温州市', label: '温州市'},
        {value: '舟山市', label: '舟山市'},
        {value: '衢州市', label: '衢州市'},
        {value: '湖州市', label: '湖州市'},
        {value: '金华市', label: '金华市'},
        {value: '丽水市', label: '丽水市'},
        {value: '台州市', label: '台州市'},
        {value: '嘉兴市', label: '嘉兴市'},
        {value: '绍兴市', label: '绍兴市'},
        {value: '宁波市', label: '宁波市'}
    ],
    tableData: [
        {
            id: 1,
            commodity: "单宽包年200M",
            price: 900,
            city: "杭州市",
            tuneFee: 20,
            product: "单宽包年200M",
            createTime: "2020-12-21 12:12:12"
        }
    ],
    columns: [
        {label: "编号", field: "id", width: "60"},
        {label: "商品名称", field: "commodity", width: ""},
        {label: "地市", field: "city", width: "80"},
        {label: "价格", field: "price", width: "130"},
        {label: "调测费", field: "tuneFee", width: ""},
        {label: "产品名称", field: "product", width: ""},
        // {label: "创建时间", field: "createTime", width: "180"},
    ]
}
