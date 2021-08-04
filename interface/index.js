const auto2http = require("auto2http");
const path = require("path");
const apiList = require("./generateApi")  // 导入  apiList
const {local} = require("../config/apiplugin.js")
const config = auto2http.main({
    apiList,
    port: 8083,
    hostname: "localhost",
    httpRoot: path.join(__dirname, "./test.m"),
    flag: "a+"
})

module.exports = (app, plugins) => {
    config.createApi({
        app,
        plugins: {
            mysql: local,
            ...plugins
        },
        callback: (sv) => {

        }
    })
}




