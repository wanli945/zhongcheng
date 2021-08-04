import axios from "../axios/index"

export default {
    s_verify() {
        return axios.post("api_verify")
    },

    /*
    * 触发事件将本地的姓名和手机号码存到系统中
    * */
    a_setUserInfo({commit, dispatch}, userInfo) {
        commit("setUserInfo", userInfo);
    },
    a_setRight({commit}, obj) {
        commit("setRight", obj)
    },
}
