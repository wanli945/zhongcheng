import axios from "axios"
import url from "./url";
import Storage from "../context/js/storages.js";
import app from "../main";

const file = axios.create({
    withCredentials: false,
    headers: {
        "Content-type": "multipart/form-data",
    },
    timeout: 0,
    timeoutErrorMessage: "文件导入超时",
    loading: null
});

file.interceptors.request.use(config => {
    const token = Storage.c_token.get();
    config.loading = app.$loading({
        text: "上传中",
        body: true,
        background: "rgba(0,0,0,.5)"
    });
    if (token) {
        config.params = Object.assign({}, config.params, {
            token
        });
        return config;
    } else {
        return Promise.reject({code: -1, message: "获取不到验证信息"})
    }
}, error => {
    return Promise.reject(error)
});

file.interceptors.response.use(({data, config}) => {
    if (config.loading) {
        config.loading.close();
        config.loading = null;
    }
    return data
}, error => {
    if (error.config.loading) {
        error.config.loading.close();
        error.config.loading = null;
    }

    return Promise.reject(error)
});
export default file;

export const fileApi = {
    product: url.p8084 + "/query/rexcel",
    asseti: url.p8088 + "/auto/prodresult",
    daoruexcele: url.p8086 + "/daoexcel/daoruexcele", // 订单批量导入
    uploads_upload: url.p8086 + "/uploads/upload",
    // uploads_upload: url.p8086 + "/uploads/upload",
    daoexcel_daoruexcel: url.p8086 + "/daoexcel/daoruexcel",
    // 上传 模板图片
    dist_upload: url.p8088 + "/dist/upload",
    dist_girxiu: url.p8088 + "/dist/girxiu",
    daoexcel_exceltent: url.p8086 + "/daoexcel/exceltent",
    breath_execltent: url.p8088 + "/tamll/excelterminal",
    comm_daoruexcelecomm: url.p8086 + "/daoexcel/daoruexcelecomm",
}
