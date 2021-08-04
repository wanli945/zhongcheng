import cha from "./cha.js"
import historyqueryll from "./historyqueryll";

import changeuploginno from "./changeuploginno"
import remarks from "./remarks";
import remark from "./remark";
import reminder from "./reminder"
import chaliu from "./chaliu";
import goury from "./goury";
import changecustomerorder from "./changecustomerorder";
import urls from "../../url"
import hangupthenumber from "./hangupthenumber"
import queryEmpByWorkView from "./queryEmpByWorkView"
import crmOrder from "./crmOrder"

const java = urls.p8084
import unit from "../../../../unit/client.js"

let Unit = new unit();
export default {
    work_cha: cha(java, Unit),
    work_historyqueryll: historyqueryll(java),
    work_changeuploginno: changeuploginno(java),
    work_remarks: remarks(java),
    work_remark: remark(java),
    work_reminder: reminder(java),
    work_chaliu: chaliu(java),
    work_goury: goury(java, Unit),
    work_changeInfo: changecustomerorder(java, Unit),
    work_hangupthenumber: hangupthenumber(java,Unit),
    work_queryEmpByWorkView: queryEmpByWorkView(java,Unit),
    crm_crmorder: crmOrder(java,Unit)
}
