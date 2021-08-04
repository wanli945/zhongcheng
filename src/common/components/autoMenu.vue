<template>
    <div class="navMenu">
        <template v-for="(navMenu,index) in navMenus">
            <!--只有一级菜单-->
            <el-menu-item
                v-if="navMenu&&(navMenu.children==null || navMenu.children===undefined)"
                :key="navMenu.id" :index='`${navMenu.name}_${navMenu.alias}`'
                :route="navMenu.value"
                :id="navMenu.name"
            >
                <!--图标-->
                <i :class="navMenu.icon"></i>
                <!--标题-->
                <span slot="title" style="padding-left: 10px">{{navMenu.alias}} </span>
            </el-menu-item>
            <!--有多级菜单-->
            <el-submenu v-if="navMenu.children&&navMenu.children.length&&navMenu"
                        :key="navMenu.id" :index='`${navMenu.name}_${navMenu.alias}`'
                        :id="navMenu.name"
            >
                <template slot="title">
                    <i :class="navMenu.icon"></i>
                    <span style="padding-left: 10px"> {{navMenu.alias}}</span>
                </template>
                <!--递归组件，把遍历的值传回子组件，完成递归调用-->
                <auto-menu :navMenus="navMenu.children"></auto-menu>
            </el-submenu>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'AutoMenu', //使用递归组件必须要有
        props: ['navMenus'], // 传入子组件的数据
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang="less">
    .navMenu {
        .el-menu-item.is-active {
            color: #409EFF !important;
        }
    }
</style>
