/*
 * @IDE      : WebStorm
 * @time     : 2021/1/15 17:27
 * @author   : 李艳鹏
 * @Software : app
 * @File     : data
 * @describe :
*/


import {channelSelect} from "../../../../../data/status.data"

export default () => {
    return {
        //  搜索框
        paramsList: [
            {
                label: "受理业务",
                type: "input",
                field: "accept",
                value: ""
            },
            {
                label: "订单号",
                type: "input",
                field: "orderId",
                value: ""
            },
            {
                label: "资产号码",
                type: "input",
                field: "assets",
                value: ""
            },
            {
                label: "订单状态",
                type: "input",
                field: "orderStatus",
                value: ""
            },
            {
                label: "当前状态",
                type: "input",
                field: "curStatus",
                value: ""
            },
            {
                label: "渠道",
                type: "select",
                field: "channel",
                value: "",
                selectList: channelSelect
            },

        ]
    }
}
