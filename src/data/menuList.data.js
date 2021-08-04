export default [
    // 所有 首页
    { // 组件  home
        "id": 1,
        "parentMenuId": 0,   // 父 id
        "name": "home",   // src/main/index.components.js 里的组件名对应
        "icon": "el-icon-s-home",
        "alias": "首页",
        "sort": 0,    //
        "value": '',
        "type": "LINK", // 类型 是否可以点击
        "description": "系统的首页",  // 备注
        "createUserId": 1,
        "children": null
    },
    // 商机单模块
    {

        "id": 2,
        "parentMenuId": 0,
        "name": "business",
        "icon": "el-icon-s-finance",
        "alias": "商机单",
        "sort": 0,
        "value": null,
        "type": "NONE",
        "description": "毛坯订单",
        "createUserId": 1,
        "children": [
            {    // customerData

                "id": 21,
                "parentMenuId": 2,
                "name": "infoFlow",
                "icon": "",
                "alias": "信息流",
                "sort": 2,
                "value": "/user/integral",
                "type": "LINK",
                "description": "商机单流转",
                "createUserId": 1,
                "children": [
                    {    // customerData

                        "id": 211,
                        "parentMenuId": 21,
                        "name": "infoFlowDataAll",
                        "icon": "",
                        "alias": "公共池",
                        "sort": 3,
                        "value": "/user/integral",
                        "type": "LINK",
                        "description": "商机单流转",
                        "createUserId": 1,
                        "children": null
                    },
                    {
                        "id": 215,
                        "parentMenuId": 21,
                        "name": "infoFlowDataAllB",
                        "icon": "",
                        "alias": "公共池B",
                        "sort": 3,
                        "value": "/user/integral",
                        "type": "LINK",
                        "description": "商机单流转",
                        "createUserId": 1,
                        "children": null
                    },
                    {    // customerData

                        "id": 212,
                        "parentMenuId": 21,
                        "name": "infoFlowDataOneself",
                        "icon": "",
                        "alias": "个人池",
                        "sort": 3,
                        "value": "/user/integral",
                        "type": "LINK",
                        "description": "商机单流转",
                        "createUserId": 1,
                        "children": null
                    },
                    {    // customerData

                        "id": 213,
                        "parentMenuId": 21,
                        "name": "infoFlowDataManagement",
                        "icon": "",
                        "alias": "管理池A",
                        "sort": 3,
                        "value": "/user/integral",
                        "type": "LINK",
                        "description": "商机单流转",
                        "createUserId": 1,
                        "children": null
                    },
                    {
                        "id": 216,
                        "parentMenuId": 21,
                        "name": "infoFlowDataManagementB",
                        "icon": "",
                        "alias": "管理池B",
                        "sort": 3,
                        "value": "/user/integral",
                        "type": "LINK",
                        "description": "商机单流转",
                        "createUserId": 1,
                        "children": null
                    },
                    // {
                    //     "id": 217,
                    //     "parentMenuId": 21,
                    //     "name": "infoFlowDataManagementC",
                    //     "icon": "",
                    //     "alias": "管理池C",
                    //     "sort": 3,
                    //     "value": "/user/integral",
                    //     "type": "LINK",
                    //     "description": "商机单流转",
                    //     "createUserId": 1,
                    //     "children": null
                    // },
                    {    // customerData

                        "id": 214,
                        "parentMenuId": 21,
                        "name": "infoFlowDataApiConfig",
                        "icon": "",
                        "alias": "配置(测试)",
                        "sort": 3,
                        "value": "/user/integral",
                        "type": "LINK",
                        "description": "商机单流转",
                        "createUserId": 1,
                        "children": null
                    },
                ]
            },
            {
                "id": 26,
                "parentMenuId": 2,
                "name": "oneBroadband",
                "icon": "",
                "alias": "单宽维系",
                "sort": 2,
                "value": "/user/integral",
                "type": "LINK",
                "description": "单宽信息",
                "createUserId": 1,
                "children": null
            },
            {
                "id": 22,
                "parentMenuId": 2,
                "name": "tmall",
                "icon": "",
                "alias": "电商平台",
                "sort": 2,
                "value": "/user/integral",
                "type": "LINK",
                "description": "商机单流转",
                "createUserId": 1,
                "children": [
                    {    // customerData

                        "id": 221,
                        "parentMenuId": 22,
                        "name": "tmallDataAll",
                        "icon": "",
                        "alias": "公共池",
                        "sort": 3,
                        "value": "/user/integral",
                        "type": "LINK",
                        "description": "天猫公共池",
                        "createUserId": 1,
                        "children": null
                    },
                    {    // customerData

                        "id": 222,
                        "parentMenuId": 22,
                        "name": "tmallDataOneself",
                        "icon": "",
                        "alias": "个人池",
                        "sort": 3,
                        "value": "/user/integral",
                        "type": "LINK",
                        "description": "天猫个人池",
                        "createUserId": 1,
                        "children": null
                    },
                    {    // customerData

                        "id": 223,
                        "parentMenuId": 22,
                        "name": "tmallDataManagement",
                        "icon": "",
                        "alias": "管理池",
                        "sort": 3,
                        "value": "/user/integral",
                        "type": "LINK",
                        "description": "天猫管理池",
                        "createUserId": 1,
                        "children": null
                    },
                ]
            },
            {    // customerData

                "id": 23,
                "parentMenuId": 2,
                "name": "distributionData",
                "icon": "",
                "alias": "分销",
                "sort": 2,
                "value": "/user/integral",
                "type": "LINK",
                "description": "商机单流转",
                "createUserId": 1,
                "children": [
                    {
                        "id": 231,
                        "parentMenuId": 23,
                        "name": "distributionDataOneself",
                        "icon": "",
                        "alias": "个人池",
                        "sort": 0,
                        "value": null,
                        "type": "link",
                        "description": "分销管理池",
                        "createUserId": 1
                    },
                    {
                        "id": 232,
                        "parentMenuId": 23,
                        "name": "distributionDataManagement",
                        "icon": "",
                        "alias": "管理池",
                        "sort": 0,
                        "value": null,
                        "type": "link",
                        "description": "分销管理池",
                        "createUserId": 1
                    },
                    {
                        "id": 233,
                        "parentMenuId": 23,
                        "name": "distributionImport",
                        "icon": "",
                        "alias": "配置",
                        "sort": 0,
                        "value": null,
                        "type": "link",
                        "description": "分销商H5页面配置",
                        "createUserId": 1
                    },
                ],

            },
            {    // customerData

                "id": 24,
                "parentMenuId": 2,
                "name": "breathe",
                "icon": "",
                "alias": "终端外呼",
                "sort": 2,
                "value": "/user/integral",
                "type": "LINK",
                "description": "商机单流转",
                "createUserId": 1,
                "children": [
                    {    // customerData

                        "id": 241,
                        "parentMenuId": 24,
                        "name": "breatheDataAll",
                        "icon": "",
                        "alias": "公共池",
                        "sort": 3,
                        "value": "/user/integral",
                        "type": "LINK",
                        "description": "商机单流转",
                        "createUserId": 1,
                        "children": null
                    },
                    {    // customerData

                        "id": 242,
                        "parentMenuId": 24,
                        "name": "breatheDataOneself",
                        "icon": "",
                        "alias": "个人池",
                        "sort": 3,
                        "value": "/user/integral",
                        "type": "LINK",
                        "description": "商机单流转",
                        "createUserId": 1,
                        "children": null
                    },
                    {    // customerData

                        "id": 243,
                        "parentMenuId": 24,
                        "name": "breatheDataManagement",
                        "icon": "",
                        "alias": "管理池",
                        "sort": 3,
                        "value": "/user/integral",
                        "type": "LINK",
                        "description": "商机单流转",
                        "createUserId": 1,
                        "children": null
                    },
                ]
            },
            {    // customerData

                "id": 25,
                "parentMenuId": 2,
                "name": "tenHao",
                "icon": "",
                "alias": "万号",
                "sort": 2,
                "value": "/user/integral",
                "type": "LINK",
                "description": "商机单流转",
                "createUserId": 1,
                "children": [
                    {    // customerData

                        "id": 251,
                        "parentMenuId": 25,
                        "name": "tenHaoDataAll",
                        "icon": "",
                        "alias": "公共池",
                        "sort": 3,
                        "value": "/user/integral",
                        "type": "LINK",
                        "description": "商机单流转",
                        "createUserId": 1,
                        "children": null
                    },
                    {    // customerData

                        "id": 252,
                        "parentMenuId": 25,
                        "name": "tenHaoDataOneself",
                        "icon": "",
                        "alias": "个人池",
                        "sort": 3,
                        "value": "/user/integral",
                        "type": "LINK",
                        "description": "商机单流转",
                        "createUserId": 1,
                        "children": null
                    },
                    {    // customerData

                        "id": 253,
                        "parentMenuId": 25,
                        "name": "tenHaoDataManagement",
                        "icon": "",
                        "alias": "管理池",
                        "sort": 3,
                        "value": "/user/integral",
                        "type": "LINK",
                        "description": "商机单流转",
                        "createUserId": 1,
                        "children": null
                    },
                    {    // 配置产品

                        "id": 254,
                        "parentMenuId": 25,
                        "name": "tenHaoImport",
                        "icon": "",
                        "alias": "配置",
                        "sort": 3,
                        "value": "/user/integral",
                        "type": "LINK",
                        "description": "商机单流转",
                        "createUserId": 1,
                        "children": null
                    },
                ]
            },
        ],
    },
    //订单模块
    {
        "id": 3,
        "parentMenuId": 0,
        "name": "orderManage",
        "icon": "el-icon-s-order",
        "alias": "订单管理",
        "sort": 2,
        "value": null,
        "type": "NONE",
        "description": "用户客户工单信息的管理",
        "createUserId": 1,
        "children": [
            {

                "id": 31,
                "parentMenuId": 3,
                "name": "orderMake",
                "icon": "",
                "alias": "订单生产",
                "sort": 0,
                "value": "/content/classify",
                "type": "LINK",
                "description": "客户订单信息的查询",
                "createUserId": 1,
                "children": null
            }, {

                "id": 32,
                "parentMenuId": 3,
                "name": "b2iOrderQuery",
                "icon": "",
                "alias": "B2I订单(测试)",
                "sort": 0,
                "value": "/content/classify",
                "type": "LINK",
                "description": "客户订单信息的查询",
                "createUserId": 1,
                "children": null
            }, {

                "id": 33,
                "parentMenuId": 3,
                "name": "MSMOrderQuery",
                "icon": "",
                "alias": "短信订单(测试)",
                "sort": 0,
                "value": "/content/classify",
                "type": "LINK",
                "description": "客户订单信息的查询",
                "createUserId": 1,
                "children": null
            },
            {

                "id": 34,
                "parentMenuId": 3,
                "name": "productionReport",
                "icon": "",
                "alias": "生产报表(测试)",
                "sort": 0,
                "value": "/content/classify",
                "type": "LINK",
                "description": "客户订单信息的查询",
                "createUserId": 1,
                "children": null
            },
        ]
    },
    //财务中心
    {

        "id": 4,
        "parentMenuId": 0,
        "name": "financialCenter",
        "icon": "el-icon-s-ticket",
        "alias": "财务中心",
        "sort": 0,
        "value": null,
        "type": "NONE",
        "description": "财务中心",
        "createUserId": 1,
        "children": [
            {
                "id": 41,
                "parentMenuId": 4,
                "name": "settlement",
                "icon": "",
                "alias": "提成结算",
                "sort": 1,
                "value": "/content/classify",
                "type": "NONE",
                "description": "提成结算",
                "createUserId": 1,
                "children": [
                    {
                        "id": 411,
                        "parentMenuId": 41,
                        "name": "unSettled",
                        "icon": "",
                        "alias": "提成待结算",
                        "sort": 3,
                        "value": "/content/classify",
                        "type": "NONE",
                        "description": "提成结算",
                        "createUserId": 1,
                        "children": null
                    },
                    {

                        "id": 412,
                        "parentMenuId": 41,
                        "name": "pending",
                        "icon": "",
                        "alias": "提成待审核",
                        "sort": 3,
                        "value": "/content/classify",
                        "type": "NONE",
                        "description": "提成结算",
                        "createUserId": 1,
                        "children": null
                    },
                    /* {

                         "id": 413,
                         "parentMenuId": 41,
                         "name": "failurePending",
                         "icon": "",
                         "alias": "审核失败",
                         "sort": 3,
                         "value": "/content/classify",
                         "type": "NONE",
                         "description": "提成结算失败的",
                         "createUserId": 1,
                         "children": null
                     },*/
                    {

                        "id": 414,
                        "parentMenuId": 41,
                        "name": "unReleased",
                        "icon": "",
                        "alias": "提成待发放",
                        "sort": 3,
                        "value": "/content/classify",
                        "type": "NONE",
                        "description": "提成结算",
                        "createUserId": 1,
                        "children": null
                    },
                    {

                        "id": 415,
                        "parentMenuId": 41,
                        "name": "released",
                        "icon": "",
                        "alias": "提成已发放",
                        "sort": 3,
                        "value": "/content/classify",
                        "type": "NONE",
                        "description": "提成结算",
                        "createUserId": 1,
                        "children": null
                    },
                ]
            },
            {
                "id": 42,
                "parentMenuId": 4,
                "name": "settledAll",
                "icon": "",
                "alias": "佣金结算",
                "sort": 1,
                "value": "/content/classify",
                "type": "NONE",
                "description": "佣金结算",
                "createUserId": 1,
                "children": [
                    {
                        "id": 421,
                        "parentMenuId": 42,
                        "name": "notIssued",
                        "icon": "",
                        "alias": "佣金未发放",
                        "sort": 3,
                        "value": "/content/classify",
                        "type": "NONE",
                        "description": "佣金结算",
                        "createUserId": 1,
                        "children": null
                    },
                    {

                        "id": 422,
                        "parentMenuId": 42,
                        "name": "issued",
                        "icon": "",
                        "alias": "佣金已发放",
                        "sort": 3,
                        "value": "/content/classify",
                        "type": "NONE",
                        "description": "佣金结算",
                        "createUserId": 1,
                        "children": null
                    },
                ]
            },
            {
                "id": 43,
                "parentMenuId": 4,
                "name": "commissionList",
                "icon": "",
                "alias": "佣金中心",
                "sort": 2,
                "value": "/content/classify",
                "type": "NONE",
                "description": "佣金清单",
                "createUserId": 1,
                "children": [
                    {
                        "id": 431,
                        "parentMenuId": 43,
                        "name": "commOrderList",
                        "icon": "",
                        "alias": "工单清单",
                        "sort": 3,
                        "value": "/content/classify",
                        "type": "NONE",
                        "description": "工单清单",
                        "createUserId": 1,
                        "children": undefined
                    },
                    {
                        "id": 432,
                        "parentMenuId": 43,
                        "name": "assetsList",
                        "icon": "",
                        "alias": "佣金清单",
                        "sort": 3,
                        "value": "/content/classify",
                        "type": "NONE",
                        "description": "工单清单",
                        "createUserId": 1,
                        "children": undefined
                    },
                    {
                        "id": 433,
                        "parentMenuId": 43,
                        "name": "analysis",
                        "icon": "",
                        "alias": "结算分析",
                        "sort": 3,
                        "value": "/content/classify",
                        "type": "NONE",
                        "description": "结算分析",
                        "createUserId": 1,
                        "children": undefined
                    },
                ]
            }
        ]

    },
    //产品管理
    {

        "id": 5,
        "parentMenuId": 0,
        "name": "productManagement",
        "icon": "el-icon-s-claim",
        "alias": "产品管理",
        "sort": 0,
        "value": null,
        "type": "NONE",
        "description": "产品管理中心",
        "createUserId": 1,
        "children": [
            {
                "id": 51,
                "parentMenuId": 5,
                "name": "productConfig",
                "icon": "",
                "alias": "产品配置",
                "sort": 1,
                "value": "/product/productConfig",
                "type": "LINK",
                "description": "产品配置",
                "createUserId": 1,
                "children": null
            },{
                "id": 52,
                "parentMenuId": 5,
                "name": "newConfig",
                "icon": "",
                "alias": "SKU配置",
                "sort": 1,
                "value": "/product/newConfig",
                "type": "LINK",
                "description": "SKU配置",
                "createUserId": 1,
                "children": null
            },
        ]

    },
    //资料管理
    {

        "id": 6,
        "parentMenuId": 0,
        "name": "dataManage",
        "icon": "el-icon-notebook-2",
        "alias": "资料管理",
        "sort": 0,
        "value": null,
        "type": "NONE",
        "description": "对模块的一些字段进行配置",
        "createUserId": 1,
        "children": [
            {

                "id": 61,
                "parentMenuId": 6,
                "name": "dataConfig",
                "icon": "",
                "alias": "资料配置",
                "sort": 0,
                "value": null,
                "type": "link",
                "description": "对模块的一些字段进行配置",
                "createUserId": 1
            },
            {

                "id": 62,
                "parentMenuId": 6,
                "name": "assetConfig",
                "icon": "",
                "alias": "资料",
                "sort": 0,
                "value": null,
                "type": "link",
                "description": "客户资产查询",
                "createUserId": 1
            },
        ]
    },
    //权限管理
    {

        "id": 7,
        "parentMenuId": 0,
        "name": "rightManage",
        "icon": "el-icon-s-management",
        "alias": "权限管理",
        "sort": 0,
        "value": null,
        "type": "NONE",
        "description": "对权限进行管理",
        "createUserId": 1,
        children: [
            {

                "id": 71,
                "parentMenuId": 7,
                "name": "departmentManage",
                "icon": "",
                "alias": "权限配置",
                "sort": 0,
                "value": null,
                "type": "link",
                "description": "部门配置",
                "createUserId": 1

            },
            {

                "id": 72,
                "parentMenuId": 7,
                "name": "userManage",
                "icon": "",
                "alias": "员工管理",
                "sort": 0,
                "value": null,
                "type": "link",
                "description": "对权限进行管理",
                "createUserId": 1
            },
        ]
    },
    //系统配置
    {

        "id": 8,
        "parentMenuId": 0,
        "name": "SystemManage",
        "icon": "el-icon-coin",
        "alias": "系统配置",
        "sort": 0,
        "value": null,
        "type": "NONE",
        "description": "对系统项的管理",
        "createUserId": 1,
        children: [
            {

                "id": 81,
                "parentMenuId": 8,
                "name": "announcement",
                "icon": "",
                "alias": "公告发布",
                "sort": 0,
                "value": null,
                "type": "link",
                "description": "对公告的配置",
                "createUserId": 1
            }, {

                "id": 82,
                "parentMenuId": 8,
                "name": "brushConfig",
                "icon": "",
                "alias": "反刷工号管理",
                "sort": 0,
                "value": null,
                "type": "link",
                "description": "对反刷信息的配置",
                "createUserId": 1
            },{
                "id": 83,
                "parentMenuId": 8,
                "name": "testlogining",
                "icon": "",
                "alias": "BSS登录",
                "sort": 0,
                "value": null,
                "type": "link",
                "description": "登录",
                "createUserId": 1
            }
            // ,{
            //     "id": 84,
            //     "parentMenuId": 8,
            //     "name": "axsLogin",
            //     "icon": "",
            //     "alias": "登录配置",
            //     "sort": 0,
            //     "value": null,
            //     "type": "link",
            //     "description": "登录",
            //     "createUserId": 1
            // }
        ]
    },
    //报表管理
    {
        "id": 9,
        "parentMenuId": 0,
        "name": "ReportManage",
        "icon": "el-icon-s-data",
        "alias": "报表管理",
        "sort": 0,
        "value": null,
        "type": "NONE",
        "description": "对系统项的管理",
        "createUserId": 1,
        children: [
            //信息流
            {

                "id": 91,
                "parentMenuId": 9,
                "name": "flowReport",
                "icon": "",
                "alias": "信息流报表",
                "sort": 0,
                "value": null,
                "type": "link",
                "description": "",
                "createUserId": 1,
                children: [
                    {
                        "id": 911,
                        "parentMenuId": 91,
                        "name": "frOverall",
                        "icon": "",
                        "alias": "信息流整体看板",
                        "sort": 0,
                        "value": null,
                        "type": "link",
                        "description": "",
                        "createUserId": 1,
                        children: null
                    },
                    {
                        "id": 912,
                        "parentMenuId": 91,
                        "name": "frBusiness",
                        "icon": "",
                        "alias": "商机报表",
                        "sort": 0,
                        "value": null,
                        "type": "link",
                        "description": "",
                        "createUserId": 1,
                        children: null
                    },
                    {
                        "id": 913,
                        "parentMenuId": 91,
                        "name": "frOperation",
                        "icon": "",
                        "alias": "运营报表(测试)",
                        "sort": 0,
                        "value": null,
                        "type": "link",
                        "description": "",
                        "createUserId": 1,
                        children: null
                    },
                    /*{
                        "id": 913,
                        "parentMenuId": 91,
                        "name": "frOrder",
                        "icon": "",
                        "alias": "订单报表(测试)",
                        "sort": 0,
                        "value": null,
                        "type": "link",
                        "description": "",
                        "createUserId": 1,
                        children: null
                    },
                    {
                        "id": 914,
                        "parentMenuId": 91,
                        "name": "frOperation",
                        "icon": "",
                        "alias": "运营报表(测试)",
                        "sort": 0,
                        "value": null,
                        "type": "link",
                        "description": "",
                        "createUserId": 1,
                        children: null
                    }*/
                ]
            },
            {

                "id": 92,
                "parentMenuId": 9,
                "name": "tenHaoReport",
                "icon": "",
                "alias": "万号报表",
                "sort": 0,
                "value": null,
                "type": "link",
                "description": "",
                "createUserId": 1,
                children: [
                    {
                        "id": 921,
                        "parentMenuId": 92,
                        "name": "tenOverall",
                        "icon": "",
                        "alias": "万号整体看板",
                        "sort": 0,
                        "value": null,
                        "type": "link",
                        "description": "",
                        "createUserId": 1,
                        children: null
                    },

                ]
            },
            {
                "id": 93,
                "parentMenuId": 9,
                "name": "tmallReport",
                "icon": "",
                "alias": "电商报表",
                "sort": 0,
                "value": null,
                "type": "link",
                "description": "",
                "createUserId": 1,
                children: [
                    {
                        "id": 931,
                        "parentMenuId": 93,
                        "name": "tmallOverall",
                        "icon": "",
                        "alias": "电商整体看板",
                        "sort": 0,
                        "value": null,
                        "type": "link",
                        "description": "",
                        "createUserId": 1,
                        children: null
                    },

                ]
            },
            {
                "id": 94,
                "parentMenuId": 9,
                "name": "distriReport",
                "icon": "",
                "alias": "分销报表",
                "sort": 0,
                "value": null,
                "type": "link",
                "description": "",
                "createUserId": 1,
                children: [
                    {
                        "id": 941,
                        "parentMenuId": 94,
                        "name": "distriOverall",
                        "icon": "",
                        "alias": "分销整体看板",
                        "sort": 0,
                        "value": null,
                        "type": "link",
                        "description": "",
                        "createUserId": 1,
                        children: null
                    },
                ]
            },
            {
                "id": 95,
                "parentMenuId": 9,
                "name": "breatheReport",
                "icon": "",
                "alias": "终端报表",
                "sort": 0,
                "value": null,
                "type": "link",
                "description": "",
                "createUserId": 1,
                children: [
                    {
                        "id": 951,
                        "parentMenuId": 95,
                        "name": "breatheOverall",
                        "icon": "",
                        "alias": "终端整体看板",
                        "sort": 0,
                        "value": null,
                        "type": "link",
                        "description": "",
                        "createUserId": 1,
                        children: null
                    },
                ]
            },
        ]

    }
]
