import comm_insertOne from "./insertOne.js"
import urls from "../../url"
import unit from "../../../../unit/client.js"

let Unit = new unit();
const java = urls.p8084

export default {
    comm_insertOne: comm_insertOne(java, Unit)
}

