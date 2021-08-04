window.addEventListener('touchmove', e => e.preventDefault(), {
    passive: true
})
import Vue from 'vue'

import plugin from "./plugin/index"
import 'default-passive-events'
import "./common/css/reset.css"
import 'element-ui/lib/theme-chalk/reset.css';
// import 'element-ui/lib/theme-chalk/index.css';
// import "./context/css/icon/iconfont.css"
import router from './router'
import store from './store'
import App from './App.vue'

Vue.config.productionTip = false;

// Vue.config.performance = false;

Vue.use(plugin, {}) // 添加插件

Vue.prototype.$env = false
/*Vue.config.warnHandler = (err, vm, info) => {
    const curPage = vm.curPage.split("_")[0];
    const errInfo = `Unknown custom element: <${curPage}> - did you register the component correctly? For recursive components, make sure to provide the "name" option.`
    if (errInfo === err) {
        vm.$message({
            message: `无权访问或页面组件加载超时`,
            type: "warning",
            duration: 1500,
        })
    }
    console.error("[Vue warn]: " +err + info);
}*/

const app = new Vue({
    router: router,
    data: {
        /*
        * 各个页面的作用域
        *
        *  */
        main: {
            index: null,
            top: null,
            menu: null,
        },
        dataManage: {
            index: null,
            first: null,
            second: null,
            third: null
        },
        orderManage: {
            index: null
        },
        business: {
            customerData: {
                infoFlow: {
                    index: null
                },
                index: null
            }
        },
        finance: {
            commissionList: {
                commOrderList: {
                    index: null
                }
            }
        },
        menuScope: null,


        /*
        *
        * 对地市和渠道数据进行一个缓存
        * */
        cityArr: [],
        cityObj: {},
        dataArr: [],
        dataObj: {},
        /*
        * 对查询受理员等信息的缓存
        * */
        staffData: null,
        /*
        * 流的缓存
        * */
        liu: null
    },
    methods: {
        /*
        * 查询地市
        * */
        async query_city2() {
            try {
                if (this.cityArr.length === 0) {
                    let {cityArr, cityObj} = await (this.$axios.post("info_prefectural", {}, {
                        showLoading: false,
                        showMessage: false,
                    }))
                    this.cityArr = cityArr;
                    this.cityObj = cityArr;
                }
                return {
                    cityArr: this.cityArr,
                    cityObj: this.cityObj
                }
            } catch (e) {
                return {cityArr: [], cityObj: {}}
            }
        },
        /*
        * 查询地市
        * */
        async query_city() {
            try {
                if (this.cityArr.length === 0) {
                    let {cityArr, cityObj} = await (this.$axios.post("info_prefectural", {}, {
                        showLoading: false,
                        showMessage: false,
                    }))
                    this.cityArr = cityArr;
                    this.cityObj = cityObj;
                }
                return this.cityArr
            } catch (e) {
                return []
            }
        },
        /*
        * 查询渠道
        * */
        async query_channel(business, channelArr) {
            try {
                if (this.dataArr.length === 0) {
                    let {dataObj, dataArr} = await (this.$axios.post("info_channelquery", {}, {
                        showLoading: false,
                        showMessage: false,
                    }))
                    this.dataArr = dataArr;
                    this.dataObj = dataObj;
                }
                const dataArr = this.dataArr, dataObj = this.dataObj;
                let channelDict = [], data_Obj = {};
                // 信息流各个模块展示自己 配置的渠道
                if (business) {
                    dataArr.forEach((value) => {
                        return !!~channelArr.indexOf(value.value) && channelDict.push(value)
                    })
                    Object.keys(dataObj).forEach(value => {
                        return !!~channelArr.indexOf(value) && (data_Obj[value] = dataObj[value])
                    })
                } else {
                    channelDict.push(...dataArr)
                    data_Obj = dataObj
                }
                /*channelDict.push(...dataArr)
                data_Obj = dataObj*/
                return {
                    channelDict,
                    dataObj: data_Obj
                }
            } catch (e) {
                return {
                    channelDict: [],
                    dataObj: {}
                }
            }
        },
        /*
        * 查询员工列表
        * */
        async getStaff() {
            try {
                if (this.staffData === null) {
                    this.staffData = await this.$axios.post("staff_queryemply", {}, {
                        params: {
                            deparname: ""
                        },
                        showLoading: false
                    });
                }
                return this.staffData
            } catch (e) {

            }
        },
        /*
        * 查询流   工单模板 6 个  及 各受理流程
        * */
        async getLiu() {
            try {
                if (this.liu === null) {
                    this.liu = await this.$axios.post("fley_liu_liu", {}, {
                        params: {
                            enble: 1
                        },
                        showMessage: false,
                        showLoading: false
                    })
                }
                return this.liu;
            } catch (e) {
                return this.liu;
            }
        }

    },
    store,
    render: function (h) {
        return h(App)
    },
}).$mount('#app')

export default app;
// console.log(process.env.NODE_ENV.baseUrl)
