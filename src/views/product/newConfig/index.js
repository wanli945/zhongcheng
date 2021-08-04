

// SKU
import {product_config_select} from "../../../data/product.data";

export default {
    // columns: [
    //     {label: "产品名称", prop: 'productsName', width: '250'},
    //     {label: "是否启用", prop: 'enable', width: undefined},
    //     {label: '产品价格', prop: 'proMoney', width: '100'},
    //     {label: '产品数量', prop: 'proCount', width: '100'},
    //     {label: '归属部门', prop: 'depaname', width: '180'},
    //     {label: '佣金', prop: 'rate', width: '100'},
    //     {label: '积分', prop: 'integral', width: '100'},
    //     {label: '提成', prop: 'deduct', width: '100'},
    //     {label: '补贴', prop: 'subsidy', width: '100'},
    //     {label: '倍率', prop: 'settlementratio', width: '100'},
    //     {label: '生效时间', prop: 'otime', width: '160'},
    //     {label: '失效时间', prop: 'ptime', width: '160'},
    //     {label: '受理方式', prop: 'acceptMethod', width: '120'},
    //     {label: '付款方式', prop: 'payMethod', width: '120'},
    //     {label: '是否自动单', prop: 'isAuto', width: '100'},
    //     {label: 'sku编码', prop: 'skuCode', width: '100'},
    // ],
    columns: [
            {label: 'sku编码', prop: 'stuCode', width: '100'},
            {label: "产品名称", prop: 'productsName', width: '250'},
            {label: "业务类型", prop: 'stuBusinessType', width: '80'},
            {label: "套餐类型", prop: 'unitwidth', width: '80'},
            {label: '可选包类型', prop: 'stupackagesType', width: '95'},
            {label: '是否需要oocp支付', prop: 'isoocp', width: '140'},
            {label: 'BSS订单支付类型', prop: 'bsspay', width: '135'},
            {label: 'BSS订单类型', prop: 'bssType', width: '110'},
            {label: '合同号收费方式', prop: 'contractcharge', width: '130'},
            {label: '插件类型', prop: 'plugType', width: '80'},
            {label: '关联优惠', prop: 'isDiscount', width: '80'},
            {label: '流程类型', prop: 'flowType', width: '80'},
            {label: '商品类型', prop: 'goodsType', width: '80'},
            {label: 'oocp支付类型', prop: 'paymentType', width: '115'},
            {label: '是否需要上传附件', prop: 'upAttachment', width: '140'},
            {label: '实名类型', prop: 'nameType', width: '80'},
    ],
    addList: [
        {   label: "sku编码", type: 'input', field: 'stuCode', value: "", require: true  },
        {   label: "产品名称",type: "input",field: "productsName",value: "", require: true},
        {   label: "业务类型",type: "select",field: "stuBusinessType",value: "", require: true,
            selectList: [
                {label: "新装", value: "新装"},
                {label: "存量", value: "存量"},
                {label: "其他", value: "其他"},
            ]},
        {   label: "套餐类型",type: "select",field: "unitwidth",value: "", require: true,
            selectList: [
                {label: "单宽", value: "1"},
                {label: "融合", value: "2"},
            ]},
        {   label: "可选包类型",type: "select",field: "stupackagesType",value: "", require: true,
            selectList:[
                {label: "集团", value: "1"},
                {label: "省内", value: "2"},
                {label: "本地", value: "3"},
            ] },
        {   label: "是否需要oocp支付",type: "select",field: "isoocp",value: "", require: true,
            selectList: [
                {label: "是", value: 1},
                {label: "否", value: 2},
            ]},
        {   label: "BSS订单支付类型",type: "select",field: "bsspay",value: "", require: true,
            selectList: [
                {label: "前台", value: "前台"},
                {label: "外线", value: "外线"},
                {label: "计费收费", value: "计费收费"},
            ]},
        {   label: "BSS订单类型",type: "select",field: "bssType",value: "", require: true,
            selectList: [
                {label: "人工单", value: "1"},
                {label: "自动单", value: "2"},
            ]},
        {   label: "合同号收费方式",type: "select",field: "contractcharge",value: "", require: true,
            selectList: [
                {label: "后付费", value: "后付费"},
                {label: "预付费", value: "预付费"},
                {label: "准实时预付费", value: "准实时预付费"},
            ]},
        {   label: "插件类型",type: "select",field: "plugType",value: "", require: true,
            selectList: [
                {label: "单宽", value: "单宽"},
                {label: "融合", value: "融合"},
                {label: "号卡", value: "号卡"},
                {label: "存量", value: "存量"},
            ]},
        {   label: "关联优惠",type: "select",field: "isDiscount",value: "", require: true,
            selectList: [
                {label: "是", value: "1"},
                {label: "否", value: "2"},
            ]},

        {   label: "流程类型",type: "select",field: "flowType",value: "", require: true,
            selectList: [
                {label: "1", value: "1"},
                {label: "2", value: "2"},
                {label: "3", value: "3"},
            ]},
        {   label: "商品类型",type: "select",field: "goodsType",value: "", require: true, selectList: product_config_select.acceptMethod},
        {   label: "oocp支付类型",type: "select",field: "paymentType",value: "", require: true,
            selectList: [
                {label: "代理商扣费", value: "代理商扣费"},
                {label: "线上支付", value: "线上支付"},
                {label: "现金支付", value: "现金支付"},
                {label: "合同号", value: "合同号"},
            ]},
        {   label: "是否需要上传附件",type: "select",field: "upAttachment",value: "", require: true,
            selectList: [
                {label: "是", value: "是"},
                {label: "否", value: "否"},
            ]},
        {   label: "实名类型",type: "select",field: "nameType",value: "", require: true,
            selectList: [
                {label: "无需实名", value: "无需实名"},
                {label: "系统上传", value: "系统上传"},
                {label: "人工上传", value: "人工上传"},
            ]},
      { field: 'masterCard', value: '', type: 'textarea', label: "主卡", },// require: true
      { field: 'secondaryCard', value: '', type: 'textarea', label: "副卡", },
      { field: 'bradbandCard', value: '', type: 'textarea', label: "宽带", },
      { field: 'twobradbandCard', value: '', type: 'textarea', label: "二宽", },
      { field: 'remark', value: '', type: 'textarea', label: "备注", },

        //
    //
    //
    //

    ]
         }

