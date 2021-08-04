/*
 * @IDE      : WebStorm
 * @time     : 2021/2/1 15:24
 * @author   : 李艳鹏
 * @Software : app
 * @File     : mock
 * @describe :
*/
import Mock from "mockjs"
import {getDD, getD2D} from "../../data/mock"

export const headerData = {
    citySelect: [
        {label: "浙江", value: "浙江"},
        {label: "福建", value: "福建"},
    ],
    dataArr: [
        {name: '今天', value: 'day'},
        {name: '日', value: 'day'},
        {name: '周', value: 'week'},
        {name: '月', value: 'month'},
    ]
}

export const overAllData = async () => {
    return [
        {
            title: '商机数',
            "total": Mock.mock('@integer(100, 800)'),
            "rate": Mock.mock('@float(-1, 1, 2)'),
            category: "business",
            cur: true,
            disable: false
        },
        {
            title: '工单数',
            "total": Mock.mock('@integer(100, 800)'),
            "rate": Mock.mock('@float(-1, 1, 2)'),
            category: "order",
            disable: false
        },
        {
            title: '外呼转化率',
            "total": Mock.mock('@integer(60, 100)') + "%",
            "rate": Mock.mock('@float(-1, 1, 2)'),
            category: "conversion",
            disable: false
        },
        {
            title: '竣工率',
            total: Mock.mock('@integer(60, 100)') + "%",
            rate: 0,
            category: "completion",
            disable: false
        },
        {
            title: '工单营销成本',
            total: null,
            rate: 0,
            category: "orderMarketing",
            disable: true
        },

        {
            title: '已受理',
            total: Mock.mock('@integer(60, 100)'),
            rate: Mock.mock('@float(-1, 1, 2)'),
            category: "accepted",
            disable: false

        },
        {
            title: '已归档',
            total: Mock.mock('@integer(60, 100)'),
            rate: Mock.mock('@float(-1, 1, 2)'),
            category: "archived",
            disable: false
        },
        {
            title: '提交中',
            total: Mock.mock('@integer(60, 100)'),
            rate: Mock.mock('@float(-1, 1, 2)'),
            category: "submit",
            disable: false
        },
        {
            title: '退单',
            total: Mock.mock('@integer(60, 100)'),
            rate: Mock.mock('@float(-1, 1, 2)'),
            category: "chargeback",
            disable: false
        },
        {
            title: '退单率',
            total: Mock.mock('@integer(60, 100)') + "%",
            rate: Mock.mock('@float(-1, 1, 2)'),
            category: "chargebackRate",
            disable: false
        }
    ]
}


export const getPolyline = async ({time, timeType, dateRange}, that) => {
    return getD2D(dateRange, that);
}
export const getRank = async (data) => {
    let dataArr = [];
    for (let i = 0; i <= Mock.mock('@natural(100, 200)'); i++) {
        dataArr.push({
            serverName: Mock.mock('@cname()'),
            "已提交": Mock.mock('@natural(80, 200)'),
            "已归档": Mock.mock('@natural(80, 200)'),
            "退单": Mock.mock('@natural(80, 200)'),
        })
    }
    return {
        dataArr
    }
}


export const getCityRank = () => {
    let dataArr = [];
    for (let i = 0; i <= Mock.mock('@natural(10, 15)'); i++) {
        dataArr.push({
            city: Mock.mock('@city'),
            num: Mock.mock('@natural(80, 200)'),
        })
    }
    return {
        dataArr
    }
}

export const getProduct = ({city, channel}) => {
    let dataArr = [];
    for (let i = 0; i <= 10; i++) {
        dataArr.push({
            productName: Mock.mock('@datetime("yyyyMM-")') + Mock.mock('@ctitle(10, 12)') + `【${city} ${channel}】`,
            num: Mock.mock('@integer(100,500)'),
            rate: Mock.mock('@float(60, 99, 2,2)') + "%"
        })
    }
    return {
        dataArr,
        total: Mock.mock('@integer(60, 100)')
    };
}


const generatorGetHeaderBoxItem = async (listNum) => {
    let data = []
    for (let i = listNum; i > 0; i--) {
        data.push({
            name: Mock.mock('@ctitle(4, 6)'),
            num: Mock.mock('@integer(100,500)')
        })
    }
    return data;
}
export const getHeaderBox = async () => {
    return [
        {
            title: "本周",
            data: await generatorGetHeaderBoxItem(8)
        },
        {
            title: "本月",
            data: await generatorGetHeaderBoxItem(8)
        },
        {
            title: "全年",
            data: await generatorGetHeaderBoxItem(4)
        },
    ];
}

export const getCityAndOperation = async () => {
    let ms = [];
    let opt = []
    for (let i = 0; i <= 5; i++) {
        let mss = Mock.mock('@province()');
        let mss2 = Mock.mock('@cname()')
        ms.push(
            {label: mss, value: mss},
        )
        opt.push({
            label: mss2, value: mss2
        })
    }
    return {
        cityArr: ms,
        optArr: opt
    }
}

export const getBlockData = async () => {
    let v1 = Mock.mock('@integer(100,500)');
    let v2 = Mock.mock('@integer(50,100)');
    const fanShaped = {
        data: [
            {value: v1, name: '完成'},
            {value: v2, name: '未完成'},
        ],
        total: v1 + v2
    };

    return {
        block: [
            {
                title: '商机单',
                "total": Mock.mock('@integer(100, 800)'),
                "rate": Mock.mock('@float(-1, 1, 2)'),
                category: "business",
                cur: true,
                disable: false
            },
            {
                title: '顶单数',
                "total": Mock.mock('@integer(100, 800)'),
                "rate": Mock.mock('@float(-1, 1, 2)'),
                category: "order",
                disable: false
            },
            {
                title: '竣工数',
                total: Mock.mock('@integer(60, 100)'),
                "rate": Mock.mock('@float(-1, 1, 2)'),
                category: "completionNum",
                disable: false
            },
            {
                title: '竣工率',
                total: Mock.mock('@integer(60, 100)'),
                "rate": Mock.mock('@float(-1, 1, 2)'),
                category: "completion",
                disable: false
            },
            {
                title: '商机成本',
                total: Mock.mock('@integer(60, 100)'),
                "rate": Mock.mock('@float(-1, 1, 2)'),
                category: "businessMarketing",
                disable: true
            },

            {
                title: '营销成本',
                total: Mock.mock('@integer(60, 100)'),
                "rate": Mock.mock('@float(-1, 1, 2)'),
                category: "MarketingCost",
                disable: true
            },
            {
                title: '投产比',
                total: "1.1",
                "rate": Mock.mock('@float(-1, 1, 2)'),
                category: "ProductionRatio",
                disable: true
            },
        ],
        fanShaped,
    }
}


export const getPromotionData = async () => {
    let dataArr = [];
    for (let i = 0; i <= Mock.mock('@integer(5,6)'); i++) {
        dataArr.push({
            account: Mock.mock('@ctitle(10, 12)'),
            num: Mock.mock('@integer(400,500)'),
            rate: Mock.mock('@float(60, 99, 2,2)') + "%",
            success: Mock.mock('@integer(100,300)'),
            marketingCost: Mock.mock('@integer(300,200)'),
            plat: Mock.mock('@ctitle(2, 3)'),
            city: Mock.mock('@province()'),
            product: Mock.mock('@ctitle(10, 12)')
        });
    }

    return {
        dataArr,
        total: 0
    }
}
