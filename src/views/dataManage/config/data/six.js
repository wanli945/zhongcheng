/*
 * @IDE      : WebStorm
 * @time     : 2021/2/18 17:04
 * @author   : 李艳鹏
 * @Software : app
 * @File     : six
 * @describe :
*/


export const getCity = async (that) => {
    let curCityObj = {}, cityData = [];
    try {
        const {cityArr, cityObj} = await that.$axios.post("info_prefectural", {}, {
            showLoading: false
        });
        cityData.push(...cityArr);
        curCityObj = cityObj;
        /* for (let i = 0; i < Mock.mock("@integer(5,10)"); i++) {
             let dddg = Mock.mock("@province")
             cityData.push({
                 city: dddg
             })
             curCityObj[dddg] = [];
             for (let j = 0; j < Mock.mock("@integer(5,10)"); j++) {
                 curCityObj[dddg].push({
                     cityId: Mock.mock("@integer(200,300)"),
                     cityName: Mock.mock("@city"),
                     createTime: Mock.mock('@datetime()')
                 })
             }
         }*/
    } catch (e) {

    }
    return {
        cityData,
        curCityObj
    }
}

export const c2Insert = async (that, value) => {
    try {
        await that.$axios.post("info_prefecturalin", {}, {
            params: {
                areaname: value.trim()
            }
        })
        that.$message({
            duration: 1500,
            type: "success",
            message: "新增成功"
        })
    } catch (e) {

    }
}
const update = async (that, value, id) => {
    try {
        await that.$axios.post("info_zcpreupdate", {}, {
            params: {
                areaname: value.trim(),
                id
            }
        })
        that.$message({
            message: "修改成功",
            type: "success",
            duration: 1500
        })
    } catch (e) {

    }
}

const delete_ = async (that, id) => {
    try {
        await that.$axios.post("info_zcpredelete", {}, {
            params: {
                id
            }
        })
        that.$message({
            message: "删除成功",
            type: "success",
            duration: 1500
        })
    } catch (e) {

    }
}
/*
* 修改c2
* */

export const c2Update = async (that, value, id) => {
    await update(that, value, id)
}

export const c2Delete = async (that, value, id) => {
    await delete_(that, id);
}

export const c3Insert = async (that, value, id) => {
    try {
        await that.$axios.post("info_prefecturalin", {}, {
            params: {
                areaname: value.trim(),
                pid: id
            }
        })
        that.$message({
            duration: 1500,
            type: "success",
            message: "新增成功"
        })
    } catch (e) {

    }
}

export const c3Update = async (that, value, id) => {
    await update(that, value, id)
}

export const c3Delete = async (that, value, id) => {
    await delete_(that, id);
}
