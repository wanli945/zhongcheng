module.exports = ({mysql}) => {
    return {
        post: (req, res) => {
            let time = Math.floor(Math.random() * 1000)
            res.json({
                code: "000",
                data: {
                    name: "李三", // 姓名
                    idcard: time, // 身份证号
                    accept: time ? "" : "测试产品", // 产品名称
                    payment: "", // 产品金额
                    remark: "", // 备注
                    interior: "", // 安装地址
                    address: "",// 地区
                    statos: time > 900 ? "营销成功" : (time > 700 ? "营销失败" : (time > 500 ? "待跟踪" : "待外呼")), // 状态
                    failure: time > 900 ? "" : "测试失败",//失败原因
                    id: req.query.id,
                    channel: "信息流_飞鱼",
                    phone: '15135052416',
                    toproomotelinks: "https://www.chengzijianzhan.com/tetris/page/6825610382570471432/",
                    appointmentime: "",
                    trackingtime: "2020-12-13 12:12:04",
                    servicename: Math.floor(Math.random() * 1000) > 500 ? "" : "测试业务员"
                }
            })
        },
        get: (req, res) => {

        }
    }
}
