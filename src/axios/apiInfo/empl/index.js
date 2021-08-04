import Gpwd from "./Gpwd";
import empldepa from "./empldepa"
import deleteempl from "./deleteempl";
import queryAllde from "./queryAllde";

import unit from "../../../../unit/client.js"

import urls from "../../url"

const java = urls.p8085

let Unit = new unit();
export default {
    empl_Gpwd: Gpwd(java),
    empl_empldepa: empldepa(java),
    empl_deleteempl: deleteempl(java),
    empl_queryAllde: queryAllde(java),
}
