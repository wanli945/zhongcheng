/*
 * @IDE      : WebStorm
 * @time     : 2021/3/12 13:10
 * @author   : 李艳鹏
 * @Software : app
 * @File     : vueGuard
 * @describe :
*/

export default (router) => {
    // 全局前置守卫
    // router.app
    router.beforeEach((to, form, next) => {
        next()
    })
    router.beforeResolve(() => {

    })
    // 全局后置钩子
    router.afterEach((to, from) => {

    })
}

export const scrollBehavior = (to, from, savedPosition) => {

}
