module.exports = ({}) => {
    return {
        post: (req, res) => {

            setTimeout(() => {
                res.json({
                    code: 1
                })
            }, 15000)
        },
        get: () => {

        }
    }
}
