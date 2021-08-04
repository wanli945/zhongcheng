import main from "./main"
import business from "./business"
import order from "./order"

import product from "./product"
import role from "./role"
import login from "./login"

export default {
    main: {  // 首页 模块
        namespaced: true,
        ...main,
    },
    // 商机单 模块
    business: {
        namespaced: true,
        ...business
    },

    // 客户工单的模块
    order: {
        namespaced: true,
        ...order
    },

    // 权限配置模块


    // 产品配置模块
    product: {
        namespaced: true,
        ...product
    },
    // 角色管理模块
    role: {
        namespaced: true,
        ...role
    },
    // 登录
    login: {
        namespaced: true,
        ...login
    },
}
