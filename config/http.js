const url = {
    java: {
        pro: "http://183.129.155.90:8087",
        local: "http://192.168.0.12:8087"
    },
    python: {
        pro: "http://183.129.155.90:2017",
        local: "http://192.168.0.19:2017"
    },
    local: {},
}
module.exports = {
    java: url.java.local,
    python: url.python.pro,
    bssurl: "http://115.233.6.84:8001",
}
