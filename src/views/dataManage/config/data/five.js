/*
 * @IDE      : WebStorm
 * @time     : 2021/2/18 14:57
 * @author   : 李艳鹏
 * @Software : app
 * @File     : index
 * @describe : 数据
*/

import Mock from "mockjs"

export const getChannel = async (that) => {

    const curChannelObj = {}, channelData = [];
    try {
        const {dataObj, dataArr} = await that.$axios.post("info_channelquery", {}, {
            showLoading: false,
            showMessage: false
        })
        dataArr.forEach(v => {
            channelData.push({channel: v.value});
            curChannelObj[v.value] || (curChannelObj[v.value] = []);
            v.children.forEach(v2 => {
                curChannelObj[v.value].push({
                    channelId: v2.id,
                    channelName: v2.label,
                },)
            })
        })
    } catch (e) {

    }
    return {
        channelData,
        curChannelObj
    }
}

export const c2Insert = async (that, value) => {
    try {
        await that.$axios.post("info_channelinsert", {}, {
            params: {
                channels: value.trim(),
                twoChannel: value.trim()
            }
        })
        that.$message({
            type: "success",
            duration: 1500,
            message: value + "新增成功"
        })
    } catch (e) {

    }
}
export const c2Update = async (that, value, c2id) => {
    try {

    } catch (e) {

    }
}
/*
* 删除二级渠道
* */
export const c2Delete = async (that, value, c2id) => {
    try {
        await that.$axios.post("info_channeldelete", {}, {
            params: {
                id: c2id
            }
        })
        that.$message({
            type: "success",
            duration: 1500,
            message: "二级渠道删除成功"
        })
    } catch (e) {

    }
}
export const c3Insert = async (that, twoChannel, channels) => {
    try {
        await that.$axios.post("info_channelinsert", {}, {
            params: {
                channels: channels.trim(),
                twoChannel: twoChannel.trim()
            }
        })
        that.$message({
            type: "success",
            duration: 1500,
            message: channels + " 二级渠道 " + twoChannel + " 新增成功"
        })
    } catch (e) {

    }
}

export const c3Update = async (that, value, c3id) => {
    try {

    } catch (e) {

    }
}

export const c3Delete = async (that, value, c3id) => {
    try {

    } catch (e) {

    }
}

