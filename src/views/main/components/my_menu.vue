<template>
    <el-menu
        :default-active="defaultMenu"
        class="myc_menu"
        @select="menuSelected"
        background-color="#F0F6F6"
        text-color="#3C3F41"
        active-text-color="black"
        :collapse="isCollapse"
        ref="menuScope"
        :unique-opened="true"
        :router="false"
    >
        <!--
        todo 菜单栏
        -->
        <!--        <autoMenu :navMenus="menuList"></autoMenu>-->
        <autoMenu :navMenus="menu"></autoMenu>
    </el-menu>
</template>

<script>
    import {mapMutations, mapState} from "vuex"
    // import menuList from "../../../data/menuList.data";
    import changeTitle from "./js/changeTitle";
    import autoMenu from "../../../common/components/autoMenu"

    export default {
        name: "my_menu",
        props: {
            isCollapse: {type: Boolean, default: false},
            menu: {type: Array, required: true}
        },
        components: {
            autoMenu,
        },
        data() {
            return {
                // menuList: menuList,
            }
        },
        mounted() {

            this.$root.menuScope || (this.$root.menuScope = this.$refs['menuScope']);
            // console.log(this.$root.menuScope.activeIndex)
            // console.log(this.$root.menuScope.openedMenus)
        },
        methods: {
            menuSelected(curPage, breadcrumbArr) {
                let title = changeTitle(curPage, breadcrumbArr, this)
                let _ct = curPage.split("_");
                this.addTab({
                    components: _ct[0],
                    title: _ct[1],
                    option: {},
                    name: curPage,
                    id: _ct[0],
                    pageTitle: title
                });
                this.$emit("componentSwitch", {
                    components: _ct[0],
                    title: _ct[1],
                    option: {},
                    name: curPage,
                    id: _ct[0]
                });
            },
            ...mapMutations({
                addTab: "addTab"
            })
        },
        computed: {
            ...mapState({
                defaultMenu: state => state.tabs.defaultMenu,
                self_menu: s => s.menu.list,
            })
        }
    }
</script>

<style lang="less">
    .myc_menu {
        border-right-color: transparent;
        transition: all .2s ease-in .2s;

        &.el-menu {
            width: 200px;

            &.el-menu--collapse {
                width: 64px;
            }
        }
    }
</style>
<style lang="less" scoped>
    /*.el-menu-vertica {
        font-size: 16px;
    }*/
</style>
