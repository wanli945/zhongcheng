const query = require("./query")({use: "pro"})
// const testQuery = require("./query")({use: "dev"})
query({
    sql: `SELECT count(1) as "总工单", sum(statos in ('已归档','成功订单')) as "竣工数" , sum(statos in ('处理失败','废弃')) as "退单", serviceName as "业务员" FROM workinfo WHERE channl LIKE "信息流%" GROUP BY serviceName`,
}).then(({data}) => {
    console.log(data)
})

class Index {
    constructor() {
        this.query = query;
    }

    async getLogin(ss) {
        const {data} = await this.query({
            mysql: "",
            value: []
        })
    }
}

module.exports = new Index();

