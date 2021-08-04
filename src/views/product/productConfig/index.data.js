import {product_config_select} from "../../../data/product.data";

export default {
    columns: [
        {label: '金额', prop: 'proMoney', width: '100'},
        {label: '产品名称', prop: 'productsName', width: '250'},
        {label: '数量', prop: 'proCount', width: '100'},
        {label: '生效时间', prop: 'otime', width: '160'},
        {label: '失效时间', prop: 'ptime', width: '160'},
        {label: '佣金', prop: 'rate', width: '100'},
        {label: '积分', prop: 'integral', width: '100'},
        {label: '提成', prop: 'deduct', width: '100'},
        {label: '部门', prop: 'depaname', width: '180'},
        {label: '补贴', prop: 'subsidy', width: '100'},
        {label: '受理方式', prop: 'acceptMethod', width: '120'},
        {label: '付款方式', prop: 'payMethod', width: '120'},
        {label: '是否自动单', prop: 'isAuto', width: '100'},
        {label: '倍率', prop: 'settlementratio', width: '100'},
        {label: '是否启用', prop: 'enable', width: undefined},
    ],
    formDataList: [
        {field: 'productsName', value: '', type: 'input', label: "产品名称", require: true},
        {
            field: 'enable', value: '', type: 'select', label: "是否启用", require: true,
            selectList: product_config_select.enable
        },
        {field: 'proMoney', value: '', type: 'number', label: "产品价格", require: true},
        {field: 'proCount', value: '', type: 'number', label: "产品数量", require: true},
        {
            field: 'depaname',
            value: '',
            type: 'select',
            label: "归属部门",
            require: true,
            selectList: []
        },
        {field: 'rate', value: '', type: 'number', label: "产品佣金", require: true},
        {field: 'integral', value: '', type: 'number', label: "产品积分", require: true},
        {field: 'settlementratio', value: '', type: 'number', label: "倍率", require: true},
        {field: 'deduct', value: '', type: 'number', label: "产品提成", require: true},
        {field: 'subsidy', value: '', type: 'number', label: "产品补贴", require: true},
        {field: 'otime', value: '', type: 'datetime', label: "生效日期", require: true},
        {field: 'ptime', value: '', type: 'datetime', label: "失效日期", require: true},

        /* todo
         * 1200 后付费
         * 1201 准实时预付费
         * 2100 预付费
         *
         * */

        {
            field: 'acceptMethod', value: '', type: 'select', label: "受理方式", require: true,
            selectList: product_config_select.acceptMethod
        },
        {

            field: 'payMethod', value: '', type: 'select', label: "付费方式", require: true,
            selectList: product_config_select.payMethod
        },
        {
            field: 'isAuto', value: '', type: 'select', label: "自动单", require: true,
            selectList: product_config_select.isAuto
        },
        {
            field: 'slname', value: '', type: 'textarea', label: "产品描述",
            require: true
        },
    ]
}
