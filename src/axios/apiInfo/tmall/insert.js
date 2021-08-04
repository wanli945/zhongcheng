/*
 * @IDE      : WebStorm
 * @time     : 2021/1/6 15:49
 * @author   : 李艳鹏
 * @Software : app
 * @File     : inserttam
 * @describe :
*/

export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/tamll/inserttam",
            params: {
                custname: "",
                phone: "",
                idcard: "",
                businessnumber: "",
                address: "",
                tmallordernumber: "",
                channl: "",
                advertiser: "",
                remark: ""
            },
            data: {},
            header: {},
            return: {},
            parseData({code}) {
                let my_mess = code === 1 ? "添加成功" : "添加失败";
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
                          area,
                          broadband,
                          channel,
                          idcard,
                          interior,
                          name,
                          nameofadvertiser,
                          phone,
                          remark,
                          tmallId,
                          servicename,
                          channels
                      }) {
                return {
                    custname: name,
                    phone: phone,
                    idcard: idcard,
                    businessnumber: broadband,
                    address: interior,
                    tmallordernumber: tmallId,
                    channl: channel,
                    advertiser: nameofadvertiser,
                    remark: remark,
                    marketingresults: "待确认",
                    servicename,
                    channels
                }
            }
        }
    }
}
