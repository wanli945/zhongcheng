export default (baseURL) => {
    return {
        /*
        *  查询 员工 列表
        * */
        post: {
            baseURL: baseURL,
            url: "staff/queryemply",
            params: {},
            data: {
                arr: "",
                data: "",
                dname: "",
                laccept: "",
                lfenpei: 1,
                ljiami: 1,
                lname: "",
                lshangchuang: 0,
                lxiazai: 0,
                rname: 1,
                deparname:""

            },
            header: {},
            return: {
                code: 0,
                entry: {},
                message: ""
            },
            parseData(data) {
                let {code, entry, message} = data
                let my_mess = "",
                    my_is = false,
                    depar = [],
                    levels = [],
                    empl = [],
                    deparList = [],
                    levelsList = [],
                    acceptSelect = {},
                    serviceSelect = {},
                    serviceList = [],
                    serviceSelect2 = [],
                    acceptList = [],
                    acceptSelect2 = [];
                let dd = ({dname = '', lname = '', ename = '', ephone = '', type, box = {}} = {}) => {
                    if (lname.search(type) >= 0) {
                        if (type === '业务员') {
                            serviceList.push(ename)
                            serviceSelect2.push({
                                label: ename,
                                value: ename
                            })
                        } else if (type === '受理员') {
                            acceptList.push(ename)
                            acceptSelect2.push({
                                label: ename,
                                value: ename
                            })
                        }
                        if (box[dname] !== undefined) {
                            box[dname].push({
                                label: ename,
                                value: ename,
                            });
                        } else {
                            box[dname] = [];
                            box[dname].push({
                                label: ename,
                                value: ename,
                            });
                        }
                    }
                }
                switch (code) {
                    case 1:
                        my_mess = "成功";
                        my_is = true;
                        /*
                        * 部门
                        * */
                        entry.depar.forEach(value => {
                            const dname = value.dname.split("-")
                            depar.push({
                                daccept: value.daccept, // admin
                                dname: dname[0], // 部门
                                dtime: value.dtime, //
                                secondname: dname[1] || "",
                                id: value.id,
                            });


                            deparList.push({  // 部门数组
                                value: value.dname,
                                label: value.dname,
                                id: value.id
                            })
                        });


                        /*
                        * 角色
                        * */
                        entry.levels.forEach(value => {
                            levels.push({
                                id: value.id, // id
                                lname: value.lname, // 部门名称
                                ltime: value.ltime, // 创建时间
                                laccept: value.laccept, // 创建人
                                ljiami: value.ljiami, // 加密
                                lxiazai: value.lxiazai, // 是否可下载
                                lfenpei: value.lfenpei,
                                lshangchuang: value.lshangchuang,
                                darr: JSON.parse(value.darr),
                                lqudao: value.lqudao
                            });
                            levelsList.push({
                                value: value.lname,
                                label: value.lname,
                                id: value.id
                            });

                        });
                        /*
                        * 员工
                        * */

                        entry.empl.forEach(value => {
                            empl.push({
                                id: value.id,
                                ename: value.ename, // 姓名
                                dname: value.depasid.dname, //部门名称
                                lname: value.levelsid.lname, //角色
                                ephone: value.ephone,
                                dnameid: value.depasid.id,
                                lnameid: value.levelsid.id,
                                epwd: value.epwd
                            });
                            dd({
                                type: "业务员",
                                lname: value.levelsid.lname,
                                dname: value.depasid.dname,
                                box: serviceSelect,
                                ephone: value.ephone,
                                ename: value.ename
                            });
                            dd({
                                type: "受理员",
                                lname: value.levelsid.lname,
                                dname: value.depasid.dname,
                                box: acceptSelect,
                                ephone: value.ephone,
                                ename: value.ename
                            });
                        })
                        break;
                    case 0:
                        my_mess = "获取失败";
                        break;
                    default:
                        my_mess = "获取失败:" + code;
                }
                // console.log(deparList)
                return {
                    my_mess,
                    my_is,
                    depar,
                    levels,
                    empl,
                    deparList,
                    levelsList,
                    serviceSelect,
                    acceptSelect,
                    serviceList,
                    serviceSelect2,
                    acceptList,
                    acceptSelect2,
                };
            },
            realData(data) {
                return data
            },
            realParam(deparname) {
                // console.log(deparname)
                return deparname

            }
        }
    }
}
