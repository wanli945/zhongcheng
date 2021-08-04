import Vue from "vue";
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import("../views/login"),

    }, {
        path: '/main',
        name: 'main',
        component: () => import("../views/main/index"),
        children: []
    },
    {
        path: "*",
        name: "page_404",
        component: () => import("../views/other/noFind.vue")
    }
    ,{
        path: '/main/logins',
        name: 'logins',
        component: () => import("../views/systemConfiguration/BssLogin/index"),
        children: []

    }
    ]

const router = new VueRouter({
    mode: 'history',
    // base: process.env.BASE_URL,
    routes
});


export default router
