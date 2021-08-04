/*
 * @IDE      : WebStorm
 * @time     : 2020/12/22 9:32
 * @author   : 李艳鹏
 * @Software : app
 * @File     : index
 * @describe :
*/

export const area = [
    {value: '杭州市', label: '杭州市'},
    {value: '温州市', label: '温州市'},
    {value: '舟山市', label: '舟山市'},
    {value: '衢州市', label: '衢州市'},
    {value: '湖州市', label: '湖州市'},
    {value: '金华市', label: '金华市'},
    {value: '丽水市', label: '丽水市'},
    {value: '台州市', label: '台州市'},
    {value: '嘉兴市', label: '嘉兴市'},
    {value: '绍兴市', label: '绍兴市'},
    {value: '宁波市', label: '宁波市'}
];

//  佣金清单 搜索框
export const queryOption = () => {
    return [
        {
            label: "账期",
            type: "other",
            field: "accountPeriod",
            value: ""
        },
        {
            label: "区域",
            type: "select",
            field: "area",
            value: "",
            selectList: area
        },
        {
            label: "号码",
            type: "input",
            field: "number",
            value: ""
        },
        {
            label: "方案名称",
            type: "input",
            field: "scheme",
            value: ""
        },
        {
            label: "策略名称",
            type: "input",
            field: "strategy",
            value: ""
        },
        {
            label: "佣金类型",
            type: "input",
            field: "commissionType",
            value: ""
        },
        {
            label: "网点名称",
            type: "input",
            field: "branch",
            value: ""
        },
        {
            label: "账期区间",
            type: "other",
            field: "accountPeriodRange",
            value: []
        }
    ]
}
// 佣金清单 table 列
export const assetsListColumns = [
    {label: "编号", prop: 'id', width: '80'},
    {label: "区域", prop: 'area', width: '80'},
    {label: "账期", prop: 'accountPeriod', width: '80'},
    {label: "所属账期", prop: 'beAccountPeriod', width: '80'},
    {label: "号码", prop: 'number', width: '120'},
    {label: "产品类型", prop: 'productType', width: '100'},
    {label: "方案ID", prop: 'schemeId', width: '100'},
    {label: "方案名称", prop: 'schemeName', width: '160'},
    {label: "策略ID", prop: 'strategyId', width: '100'},
    {label: "策略名称", prop: 'strategyName', width: '140'},
    {label: "佣金说明", prop: 'commissionDesc', width: '160'},
    {label: "佣金类型", prop: 'commissionType', width: '120'},
    {label: "网点编码", prop: 'branchId', width: '130'},
    {label: "代理商编码", prop: 'agentId', width: '150'},
    {label: "代理商名称", prop: 'agentName', width: '180'},
    {label: "佣金/分", prop: 'commission', width: '100'},
    {label: "结算方式", prop: 'settlementMethod', width: '100'},
    {label: "营销人员编码", prop: 'marketerId', width: '130'},
    {label: "调账原因", prop: 'adjustAccountReason', width: '200'},
    {label: "网点名称", prop: 'branch', width: '220'},
]
