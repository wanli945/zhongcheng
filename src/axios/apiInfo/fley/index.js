import queryFi from "./queryFi.js"
import xiuuplogin from "./xiuuplogin"
import insertOneFi from "./insertOneFi"

import transferorder from "./transferorder";
import xiugai from "./xiugai";
import grouby from "./grouby";
import insertliu from "./liu/insertliu";
import liu from "./liu/liu"
import updateliu from "./liu/updateliu";
import deleteliu from "./liu/deleteliu";
import queryAllFi from "./queryAllFi";
import remind from "./remind";
import keepQueryFi from "./keepQueryFi";
import keepXiugai from "./keepXiugai";
import keepInsertOneFi from "./keepInsertOneFi";
import keepXiuuplogin from "./keepXiuuplogin"

import urls from "../../url"

const java = urls.p8084

import unit from "../../../../unit/client.js"

let Unit = new unit();
export default {
    keep_queryFi: keepQueryFi(java,Unit),
    keep_xiugai: keepXiugai(java,Unit),
    keep_insertOneFi: keepInsertOneFi(java,Unit),
    keep_xiuuplogin: keepXiuuplogin(java,Unit),
    fley_queryFi: queryFi(java, Unit),
    fley_queryAllFi: queryAllFi(java, Unit),
    fley_xiuuplogin: xiuuplogin(java, Unit),
    fley_insertOneFi: insertOneFi(java),
    fley_transferorder: transferorder(java, Unit),
    fley_xiugai: xiugai(java),
    fley_grouby: grouby(java, Unit),
    fley_remind: remind(java, Unit),
    fley_liu_insertliu: insertliu(java, Unit),
    fley_liu_liu: liu(java, Unit),
    fley_liu_updateliu: updateliu(java, Unit),
    fley_liu_deleteliu: deleteliu(java, Unit),
}
