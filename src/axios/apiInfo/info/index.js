import chaxun from "./chaxun"
import chainfor from "./chainfor";
import xiugai from "./xiugai";
import dele from "./dele";
import tree from "./tree";
import queryatree from "./queryatree";
import updatetree from "./updatetree";
import channelquery from "./channelquery";
import channelinsert from "./channelinsert";
import channeldelete from "./channeldelete";
import prefectural from "./prefectural";
import prefecturalin from "./prefecturalin";
import zcpredelete from "./zcpredelete";
import zcpreupdate from "./zcpreupdate";
import urls from "../../url"

const java = urls.p8085


export default {
    info_chaxun: chaxun(java),
    info_chainfor: chainfor(java),
    info_xiugai: xiugai(java),
    info_dele: dele(java),
    info_tree: tree(java),
    info_queryatree: queryatree(java),
    info_updatetree: updatetree(java),
    info_channelquery: channelquery(java),
    info_channelinsert: channelinsert(java),
    info_channeldelete: channeldelete(java),
    info_prefectural: prefectural(java),
    info_prefecturalin: prefecturalin(java),
    info_zcpreupdate: zcpreupdate(java),
    info_zcpredelete: zcpredelete(java),
}
