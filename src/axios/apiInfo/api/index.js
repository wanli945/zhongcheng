import getRouter from "./getRouter"
import login from "./login"
import verify from "./verify.js"
import getbustable from "./getbustable"
import getStatus from "./getStatus"
import getfy from "./getfy"
import upload from "./upload"

import urls from "../../url"

const java = urls.p8083
export default {
    api_getRouter: getRouter(java),
    api_login: login(java),
    api_verify: verify(java),
    api_getbustable: getbustable(java),
    api_getStatus: getStatus(java),
    api_getfy: getfy(java),
    api_upload: upload(java)
}
