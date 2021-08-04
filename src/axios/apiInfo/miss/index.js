/*
 * @IDE      : WebStorm
 * @time     : 2021/1/13 14:33
 * @author   : 李艳鹏
 * @Software : app
 * @File     : index
 * @describe :
*/

import querycomm from "./querycomm";
import unit from "../../../../unit/client.js"
import urls from "../../url"

const java = urls.p8086

const Util = new unit();

export default {
    miss_querycomm: querycomm(java, Util)
}
