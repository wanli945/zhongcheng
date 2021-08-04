class Comm {
    constructor() {

    }

    /*
    * 时间戳转化为 指定格式的日期
    * */
    timestamp(time, format = "yyyy-MM-dd HH:mm:ss") {
        try {
            if (time) {
                const date = time instanceof Date ? time : new Date(time);
                const o = {
                    "M+": date.getMonth() + 1, //月份
                    "d+": date.getDate(), //日
                    "H+": date.getHours(), //小时
                    "m+": date.getMinutes(), //分
                    "s+": date.getSeconds(), //秒
                    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                    "S": date.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (const k in o) if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                if (format.indexOf("N") >= 0) {
                    throw new TypeError("time类型错");
                } else {
                    return format
                }
            } else {
                return ""
            }
        } catch (e) {
            console.error(time + "格式不对" + JSON.stringify(e))
            return "";
        }
    }

    /*
    * 对搜索条件进行解析
    * */
    queryConditionsParse(queryOption) {
        let queryList = {}
        queryOption.forEach((value) => {
            if (value.field === "orderTime") {
                queryList['otime'] = this.timestamp(value.value[0], "yyyy-MM-dd")
                queryList['ptime'] = this.timestamp(value.value[1], "yyyy-MM-dd")
            } else if (value.field === "completion") {
                queryList['cotime'] = this.timestamp(value.value[0])
                queryList['cptime'] = this.timestamp(value.value[1])
            } else if (value.field === "appointment") {
                queryList['appointment'] = this.timestamp(value.value[0], "yyyy-MM-dd");
                queryList['appointments'] = this.timestamp(value.value[1], "yyyy-MM-dd");
            } else if (value.field === "tailafter") {
                queryList['tailafter'] = this.timestamp(value.value[0], "yyyy-MM-dd");
                queryList['tailafters'] = this.timestamp(value.value[1], "yyyy-MM-dd");
            } else {
                let vs = ""
                try {
                    if (value.type === "date") {
                        vs = this.timestamp(value.value, "yyyy-MM-dd")
                    } else {
                        vs = value.value.trim();
                    }
                } catch (e) {
                    vs = value.value;
                }
                queryList[value.field] = vs;
            }
        });
        return queryList
    }

    generateToken(length = 32, chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz") {
        const maxPos = chars.length;
        let result = '';
        for (let i = 0; i < length; i++) {
            //产生随机数方式
            result += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return result;
    }

    _messDiff(params, diffParams, diffAttr) {
        const keys = Object.keys(diffAttr);
        const diffArr = [];
        const oldArr = {};
        const newArr = {};
        keys.forEach((value) => {
            if (diffParams[value] !== params[value]) {
                /*
                * todo 工单模板为数字  行销结果 不需要存储
                * */
                if (value !== "workserved" && value !== "pagestatos") {
                    oldArr[diffAttr[value]] = diffParams[value];
                    newArr[diffAttr[value]] = params[value];
                }
                diffArr.push({
                    attrName: diffAttr[value],
                    newValue: params[value],
                    oldValue: diffParams[value],
                })
            }
        });
        const diffMess = {};
        diffArr.forEach(({attrName, newValue, oldValue}) => {
            if (attrName !== 'workserved') {
                diffMess[attrName] = newValue + `（旧值:${oldValue}）`
            }
        })
        return {
            diffArr,
            oldArr,
            newArr,
            diffMess
        }
    }

    /*
    * 商机信息差异
    * */
    businessDiff(params) {
        return this._messDiff(params, params.oldMessage, {
            name: "客户姓名",
            idcard: "身份证号",
            phone: '手机号',
            areas: '省份',
            address: '地市',
            c4name: '地区',
            interior: '装机地址',
            broadband: '业务号码',
            kdBroadband: '宽带账号',
            accept: '产品名称',
            payment: '付款金额',
            pagestatos: "行销结果",
            failure: '失败原因',
            appointmentime: '预约日期',
            trackingtime: '跟踪时间',
            paymentmethod: '付款方式',
            tmallId: '天猫订单号',
            terminalNumber: '终端串号',
            terminalModel: '终端型号',
            packageChange: '需更改的套餐类型',
            secondaryCard: '副卡号码',
            nowDiscount: '现有优惠',
            nowPackageType: '现有套餐类型',
            workserved: "工单模板",
            remark: '备注',
            oocp: "OOCP扣费金额"
        })
    }
    // 商机单表格处 修改信息 查询对比 并生成历史轨迹信息
    businessEdit(params) {
        return this._messDiff(params, params.oldMessage, {
            name: "客户姓名",
            idcard: "身份证号",
            phone: '手机号',
            remark: '备注',
            interior: "安装地址"
        })
    }

    orderEditDiff(param) {
        const _diffArr = {
            custname: "客户名称",
            custphone: "联系电话",
            custidcard: "身份证号",
            businessnumber: '宽带帐号',
            broadband: "业务号码",
        };

        const {diffArr, oldArr, newArr, diffMess} = this._messDiff(param, param.oldMessage, _diffArr);
        return {
            diffArr,
            diffMess
        }
    }

    // 获取document 信息
    getWinHidden() {
        let hidden = false;
        if (document.hidden !== undefined) {
            hidden = document.hidden
        } else if (document.msHidden !== undefined) {
            hidden = document.msHidden
        } else if (document.webkitHidden !== undefined) {
            hidden = document.webkitHidden
        }
        return hidden
    }

    /*
    * 循环任务
    * that[switchFlag] // 要为指向对象的值
    * */
    loopTask({
                 switchFlag,
                 timeout = 1000 * 60,
                 task = () => {
                 },
                 immediate = false,
                 that // vue 组件实例
             } = {}) {
        // 是否立即执行
        if (immediate) {
            task();
        }
        // let that$ = this;
        let _timer = setTimeout(function f() {
            if (that[switchFlag]) {
                // that$.getWinHidden() || task();
                task();
                setTimeout(f, timeout);
            } else {
                clearTimeout(_timer);
                _timer = null
            }
        }, timeout);
    }

    /* 防抖
    *  高频函数触发后  n秒后  再触发
    * */
    debounce({
                 task = () => {
                 },
                 interval = 5000,
                 immediate = false
             }) {
        let _timer = null;  // 状态机 机制
        return function (...rest) {
            // 若_timer不为null this 为执行函数的 作用域
            if (_timer) {
                return void 0;
            }
            immediate && task(...rest);
            _timer = setTimeout(() => {
                clearTimeout(_timer)
                _timer = null
                immediate || task(...rest);
            }, interval);
        }
    }


    /* 节流函数
   * 节流是将多次执行变成每隔一段时间执行。
   * */
    throttle(func, wait, type) {
        let previous = 0;
        let timeout;
        return function () {
            let context = this;
            let args = arguments;
            if (type === 1) {
                let now = Date.now();
                if (now - previous > wait) {
                    func.apply(context, args);
                    previous = now;
                }
            } else if (type === 2) {
                if (!timeout) {
                    timeout = setTimeout(() => {
                        timeout = null;
                        func.apply(context, args)
                    }, wait)
                }
            }
        }
    }
}

module.exports = Comm;
