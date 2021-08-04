const axios = require("axios");
const config = require("../config/http")
/*
*
* 对 test.m 进行配置
* */
module.exports = ({
                      ipType = '',
                      isLocal = true,
                      request = {
                          onFull(config) {
                              config.headers["Content-Type"] = "application/json"
                              return config
                          },
                          onReject(error) {
                              return Promise.reject(error)
                          }
                      },
                      response = {
                          onFull({data}) {
                              return data;
                          },
                          onReject(error) {
                              return Promise.reject(error)
                          }
                      },
                      createOption
                  } = {}) => {
    const ip = config[ipType] ? config[ipType][isLocal ? 'local' : 'pro'] : ""
    const instance = axios.create({
        baseURL: ip,
        ...createOption,
    })
    instance.interceptors.request.use(request.onFull ? request.onFull : (config) => {
        config.headers["Content-Type"] = "application/json"
        return config
    }, request.onReject ? request.onReject : (error) => {
        return Promise.reject(error)
    });
    instance.interceptors.response.use(response.onFull ? response.onFull : ({data}) => {
        return data
    }, response.onReject ? response.onReject : error => {
        return Promise.reject(error)
    })
    return instance;
}
