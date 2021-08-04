/*
 * @IDE      : WebStorm
 * @time     : 2021/2/9 10:20
 * @author   : 李艳鹏
 * @Software : app
 * @File     : index
 * @describe :
*/
import fishordCount from "./fishordCount";
import statementlv from "./statementlv";
import stateaddresscount from "./stateaddresscount";
import stateprod from "./stateprod";
import stateservicecount from "./stateservicecount";
import stateqxt from "./stateqxt";
import showtenthousandView from "./showtenthousandView";
import showgraph from "./showgraph"
import showterrain from "./showterrain"
import showperformance from "./showperformance"
import showProd from "./showProd"
import yeji from "./yeji"
import queryDepartment from "./queryDepartment"
import showdistribution from "./showdistribution"
import dshowgraph from "./dshowgraph"
import dshowperformance from "./dshowperformance"
import dshowterrain from "./dshowterrain"
import dshowProd from "./dshowProd"
import tshowdistribution from "./tshowdistribution"
import tshowgraph from "./tshowgraph"
import tshowperformance from "./tshowperformance"
import tshowterrain from "./tshowterrain"
import tshowProd from "./tshowProd"
import queryByProp from "./queryByProd";
import bshowdistribution from "./bshowdistribution"
import bshowgraph from "./bshowgraph"
import bshowterrain from "./bshowterrain"
import bshowperformance from "./bshowperformance"
import bshowProd from "./bshowProd"
import showQuota from "./showQuota"


import urls from "../../url"

const java = urls.p8084
import unit from "../../../../unit/client.js"

let Unit = new unit();

export default {
    fly_fishordCount: fishordCount(java, Unit), // 整体   信息流
    fly_statementlv: statementlv(java, Unit),
    fly_stateaddresscount: stateaddresscount(java, Unit), // 地市
    fly_stateprod: stateprod(java, Unit), // 查询产品 销量+占比
    fly_stateservicecount: stateservicecount(java, Unit),  // 查询业务员  总工单  竣工  退单
    fly_stateqxt: stateqxt(java, Unit), // 折线

    tenthousand_showtenthousandView: showtenthousandView(java,Unit), // 整体   万号
    tenthousand_showgraph: showgraph(java,Unit), // 折线
    tenthousand_showterrain: showterrain(java,Unit), // 地市
    tenthousand_showperformance: showperformance(java,Unit), // 竣工率 业绩
    tenthousand_showProd: showProd(java,Unit),  // 产品排行
    tenthousand_showQuota: yeji(java,Unit),  // 业绩table

    distribution_queryDepartment: queryDepartment(java,Unit), // 分销 部门

    distribution_showdistribution: showdistribution(java,Unit),
    distribution_showgraph: dshowgraph(java,Unit),
    distribution_showperformance: dshowperformance(java,Unit), // 业绩
    distribution_showterrain: dshowterrain(java,Unit),
    distribution_showProd: dshowProd(java,Unit),

    tmall_showdistribution: tshowdistribution(java,Unit),
    tmall_showgraph: tshowgraph(java,Unit),
    tmall_showperformance: tshowperformance(java,Unit),
    tmall_showterrain: tshowterrain(java,Unit),
    tmall_showProd: tshowProd(java,Unit),

    terminal_queryByProd: queryByProp(java,Unit), // 外呼 产品

    terminal_showdistribution: bshowdistribution(java,Unit),
    terminal_showgraph: bshowgraph(java,Unit),
    terminal_showterrain: bshowterrain(java,Unit),
    terminal_showperformance: bshowperformance(java,Unit),
    terminal_showProd: bshowProd(java,Unit),
    terminal_showQuota: showQuota(java,Unit)
}
