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


export const productAnalysis = async (that) => {

    let dataArr = [];
    let c4List = [];
    let total = 0;
    for (let i = 0; i < 10; i++) {
        let productRate = Mock.mock('@integer(1,10)') + "00M", num = Mock.mock('@integer(400,500)');
        total += num;
        dataArr.push({
            productRate,
            num,
            rate: ''
        })
        let ms = Mock.mock('@city');
        c4List.push({
            label: ms,
            value: ms
        })
    }
    dataArr.forEach((value, index) => {
        dataArr[index].rate = (value.num * 100 / total).toFixed(2) + "%"
    })
    return {
        dataArr,
        total: Mock.mock('@integer(300,200)'),
        c4List
    };
}
