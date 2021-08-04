import chadepa from "./chadepa.js"
import queryemply from "./queryemply.js"
import tianjia from "./tianjia"
import login from "./login";
import logins from "./logins";
import login2 from "./loginimg";

import Myunit from "../../../../unit/client.js"
import xiugailevels from "./xiugailevels";
import xiugaidepa from "./xiugaidepa"
import yanzhenimg from "./yanzhenimg";
import yanCode from "./yanCode.js";
import randomCode from "./randomCode";
import loginss from  './loginss'
import LqueryAll from "./LqueryAll";
import refreshcode from "./refreshcode"

import urls from "../../url"

let util = new Myunit();
const java = urls.p8085;
// const test = urls.p8185;
const java1 = urls.p8088
const java2 = urls.p8084


export default {
    staff_chadepa: chadepa(java),
    staff_queryemply: queryemply(java),
    staff_tianjia: tianjia(java),
    staff_login: login(java, util),
    staff_login2: login2(java1, util),

    staff_logins: logins(java, util),
    staff_xiugailevels: xiugailevels(java, util),
    staff_xiugaidepa: xiugaidepa(java),
    staff_yanzhenimg: yanzhenimg(java),
    staff_yanCode: yanCode(java1),
    cust_randomCode:randomCode(java2),
    cust_login: loginss(java2),
    bssverify_queryAll: LqueryAll(java1),
    cust_refreshcode: refreshcode(java2),
}
