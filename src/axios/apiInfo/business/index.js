/*
 * @IDE      : WebStorm
 * @time     : 2021/3/23 15:51
 * @author   : 李艳鹏
 * @Software : app
 * @File     : index
 * @describe :
*/


import showBusinessView from "./showBusinessView.js"
import queryAdvertisingView from "./queryAdvertisingView";
import showPerformanceView from "./showPerformanceView";
import querReginView from "./querReginView";
import queryFailureType from "./queryFailureType"
import urls from "../../url"

const java = urls.p8084
import unit from "../../../../unit/client.js"

let Unit = new unit();
export default {
    business_showBusinessView: showBusinessView(java, Unit),
    business_queryAdvertisingView: queryAdvertisingView(java, Unit),
    business_showPerformanceView: showPerformanceView(java, Unit),
    business_querReginView: querReginView(java, Unit),
    business_queryFailureType: queryFailureType(java, Unit)
}
