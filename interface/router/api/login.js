module.exports = ({mysql}) => {
    return {
        post: async (req, res) => {
            res.json({
                code: "000",
                data: "",
            })
        },
        get: async (req, res) => {
            const {} = req.query;
            res.json({
                code: "000",
                token: "sas",
                data: req.query,
                username: "张三",
                phone: "15135095126"
            })
        }
    }
}
