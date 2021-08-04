/*
 * @IDE      : WebStorm
 * @time     : 2020/12/31 9:19
 * @author   : 李艳鹏
 * @Software : app
 * @File     : index
 * @describe :
*/

import insert from "./insert";
import select from "./select";
import selectAll from "./selectAll";
import update from "./update";
import xiuuplogin from "./xiuuplogin";
import setInsert from "./setInsert";
import setSelect from "./setSelect";
import setUpdate from "./setUpdate";
import setDelete from "./setDelete";
import aboutbusiness from "./aboutbusiness";
import autobusiness from "./autobusiness";
import urls from "../../url"

import unit from "../../../../unit/client.js"

let Unit = new unit();
const java = urls.p8088
export default {
    tent_insert: insert(java, Unit),
    tent_select: select(java, Unit),
    tent_update: update(java, Unit),

    tent_selectAll: selectAll(java, Unit),

    tent_setSelect: setSelect(java),
    tent_setInsert: setInsert(java),
    tent_setUpdate: setUpdate(java),
    tent_setDelete: setDelete(java),
    tent_aboutbusiness: aboutbusiness(java, Unit),
    tent_autobusiness: autobusiness(java, Unit),
    tent_xiuuplogin: xiuuplogin(java),

}
