import Storage from "../../common/js/token";

export const c_token = new Storage("token", false), // token  不为json
    c_router = new Storage("router", true), // router
    c_user = new Storage('user', true), // 存放 用户名 和手机号
    c_tabs = new Storage('tabs', true),
    c_fytable = new Storage('fytable', true),
    /*
    * 信息商机单的列
    * */
    c_fytable_infoFlow = new Storage('fytable', true),
    c_tmalltable_infoFlow = new Storage('tmalltable', true),
    c_breathtable_infoFlow = new Storage('breathtable', true),
    c_tenHaotable_infoFlow = new Storage('tenHaotable', true),
    c_distributiontable_infoFlow = new Storage('distributiontable', true),

    /*
    * 订单管理
    * */
    c_ordertable = new Storage('ordertable', true),
    c_B2Iordertable = new Storage('B2Iordertable', true),
    c_MSMordertable = new Storage('MSMordertable', true),

    c_right = new Storage('right', true),
    c_menu = new Storage('menu', true),
    c_Fassign = new Storage('f_assign', false),
    // c_title = new Storage('title', false),
    c_anlaysis = new Storage('anlaysis', true),
    c_collapse = new Storage('collapse', true);

export default {
    c_token,
    c_router,
    c_user,
    c_tabs,
    c_fytable,
    c_ordertable,
    c_fytable_infoFlow,
    c_tmalltable_infoFlow,
    c_breathtable_infoFlow,
    c_distributiontable_infoFlow,
    c_tenHaotable_infoFlow,
    c_B2Iordertable,
    c_MSMordertable,
    c_Fassign,
    c_right,
    c_menu,
    c_anlaysis,
    // c_title,
    c_collapse
}
