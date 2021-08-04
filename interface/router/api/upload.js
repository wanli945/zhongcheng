module.exports = ({mysql}) => {
    return {
        post: (req, res) => {
            console.log(req.files)
            res.json({
                mess: "成功",
                code: "000",
                dd: "111",
            })
        }
    }
}
