/*
 * @IDE      : WebStorm
 * @time     : 2021/1/14 10:20
 * @author   : 李艳鹏
 * @Software : app
 * @File     : changeTitle
 * @describe :
*/


export default (curPage = "", breadcrumbArr = [], that) => {
    let title = ""
    if (breadcrumbArr.length === 1) {
        title = "众诚互联网平台管理系统"
    } else {
        breadcrumbArr.forEach((value, index) => {
            index && (title += value.split("_")[1] + "-")
        })
        title = title.slice(0, title.length - 1)
    }
    return title;
}
