/*
 * @IDE      : WebStorm
 * @time     : 2021/2/5 15:04
 * @author   : 李艳鹏
 * @Software : app
 * @File     : logins
 * @describe :
*/

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
            url: "/staff/logins",
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
                          message,
                      }) {
                // console.log( code,
                //     entry,
                //     message,)
                if (typeof arguments[0] === "string") {
                    code = 2;
                }
                let my_mess = "", my_is = false, right = {
                    download: 0,
                    upload: 0,
                    encrypt: 0,
                    assign: 0,
                    channel: []
                }, userInfo = {}, token = "";
                switch (code) {
                    case 1:
                        my_is = true;
                        my_mess = "";
                        break;
                    case 0:
                        my_mess = "账号或密码错误";
                        break;
                    case 2:
                        my_mess = "该账号已经在其它地方登录，请重新登录！！！";
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
                }]
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
                        token = token = message || unit.generateToken(24);
                    } catch (e) {
                        my_is = false;
                        my_mess = "获取不到对应的权限信息，请联系管理员"
                    }
                }
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
                    // getcodeimg: code,
                }
            }
        }
    }
}
