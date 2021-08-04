/*
 * @IDE      : WebStorm
 * @time     : 2021/1/13 14:33
 * @author   : 李艳鹏
 * @Software : app
 * @File     : querycomm
 * @describe :
*/


export default (baseURL, util) => {
    /*插入工单*/
    return {
        post: {
            baseURL: baseURL,
            url: "/miss/querycomm",
            params: {
                area: "",
                numberphone: "",
                projectname: "",
                nameofstrategy: "",
                remunerationtype: "",
                networkname: "",
                subordinate: "",
                otime: "", ptime: "",
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                console.log(code)
                let my_mess = "";
                let my_is = false;
                let list = [];
                let total = 0;
                if (code === 1) {
                    my_is = true;
                    my_mess = "查询成功"
                    total = entry.total
                    entry.list.forEach(value => {
                        list.push({
                            area: value.area,
                            accountPeriod: value.payment,
                            beAccountPeriod: value.subordinate, // 所属账期
                            number: value.numberphone,
                            productType: value.producttype,
                            schemeId: value.projectID,
                            schemeName: value.projectname,
                            strategyId: value.trategyID,
                            strategyName: value.nameofstrategy,
                            commissionDesc: value.commissionshows,
                            commissionType: value.remunerationtype,
                            branchId: value.networkcoding,
                            agentId: value.agentcode,
                            agentName: value.nameofagent,
                            commission: value.commission,
                            settlementMethod: value.clearingform,
                            marketerId: value.marketingstaffcode,
                            adjustAccountReason: value.reconciliationreason,
                            branch: value.networkname,
                            id: value.id
                        })
                    })
                } else {
                    my_mess = "查询失败"
                }
                return {
                    my_mess,
                    my_is,
                    list,
                    total,
                };
            },
            realData(data) {
                return data
            },
            realParam(param) {
                const {
                    area,
                    curpage,
                    pagesize,
                    otime,
                    ptime, settlementstatus, accountPeriod, number, scheme, strategy, commissionType, branch
                } = param;
                return {
                    pageSize: pagesize,
                    pageNum: curpage,
                    otime,
                    ptime,
                    area,
                    numberphone: number,
                    projectname: scheme,
                    nameofstrategy: strategy,
                    remunerationtype: commissionType,
                    networkname: branch,
                    payment: accountPeriod,
                }
            }
        }
    }
}
