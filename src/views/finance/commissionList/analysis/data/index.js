/*
 * @IDE      : WebStorm
 * @time     : 2020/12/23 13:44
 * @author   : 李艳鹏
 * @Software : app
 * @File     : index
 * @describe :
*/

//  结算分析 查询 列
export const analysisQuery = () => [
    {
        label: "受理业务",
        type: "input",
        field: "accept",
        value: ""
    },
    {
        label: "地市",
        type: "input",
        field: "area",
        value: ""
    },

    {
        label: "结算状态",
        type: "select",

        field: "settlementStatus",
        value: "",
        selectList: [
            {label: "待结算", value: "待结算"},
            {label: "未结算", value: "未结算"},
            {label: "已结算", value: "已结算"},
        ]

    },

    {
        label: "归档月",
        type: "other",
        field: "accountPeriod",
        value: Date.now()
    },
    {
        label: "渠道",
        type: "input",
        field: "channel",
        value: ""
    }
]
//  结算分析 table 列 前
export const beforeColumn = [
    {label: "编号", prop: 'id', width: '80'},
    // {
    //     label: "资产号码",
    //     prop: "account",
    //     width: 160,
    //
    // },
    // {
    //     label: "行为",
    //     prop: "behavior",
    //     width: 80,
    // },
    {
        label: "渠道",
        prop: "channel",
        width: 80,
    },
    {
        label: "工单号",
        prop: "orderId",
        width: 100,

    },
    {
        label: "受理业务",
        prop: "accept",
        width: 120,

    },
    // {
    //     label: "业务类型",
    //     prop: "acceptType",
    //     width: 100,
    //
    // },
    {
        label: "受理渠道",
        prop: "acceptChannel",
        width: 100,

    },
    {
        label: "发展人",
        prop: "deveName",
        width: 64,

    },
    {
        label: "收费方式",
        prop: "payMethod",
        width: 78,

    },
    {
        label: "地市",
        prop: "city",
        width: 64,

    },]
    // 结算分析 table 列 尾巴
export const afterColumn = [{
    label: "佣金小计",
    prop: "total",
    width: 90,

},
    {
        label: "应结佣金",
        prop: "shouldEnd",
        width: 100,

    },
    {
        label: "状态",
        prop: "status",
        width: 100,

    }]

export const TPlus = ["T", "T+1", "T+2", "T+3", "T+4", "T+5", "T+6", "T+7", "T+8", "T+9", "T+10", "T+11", "明年12月"]

export const analysisListColumns = ({that, TPlus = TPlus, after, before}) => {
    let _oneTo12 = [];
    let T = that.paramsKV.accountPeriod || Date.now();
    let months = {};
    TPlus.forEach(v => {
        let S = new Date(T);
        if (v === "明年12月") {
            S = S.setFullYear(S.getFullYear() + 1, 11, 1)
            _oneTo12.push({
                label: that.$util.timestamp(S, 'yyyyMM'),
                prop: `T12`,
                width: '80',
            });
            months[`T12`] = that.$util.timestamp(S, 'yyyyMM');
        } else {
            let o_t = v.split('+')[1] || 0
            S = S.setMonth(S.getMonth() + parseInt(o_t), 1)
            _oneTo12[o_t] = {
                label: that.$util.timestamp(S, 'yyyyMM'),
                prop: `T${o_t}`,
                width: '80',
            }
            months[`T${o_t}`] = that.$util.timestamp(S, 'yyyyMM');
        }
    });
    let oneTo12 = _oneTo12.filter(value => {
        return value
    });

    return {
        columns: [
            ...before,
            ...oneTo12,
            ...after,
        ],
        months
    }
}

// 结算分析 table 二级展开 列
export const assetsListColumns = [
    {
        label: "资产号码",
        prop: "account",
        width: 160,
    },
    {label: "区域", prop: 'area', width: '80'},

    {label: "账期", prop: 'accountPeriod', width: '100'},
    {label: "产品类型", prop: 'productType', width: '120'},
    {
        label: "行为",
        prop: "behavior",
        width: 100,
    },
    {label: "方案名称", prop: 'schemeName', width: '180'},
    {label: "策略名称", prop: 'strategyName', width: '180'},
    {label: "佣金类型", prop: 'commissionType', width: '150'},
    {label: "网点名称", prop: 'branch', width: '250'},
    {label: "佣金/分", prop: 'commission', width: '100'},
    {label: "调账原因", prop: 'adjustAccountReason',},
]
