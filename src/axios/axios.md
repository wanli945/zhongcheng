# 1、
   src/axios 存放了api接口的调用信息。对接口传值、接口返回值的解析。
①index.js 对axios的封装  "Content-Type": 'application/json;charset=UTF-8'
增加了config配置项
verify:undefind|boolean 接口调用时是否需要token。 
showMessage: boolean 是否提示接口报错信息 Vue.prototype.$message。 
    showLoading: boolean  在调用接口时的有遮罩层。
loading: null 各个接口对应的遮罩层对象  Vue.prototype.$loading。
②file.js对axios的封装   "Content-type": "multipart/form-data",
增加了config配置项 （文件上传时均有遮罩层）
loading: null 各个接口对应的遮罩层对象  Vue.prototype.$loading。
③api.js 对各个接口配置项的导出，方便使用。
④url.js 后端接口前缀。