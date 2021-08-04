/*
 * @IDE      : WebStorm
 * @time     : 2021/2/3 14:05
 * @author   : 李艳鹏
 * @Software : app
 * @File     : mock
 * @describe :
*/


import Mock from "mockjs";

export const getDD = (time = new Date(), timeType = "", that) => {
    let title = "";
    let data = []
    if (timeType.indexOf("day") >= 0) {
        title = "最近30天累计：";
        // 30天
        for (let i = 29; i >= 0; i--) {
            let _time = new Date(time);
            _time.setHours(0, 0, 0)
            _time.setDate(_time.getDate() - i);
            data.push({
                xAxis: that.$util.timestamp(_time, "MM-dd"),
                num: Mock.mock('@integer(100, 800)')
            })
        }
    } else if (timeType === 'week') {
        // 累计10周
        title = "最近10周累计：";
        for (let i = 9; i >= 0; i--) {
            let _time = new Date(time);
            _time.setHours(0, 0, 0)
            _time.setDate(_time.getDate() - i * 7);
            data.push({
                xAxis: that.$util.timestamp(_time, "yyyy-MM-dd"),
                num: Mock.mock('@integer(100, 800)')
            })
        }
    } else if (timeType === 'month') {
        // 12个月
        title = "最近12月累计：";
        for (let i = 11; i >= 0; i--) {
            let _time = new Date(time);
            _time.setHours(0, 0, 0)
            _time.setDate(1);
            _time.setMonth(_time.getMonth() - i);
            data.push({
                xAxis: that.$util.timestamp(_time, "yyyy-MM"),
                num: Mock.mock('@integer(100, 800)')
            })
        }
    }
    return {
        data,
        title,
    }
}


export const getD2D = (timeArr = [new Date(), new Date()], that) => {
    let start = timeArr[0].setHours(0, 0, 0, 0)
    let end = timeArr[1].setHours(0, 0, 0, 0)
    let diffDay = Math.floor((end - start) / (1000 * 60 * 60 * 24))
    let data = {
        dataArr: [],
        total: 0,
        title: `${diffDay}天数据累计：`
    };
    for (let i = diffDay; i > 0; i--) {
        let _time = new Date(end);
        _time.setHours(0, 0, 0)
        _time.setDate(_time.getDate() - i);
        let num = Mock.mock('@integer(100, 800)')
        data.dataArr.push({
            xAxis: that.$util.timestamp(_time, "yyyy-MM-dd"),
            num: num
        })
        data.total += num;
    }
    return data
}
