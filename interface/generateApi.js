const auto2http = require("auto2http");
const path = require("path");
const route = auto2http.createApiDict(path.join(__dirname, './router'), true) //   代码提示  path 和 handler
module.exports = auto2http.configApiList([
    {
        path: "/api/getUser",
        handler: route["/api/getUser"],
        method: "GET",
        dynamic: "",
        params: {}
    },
    {
        path: "/api/router",
        handler: route['/api/router'],
        method: 'POST',
        dynamic: "",
        params: {},
        data: {}
    }, {
        path: "/api/login",
        method: "GET",
        handler: route['/api/login'],
        dynamic: ""
    },
    {
        path: "/api/verify",
        method: "POST",
        handler: route['/api/verify'],
        dynamic: ""
    },
    {
        path: "/api/getbustable",
        method: "POST",
        handler: route['/api/getbustable'],
        dynamic: ""
    },
    {
        path: "/api/getStatus",
        dynamic: "",
        method: "POST",
        handler: route["/api/getStatus"]
    },
    {
        path: "/api/getfy",
        dynamic: "",
        method: "POST",
        handler: route["/api/getfy"]
    },
    {
        path: "/api/upload",
        method: "POST",
        dynamic: "",
        handler: route['/api/upload']
    },
    {
        path: "/api/chadepa",
        dynamic: "",
        method: "POST", handler: route['/api/chadepa']
    }
]);
