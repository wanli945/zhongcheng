export default (baseURL) => {
    /*插入工单*/
    return {
        post: {
            baseURL: baseURL,
            url: "/info/chainfor",
            params: {
                name: "",
                isoffor: "",
                disno: ""
            },
            data: {},
            header: {},
            return: {},
            parseData({code}) {
                console.log(code)
                let my_mess = "";
                let my_is = false;
                switch (code) {
                    case 1:
                        my_mess = "添加成功";
                        my_is = true;
                        break;
                    case 0:
                        my_mess = "添加失败";
                        break;
                    default:
                        my_mess = "未知code:" + code
                }
                return {
                    my_mess,
                    my_is
                };
            },
            realData(data) {
                return data
            },
            realParam({
                          text,// (通知内容)、
                          top,//(是否置顶)、
                          enable//是否开启
                      }) {

                return {
                    name: text,
                    isoffor: top,
                    disno: enable
                }
            }
        }
    }
}
