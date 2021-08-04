/*
 * @IDE      : WebStorm
 * @time     : 2020/12/29 11:10
 * @author   : 李艳鹏
 * @Software : app
 * @File     : mainData
 * @describe :
*/

export default {
    data: {
        one_show: false,
        one_method: "insert",
        one_data: {
            index: undefined,
            id: undefined,
            productName: "",
            city: [],
            department: ""
        },
        serverSelect: [],
        serverList: [],

        one_rules: {
            productName: [
                {required: true, message: "产品不能为空", trigger: 'blur'}],
            city: [{required: true, message: "地市不能为空", trigger: 'blur'},],
            department: [{required: true, message: "部门名称不能为空", trigger: 'blur'},]
        }
    },
    methods: {
        async getServerList() {
            this.serverSelect = [];
            this.serverList = [];
            try {
                const select = (await this.$root.getStaff())
                this.serverList = select.serviceList;
                for (let item of Object.entries(select.serviceSelect)) {
                    this.serverSelect.push({
                        label: item[0],
                        value: item[0],
                        children: [...item[1]]
                    });
                }
            } catch (e) {
            }
        },

        async productSearch(queryString, cd) {
            if (queryString) {
                try {
                    const {list} = await this._productSearch(queryString)
                    if (list.length <= 0) {
                        this.$message({
                            type: "warning",
                            duration: 1500,
                            message: "未查询到产品信息"
                        })
                    }
                    cd(list)
                } catch (e) {
                    cd([])
                }
            } else {
                cd([])
            }
        },
        async _productSearch(queryString, depaname = this.one_data.department) {
            try {
                return await this.$axios.post('query_chaproname', {}, {
                    params: {
                        queryString,
                        depaname
                    },
                    showLoading: false
                });
            } catch (e) {
                return e
            }
        },
       async JproductSearch(queryString, depaname = this.one_data.department) {
            try {
                return await this.$axios.post('auto_queryByProp', {}, {
                    params: {
                        queryString,
                        depaname
                    },
                    showLoading: false
                });
            } catch (e) {
                return e
            }
        },
        one_insert({form = ''} = {}) {
            if (form) {
                this.$refs[form.trim()].validate(v => {
                    if (v) {
                        const {productName, department, city} = this.one_data
                        console.log(productName, department)
                        this.JproductSearch(productName,department).then(({productInfo}) =>{
                            console.log(productInfo)
                            if(productInfo === undefined) {
                                this.$message({
                                    type: "warning",
                                    message: "请在产品搜索下拉框中选择产品",
                                    duration: 1500
                                })
                            }else {
                                this.$alert("", {
                                    title: "提示",
                                    type: "success",
                                    message: "是否新增10000号导入的产品",
                                }).then(value => {
                                    this.$axios.post("tent_setInsert", {}, {
                                        params: {productName, department, city}
                                    }).then(({message}) => {
                                        this.one_show = false;
                                        this.$message({
                                            duration: 1500,
                                            message: message,
                                            type: "success"
                                        });
                                        this.table_select();
                                    }).catch(reason => {
                                    })
                                }).catch(reason => {
                                });
                            }
                        })
                    }
                    return v;
                })
            } else {
                this.one_show = false;
                setTimeout(v => {
                    this.one_show = true;
                    this.one_method = 'insert'
                    this.one_data = {
                        index: undefined,
                        id: undefined,
                        productName: "",
                        area: [],
                        department: ""
                    }
                }, 100)
            }
        },
         one_update({form = '', data} = {}) {
            if (form) {
                this.$refs[form.trim()].validate(v => {
                    if (v) {
                        const {productName, department, city, id} = this.one_data;
                       this.JproductSearch(productName, department).then(({productInfo}) =>{
                           console.log(productInfo)
                           if(productInfo === undefined) {
                               this.$message({
                                   type: "warning",
                                   message: "请在产品搜索下拉框中选择产品",
                                   duration: 1500
                               })
                           }else {
                               this.$alert("", {
                                   title: "提示",
                                   type: "success",
                                   message: "是否修改10000号导入的产品",
                               }).then(value => {
                                   this.$axios.post("tent_setUpdate", {}, {
                                       params: {
                                           productName, department, city, id
                                       }
                                   }).then(({message}) => {
                                       this.one_show = false;
                                       this.$message({
                                           duration: 1500,
                                           message: message,
                                           type: "success"
                                       });
                                       this.table_select();
                                   }).catch(reason => {
                                   })
                               }).catch(reason => {
                               });
                           }
                       })
                    }
                    return v;
                })
            } else {
                const {index, id, productName, department, area, areas} = data;
                console.log(data)
                this.one_show = false;
                setTimeout(v => {
                    this.one_show = true;
                    this.one_method = 'update'
                    this.one_data = {
                        index,
                        id,
                        productName,
                        city: [areas, area],
                        department
                    }
                }, 100)
            }
        },
    },
    computed: {
        getCurdepaname() {
            for (let itemArr of this.serverSelect) {
                for (let item of itemArr.children) {
                    if (item.value === this.one_data.department) {
                        return itemArr.value;
                    }
                }
            }
        },
    }
}
