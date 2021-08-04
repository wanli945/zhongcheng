export default (baseURL, unit) => {
    return {
        /*
        *  登录接口
        * */
        post: {
            /*
            * 是否需要验证
            * */
            verify: false,
            baseURL: baseURL,
            url: "/staff/login",
            params: {
                ephone: "",
                epwd: ""
            },
            data: {},
            header: {},
            return: {},
            parseData({
                          code,
                          entry,
                          message
                      }) {

                let my_mess = "", my_is = false, right = {
                    download: 0,
                    upload: 0,
                    encrypt: 0,
                    assign: 0,
                    channel:[]
                }, userInfo = {}, token = "";
                switch (code) {
                    case 1:
                        my_is = true;
                        my_mess = "";
                        break;
                    case 0:
                        my_mess = entry || message;
                        break;
                    default:
                        my_mess = "未知code:" + code
                }
                const {ename, ephone, epwd, depasid, levelsid, id} = (entry ? entry : {})
                let menu = [{
                    alias: "首页",
                    children: null,
                    createUserId: 1,
                    description: "系统的首页",
                    icon: "el-icon-s-home",
                    id: 1,
                    name: "home",
                    parentMenuId: 0,
                    sort: 0,
                    type: "LINK",
                    value: ""
                }];
                if (my_is) {
                    try {
                        menu = JSON.parse(levelsid.djson);
                        right = {
                            download: levelsid.lxiazai,
                            upload: levelsid.lshangchuang,
                            encrypt: levelsid.ljiami,
                            assign: levelsid.lfenpei,
                            channel: eval('(' + levelsid.lqudao + ')')
                        };
                        userInfo = {
                            username: ename,
                            password: epwd,
                            phone: ephone,
                            role: levelsid.lname,
                            department: depasid.dname,
                            id
                        }
                        token = message || unit.generateToken(24);
                    } catch (e) {
                        my_is = false;
                        my_mess = "获取不到对应的权限信息，请联系管理员"
                    }
                }
                // console.log(right.channel);
                return {
                    my_mess,
                    my_is,
                    /*
                    *  用户信息
                    * */
                    userInfo,
                    token,
                    /*
                    * 权限信息
                    * */
                    right,
                    /*
                    * 左侧菜单栏部分
                    * */
                    menu,
                };
            },
            realData(data) {
                return data
            },
            realParam({phone, password, code}) {
                return {
                    ephone: phone,
                    epwd: password,
                    getcodeimg: code,
                }
            }
        }
    }
}
