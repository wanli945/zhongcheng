<!--
 --@IDE      : WebStorm
 --@time     : 2021/2/18 17:04
 --@author   : 李艳鹏
 --@Software : app
 --@File     : six
 --@describe : describe
     地市设置
-->
<template>
    <el-container style="padding: 0;height: calc(100vh - 164px)">
        <el-aside width="450px" style="padding: 0; margin-right: 40px">
            <el-container style="padding: 0;height: calc(100vh - 164px)">
                <el-header height="40px" style="text-align: right;padding: 0;">
                    <el-button size="mini" type="primary" @click="getCity('')">刷新
                    </el-button>
                    <el-button size="mini" type="success" @click="operate_insertC2">新增</el-button>
                </el-header>
                <el-main style="padding: 0;">
                    <el-table ref="leftTable"
                              :show-header="false"
                              :data="cityData"
                              :border="false"
                    >
                        <el-table-column prop="city"></el-table-column>
                        <el-table-column width="200">
                            <template slot-scope="prop">
                                <div style="text-align: right">
                                    <el-button size="mini" type="warning" icon="el-icon-view"
                                               @click="switchCity(prop.row.city)"
                                               circle></el-button>
                                    <el-button size="mini" type="success" icon="el-icon-edit"
                                               @click="operate_updateC2(prop.row)"
                                               circle></el-button>
                                    <el-button size="mini" type="primary" icon="el-icon-delete"
                                               @click="operate_deleteC2(prop.row)"
                                               circle></el-button>
                                    <el-button size="mini" type="danger" icon="el-icon-plus"
                                               @click="operate_insertC3(prop.row)"
                                               circle></el-button>
                                </div>

                            </template>
                        </el-table-column>
                    </el-table>
                </el-main>
            </el-container>
        </el-aside>
        <el-main style="padding: 0;">
            <el-container style="padding: 0;height: calc(100vh - 164px)">
                <el-header height="40px" style="padding: 0;">
                    <h3 style="line-height: 40px;font-size: 20px;font-weight: bolder">
                        {{curCity}}</h3>
                </el-header>
                <el-main style="padding: 0;">
                    <el-table :data="curCityArr"
                              style="width: 100%;cursor: pointer;"
                              :header-cell-style="{'text-align':'center','background-color':'rgba(193, 206, 214, 1)','fontSize':'14px',color:'black',fontWeight:600}"
                              :cell-style="{'text-align':'center'}"
                    >
                        <el-table-column prop="cityId" label="地市编号"
                                         width="100"></el-table-column>
                        <el-table-column prop="cityName" label="地市名称"></el-table-column>
<!--                        <el-table-column prop="createTime" label="创建时间"></el-table-column>-->
                        <el-table-column label="操作" width="200">
                            <template slot-scope="prop">
                                <el-button size="small" type="success" icon="el-icon-edit"
                                           @click="operate_updateC3(prop.row)"
                                           circle></el-button>
                                <el-button size="small" type="primary" icon="el-icon-delete"
                                           @click="operate_deleteC3(prop.row)"
                                           circle></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-main>
            </el-container>
        </el-main>
    </el-container>
</template>

<script>
    import {
        getCity,
        c2Insert,
        c2Update,
        c2Delete,
        c3Insert,
        c3Delete,
        c3Update
    } from "../data/six"

    export default {
        name: "five",
        data() {
            return {
                cityData: [],
                curCityObj: {},
                curCityArr: [],
                curCity: ""
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.getCity();
            },
            async getCity(city) {
                try {
                    const {cityData, curCityObj} = await getCity(this)
                    this.cityData = cityData;
                    this.curCityObj = curCityObj;
                    cityData[0] && await this.switchCity(city || cityData[0].city)
                } catch (e) {
                }
            },
            async switchCity(city) {
                this.curCity = city;
                this.curCityArr = this.curCityObj[city]
            },
            operate_insertC2() {
                this.$prompt("新增一级地市",
                    "提示", {
                        closeOnClickModal: false,
                        closeOnPressEscape: false,
                        type: "info",
                        inputPlaceholder: "请输入一级地市名称",
                        inputValidator: (message = "") => {
                            try {
                                if (message.trim()) {
                                    return true
                                }
                            } catch (e) {
                            }
                            return "请输入地市名"
                        },
                        beforeClose: (action, instance, done) => {
                            if (action === "confirm") {
                                c2Insert(this, instance.inputValue).then(value => {
                                    done();
                                    this.getCity(instance.inputValue)
                                }).catch(error => {

                                })
                            } else {
                                done()
                            }
                        }
                    })
            },
            operate_updateC2({city, id}) {
                console.log(arguments)
                this.$prompt("修改一级地市 " + city,
                    "提示", {
                        closeOnClickModal: false,
                        closeOnPressEscape: false,
                        type: "info",
                        inputValue: city,
                        inputPlaceholder: "请输入一级地市名称",
                        inputValidator: (message = "") => {
                            try {
                                if (message.trim()) {
                                    return true
                                }
                            } catch (e) {
                            }
                            return "请输入地市名"
                        },
                        beforeClose: (action, instance, done) => {
                            if (action === "confirm") {
                                c2Update(this, instance.inputValue, id).then(value => {
                                    done();
                                    this.getCity(instance.inputValue)
                                }).catch(error => {

                                })
                            } else {
                                done()
                            }
                        }
                    })
            },
            operate_deleteC2({city, id}) {
                this.$alert("是否删除一级地市" + city, "提示（对应的二级地市也会被删除）", {
                    beforeClose: (action, instance, done) => {
                        if (action === "confirm") {
                            c2Delete(this, city, id).then(value => {
                                done();
                                this.getCity()
                            })
                        } else {
                            done()
                        }
                    }
                })
            },

            operate_insertC3({city, id}) {
                this.$prompt(`新增（${city}）的二级地市`,
                    "提示", {
                        closeOnClickModal: false,
                        closeOnPressEscape: false,
                        type: "info",
                        inputValue: "",
                        inputPlaceholder: "请输入二级地市名称",
                        inputValidator: (message = "") => {
                            try {
                                if (message.trim()) {
                                    return true
                                }
                            } catch (e) {
                            }
                            return "请输入二级地市名"
                        },
                        beforeClose: (action, instance, done) => {
                            if (action === "confirm") {
                                c3Insert(this, instance.inputValue, id).then(value => {
                                    done();
                                    this.getCity(this.curCity)
                                }).catch(error => {

                                })
                            } else {
                                done()
                            }
                        }
                    })
            },

            operate_updateC3({cityName, id}) {
                this.$prompt("修改二级级地市 " + cityName,
                    "提示", {
                        closeOnClickModal: false,
                        closeOnPressEscape: false,
                        type: "info",
                        inputValue: cityName,
                        inputPlaceholder: "请输入二级地市名称",
                        inputValidator: (message = "") => {
                            try {
                                if (message.trim()) {
                                    return true
                                }
                            } catch (e) {
                            }
                            return "请输入二级地市名称"
                        },
                        beforeClose: (action, instance, done) => {
                            if (action === "confirm") {
                                c3Update(this, instance.inputValue, id).then(value => {
                                    done();
                                    this.getCity(this.curCity);
                                }).catch(error => {

                                })
                            } else {
                                done()
                            }
                        }
                    })
            },
            operate_deleteC3({cityName, id}) {
                this.$alert("是否删除二级地市" + cityName, "提示", {
                    beforeClose: (action, instance, done) => {
                        if (action === "confirm") {
                            c2Delete(this, cityName, id).then(value => {
                                done();
                                this.getCity(this.curCity)
                            })
                        } else {
                            done()
                        }
                    }
                })
            },

        },
        watch: {}
    }
</script>

<style scoped>

</style>
