module.exports = ({mysql}) => {
    return {
        post: (req, res) => {
            res.json({
                code: "000",
                data: [
                    {
                        num: Math.floor(Math.random() * 100),
                        id: Math.floor(Math.random() * 100),
                        label: "待外呼"
                    }, {
                        num: Math.floor(Math.random() * 100),
                        id: Math.floor(Math.random() * 100),
                        label: "营销成功"
                    }, {
                        num: Math.floor(Math.random() * 100),
                        id: Math.floor(Math.random() * 100),
                        label: "营销失败"
                    }, {
                        num: Math.floor(Math.random() * 100),
                        id: Math.floor(Math.random() * 100),
                        label: "待二次外呼"
                    }
                ]
            })
        },
        get: (req, res) => {

        }
    }
}
