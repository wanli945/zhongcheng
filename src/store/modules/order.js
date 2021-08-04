/*
*
* 工单管理模块
*
* */
import Client from "../../../unit/client"

const unit = new Client();
export default {
    state: () => ({
        // 订单查询
        //① 订单查询的条件
        queryOption: [],
        //
        tableList: [
            {label: "订单编号", field: "workid", width: "100"},
            {label: "客户姓名", field: "name", width: "100"},
            {label: "身份证号", field: "idcard", width: "180"},
            // {label: "是否异常", field: "abnormal", width: "80"},
            {label: "地市", field: "address", width: "80"},
            {label: "联系电话", field: "phone", width: "150"},
            {label: "业务号码", field: "broadband", width: "150"},
            {label: "渠道", field: "channel", width: "150"},
            {label: "受理业务", field: "product", width: "250"},
            {label: "订单状态", field: "status", width: "100"},
            // {label: "受理状态", field: "statos", width: "100"},
            {label: "安装地址", field: "interior", width: "200"},
            {label: "预约时间", field: "appointmenttime", width: "120"},
            {label: "下单时间", field: "ordertime", width: "180"},
            {label: "受理员", field: "assigneeName", width: "100"},
            {label: "业务员", field: "servicename", width: "100"},
        ],
    }),
    mutations: {
        _getQueryOption(state, data) {
            state.queryOption = []
            state.queryOption.push(...data)
        },
        changeQueryOption({queryOption}, {index, value}) {
            queryOption[index].value = value
        },
        /*
        * 状态切换
        * */
        statusSwitch({queryOption}, label) {
            for (let item of queryOption) {
                if (item.field === 'states') {
                    item.value = label
                    break;
                }
            }
        },
        resetQueryOption({queryOption}) {
            queryOption.forEach((value) => {
                if (value.value instanceof Array) {
                    value.value = ["", ""]
                } else {
                    value.value = ""
                }
            })
        },
    },
    actions: {
        getQueryOption({commit}, queryOption) {
            commit("_getQueryOption", queryOption)
        },
    },
    getters: {}
}
