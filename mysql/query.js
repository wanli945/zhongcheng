const query = require("mysql2/promise")
const mysql_config = require("../config/mysql")
const pool = {}
for (let [k, v] of Object.entries(mysql_config)) {
    pool[k] = query.createPool(v)
}

function Str2Json(val) {
    try {
        return JSON.parse(val)
    } catch (e) {
        return val
    }
}

function Json2Str(val) {
    try {
        return JSON.stringify(val)
    } catch (e) {
        return val
    }
}

module.exports = function ({use = "pro"} = {}) {
    let Pool = pool[use];
    return ({sql, values = []}) => new Promise((resolve, reject) => {
        /*连接  mysql池*/
        Pool.getConnection().then(conn => {
            /*开始事务*/
            conn.beginTransaction().then(value => {
                conn.execute(sql, values).then(([data, fields]) => {
                    resolve({
                        data: JSON.parse(JSON.stringify(data)),
                        fields
                    });
                    conn.commit();
                }).catch(reason => {
                    conn.rollback().then(value1 => {
                        reject({
                            queryErr: reason,
                            rollBack: value1,
                            myErr: "事务回滚成功"
                        })
                    }).catch(reason1 => {
                        reject({
                            queryErr: reason,
                            rollBack: reason1,
                            myErr: "事务回滚失败"
                        })
                    });
                }).finally(() => {
                    conn.release();
                    conn.destroy();
                });
            }).catch(reason => {
                reject(reason, "beginTransaction 失败")
            })
        }).catch(reason => {
            reject(reason, "getConnection 连接数据池失败")
        })
    });
};

