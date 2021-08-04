// 客户端 axios的配置
import Axios from "axios"
import Storage from "../context/js/storages.js";
// import vue from "../main";
// import api from "./api"
import qs from "qs"


let ShowAlert = true;
window.UserApiCount = Object.create(null)
window.UserApiCount['success'] = 0;
window.UserApiCount['failure'] = 0;

const Instance = (vue, api) => {
    const instance = Axios.create({
        withCredentials: false,
        headers: {
            "Content-Type": 'application/json;charset=UTF-8'
        },
        timeout: 0,
        verify: undefined, // 是否验证加token
        showMessage: true,
        showLoading: true,
        loading: null,
        paramsSerializer(params) {
            return qs.stringify(params, {
                arrayFormat: "repeat"
            });
        },
        hasAlert: true
    });

    instance.interceptors.request.use((config) => {
        // console.log(config)
        const {method, url, data, headers, params, timeout, showMessage, verify} = config
        // console.log(config)
        console.time(url)
        // console.log(config)
        // 是否展示 加载
        if (config.showLoading) {
            config.loading = vue.$loading({
                text: "加载中",
                body: true,
                background: "rgba(0,0,0,.5)"
            })
        }
        const Box = api[url]  // 总api中 当前的接口路径
        if (Box) {
            const __dd = Box[method.toLowerCase()];
            // console.log(__dd)
            config = Object.assign({}, config, {
                headers: Object.assign({}, __dd.headers ? __dd.headers : {}, headers ? headers : {}),
                params: Object.assign({}, __dd.params ? __dd.params : {}, params ? __dd.realParam(params) : {}),
                data: Object.assign({}, __dd.data ? __dd.data : {}, data ? __dd.realData(data) : {}),
                url: __dd.url || url,
                baseURL: __dd.baseURL,
                /*url: "api/" + __dd.baseURL[__dd.baseURL.length - 1] + __dd.url || url,
                baseURL: "",*/
                userUrl: url,
                verify: verify === undefined ? (__dd.verify === undefined ? true : __dd.verify) : verify
            });
            // console.log(config)
            let token = undefined;
            return config.verify ?
                (token = Storage.c_token.get(), token ? ((config.headers.common['token'] = token, config.params['token'] = token), config) : Promise.reject({
                    code: 0,
                    message: "获取不到验证信息"
                }))
                : config
        } else {
            return config
        }
    }, error => {
        return Promise.reject(error)
    })

    const double = vue.$util.debounce({
        task(mess) {
            vue.$alert("", {
                message: "该账号已经在其它地方登录，请重新登录！！！",
                title: "警告",
                type: "warning",
            }).finally(() => {
                location.replace("/");
            })
        },
        immediate: true,
        interval: 3000
    });
    instance.interceptors.response.use(({config, data, headers, request, status, statusText}) => {
        const {userUrl, method, showMessage, hasAlert} = config
        // console.log(config)
        // console.log(typeof data)
        // console.log(data)
        // console.log(headers)
        if (config.showLoading) {
            config.loading.close();
            config.loading = null;
        }
        console.timeEnd(userUrl)
        if (typeof data === "string" && hasAlert) {
            double(data);
            return Promise.reject({is_my: true, message: data})
        } else {
            window.UserApiCount.success += 1;
            const Box = api[userUrl]
            if (Box) {
                const my_data = Box[method].parseData(data)
                const {my_is, my_mess} = my_data
                return my_is ? {...my_data, message: my_mess} :
                    (showMessage && vue.$message({
                        message: my_mess,
                        type: "warning",
                        duration: 1500
                    }), Promise.reject({...my_data, is_my: true, message: my_mess}));
            } else {
                return data
            }
        }
    }, (error) => {
        console.log(error)
        const {message, config, response} = error
        console.timeEnd(config.url || config.userUrl)
        if (config.showLoading) {
            config.loading.close();
            config.loading = null;
        }

        let showMessage = true;
        let _message = message;
        config && (showMessage = config.showMessage)
        window.UserApiCount.failure += 1;
        /*
        * 对接口返回的错误进行包装
        * */
        if (response) {
        } else {
            switch (message) {
                case "Network Error":
                    _message = "接口无法访问";
                    break;
            }
        }
        return (showMessage && vue.$message({
            message: _message,
            type: "warning",
            duration: 1500
        }), Promise.reject(error));
    });
    return instance
}


export default Instance

