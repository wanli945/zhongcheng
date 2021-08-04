import excelwork from "./excelwork";
import excelfish from "./excelfish";
import excelprod from "./excelprod";
import exceldata from "./exceldata"
import unit from "../../../../unit/client.js"
import urls from "../../url"

const java = urls.p8086

let Unit = new unit();

export default {
    daoexcel_excelwork: excelwork(java, Unit),
    daoexcel_excelfish: excelfish(java, Unit),
    daoexcel_excelprod: excelprod(java, Unit),
    daoexcel_exceldata: exceldata(java, Unit),
}
