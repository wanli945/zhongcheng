export const userBoxList = [
    ['客户编号', 'cid'],
    ['客户姓名', 'name'],
    ['联系电话', 'phone'],
    ['身份证号', 'idcard'],
    ['备注', 'c_remark'],
];
export const orderBoxList = [
    ['订单编号', 'workid']
    , ['省份', 'areas']
    , ['地市', 'address']
    , ['下单时间', 'createTime']
    , ['安装地址', 'interior']
    , ['业务号码', 'broadband']
    , ['预约时间', 'appointmenttime']
    , ['业务员', 'servicename']
    , ['受理员', 'assigneeName']
    , ['订单状态', 'status']
    , ['工单模板', 'workflowName']
    , ['状态流转备注', 'reason']
    , ['收款金额', 'payment']
    , ['OOCP扣费金额', 'oocp']
    , ['补贴金额', 'paymentDiff']
    , ['收费方式', 'paymentstate']
    , ['产品名称', 'product']
    , ['天猫单号', 'tmallId']
    , ['地区', 'region']
    , ['宽带账号', 'businessnumber']
    , ['现有优惠', 'existingpreferential']
    , ['现有套餐类型', 'existingPackageTypes']
    , ['终端型号', 'terminaltype']
    , ['终端串号', 'terminalNumber']
    , ['需更改套餐类型', 'changedPackagetype']
    , ['副卡号码', 'vicecardnumber']
];

export const bssBoxList = [
    ['计费方式', 'chargemethod'],
    ['营业厅', 'acceptchannal'],
    ['受理状态', 'statos'],
    ['7单号', 'no7'],
    ['crm订单状态', 'st7'],
    ['原单号', 'ydno7'],
    ['原单状态', 'ydst7'],
    ['固网单号', 'gwno7'],
    ['固网单状态', 'gwst7'],
    ['C网单号', 'cwno7'],
    ['C网单状态', 'cwst7'],
    ['施工电话', 'sc7'],
];
/*
 region,  // 地区
businessnumber, // 宽带证号
 existingpreferential, // 现有优惠
existingPackageTypes, // 现有套餐类型
terminaltype, // 终端类型
changedPackagetype, // 需更改套餐类型
 vicecardnumber, // 副卡号码
prodacceptthemethod,// 产品受理方案


* */
export default {
    bssBoxList, userBoxList, orderBoxList
}
