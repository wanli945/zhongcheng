/*
*
* 工单管理模块
* 计划：过度使用 vuex
*
* */
import Client from "../../../unit/client"
import axios from "../../axios/index"

const unit = new Client();


export default {
    state: () => ({
        /*
        *
        * 商机单页面的数据
        * */
        /*
        * 首次渲染的时候存在内存中
        * */
        //商机单 表格展示的列
        tableList: [
            {label: "商机单编号", field: "id", width: "100"},
            {label: "姓名", field: "name", width: "100"},
            {label: "手机号", field: "phone", width: "150"},
            {label: "业务号码", field: "broadband", width: "150"},
            {label: "身份证号", field: "idcard", width: "180"},
            {label: "地市", field: "address", width: "80"},
            {label: "受理业务", field: "accept", width: "250"},
            {label: "业务员名称", field: "servicename", width: "100"},
            {label: "状态", field: "statos", width: "150"},
            {label: "二级状态", field: "failure", width: "150"},
            {label: "下单时间", field: "ordertime", width: "180"},
            {label: "跟踪时间", field: "trackingtime", width: "180", sortable: "custom"},
            {label: "更新时间", field: "uplogintime", width: "180"},
            {label: "广告主", field: "nameofadvertiser", width: "150"},
            {label: "渠道", field: "channel", width: "150"},
            {label: "来源页面", field: "toproomotelinks", width: "150"},
        ],
        /*
        * 商机单的数据
        * */
        tableData: [
            {
                id: 1, // 商机单编号
                workid: null, // 工单id
                channel: "信息流", // 渠道
                phone: "15135052416", // 手机号码
                name: "测试", // 客户姓名
                idcard: "142727199705241114", // 身份证号
                interior: "和平大厦", // 安装地址
                accept: "300MB 宽带", // 受理业务
                servicename: "", // 业务员
                uploginno: "", // 创建工号
                statos: "待跟踪", // 状态
                amount: null, //
                ordertime: "2020-08-12 12:33:45", // 下单时间
                payment: "", // 付款金额
                remark: null, // 备注
                toproomotelinks: null, // 订单url
                nameofadvertiser: "合讯123", // 广告主名称
                address: null, // 地区
                appointmentime: null, //  预约时间
                ok: null, //
                trackingtime: "2020-08-12 12:33:45", //跟踪时间
                failure: null, // 失败原因
                uplogintime: "2020-08-12 12:33:45" // 更新时间
            }
        ],
        /*
        * 商机单页面的 分页
        * */
        pagination: {
            total: 0,
            curpage: 1,
            pagesize: 10
        },
        // 商机单的 编辑框
        editBoxData: {
            data: {}
        },
        tableEmpty: "",
        /*
        * 状态列表
        * */
        tableStatus: []
    }),
    mutations: {
        /*
        * 商机单条件的改变
        * */
        changeQueryOption({queryOption}, {index, value}) {
            queryOption[index].value = value
        },
        /*
        * 商机单表格分页查询
        * */
        table_change(state, {total = 0, message = "无数据", list = []} = {}) {
            state.tableData = [];
            state.tableData.push(...list)
            state.pagination.total = total;
            state.tableEmpty = message
        },
        /*
        * 重置条件
        *
        * */
        resetQueryOption({queryOption}) {
            queryOption.forEach((value) => {
                if (value.value instanceof Array) {
                    value.value = ["", ""]
                } else {
                    value.value = ""
                }
            })
        },

        /*
       * 商机单表格分页查询
       * */
        // 一页个数的改变
        pageSizeChange({pagination}, pageSize) {
            pagination.curpage = 1;
            pagination.pagesize = parseInt(pageSize);
        },
        // 页面切换
        pageCurrentChange({pagination}, curpage) {
            console.log(curpage)
            pagination.curpage = parseInt(curpage);
        },

        /*
        * 商机单改变
        * */
        stateGetNum(state, array) {
            state.tableStatus = [];
            state.tableStatus.push(...array)
        },
        statusClick({queryOption, pagination}, label) {
            pagination.curpage = 1
            for (let item of queryOption) {
                if (item.field === 'states') {
                    item.value = label
                    break;
                }
            }
        },
        /*
        * 盒子获取id
        * */
        __editQuery({editBoxData}, data) {
            editBoxData.data = data
        },
    },
    actions: {},
    getters: {
        /*
        * 条件的解析
        * */
        queryConditions({queryOption, pagination}) {
            return unit.queryConditionsParse(queryOption, pagination)
        }
    }
}
