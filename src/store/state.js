export default {

    /*
    * 客户信息
    * */
    userInfo: {
        username: "",
        phone: "",
        department: "", // 部门
        role: "", // 角色
        id: "",
        password: ""
    },

    tabs: {
        curPage: "home_首页",
        tabsList: [
            {
                title: '首页', // 标签名
                name: 'home_首页',
                components: "home",
                options: null,
                id: 'home',
                fixed: true,
                pageTitle: "众诚互联网平台管理系统"
            },
        ],
        curComponent: {
            title: '首页', // 标签名
            name: 'home_首页',
            components: "home",
            options: null,
            id: 'home',
            fixed: true,
            pageTitle: "众诚互联网平台管理系统"
        },
        defaultMenu: "home_首页",
        curIndex: 0
    },
    /*
    *
    * 右键菜单的信息  每个页面的都可能不同
    * */
    menu: {
        list: []
    },
    // 权限
    right: {
        assign: 0, // 分配
        download: 0, // 下载
        encrypt: 0, //加密
        upload: 0, //上传
        channel: [] // 渠道

    },
    /*
    * 页面缓存相关内容 2021-03-05
    * */
    cache: {
        list: new Set(['home'])
    },
    arrList: ['终端外呼','分销','电商平台']
}
