module.exports = ({mysql}) => {
    return {
        post: async (req, res) => {
            res.json({
                code: 11 === undefined ? -1 : 0,
                data: "",
            })
        },
        get: async (req, res) => {
            setTimeout(() => {
                res.json({
                    code: 11 === undefined ? -1 : 0,
                    data: "|",
                })
            }, 60 * 1000 * 10)
        }
    }
}
