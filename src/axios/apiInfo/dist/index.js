/*
 * @IDE      : WebStorm
 * @time     : 2020/12/23 10:22
 * @author   : 李艳鹏
 * @Software : app
 * @File     : index
 * @describe : 广告配置
*/
import distsdele from "./distsdele";
import distsinsert from "./distsinsert";
import distsquery from "./distsquery";
import querydist from "./querydist";
import distsupdate from "./distsupdate";
import transferlist from "./transferlist";
import disxiu from "./disxiu";
import girquery from "./girquery";
import Unit from "../../../../unit/client.js"
import urls from "../../url"

const java = urls.p8088;
const unit = new Unit();
export default {
    dist_distsdele: distsdele(java, unit),
    dist_distsinsert: distsinsert(java, unit),
    dist_distsquery: distsquery(java, unit),
    dist_querydist: querydist(java, unit),
    dist_distsupdate: distsupdate(java, unit),
    dist_transferlist: transferlist(java, unit),

    dist_disxiu: disxiu(java, unit),
    dist_girquery: girquery(java, unit),
}
