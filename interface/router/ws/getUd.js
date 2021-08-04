const mu = require("../../../schedule")


module.exports = (
    {
        wsInstance
    }
) => {

    return {
        ws: async (ws, req) => {
            const dd = mu((d) => {
                ws.send(d);
            })
            ws.on("open", (msg) => {
                console.log(msg + "打开")
            })
            ws.on('message', (msg) => {
                ws.send(msg)
                console.log('个数' + [...wsInstance.getWss().clients].length)
            });
            ws.on("close", (msg) => {
                console.log(msg)
            })
            ws.on("error", () => {
                ws.close()
            })
        }
    }
}
