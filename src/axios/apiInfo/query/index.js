import charu from "./charu";
import chaproname from "./chaproname.js"
import queryAll from "./queryAll";
import insertProd from "./insertProd";
import xiugaiprod from "./xiugaiprod";
import queryByProd from "./queryByProp";
import queryByProds from "./queryByProds"

import urls from "../../url"

const java = urls.p8084
const java1 = urls.p8088


export default {
    query_charu: charu(java),
    query_chaproname: chaproname(java),
    query_queryAll: queryAll(java),
    query_insertProd: insertProd(java),
    query_xiugaiprod: xiugaiprod(java),
    auto_queryByProp: queryByProd(java1),
    auto_queryByProds: queryByProds(java1)
}
