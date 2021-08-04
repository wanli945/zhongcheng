/*
 * @IDE      : WebStorm
 * @time     : 2020/12/31 9:21
 * @author   : 李艳鹏
 * @Software : app
 * @File     : update
 * @describe :
*/
export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/tent/modificationtheconfiguration",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({code}) {
                let my_mess = code === 1 ? "修改成功" : "修改失败";
                let my_is = code === 1;
                return {
                    my_mess,
                    my_is
                };
            },
            realData(data) {
                return data
            },
            realParam({
                          id,
                          name,
                          idcard,
                          accept,
                          payment,
                          remark,
                          interior,
                          failure,
                          channel,
                          phone,
                          toproomotelinks,
                          appointmentime,
                          servicename,
                          trackingtime,
                          address,
                          statos,
                          orderTemplate,
                          broadband,
                          department,
                          workserved,
                          pageAddress,
                          pagestatos,
                          area2,
                          paymentmethod,
                          accept2,
                          accept3,
                          broadband2,
                          broadband3,
                          packageType,
                          packageContent,
                          tmallId,
                          terminalNumber,
                          terminalModel,
                          packageChange,

                          secondaryCard,
                          kdBroadband,
                          oldStatus,
                          userInfo,
                          areas,

                          changeObj
                      }) {
                let workservedDate = orderTemplate[workserved];
                return {
                    id,
                    businessname: name,
                    businessidcard: idcard,
                    businessphone: phone,
                    businessnumberone: broadband,
                    businessnumbertwo: broadband2,
                    businessnumbertree: broadband3,
                    businessarea: address,
                    address: interior,
                    prodctone: accept,
                    prodcttwo: accept2,
                    prodcttree: accept3,
                    template: workservedDate.id,
                    trackingtime: trackingtime,
                    receivable: payment,
                    payment: paymentmethod,
                    remark,
                    secondaryCard,
                    broadband: kdBroadband,
                    areas,
                    marketing: pagestatos,

                    workid: id,
                    uploginno: "",
                    oldname: servicename,
                    curentname: userInfo.username,
                    oldstatus: oldStatus,
                    status: pagestatos,
                    isitright: 4,
                    historys: JSON.stringify(changeObj),
                }
            }
        }
    }
}
