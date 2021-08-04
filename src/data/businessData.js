/*
 * @IDE      : WebStorm
 * @time     : 2020/12/8 11:03
 * @author   : 李艳鹏
 * @Software : app
 * @File     : businessData
 * @describe : 商机单条件筛选项 信息
*/

import CrmDict from "./index.js"

export default CrmDict.businessData
// 付款方式
export const payMethod = CrmDict.payMethod
// 需更改的套餐 未用 改了文本框
export const packageChange = CrmDict.packageChange
// 新增 融合 业务类型
export const businessAcceptType = CrmDict.businessData.businessAcceptType

export const generateBusiness = (type, that) => {
    let otherArr = []
    if (type === 'breathe') {
        otherArr = [
            {
                label: "地区",
                type: "input",
                disabled: false,
                field: "c4name",
                show: type === 'breathe',
                placeholder: "地区",
            },
            {
                label: "现有优惠",
                type: "input",
                disabled: false,
                field: "nowDiscount",
                show: type === 'breathe',
                placeholder: "现有优惠",
            },
            {
                label: "现有套餐类型",
                type: "input",
                disabled: false,
                field: "nowPackageType",
                show: type === 'breathe',
                placeholder: "现有套餐类型",
            },
            {
                label: "终端型号",
                type: "input",
                disabled: false,
                field: "terminalModel",
                show: type === 'breathe',
                placeholder: "终端型号",
            },
            {
                label: "终端串号",
                type: "input",
                disabled: false,
                field: "terminalNumber",
                show: type === 'breathe',
                placeholder: "终端串号",
            },
            {
                label: "需更改的套餐类型",
                type: "input",
                disabled: false,
                field: "packageChange",
                show: type === 'breathe',
                placeholder: "需更改的套餐类型",
            }
        ]
    }
    return [
        // first 基本信息 菜单框
        {
            label: "商机单编号",
            type: "input",
            disabled: true,
            field: "id",
            show: true,
        },
        {
            label: "业务员",
            type: "input",
            disabled: true,
            field: "servicename",
            show: true,
        },

        {
            label: "渠道(一级)",
            type: "input",
            disabled: true,
            field: "channels",
            show: true,
        },
        {
            label: "渠道(二级)",
            type: "input",
            disabled: true,
            field: "channel",
            show: true,
        },
        {
            label: "广告主",
            type: "input",
            disabled: true,
            field: "nameofadvertiser",
            show: type === 'infoFlow',
        },
        {
            label: "来源",
            type: "input",
            disabled: true,
            field: "toproomotelinks",
            show: (type === 'infoFlow' || type === 'distribution') && that.editBoxData.toproomotelinks,
            hasTooltip: true
        },
        {
            label: "天猫订单号",
            type: "input",
            disabled: false,
            field: "tmallId",
            show: type === 'tmall',
            placeholder: "天猫订单号",
        },
        {
            label: "客户姓名",
            type: "input",
            disabled: false,
            field: "name",
            show: true,
            placeholder: "客户姓名不能少于1位",
        },
        {
            label: "联系电话",
            type: "input",
            disabled: false,
            field: "phone",
            show: true,
            placeholder: "",
        },
        {
            label: "身份证号",
            type: "input",
            disabled: false,
            field: "idcard",
            show: true,
            placeholder: "身份证号格式要正确",
        },
        {
            label: "产品名称",
            field: "accept",
            type: 'customize',
            show: true,
        },
        {
            label: "业务号码",
            type: "input",
            disabled: false,
            field: "broadband",
            show: true,
            placeholder: "业务号码",
        },
        /*{
            label: "业务号码",
            type: "input",
            disabled: false,
            field: "broadband3",
            show: type==='tenHao' || type==='tmall' || type==='breathe',
            placeholder: "",
        },
        {
            label: "业务号码",
            type: "input",
            disabled: type==='tenHao' || type==='tmall' || type==='breathe',
            field: "broadband3",
            show: false,
            placeholder: "",
        },*/
        {
            label: "副卡号码",
            type: "input",
            disabled: false,
            field: "secondaryCard",
            show: type === 'tenHao',
            placeholder: "副卡号码",
        },
        {
            label: "宽带账号",
            type: "input",
            disabled: false,
            field: "kdBroadband",
            show: type === 'tenHao',
            placeholder: "宽带账号",
        },
        {
            label: "收款金额",
            type: "number",
            disabled: false,
            field: "payment",
            show: true,
            placeholder: "收款金额",
        },
        /*{
            label: "OOCP扣费金额",
            type: "number",
            disabled: false,
            field: "oocp",
            show: true,
            placeholder: "OOCP扣费金额",
        },*/
        {
            label: "收款方式",
            type: "select",
            disabled: false,
            field: "paymentmethod",
            show: that.payMethodSelect.length > 0,
            placeholder: "收款方式",
            selectArr: that.payMethodSelect
        },
        {
            label: "安装地址",
            type: "input",
            disabled: false,
            field: "interior",
            show: true,
            placeholder: "安装地址",
        },

        {
            label: "预约日期",
            field: "appointmentime",
            type: 'customize',
            show: ['distribution', 'breathe', 'tenHao'].indexOf(type) === -1,
        },
        {
            label: "地市",
            field: "city",
            type: 'customize',
            show: true,
        },
        ...otherArr,
        {
            label: "工单模板",
            type: "select",
            disabled: false,
            field: "workserved",
            show: true,
            placeholder: "工单模板",
            selectArr: that.cascaderItem.orderTemplate.select
        },
        {
            label: "行销结果",
            field: "pagestatos",
            type: 'customize',
            show: type !== 'tmall',
        },
        {
            label: "跟踪时间",
            field: "trackingtime",
            type: 'customize',
            show: true,
        },
        {
            label: "业务类型",
            type: "select",
            field: "acceptType",
            show:  ['infoFlow','tenHao'].indexOf(type) > -1,
            placeholder: "业务类型",
            selectArr: businessAcceptType[type] && businessAcceptType[type].selectList,
        },
        {
            label: "备注",
            field: "remark",
            type: 'customize',
            className: 'mytextarea',
            show: true,
        }
    ]
}
