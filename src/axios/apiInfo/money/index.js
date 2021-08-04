import chaxunrate from "./chaxunrate";
import chaxunduct from "./chaxunduct";
import unit from "../../../../unit/client.js"
import urls from "../../url"

const java = urls.p8088

const Util = new unit();

export default {
    money_chaxunrate: chaxunrate(java, Util),
    money_chaxunduct: chaxunduct(java, Util),
}
