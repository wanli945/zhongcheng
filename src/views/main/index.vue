<!--
系统页面
左侧菜单栏、顶部公号+用户操作、核心区域：tab+内容（组件切换--》判断是否为可调转的组件）
前斧后犁
-->
<template>
    <el-container v-if="show" style="height: 100vh">
        <el-header style="padding: 0;">
            <my_top @closeMenu="()=>{
                this.isCollapse = !this.isCollapse
            }" ref="my_top"></my_top>
        </el-header>
        <el-container style="height: calc(100vh - 50px);">
            <el-aside
                style="background-color: rgb(240, 246, 246);overflow-x: hidden; transition: all 0.2s ease-in 0.2s; "
                :width="isCollapse? '64px' :'200px'"
            >
                <my_menu :is-collapse="isCollapse" ref="mymenu" @componentSwitch="()=>{}"
                         :menu="self_menu"></my_menu>
            </el-aside>
            <el-main style="padding: 0;height: calc(100vh - 50px)">
                <el-container>
                    <el-header
                        style="padding: 0;position: relative;z-index: 12;"
                        height="40px">
                        <el-tabs class="el_tabs_box"
                                 type="card"
                                 id="changeTitleBox"
                                 :value="curPage"
                                 @tab-remove="removeTab"
                                 :before-leave="tabLeave"
                                 @contextmenu.prevent.native.stop="onContextmenu"
                                 @tab-click="tabClick">
                            <el-tab-pane
                                v-for="item in editableTabs"
                                :key="item.id"
                                :label="item.title"
                                :name="item.name"
                                :closable="!item.fixed"
                            />
                        </el-tabs>
                        <!--<div style="width: 20px">
                            <el-dropdown @command="tabCommand" :hide-on-click="true" trigger="click"
                                         placement="bottom">
                                <span class="el-icon-close"></span>
                                <el-dropdown-menu class="userList" slot="dropdown">
                                    <el-dropdown-item command="1">个人中心</el-dropdown-item>
                                    <el-dropdown-item command="4">消息中心</el-dropdown-item>
                                    <el-dropdown-item command="2">修改密码</el-dropdown-item>
                                    <el-dropdown-item command="3">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>-->
                    </el-header>
                    <el-main style="height: calc(100vh - 90px);padding: 10px;">
                        <!--                        <transition name="el-zoom-in-center">-->
                        <my-loading v-show="loadingView"/>
                        <keep-alive>
                            <component id="print" :is="curComponent.components"
                                       ref="component"
                                       v-show="!loadingView"
                                       :key="curComponent.name"
                                       :options="curComponent.options ? curComponent.options : ''">
                            </component>
                        </keep-alive>
                        <!--                        </transition>-->
                    </el-main>
                </el-container>
            </el-main>
        </el-container>
        <!--        <template v-if="show">
                    <pre style="font-size: 20px">

                {
                    token:"获取失败",
                    Date:{{new Date()}},
                    Timestamp:{{Date.now()}},
                    UserAgent:{{userAgent}},
                }
                    </pre>
                </template>-->
        <!--
       存放下载  某个文件的
      -->
        <div id="downloadFileBox" hidden></div>

        <div ref="musicBox" v-if="music.open"
             style="display: flex;position:fixed;bottom:0;justify-content: center;flex-direction:column;z-index: 9999;width: 500px;left: 0;">
            <el-row>
                <el-col style="text-align: right;position: absolute;left: 5px;z-index: 1000 ">
                    <el-button @click="music_close()" icon="el-icon-close"
                               circle></el-button>
                </el-col>
            </el-row>
            <el-row>
                <aplayer @error="audioError" style="margin: 0" ref="musicAudio"
                         preload="auto"
                         :volume="1"
                         autoplay
                         :music.sync="musicList">
                </aplayer>
            </el-row>
        </div>
        <!--
         图片预览
        -->
        <el-image
            style="width: 0;height: 0;"
            ref="bigImg"
            :src="bigImage.url"
            :z-index="99999"
            lazy
            class="open_img"
            :preview-src-list="bigImage.srcList">
        </el-image>
        <!--展示消息窗口-->
        <mess-box ref="messBox"></mess-box>
    </el-container>
</template>
<script>
    import {mapState, mapActions, mapMutations} from "vuex"
    import my_menu from "./components/my_menu"
    import my_top from "./components/my_top"
    import aplayer from "vue-aplayer";
    import AImg from "../../assets/dxlogo.png"
    /*
    * 按需导入组件
    * */
    import {List} from "./index.components";
    import MyLoading from "./components/myLoading";
    import {mainContext} from "./components/other.js"
    import MessBox from "./components/messBox";
    // import {ApiObj} from "../../axios/api"
    export default {
        name: "index",
        components: {
            MyLoading,
            MessBox,
            my_top,
            my_menu,
            // ...List,
            aplayer
        },
        data() {
            let isCollapse = false;
            try {
                isCollapse = this.$c_collapse.get()
            } catch (e) {
            }
            return {
                /*
                *todo  消息的个数
                * */
                messBox: {
                    data: {
                        "所有消息": [],
                    },
                    show: false
                },
                show: false,
                // showComponent: false,
                isCollapse,
                self_menu: [],
                userAgent: window.navigator.userAgent,
                music: {
                    open: false,
                    name: null,
                    id: null
                },
                musicList: {
                    title: "",
                    artist: "",
                    src: "none",
                },

                bigImage: {
                    url: '',
                    srcList: []
                },
                loadingView: false,
                cacheArr: new Set()
            }
        },
        computed: {
            ...mapState({
                curPage: (state) => state.tabs.curPage,
                editableTabs: (state) => state.tabs.tabsList,
                curComponent: state => state.tabs.curComponent,
                curIndex: state => state.tabs.curIndex,
                componentList: s => s.cache.list,
                userInfo: s => s.userInfo
            }),
            messNum() {
                let Ms = 0;
                for (let item of Object.keys(this.messBox.data)) {
                    if (item !== "所有消息") {
                        Ms += this.messBox.data[item].length || 0
                    }
                }
                return Ms;
            }
        },
        /*
        *
        *
        * */
        beforeCreate() {
            // this.$urlMap = Object.assign(this.$urlMap,ApiObj)
            this.$root.main.index = this;
        },
        mounted() {
            // todo
            // this.show = true

            this.freeLogin()
        },
        methods: {
            music_open(src, {name = "", id} = {}) {
                this.music.open = true;
                /*this.$nextTick(() => {
                    const audio = this.$refs.musicAudio.$refs.audio
                    audio.pause()
                })*/
                let urlName = name;
                if (name.length > 36) {
                    urlName = name.substring(0, 20) + "...." + name.substring(name.length - 12);
                }
                this.musicList = {
                    title: "订单编号：" + id,
                    artist: "文件名：" + urlName,
                    src: src,
                    pic: AImg
                };
                this.$nextTick(() => {
                    const audio = this.$refs.musicAudio.$refs.audio
                    audio.play();
                });
            },
            music_close() {
                this.$refs.musicAudio.$refs.audio.pause();
                this.$nextTick(() => {
                    this.music.open = false;
                })
            },
            /*tabCommand(gg) {
                console.log(gg)
            },*/
            audioError(error) {
                this.$message({
                    message: "音频获取失败",
                    type: "warning",
                    duration: 3000
                })
            },
            /*
            * todo 查看大图
            * */
            pic_open(url, urlArr) {
                this.bigImage.srcList = []
                this.bigImage.url = url;
                this.bigImage.srcList.push(...urlArr)
                this.$refs.bigImg.showViewer = true
                this.$refs.bigImg.show = false
            },
            /*
            * 免登录验证
            * */
            async freeLogin() {
                this.loadingView = true;
                this.show = false;
                try {
                    const {userInfo, menu, right} = await this.$my_Alter(this);
                    this.self_menu = menu;
                    this.componentsArr = this.getComponents(menu);
                    await this.addInVueCom();
                    this.getGlobalTabs();
                    this.show = true;
                    /*
                    * 设置用户
                    * */
                    this.setUserInfo(userInfo)
                    /*
                    * 设置权限
                    * */
                    this.setRight(right)
                    /*
                    * 设置菜单栏
                    * */

                    this.loadingView = false;

                    /* //  切换页面权限
                     if (this.curComponent.components === 'home') {
                         // await this.componentSwitch(this.curComponent)
                     }*/

                    if (this.curComponent.components === 'home') {
                        // this.checkPage();
                        // this.checkComponents();
                    }
                } catch (e) {
                    this.show = false;
                    this.componentsArr = [];
                } finally {
                }
            },
            /*
            *
            * 登录成功后添加组件
            * */
            async addInVueCom() {

                try {
                    this.componentsArr.forEach(value => {
                        this.$options.components[value] = List[value];
                    })
                    // 导入全局 组件
                    this.$root.constructor.use(mainContext)
                } catch (e) {
                    this.$message({
                        message: "页面加载超时,请刷新页面",
                        type: "warning",
                        duration: 1500
                    })
                }
            },
            /*
            * 打电话
            * 获取验证
            * */
            ola_login() {
                this.$olaHttp.get("login", {
                    params: {
                        username: "1",
                        password: "1"
                    }
                }).then(value => {
                    console.log(value)
                }).catch(reason => {
                    console.log(reason)
                })
            },
            /*
            *自动连接到 电话系统
            * */
            connection({
                           password,
                           username,
                           _extn
                       }) {
                this.$ola.connect({
                    password, username,
                    error: () => {
                    },
                    success: () => {
                    },
                    onClose: () => {
                    },
                    onMessage: (evt) => {
                        // console.log(evt)
                    },
                    onConnect: (evt) => {
                        this.$ola._extn = _extn;
                        this.$ola.subscribe('ola.agent.' + _extn);
                        this.$ola.subscribe('ola.caller.' + _extn);
                        this.$ola.get_agent_state(_extn);
                    }
                });
            },
            /*
            * todo 切换视图 触发 可以记录用户点击到了哪个页面
            * */
            async componentSwitch(data) {
                try {
                    // 切换 权限
                    let cur = new Date();
                    // while (new Date() - cur < 2000) {}
                } catch (e) {

                }
            },
            /*
            * 增加 全局的  右键
            * */
            onContextmenu(event) {
                if (event.srcElement.getAttribute('role') === 'tab'
                    && event.srcElement.classList.contains('is-active')) {
                    this.__onContextmenu({
                        event,
                        type: "tabs",
                        that: this,
                    });
                }
                return false;
            },
            tabLeave(active, old) {
                // this._tabLeave({active, old, components: Object.keys(List)})
            },
            ...mapMutations({
                removeTab: "removeTab",
                removeTabAll: "removeTabAll",
                _tabClick: "tabClick",
                __onContextmenu: "onContextmenu",
                operationTabsLock: "operationTabsLock",
                getGlobalTabs: "getGlobalTabs",
                _tabLeave: "tabLeave"
            }),
            ...mapActions({
                setUserInfo: "a_setUserInfo",
                setRight: "a_setRight",
            }),
            tabClick(rest) {
                // this.showComponent = false;
                this._tabClick(rest);
                // this.checkPage();
            },
            /*
            * todo  20210119获取权限页面
            * */
            getComponents(menuList = []) {
                let set = [];
                for (const value of (menuList || [])) {
                    !value.children && set.push(value.name);
                    set.push(...this.getComponents(value.children || []))
                }
                return set;
            },
            /*
             * todo  20210119权限页面 判断 去除 页面权限检测
           * */
            /* checkPage() {
                 if (!~this.componentsArr.indexOf(this.curComponent.components)) {
                     this.show = false;
                     localStorage.clear();
                     setTimeout(() => {
                         document.title = "无权访问"
                     }, 100);
                     this.$alert(`无权访问 ${this.curComponent.pageTitle} 页面`, {
                         title: "警告",
                         type: "warning"
                     }).finally(() => {
                         window.open("/", "_self");
                     });
                 } else {
                     this.show = true
                     this.showComponent = true;
                 }
                 // this.checkComponents();
             },

             checkComponents() {
                 const that = this;
                 let sg = setTimeout(function ddd() {
                     let cur = that.$refs.component;
                     if (cur) {
                         clearTimeout(sg);
                         sg = null;
                         const type = Object.prototype.toString.call(cur)
                         if (type === "[object HTMLUnknownElement]") {
                             that.$message({
                                 duration: 1500,
                                 type: "warning",
                                 message: "无权访问或页面加载失败"
                             });
                         }
                     } else {
                         setTimeout(ddd, 100);
                     }
                 }, 100)
             }*/
        },
        /*
        * 销毁前将 关闭
        * */
        beforeDestroy() {
            this.show && this.music.open && this.music_close();
            //释放 this
            this.$root.main.index && (this.$root.main.index = null)
        },
        /*errorCaptured(err, vm, info) {

            return false
        },*/
        watch: {
            "messNum"() {
                this.$refs['messBox'].curData = [];
                this.messBox.data["所有消息"] = []
                for (let item of Object.values(this.messBox.data)) {
                    this.$refs['messBox'].curData.push(...item);
                    this.messBox.data["所有消息"].push(...item)
                }
            },
            "isCollapse"(value) {
                this.$c_collapse.set(value);
            },
            /*"curComponent.pageTitle"(title) {
                this.checkPage();
                document.title = (title === "首页" ? "众诚互联网平台管理系统" : title) || '众诚互联网平台管理系统';
                /!*
               * 切换组件的动画
               * *!/
                this.loadingView = true;
                (async () => {
                    try {
                        // await this.componentSwitch(this.curComponent);
                        setTimeout(() => {
                            this.loadingView = false;
                        }, 250);
                    } catch (e) {

                    }
                })();
            },*/
            "curComponent.components"(newV, oldV) {
                this.$nextTick(() => {
                    let title = this.curComponent.pageTitle
                    document.title = (title === "首页" ? "众诚互联网平台管理系统" : title) || '众诚互联网平台管理系统';
                    /*
                    * 切换组件的动画
                    * */
                    this.loadingView = true;
                    // this.checkPage();
                    (async () => {
                        try {
                            // await this.componentSwitch(this.curComponent);
                            setTimeout(() => {
                                this.loadingView = false;
                            }, 250);
                        } catch (e) {
                        }
                    })();
                    // this.checkComponents();
                });

            }
        },
    }
</script>
<style lang="less">
    @import "~animate.css";

    .aplayer {
        .aplayer-body {
            width: 480px;
            height: 120px;

            .aplayer-info {
                height: 100px !important;
            }

            .aplayer-music {
                display: flex;
                flex-direction: column;

                .aplayer-title {
                    margin-bottom: 20px;
                }

                .aplayer-author {

                }
            }

            .aplayer-controller {
                .aplayer-time {
                    & > button.aplayer-icon {
                        display: none;
                    }
                }
            }
        }

        .aplayer-pic {
            width: 120px;
            height: 120px;
            background-color: #0A4B9D !important;

            .aplayer-play {
                width: 30px;
                height: 30px;

                .aplayer-icon-play {
                    width: 28px;
                    height: 26px;
                    top: 2px;
                    left: 3px;
                }
            }
        }

    }

    .el_tabs_box {
        z-index: 30;
        background: white;
        right: 0;
        border-bottom: 1px solid antiquewhite;
        margin: 0;

        .el-tabs__header {
            margin: 0;
        }

        .el-tabs__item {
            background: #E4E4E4;
            border-right: 1px solid #3a85e1;
        }

        .el-tabs__nav {
            display: flex;
            transform: none !important;
        }

        .el-tabs__nav-wrap, .el-tabs__nav-scroll {
            overflow: auto;
        }

        &.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
            border-bottom-color: transparent;
            background: white;
        }
    }

    .open_img {
        .el-image-viewer__mask {
            background-color: rgba(29, 150, 150, .6);
            opacity: 1;
        }
    }

    @keyframes myAnimation {
        0% {
            opacity: 0;
            display: none;
        }
        50% {
            opacity: .8;
        }
        100% {
            opacity: 1;
        }
    }

    .myAnimation {
        animation-name: myAnimation;
        animation-duration: .2s;
    }

    .myAnimation-enter-active {
        .myAnimation;
    }

    .myAnimation-leave-active {
        .myAnimation;
        animation-direction: reverse;
    }
</style>
