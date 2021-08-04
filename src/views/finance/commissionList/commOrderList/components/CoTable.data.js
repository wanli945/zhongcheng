/*
 * @IDE      : WebStorm
 * @time     : 2020/12/21 10:02
 * @author   : 李艳鹏
 * @Software : app
 * @File     : CoTable.data
 * @describe : 订单清单信息
*/

export const columns = [
    {label: "创建时间", field: "createTime", width: "180"},
    {label: "受理业务", field: "accept", width: "240"},
    {label: "渠道", field: "channel", width: "140"},
    {label: "订单号", field: "orderId", width: "200"},
    {label: "客户姓名", field: "name", width: "120"},
    {label: "订单状态", field: "orderStatus", width: "120"},
    // {label: "资产号码", field: "account", width: "140"},
    // {label: "行为", field: "behavior", width: "100"},
    // {label: "当前状态", field: "curStatus", width: "100"},
    {label: "收费方式", field: "payMethod", width: "100"},
    {label: "受理渠道", field: "payChannel", width: "220"},
    {label: "备注", field: "remark", width: "300"},
    {label: "自动单标记", field: "autoOrder", width: "100"},
    {label: "第一发展人", field: "developerName", width: "100"},
    {label: "第一发展人工号", field: "developerId", width: "160"},
    {label: "退单原因", field: "reason", width: "300"},
    {label: "预估佣金", field: "commission", width: "100"},
]
