<!--
 --@IDE      : WebStorm
 --@time     : 2020/12/24 15:46
 --@author   : 李艳鹏
 --@Software : app
 --@File     : index
 --@describe : 分销H5配置图片
-->
<template>
    <el-container style="height: calc(100vh - 174px);">
        <el-header height="40px" style="padding: 0;">
            <el-row :gutter="24" type="flex" justify="space-between">
                <el-col :span="20">
                    <el-button type="warning" icon="el-icon-search" @click="table_select(()=>
                          $message({
                          message:'刷新成功',
                          type: 'success',
                          duration: 1500
                      })
                    )">刷新
                    </el-button>
                </el-col>
                <el-col :span="4" style="text-align: right">
                    <el-button type="warning" icon="el-icon-plus" @click="table_insert()">新增
                    </el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-dialog destroy-on-close append-to-body :close-on-click-modal="false"
                   :visible.sync="dialog.visible" width="600px">
            <template #title>
                <h2>{{dialog.method==='insert'?'新增图片':'修改图片'}} (ESC退出)</h2>
            </template>
            <template #default>
                <el-upload
                    class="upload-demo"
                    style="text-align: center"
                    action=""
                    accept=".jpg,.png"
                    :file-list="fileList"
                    ref="uploadImg"
                    :http-request="()=>{}"
                    :limit="2"
                    drag
                    list-type="picture">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                        <div>将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip">只能上传jpg/png文件</div>
                    </div>
                </el-upload>
            </template>
            <template #footer>
                <el-button style="margin-left: 50px;margin-right: 20px"
                           size="small"
                           type="success"
                           v-if="dialog.method==='insert'"
                           @click="table_insert(true)">上传文件
                </el-button>
                <el-button style="margin-left: 50px;margin-right: 20px"
                           size="small"
                           type="success"
                           v-if="dialog.method==='update'"
                           @click="table_update({},true)">上传文件
                </el-button>
            </template>
        </el-dialog>
        <el-main style="padding: 0;margin-top: 10px;">
            <el-table
                :data="table_data"
                :header-cell-style="{'text-align':'center','background-color':'rgba(193, 206, 214, 1)','fontSize':'14px',color:'black',fontWeight:600}"
                max-height="700px"
                ref="materialTable"
                border
                row-key="id"
                :fit="false"
            >
                <el-table-column width="80" label="编号" prop="id"></el-table-column>
                <el-table-column width="120" label="模板名称" prop="picturename"></el-table-column>
                <el-table-column width="400" label="顶部图片地址">
                    <template slot-scope="prop">
                        <span
                            style="color: #000000;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;cursor: pointer"
                            @click="showImg(prop.row,prop.row.topimg)">{{prop.row.topimg}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="400" label="底部图片地址">
                    <template slot-scope="prop">
                        <span
                            style="color: #000000;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;cursor: pointer"
                            @click="showImg(prop.row,prop.row.bottomimg)">{{prop.row.bottomimg}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="80">
                    <template slot-scope="prop">
                        <el-button icon="el-icon-edit" @click="table_update({...prop.row})" circle
                                   size="small"
                                   type="success"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                dialog: {
                    visible: false,
                    methods: 'insert',

                    id: "",
                    name: "",
                },
                fileList: [],
                table_data: [
                    {
                        id: 10,
                        picturename: "测试",
                        topimg: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa0.att.hudong.com%2F52%2F62%2F31300542679117141195629117826.jpg&refer=http%3A%2F%2Fa0.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611395063&t=f6b007d0cae998d1a9e7c05e2fd06591",
                        bottomimg: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.aiimg.com%2Fuploads%2Fuserup%2F0909%2F2Z64022L38.jpg&refer=http%3A%2F%2Fimg.aiimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611395063&t=1c84b721530de08d188894d24c38a5ad"
                    }
                ]
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.table_select()
            },
            table_insert(ok = false) {
                if (ok) {
                    // todo 20201225 update
                    if (this.$refs.uploadImg.uploadFiles.length < 2) {
                        return this.$message({
                            type: "warning",
                            message: "请上传2张图片"
                        })
                    }
                    this.$prompt("请输入套图名称", "提示", {
                        type: "success",
                        inputValue: "",
                        inputValidator: (value = "") => {
                            return !!value.trim() || "套图不能为空";
                        }
                    }).then(({value}) => {
                        const formData = new FormData();
                        formData.append('uploadFile', this.$refs.uploadImg.uploadFiles[0].raw)
                        formData.append('uploadFiles', this.$refs.uploadImg.uploadFiles[1].raw)
                        formData.append('uploadname', value.trim());
                        this.$file.post(this.$fileApi.dist_upload, formData).then(({code}) => {
                            this.$message({
                                duration: 1500,
                                message: code === 1 ? '上传成功' : "上传失败",
                                type: code === 1 ? "success" : "error"
                            })
                            if (code === 1) {
                                this.table_select();
                                this.dialog.visible = false;
                            }

                        }).catch(reason => {

                        })
                    })
                } else {
                    this.dialog.visible = true;
                    this.dialog.method = 'insert';
                }
            },

            table_delete() {
            },
            table_update(data, ok = false) {
                if (ok) {
                    // todo 20201225 update
                    if (this.$refs.uploadImg.uploadFiles.length < 2) {
                        return this.$message({
                            type: "warning",
                            message: "请上传2张图片"
                        })
                    }
                    this.$prompt("请输入套图名称", "提示", {
                        type: "success",
                        inputValue: this.dialog.name,
                        inputValidator: (value = "") => {
                            return !!value.trim() || "套图不能为空";
                        }
                    }).then(({value}) => {
                        const formData = new FormData();
                        formData.append('uploadFile', this.$refs.uploadImg.uploadFiles[0].raw)
                        formData.append('uploadFiles', this.$refs.uploadImg.uploadFiles[1].raw)
                        formData.append('uploadname', value.trim());
                        formData.append('id', this.dialog.id);
                        this.$file.post(this.$fileApi.dist_girxiu, formData).then(({code}) => {
                            this.$message({
                                duration: 1500,
                                message: code === 1 ? '上传成功' : "上传失败",
                                type: code === 1 ? "success" : "error"
                            })
                            if (code === 1) {
                                this.table_select();
                                this.dialog.visible = false;
                            }
                        }).catch(reason => {

                        })
                    })
                } else {
                    this.dialog.visible = true;
                    this.dialog.method = 'update';
                    this.dialog.id = data.id;
                    this.dialog.name = data.picturename;
                }
            },
            table_select(callback = () => {
            }) {
                this.table_data = [];
                this.$axios.post("dist_girquery", {}, {}).then(({pictureList, message}) => {
                    this.table_data = [];
                    this.table_data.push(...pictureList);
                    callback()
                }).catch(reason => {
                })
            },

            showImg({topimg, bottomimg}, imgUrl) {
                this.$root.main.index && this.$root.main.index.pic_open(imgUrl, [topimg, bottomimg])
            }

        },
    }
</script>

<style lang="less">
    .upload-demo {
        .el-upload-list {
            & > li {
                position: relative;
                padding-left: 200px;

                &::before {
                    position: absolute;
                    left: 20px;
                    display: block;
                    font-size: 16px;
                    line-height: 70px;
                }

                &:first-child {
                    &::before {
                        content: "顶部图片：";
                    }
                }

                &:nth-child(2) {
                    &::before {
                        content: "底部图片：";
                    }
                }
            }
        }

        .el-upload-list--picture .el-upload-list__item-name i {
            left: 120px;
        }
    }
</style>
