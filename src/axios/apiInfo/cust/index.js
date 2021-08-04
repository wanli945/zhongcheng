import cust_cha from "./cha.js"
import deleteorder from "./deleteorder";

import urls from "../../url"

const java = urls.p8084


export default {
    cust_cha: cust_cha(java),
    cust_deleteorder: deleteorder(java),   

}
