
export default (baseURL, unit) => {
    return {
        //  hanguphensj   hangupthenumber
        post: {
            // verify: true,
            baseURL: baseURL,
            url: "/work/hangupthenumber",
            params: {
                    name: '',
            },
            data: {},
            header: {},
            return: {},
            parseData({code,entry}) {
                // console.log(code,entry)
                let my_is = true;
                return {
                    my_is,
                    my_mess: "查询成功",
                    code,
                    entry
                };
            },
            realData(data) {
                return data
            },

            realParam({name}) {
                return  {
                    name
                }
            },

        }
    }
}
