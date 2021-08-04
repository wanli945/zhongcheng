import {c_tabs} from "../context/js/storages"
 // 菜单由 字母+汉字组成
let isMenu = /[A-Za-z]+_[\u4e00-\u9fa5]+/

export default {
    /*
    * 获取本地的 c_tabs
    * */
    getGlobalTabs({tabs}) {
        try {
            let {curPage, tabsList, curComponent, defaultMenu, curIndex} = c_tabs.get();
            document.title = curComponent.pageTitle;
            if (curPage && tabsList && curComponent && defaultMenu && curIndex !== undefined && curIndex !== null) {
                tabs.curPage = curPage;
                tabs.tabsList = tabsList;
                tabs.curComponent = curComponent;
                tabs.defaultMenu = defaultMenu;
                tabs.curIndex = curIndex;
                /*
                * 将首页放在 第一个
                * */
                tabs.tabsList[0] = {
                    title: '首页', // 标签名
                    name: 'home_首页',
                    components: "home",
                    options: null,
                    id: 'home',
                    fixed: true,
                    pageTitle: "首页"
                };
            }
        } catch {

        }
    },
    /*删除Tab*/
    removeTab({tabs, menu, cache}, targetName) {
        menu.list = []
        let tabsLs = tabs.tabsList;
        let activeName = tabs.curPage;
        if (activeName === targetName) {
            tabsLs.forEach((tab, index) => {
                if (tab.name === targetName) {
                    let nextTab = tabsLs[index + 1] || tabsLs[index - 1];
                    if (nextTab) {
                        activeName = nextTab.name;
                        tabs.curComponent = nextTab;
                    }
                    return void 0;
                }
            });
        }
        tabs.curPage = activeName;
        tabs.defaultMenu = !isMenu.exec(activeName) ? tabs.defaultMenu : activeName
        tabs.tabsList = tabsLs.filter(tab => tab.name !== targetName);
        //  切换后的id 要重置
        for (let i in tabs.tabsList) {
            if (tabs.tabsList[i].name === tabs.curPage) {
                tabs.curIndex = i;
                break;
            }
        }
        c_tabs.set(tabs);

        /*
        * todo 2021-03-05 移除对应的tab
        * */
        cache.list.delete(targetName.split("_")[0]);
    },
    /*添加Tab*/
    addTab({tabs, menu, cache}, {title, options, components, id, name, pageTitle = "", fixed = false} = {}) {
        tabs.curComponent = {title, options, components, name, pageTitle, id, fixed};
        let has = tabs.tabsList.some((tab, index) => {
            if (tab.name === name) {
                tabs.curComponent = tab;
                //  切换后的id 要重置
                tabs.curIndex = index
            }
            return tab.name === name
        })
        if (!has) {
            tabs.tabsList.push({
                title,
                options,
                name,
                components,
                fixed,
                id,
                pageTitle,
            });
            tabs.curIndex = tabs.tabsList.length - 1
        }
        tabs.curPage = name;
        tabs.defaultMenu = !isMenu.exec(tabs.curPage) ? tabs.defaultMenu : tabs.curPage
        menu.list = [];
        c_tabs.set(tabs);
        /*
        * todo 2021-03-05 增加缓存
        * */
        cache.list.add(components)
    },
    /*
    *
    * 删除所有的Tab
    * */
    removeTabAll({tabs, cache}) {
        cache.list.clear();
        tabs.tabsList = tabs.tabsList.filter((value) => {
            if (value.name === "home_首页" || value.name === tabs.curPage || value.fixed === true) {
                cache.list.add(value.id)
            }
            return value.name === "home_首页" || value.name === tabs.curPage || value.fixed === true
        });
        c_tabs.set(tabs);
    },

    tabClick({tabs, menu, cache}, rest) {
        tabs.curComponent = tabs.tabsList[rest.index]
        tabs.curIndex = rest.index;
        tabs.curPage = rest.name
        /*是否为数字*/
        /*是的话*/
        menu.list = [];
        tabs.defaultMenu = !isMenu.exec(rest.name) ? tabs.defaultMenu : rest.name
        c_tabs.set(tabs);

        /*
        *
        * todo 2021-03-05 增加缓存  tabClick 切换
        * */
        cache.list.add(tabs.curComponent.components)
    },
    /*菜单右键 */
    onContextmenu({menu}, {event, that, items = [], customClass, type = null} = {}) {
        let _items = [];
        switch (type) {
            case 'tabs':
                _items = [
                    {
                        label: "重新加载",
                        divided: false,
                        icon: "el-icon-refresh",
                        onClick: () => {
                            that.$refs['component'].init()
                        },
                        disabled: !(typeof that.$refs['component'].init === "function"),
                    },
                    {
                        label: "关闭标签",
                        divided: false,
                        icon: "el-icon-circle-close",
                        disabled: that.curComponent.title === "首页",
                        onClick: () => {
                            that.curComponent.title === "首页" || that.removeTab(that.curPage)
                        }
                    },
                    {
                        label: "关闭其他标签",
                        divided: false,
                        icon: "el-icon-close",
                        onClick: () => {
                            that.removeTabAll()
                        }
                    },
                    {
                        label: that.curComponent.title === '首页' ? "固定标签" : (that.curComponent.fixed ? '取消固定' : '固定标签'),
                        divided: false,
                        icon: that.curComponent.title === '首页' ? "el-icon-lock" : (that.curComponent.fixed ? "el-icon-lock" : "el-icon-unlock"),
                        disabled: that.curComponent.title === '首页',
                        onClick: () => {
                            that.curComponent.title === '首页' || that.operationTabsLock()
                        }
                    },
                    {
                        label: "退出系统",
                        divided: false,
                        icon: "el-icon-switch-button",
                        onClick: () => {
                            that.$refs["my_top"].quit();
                        }
                    },];
                break;
        }
        // 右键菜单
        that.$contextmenu({
            items: _items.concat(items),
            event,
            customClass,
            zIndex: 500,
            minWidth: 230
        });
    },
    /*
    * tab切换
    * */
    tabLeave({tabs}, {active, old}) {

    },
    /*
    *
    * 每个页面单独增加  menu
    * */
    addContextMenu({menu}, items) {
        menu.list.push(...items)
    },
    /*
    *
    * 固定和标签和解固定标签
    * */
    operationTabsLock({tabs}) {
        tabs.tabsList[tabs.curIndex].fixed = !tabs.tabsList[tabs.curIndex].fixed;
        tabs.curComponent.fixed = tabs.tabsList[tabs.curIndex].fixed
        c_tabs.set(tabs);

    },

    /*
    * 获取全局的  用户信息
    * username: "",
        phone: "",
        department: "", // 部门
        role: "", // 角色
        id: "",
        password: ""
    * */
    setUserInfo({userInfo}, info) {
        userInfo.username = info.username
        userInfo.phone = info.phone
        userInfo.department = info.department
        userInfo.role = info.role
        userInfo.id = info.id
        userInfo.password = info.password
    },
    /*
    * 设置 right
    * */
    setRight({right}, {
        assign = 0,
        download = 0,
        encrypt = 0,
        upload = 0,
        channel = []
    } = {}) {
        right.assign = assign
        right.download = download
        right.encrypt = encrypt
        right.upload = upload
        right.channel = channel
    },
}
