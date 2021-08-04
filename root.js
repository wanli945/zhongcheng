const path = require("path")
const dd = __dirname;
module.exports = (...pathLists) => {
    return path.join(dd, ...pathLists)
}
