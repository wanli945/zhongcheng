export const List = {
    /*1、 首页*/
    home: () => import("../home/index"),
    /*2、商机单部分*/
    //① 商机单信息流 页面
    infoFlowDataAll: () => import("../business/customerData/infoFlow/all.vue"),
    infoFlowDataAllB: () =>import("../business/customerData/infoFlow/allB.vue"),
    infoFlowDataOneself: () => import("../business/customerData/infoFlow/oneself.vue"),
    infoFlowDataManagement: () => import("../business/customerData/infoFlow/management.vue"),
    infoFlowDataManagementB:() => import("../business/customerData/infoFlow/managementB.vue"),
    // infoFlowDataManagementC: () => import("../business/customerData/infoFlow/managementC.vue"),

    //  单宽维系
    oneBroadband: () => import("../business/customerData/broadband/oneBroadband"),

    // ②电商平台
    tmallDataAll: () => import("../business/customerData/tmall/all.vue"),
    tmallDataOneself: () => import("../business/customerData/tmall/oneself.vue"),
    tmallDataManagement: () => import("../business/customerData/tmall/management.vue"),

    // ③ 分销商
    // distributionDataAll:  ()=>import("../business/customerData/distribution/all.vue"),
    distributionDataOneself: () => import("../business/customerData/distribution/oneself.vue"),
    distributionDataManagement: () => import("../business/customerData/distribution/management.vue"),
    //④ 终端外呼
    breatheDataAll: () => import("../business/customerData/breathe/all.vue"),
    breatheDataOneself: () => import("../business/customerData/breathe/oneself.vue"),
    breatheDataManagement: () => import("../business/customerData/breathe/management.vue"),

    // ⑤ 100000号
    tenHaoDataAll: () => import("../business/customerData/tenHao/all.vue"),
    tenHaoDataOneself: () => import("../business/customerData/tenHao/oneself.vue"),
    tenHaoDataManagement: () => import("../business/customerData/tenHao/management.vue"),

    /*
   * 商机单导入数据配置
   * */
    // 信息流
    infoFlowDataApiConfig: () => import("../businessImportSetting/infoFlow/fyApiSetting/index.vue"),
    // 分销商
    distributionImport: () => import("../businessImportSetting/distribution/index"),
    //万号
    tenHaoImport: () => import("../businessImportSetting/tenHao/index"),


    /*
    * 3、订单管理
    * */

    // ① 订单生产
    orderMake: () => import("../orderManage/orderQuery/orderMake/index"),
    // ② B2I订单
    b2iOrderQuery: () => import("../orderManage/orderQuery/b2iOrderQuery/index"),
    // ③ 短信订单
    MSMOrderQuery: () => import("../orderManage/orderQuery/MSMOrderQuery/index"),
    // ④ 生产报表
    productionReport: () => import("../orderManage/productionReport/index.vue"),

    /*
    * 4、财务模块
    * */
    /*①
    * 提成的
    * */
    unSettled: () => import("../finance/settled/unSettled.vue"), // 待结算
    pending: () => import("../finance/settled/pending.vue"), // 待审核
    failurePending: () => import("../finance/settled/failurePending"), //审核失败
    unReleased: () => import("../finance/settled/unReleased.vue"), // 待发放
    released: () => import("../finance/settled/released.vue"), // 已发放

    /*
    * 佣金页面
    * */
    issued: () => import("../finance/commission/issued.vue"), // 已发放
    notIssued: () => import("../finance/commission/notIssued.vue"), // 未发放

    /*
    * 佣金清单
    * */
    //订单清单
    commOrderList: () => import("../finance/commissionList/commOrderList/index"),
    //资产清单
    assetsList: () => import("../finance/commissionList/assetsList/index"),
    analysis: () => import("../finance/commissionList/analysis/index"),


    /*②佣金配置*/
    commConfig: () => import("../finance/commConfig/index.vue"),
    /*9、 资料管理*/
    // ① 资料配置
    dataConfig: () => import("../dataManage/config/index.vue"),
    assetConfig:()=>import("../dataManage/config/assetConfig.vue"),
    /*
    * 10、字段设置
    * */
    // ①客户详情
    // customer:  ()=>import("../other/customer.vue"), // 客户详情信息

    /*
    * 权限管理
    * */
    departmentManage: () => import('../authority/right/index.vue'),

    userManage: () => import("../authority/userManage/index.vue"),
    /*
    * 产品管理部分:
    * */
    productConfig: () => import("../product/productConfig"),
    newConfig: () => import("../product/newConfig/index.vue"),

    /*
    * 公告配置  系统
    * */
    announcement: () => import("../systemConfiguration/announcement/index"),
    brushConfig: () => import("../systemConfiguration/brushConfig/index"),
    testlogining: () => import("../systemConfiguration/BssLogin/index.vue"),
    // axsLogin: () => import("../systemConfiguration/axsLogin/index.vue"),
    /*
    * 报表
    * */
    // 信息流
    //
    frOverall: () => import("../report/inflow/overall/index"),
    frBusiness: () => import("../report/inflow/business/index"),
    frOperation: () => import("../report/inflow/operation/index"),
    /*
    * 万号报表
    * */
    tenOverall: () => import("../report/tenHao/overall/index"),
    /*
        * 电商报表
        * */
    tmallOverall: () => import("../report/tmall/overall/index"),
    /*
        * 分销报表
        * */
    distriOverall: () => import("../report/distribution/overall/index"),
    /*
            * 外呼报表
            * */
    breatheOverall: () => import("../report/breathe/overall/index")
};
// export const generatorCompute = (arr = [], that) => {
//     console.log(that)
//     const _List = {};
//     arr.forEach(value => {
//         _List[value] = List[value];
//     });
//     return _List;
// }
// export default generatorCompute


