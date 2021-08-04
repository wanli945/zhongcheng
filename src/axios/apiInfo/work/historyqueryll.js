export default (baseURL, unit) => {
    return {
        /*
        *
        * 获取工单的历史记录
        * */
        post: {
            baseURL: baseURL,
            url: "/work/historyqueryll",
            params: {
                id: undefined
            },
            data: {},
            header: {},
            return: {},
            parseData({code, entry}) {
                let my_is = false,
                    my_mess = '未知状态' + code;
                const historyAll = [];
                if (code === 1) {
                    my_is = true;
                    entry.forEach(({isitright, id, historys, updatemotion, sevenstatus, curentname, state, statosname, uplogintime, uplognno, workid}, index) => {
                        /*
                        * todo  isitright 区分  0-> 佣金和工单   1->商机单
                        * */
                        const ds = uplognno ? uplognno.split("-") : ['', ''];
                        if (updatemotion === '分配') {
                            historys = '分配给：' + curentname
                        }
                        historyAll.push({
                            id,
                            reason: historys, // 失败原因
                            operatingTime: uplogintime, // 操作时间
                            operator: ds[0],// 操作人
                            workid,
                            state7: sevenstatus, //7工单状态
                            oldOperator: ds[1] ? (ds[1] === 'null' ? '' : ds[1]) : '',
                            results: state,
                            time: uplogintime,
                            stateOld: statosname, //旧状态
                            state: state + (statosname && `(旧:${statosname})`), //新状态
                            operatorID: '',
                            button: updatemotion || (historys ? '人工流转' : ""),
                            remark: historys,
                            operators: curentname
                        });
                    })
                } else if (code === 0) {
                    my_mess = "工单历史查询失败"
                }
                return {
                    my_is,
                    my_mess,
                    historyAll, // 工单+佣金 积分
                };
            },
            realData(data) {
                return data
            },
            realParam(data) {
                return data
            }
        }
    }
}
