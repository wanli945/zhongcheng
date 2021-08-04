/*
 * @IDE      : WebStorm
 * @time     : 2020/12/29 10:45
 * @author   : 李艳鹏
 * @Software : app
 * @File     : table
 * @describe :
*/
import {table_columns} from "../index.data"

export default {
    data: {
        table_data: [],
        table_columns: table_columns,
    },
    methods: {
        // todo 数据的查询
        async table_select() {
            this.table_data = [];
            try {
                this.table_data = (await this.$axios.post("tent_setSelect", {}, {
                    showLoading: false
                })).list;
            } catch (e) {
                console.log(e)
            }
        },
        table_delete({id}) {
            this.$alert("", {
                message: "是否删除此产品",
                title: "提示",
                type: "success",
            }).then(() => {
                this.$axios.post("tent_setDelete", {}, {
                    params: {id}
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
            })
        },
    },
    computed: {}
}
