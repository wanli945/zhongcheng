/*
 * @IDE      : WebStorm
 * @time     : 2021/2/19 15:07
 * @author   : 李艳鹏
 * @Software : app
 * @File     : channelquery
 * @describe : 查询渠道配置
*/

import store from '../../../store/state'

export default (baseURL) => {
    return {
        post: {
            baseURL: baseURL,
            url: "/info/channelquery",
            params: {},
            dataArr: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                // console.log(entry)
                let my_mess = "未知code" + code, my_is = false, dataObj = {}, dataArr = [], arrList = [];
                if (code === 1) {
                    my_is = true;
                    my_mess = "查询成功";
                    entry.forEach(v => {
                        dataObj[v.channels] || (dataObj[v.channels] = []);
                        dataObj[v.channels].push({
                            label: v.channelnames,
                            value: v.channelnames,
                            id: v.id
                        })
                    })
                    // console.log(dataObj)
                    Object.keys(dataObj).forEach(value => {
                        dataArr.push({
                            label: value,
                            value: value,
                            children: dataObj[value]
                        })
                    })
                    // console.log(dataArr)
                    store.right.channel.forEach(val =>{
                        dataArr.forEach(ab => {
                            if(ab.label === val) {
                                arrList.push(ab)
                            }
                        })
                    })
                    // console.log(arrList)
                }
                // console.log(dataArr)

                return {
                    my_mess,
                    my_is,
                    dataArr,
                    dataObj,
                    arrList
                };
            },
            realData(dataArr) {
                return dataArr
            },
            realParam(param) {
                return param
            }
        }
    }
}
