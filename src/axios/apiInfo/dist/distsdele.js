/*
 * @IDE      : WebStorm
 * @time     : 2020/12/23 10:22
 * @author   : 李艳鹏
 * @Software : app
 * @File     : distsdele
 * @describe : 分销商广告配置项查询
*/

export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/dist/distsdele",
            params: {},
            data: {},
            header: {},
            return: {},
            parseData({code}) {
                let my_mess = code === 1 ? '删除成功' : '删除失败';
                let my_is = code === 1;

                return {
                    my_mess,
                    my_is
                };
            },
            realData(data) {
                return data
            },
            realParam({array = []} = {}) {
                return {
                    data: JSON.stringify({
                        data: {...array},
                        length: array.length
                    })
                }
            }
        }
    }
}
