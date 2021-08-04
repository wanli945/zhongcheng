const Random = {
    /*随机数字*/
    getRandom(start, end, fixed = 0) {
        let differ = end - start
        let random = Math.random()
        return (start + differ * random).toFixed(fixed)
    },

}

let order = []
for (let i = 0; i < 500; i++) {
    order[i] =
        {
            id: Random.getRandom(10000, 40000), // 商机单编号
            workid: Random.getRandom(20, 500) > 250 ? Random.getRandom(20, 500) : null, // 工单id
            channel: "飞鱼", // 渠道
            phone: "15135052416", // 手机号码
            name: "李" + Random.getRandom(10000, 50000), // 客户姓名
            idcard: "142727199705241114", // 身份证号
            interior: "和平大厦" + Random.getRandom(10000, 50000), // 安装地址
            accept: "宽带" + Random.getRandom(10000, 50000) + 'MB', // 受理业务
            servicename: "", // 业务员
            uploginno: "", // 创建工号
            statos: "待跟踪", // 状态
            amount: null, //
            ordertime: "2020-08-12 12:33:45", // 下单时间
            payment: "", // 付款金额
            remark: null, // 备注
            toproomotelinks: null, // 订单url
            nameofadvertiser: "合讯123",              // 广告主名称
            address: null,                          // 地区
            appointmentime: null,                  // 预约时间
            ok: null,                             //
            trackingtime: "2020-08-12 12:33:45", // 跟踪时间
            failure: null,                      // 失败原因
            uplogintime: "2020-08-12 12:33:45" // 更新时间
        }
}
const allTotal = order.length
module.exports = ({mysql}) => {
    return {
        post: async (req, res) => {
            const {
                curpage,
                pagesize
            } = req.query


            console.log(curpage,pagesize)
            console.log(pagesize * (curpage - 1), pagesize * (curpage - 1) + pagesize)
            res.json({
                code: "000",
                allTotal: order.slice(pagesize * (curpage - 1), pagesize * (curpage - 1) + parseInt(pagesize)),
                total: allTotal,
                params: req.query
            });
        },
        get: async (req, res) => {
            res.json({
                code: 11 === undefined ? -1 : 0,
                data: "|",
            })
        }
    }
}
