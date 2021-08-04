/*
 * @IDE      : WebStorm
 * @time     : 2021/2/18 9:34
 * @author   : 李艳鹏
 * @Software : app
 * @File     : index
 * @describe :
*/
import Mock from "mockjs";

const getTotal = (array = []) => {
    let psd = {
        category: "合计",
        all: 0,
        accept: 0,
        success: 0,
        submitted: 0,
        accepted: 0,
        failure: 0,
        verified: 0,
        pending: 0,
        serverPending: 0,
        acceptPending: 0,
        abandoned: 0,
        completion: 0,
    };
    array.forEach(value => {
        Object.entries(value).forEach((value1, index) => {
            if (value1[0] !== "category") {
                psd[value1[0]] += parseInt(value1[1].toString());
            }
        });
    })
    psd.completion = (psd.completion / array.length).toFixed(2) + "%"
    return psd
}
const setColumns = (title) => {
    return [
        {label: title, prop: "category"},
        {label: "总订单量", prop: "all"},
        {label: "受理数量", prop: "accept"},
        {label: "成功订单", prop: "success"},
        {label: "已提交", prop: "submitted"},
        {label: "已受理", prop: "accepted"},
        {label: "处理失败", prop: "failure"},
        {label: "待核实", prop: "verified"},
        {label: "待处理", prop: "pending"},
        {label: "业务员挂起", prop: "serverPending"},
        {label: "受理员挂起", prop: "acceptPending"},
        {label: "废弃", prop: "abandoned"},
        {label: "竣工率", prop: "completion"},
    ]
}

const getProduct = async (that) => {
    const columns = setColumns("产品名称"), data = [];
    try {
        for (let i = 0; i <= Mock.mock('@integer(10,20)'); i++) {
            let obj = {
                category: Mock.mock("@ctitle(10,12)"),
                all: 0,
                accept: Mock.mock('@integer(100,200)'),
                success: Mock.mock('@integer(100,200)'),
                submitted: Mock.mock('@integer(100,200)'),
                accepted: Mock.mock('@integer(100,200)'),
                failure: Mock.mock('@integer(100,200)'),
                verified: Mock.mock('@integer(100,200)'),
                pending: Mock.mock('@integer(100,200)'),
                serverPending: Mock.mock('@integer(100,200)'),
                acceptPending: Mock.mock('@integer(100,200)'),
                abandoned: Mock.mock('@integer(100,200)'),
                completion: 0
            }
            Object.values(obj).forEach((value, index) => {
                if (index) {
                    obj.all += value
                }
            })
            obj.completion = (obj.success * 100 / obj.all).toFixed(2) + "%";
            data.push(obj)
        }

    } catch (e) {

    }
    return {
        columns,
        data: data.concat(getTotal(data))
    }
}
const getAccept = async (that) => {
    const columns = setColumns("受理员"), data = [];
    try {
        for (let i = 0; i <= Mock.mock('@integer(10,20)'); i++) {
            let obj = {
                category: Mock.mock("@cname(3,4)"),
                all: 0,
                accept: Mock.mock('@integer(100,200)'),
                success: Mock.mock('@integer(100,200)'),
                submitted: Mock.mock('@integer(100,200)'),
                accepted: Mock.mock('@integer(100,200)'),
                failure: Mock.mock('@integer(100,200)'),
                verified: Mock.mock('@integer(100,200)'),
                pending: Mock.mock('@integer(100,200)'),
                serverPending: Mock.mock('@integer(100,200)'),
                acceptPending: Mock.mock('@integer(100,200)'),
                abandoned: Mock.mock('@integer(100,200)'),
                completion: 0
            }
            Object.values(obj).forEach((value, index) => {
                if (index) {
                    obj.all += value
                }
            })
            obj.completion = (obj.success * 100 / obj.all).toFixed(2) + "%"
            data.push(obj)
        }
    } catch (e) {

    }
    return {
        columns,
        data: data.concat(getTotal(data))
    }
}
const getChannel = async (that) => {
    const columns = setColumns("渠道"), data = [];
    try {
        for (let i = 0; i <= Mock.mock('@integer(10,20)'); i++) {
            let obj = {
                category: Mock.mock("@ctitle(3,4)"),
                all: 0,
                accept: Mock.mock('@integer(100,200)'),
                success: Mock.mock('@integer(100,200)'),
                submitted: Mock.mock('@integer(100,200)'),
                accepted: Mock.mock('@integer(100,200)'),
                failure: Mock.mock('@integer(100,200)'),
                verified: Mock.mock('@integer(100,200)'),
                pending: Mock.mock('@integer(100,200)'),
                serverPending: Mock.mock('@integer(100,200)'),
                acceptPending: Mock.mock('@integer(100,200)'),
                abandoned: Mock.mock('@integer(100,200)'),
                completion: 0
            }
            Object.values(obj).forEach((value, index) => {
                if (index) {
                    obj.all += value
                }
            })
            obj.completion = (obj.success * 100 / obj.all).toFixed(2) + "%"
            data.push(obj)
        }
    } catch (e) {

    }
    return {
        columns,
        data: data.concat(getTotal(data))
    }
}
const getServer = async (that) => {
    const columns = setColumns("业务员"), data = [];
    try {
        for (let i = 0; i <= Mock.mock('@integer(10,20)'); i++) {
            let obj = {
                category: Mock.mock("@cname(3,4)"),
                all: 0,
                accept: Mock.mock('@integer(100,200)'),
                success: Mock.mock('@integer(100,200)'),
                submitted: Mock.mock('@integer(100,200)'),
                accepted: Mock.mock('@integer(100,200)'),
                failure: Mock.mock('@integer(100,200)'),
                verified: Mock.mock('@integer(100,200)'),
                pending: Mock.mock('@integer(100,200)'),
                serverPending: Mock.mock('@integer(100,200)'),
                acceptPending: Mock.mock('@integer(100,200)'),
                abandoned: Mock.mock('@integer(100,200)'),
                completion: 0
            }
            Object.values(obj).forEach((value, index) => {
                if (index) {
                    obj.all += value
                }
            })
            obj.completion = (obj.success * 100 / obj.all).toFixed(2) + "%"
            data.push(obj)
        }
    } catch (e) {

    }
    return {
        columns,
        data: data.concat(getTotal(data))
    }
}

export const getData = async (that) => {
    return {
        product: await getProduct(that),
        accept: await getAccept(that),
        channel: await getChannel(that),
        server: await getServer(that)
    }
}
