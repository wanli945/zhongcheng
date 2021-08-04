// import echarts from "echarts"
import Axios from "axios"
// import xlsx from "xlsx"
import reg from "../../common/js/reg"
import util from "../../../unit/client"
import moment from "moment";
import axios from "../../axios/index"
import Storage, {
    c_collapse,
    c_Fassign,
    c_fytable,
    c_fytable_infoFlow,
    c_ordertable,
    c_user
} from "../../context/js/storages";
import ElementUi from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import deep from 'lodash'
import file, {fileApi} from "../../axios/file"
import Ola from "../item/ola.es6";
import ola from "../../ola/index"
import download, {downAllFile} from "../item/download";
import templateUrl from "../item/templateUrl";
import {ApiList, ApiObj} from "../../axios/api"
/*
*
* staff_yanzhenimg: 24.490966796875 ms
* staff_login: 34.43017578125 ms
* staff_logins: 111.394775390625 ms
* */
// import mWatermark from "../../common/js/mWatermark";

export default (Vue, config) => {
    Vue.use(ElementUi)
    Vue.prototype.$reg = reg; // 导入正则
    // Vue.prototype.$echarts = echarts; // 导入图表
    // Vue.prototype.$xlsx = xlsx; //导入 xlsx
    Vue.prototype.$util = new util(); // 导入一些自定义的方法
    // Vue.prototype.$urlMap = {};
    Vue.prototype.$axios = axios(Vue.prototype, ApiObj);
    Vue.prototype.$http = Axios;
    Vue.prototype.$file = file;
    Vue.prototype.$fileApi = fileApi;
    Vue.prototype.$c_token = Storage.c_token; // 获取 token
    Vue.prototype.$c_user = Storage.c_user; // 获取 用户信息
    Vue.prototype.$c_router = Storage.c_router; // 获取路由信息
    Vue.prototype.$c_tabs = Storage.c_tabs; // 获取路由信息
    Vue.prototype.$c_menu = Storage.c_menu; // 获取菜单栏
    Vue.prototype.$c_right = Storage.c_right; // 获取权限

    Vue.prototype.$c_fytable = Storage.c_fytable; // 飞鱼页面的表格信息

    Vue.prototype.$c_fytable_infoFlow = Storage.c_fytable_infoFlow; // 信息流页面的商机单表格信息
    Vue.prototype.$c_tmalltable_infoFlow = Storage.c_tmalltable_infoFlow; // 电商页面的商机单表格信息
    Vue.prototype.$c_tenHaotable_infoFlow = Storage.c_tenHaotable_infoFlow; // 万号页面的商机单表格信息
    Vue.prototype.$c_distributiontable_infoFlow = Storage.c_distributiontable_infoFlow; // 分销页面的商机单表格信息
    Vue.prototype.$c_breathtable_infoFlow = Storage.c_breathtable_infoFlow; // 终端外呼页面的商机单表格信息


    Vue.prototype.$c_ordertable = Storage.c_ordertable; // 订单生产的列
    Vue.prototype.$c_B2Iordertable = Storage.c_B2Iordertable; // B2I订单生产的列
    Vue.prototype.$c_MSMordertable = Storage.c_MSMordertable; // 短信订单生产的列


    Vue.prototype.$c_Fassign = Storage.c_Fassign; // 飞鱼单分配页面
    Vue.prototype.$c_anlaysistable = Storage.c_anlaysis // 分析的列
    // Vue.prototype.$c_title = Storage.c_title // 网页标题
    Vue.prototype.$c_collapse = Storage.c_collapse // 是否折叠

    // Vue.prototype.$deep = deep
    Vue.prototype.$apiCmd = ApiList
    Vue.prototype.$tURL = templateUrl

    /*
    * 添添呼
    * */

    /*
    * 下载文件  传值url
    * */
    Vue.prototype.$DLFile = download
    Vue.prototype.$DAFile = downAllFile(Vue.prototype)

    //对错误验证退出main页面
    Vue.prototype.$my_Alter = (that) => {
        /**/
        const alertMy = (message) => {
            that.$alert(message, "提示", {
                showClose: false,
                showCancelButton: false,
                type: "warning"
            }).then(() => {
                that.$c_user.clear();
                that.$c_token.clear();
                that.$c_tabs.clear();
                that.$c_right.clear();
                that.$router.replace({path: "/", name: "login"}).finally(() => {
                })
            })
        };
        const userVerify = () => {
            try {
                return that.$c_user.get() || false;
            } catch (e) {
                return false
            }
        }
        return new Promise((resolve, reject) => {
            let user = userVerify();
            /*
            * token 获取不到  user为 undefined  user中无  username 无 phone
            * */
            if (!that.$c_token.get() || !user || !user.username || !user.phone || !user.password) {
                reject();
                alertMy("验证信息未获取，请重新登录")
            } else {
                /*
                * 去验证获取 验证 信息
                * */
                that.$axios.post("staff_logins", {}, {
                    params: {
                        phone: user.phone, password: user.password
                    },
                    showMessage: false,
                    verify: true,
                    hasAlert: false
                }).then(({token, userInfo, right, menu}) => {
                    console.log(token)
                    that.$c_user.set(userInfo);
                    that.$c_right.set(right);
                    that.$c_menu.set(menu);
                    that.$c_token.set(token)
                    resolve({userInfo, right, menu});
                }).catch(reason => {
                    alertMy(reason.message);
                    reject(reason);
                });
            }
        })
    };
    if (config.local) {
        moment.locale(config.local)
    }
    Vue.prototype.$moment = moment; // 时间转化插件

    Vue.prototype.$ola = new Ola({vue: Vue.prototype, url: "ws://192.168.0.253:29003/ola_socket"})
    Vue.prototype.$olaHttp = ola // ola的接口

    // Vue.directive('watermark', mWatermark)
}
