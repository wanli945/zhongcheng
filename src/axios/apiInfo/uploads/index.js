import queryUpload from "./queryUpload";
import workcount from "./workcount";

import businessSinge from "./businessSinge"
import urls from "../../url"
import unit from "../../../../unit/client.js"
import queryAreas from "./queryAreas"



let Unit = new unit();
const java = urls.p8086
const java1 = urls.p8084
export default {
    uploads_queryUpload: queryUpload(java, Unit),
    uploads_workcount: workcount(java, Unit),
    homepage_businessSinge: businessSinge(java1, Unit),
    homepage_queryAreas: queryAreas(java1,Unit)
}
