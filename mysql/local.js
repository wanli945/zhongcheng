const query = require("./query")({use: "localhost"})


class Index {
    constructor() {
        this.query = query;
    }

    async getLogin(ss) {
        try {
            const {data} = await this.query({
                sql: "select * from name",
                value: [],
            })
            return data
        } catch (e) {
            console.log(e)
        }
    }

    async addUser(name, mode, age) {
        try {
            const {data} = await this.query({
                sql: "INSERT INTO `name` (`name`,`mode`,`age`) VALUES (?,?,?)",
                values: [name, mode, age]
            })
            return data
        } catch (e) {
            console.log(e)
        }
    }

    async addImg(img) {
        try {
            const {data} = await this.query({
                sql: "insert into img (`img`) Values (?)",
                values: [img]
            })
            return data
        } catch (e) {
            console.log(e)
            return e
        }
    }
}


module.exports = new Index()
