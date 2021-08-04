const config = require("./instace")

/*
* 对axios进行配置
* */
module.exports = {
    proxy: config(),
    java: config({ipType: "java", isLocal: true}),
    python: config({ipType: "python", isLocal: true})
}
