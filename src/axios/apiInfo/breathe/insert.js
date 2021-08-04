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
            url: "/tamll/insertonetrm",
            params: {
                custname: "",
                phone: "",
                idcard: "",
                businessnumber: "",
                address: "",
                tmallordernumber: "",
                channl: "终端外呼",
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
            realParam(data) {
                const {
                    area,
                    broadband,
                    c4name,
                    channel,
                    idcard,
                    interior,
                    name,
                    nameofadvertiser,
                    nowDiscount,
                    nowPackageType,
                    phone,
                    remark,
                    userInfo,
                    channels
                } = data
                let servicename = "";
                console.log(userInfo)
                if (userInfo) {
                    if (userInfo.role.indexOf("业务员") >= 0) {
                        servicename = userInfo.username
                    }
                }
                return {
                    custname: name,
                    phone: phone,
                    nowPackageType, //
                    nowDiscount,
                    area: "杭州市",
                    cname: c4name,
                    businessnumber: broadband,
                    remark,
                    servicename,
                    channels,
                    channel,
                    areas: "浙江省"
                }
            }
        }
    }
}
