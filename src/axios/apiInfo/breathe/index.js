/*
 * @IDE      : WebStorm
 * @time     : 2021/1/7 16:53
 * @author   : 李艳鹏
 * @Software : app
 * @File     : index
 * @describe :
*/

import urls from "../../url";
import Unit from "../../../../unit/client.js";


import insert from "./insert";
import select from "./select";
import selectAll from "./select_All";
import update from "./update";
import zhuan from "./zhuan";
import xiuuplogin from "./xiuuplogin";

let unit = new Unit();
const java = urls.p8088


export default {
    breathe_insert: insert(java),
    breathe_select: select(java, unit),
    breathe_selectAll: selectAll(java, unit),
    breathe_update: update(java, unit),
    breathe_zhuan: zhuan(java, unit),
    breathe_xiuuplogin: xiuuplogin(java, unit),
}

