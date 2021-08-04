import comm from "./apiInfo/comm/index"
// import api from "./apiInfo/api/index"
import coms from "./apiInfo/coms/index"
import staff from "./apiInfo/staff/index"
import cust from "./apiInfo/cust/index"
import query from "./apiInfo/query/index"
import work from './apiInfo/work/index'
import fley from './apiInfo/fley/index'
import info from './apiInfo/info/index'
import empl from "./apiInfo/empl/index"
import workinfo from "./apiInfo/workinfo/index"
import daoexecel from "./apiInfo/daoexcel/index"
import money from "./apiInfo/money/index"
import uploads from "./apiInfo/uploads/index";
import dist from "./apiInfo/dist/index"
import tent from "./apiInfo/tent/index"
import tmall from "./apiInfo/tmall/index"
import breathe from "./apiInfo/breathe/index"
import miss from "./apiInfo/miss/index"
import fly from "./apiInfo/fly/index"
import business from "./apiInfo/business/index";
import stucode from './apiInfo/stucode/index'
const Api = {
    // ...api,
    ...coms,
    ...staff,
    ...cust,
    ...query,
    ...work,
    ...fley,
    ...info,
    ...comm,
    ...empl,
    ...workinfo,
    ...daoexecel,
    ...uploads,
    ...money,
    ...dist,
    ...tent,
    ...tmall,
    ...breathe,
    ...miss,
    ...fly,
    ...business,
    ...stucode
}

const _ApiList = {}
Object.keys(Api).forEach(value => {
    _ApiList[value] = value
});

export const ApiObj = Api;
export const ApiList = _ApiList;
// console.log(Api)
export default Api;
export const login = {
    ...staff
}
