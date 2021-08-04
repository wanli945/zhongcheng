/*
 * @IDE      : WebStorm
 * @time     : 2021/2/1 15:24
 * @author   : 李艳鹏
 * @Software : app
 * @File     : mock
 * @describe :
*/
import Mock from "mockjs"
import {getD2D} from "../../data/mock"

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

export const orderBoardData = () => {
    return [
        {
            title: '工单数',
            "total": Mock.mock('@integer(100, 800)'),
            "rate": Mock.mock('@float(-1, 1, 2)'),
            category: "order",
            cur: true
        },
        {
            title: '已提交',
            "total": Mock.mock('@integer(100, 800)'),
            "rate": Mock.mock('@float(-1, 1, 2)'),
            category: "submitted"
        },

        {
            title: '开通中',
            "total": Mock.mock('@integer(60, 100)') + "%",
            "rate": Mock.mock('@float(-1, 1, 2)'),
            category: "opening"
        },

        {
            title: '已归档',
            total: Mock.mock('@integer(60, 100)'),
            rate: Mock.mock('@float(-1, 1, 2)'),
            category: "archived"
        },
        {
            title: '竣工率',
            total: Mock.mock('@integer(60, 100)') + "%",
            rate: Mock.mock('@float(-1, 1, 2)'),
            category: "chargebackRate"
        },
        {
            title: '退单',
            total: Mock.mock('@integer(60, 100)'),
            rate: Mock.mock('@float(-1, 1, 2)'),
            category: "chargeback"
        },
        {
            title: '退单率',
            total: Mock.mock('@integer(60, 100)') + "%",
            rate: Mock.mock('@float(-1, 1, 2)'),
            category: "chargebackRate"
        }
    ]
}

export const getPolyline = async ({channel, platType, time, timeType, dateRange}, that) => {
    return getD2D(dateRange, that)
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
    let c4List = [];
    for (let i = 0; i <= 10; i++) {
        dataArr.push({
            productName: Mock.mock('@datetime("yyyyMM-")') + Mock.mock('@ctitle(10, 12)') + `【${city} ${channel}】`,
            commodityName: Mock.mock('@datetime("yyyyMM-")') + Mock.mock('@ctitle(10, 12)') + `【${city} ${channel}】`,
            num: Mock.mock('@integer(100,500)'),
            rate: Mock.mock('@float(60, 99, 2,2)') + "%"

        })
        let ms = Mock.mock('@city');
        c4List.push({
            label: ms,
            value: ms
        })
    }
    return {
        dataArr,
        total: Mock.mock('@integer(60, 100)'),
        c4List
    };
}


export const getPerformanceKanBan = () => {
    let dataArr = [];
    for (let i = 0; i < 10; i++) {
        dataArr.push({
            advertisers: Mock.mock('@ctitle(10, 12)'),
            serverName: Mock.mock('@cname()'),
            orderNum: Mock.mock('@integer(400,500)'),
            archiveNum: Mock.mock('@integer(400,500)'),
            completionRate: Mock.mock('@float(60, 99, 2,2)') + "%",
            chargeback: Mock.mock('@integer(100,300)'),
            chargebackRate: Mock.mock('@float(60, 99, 2,2)') + "%",
        })
    }
    return {
        dataArr,
        total: Mock.mock('@integer(300,200)')
    };
}

export const productAnalysis = () => {
    let dataArr = [];
    let c4List = [];
    for (let i = 0; i < 10; i++) {
        dataArr.push({
            productRate: Mock.mock('@integer(1,10)') + "00M",
            num: Mock.mock('@integer(400,500)'),
            rate: Mock.mock('@float(60, 99, 2,2)') + "%",
        })
        let ms = Mock.mock('@city');
        c4List.push({
            label: ms,
            value: ms
        })
    }
    return {
        dataArr,
        total: Mock.mock('@integer(300,200)'),
        c4List
    };
}
