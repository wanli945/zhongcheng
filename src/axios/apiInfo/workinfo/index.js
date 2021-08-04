import chaxun from "./chaxun.js"
import chaxunre from "./chaxunre";
import pxiu from "./pxiu";
import xiustatues from "./xiustatues";
import autoaccepts from "./autoaccepts";
import autoaccept from "./autoaccept";
import queryAllWorkorder from "./queryAllWorkorder";

import sett_setts from "./sett/setts";
import sett_settstauts from "./sett/settstauts.js";
import sett_settslist from "./sett/settslist"
import urls from "../../url"
import Unit from "../../../../unit/client.js"

const java = urls.p8088
const java1 = urls.p8084
const util = new Unit();

export default {
    workinfo_chaxun: chaxun(java, util),
    workinfo_chaxunre: chaxunre(java, util),
    workinfo_pxiu: pxiu(java),
    workinfo_xiustatues: xiustatues(java),
    workinfo_autoaccepts: autoaccepts(java),
    workinfo_autoaccept: autoaccept(java1),
    workinfo_queryAllWorkorder: queryAllWorkorder(java, util),

    sett_setts: sett_setts(java, util),
    sett_settstauts: sett_settstauts(java, util),
    sett_settslist: sett_settslist(java, util)
}
