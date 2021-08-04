/*
 * @IDE      : WebStorm
 * @time     : 2021/1/6 15:48
 * @author   : 李艳鹏
 * @Software : app
 * @File     : index
 * @describe :
*/
import urls from "../../url"
import Unit from "../../../../unit/client.js"

import insert from "./insert";
import select from "./select";
import selectAll from "./select_All";
import update from "./update";
import tamllzhuan from "./tamllzhuan";
import xiuuplogin from "./xiuuplogin";

let unit = new Unit();
const java = urls.p8088


export default {
    tmall_insert: insert(java),
    tmall_select: select(java, unit),
    tmall_selectAll: selectAll(java, unit),
    tmall_update: update(java, unit),
    tmall_tamllzhuan: tamllzhuan(java, unit),
    tmall_xiuuplogin: xiuuplogin(java, unit),
}
