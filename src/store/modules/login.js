import axios from "../../axios/index"

export default {
    state: () => ({

    }),
    mutations: {},
    actions: {
        /*登录   触发事件*/
        login({state, commit}, info) {
            const {username, password} = info;
            return axios.get("api_login", {
                params: {
                    username, password,
                }
            });
        }
    },
    getters: {

    }
}
