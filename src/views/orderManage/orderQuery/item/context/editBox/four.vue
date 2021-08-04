<!--附件上传-->
<template>
    <el-container style="height: calc(100vh - 90px)">
        <el-header height="100px">
            <el-row :gutter="24" style="margin-top: 10px">
                <el-col :span="20">
                    <el-upload
                        ref="uploadExcel"
                        class="upload-demo"
                        :action="this.$fileApi.uploads_upload"
                        :multiple="false"
                        :show-file-list="true"
                        :before-upload="beforeUpload"
                        name="uploadFile"
                        :limit="1"
                        accept=".mp3,.jpg,.png,.gif,.xlsx,.txt,.pdf"
                        :auto-upload="false"
                        :data="{wid:options.workid,uploadname:userInfo.username}"
                        :file-list="uploadFileBox.file.list"
                        :http-request="uploadFile"
                        :drag="false"
                    >
                        <el-button slot="trigger" size="small" @click="uploadFileBox.file.list=[]"
                                   type="primary">选取文件
                        </el-button>
                        <el-button style="margin-left: 50px;margin-right: 20px"
                                   size="small"
                                   type="success"
                                   @click="submitUpload">上传文件
                        </el-button>
                        <span style="line-height: 32px">注：一次上传一个且文件大小不能超过20MB(建议①将文档转化为pdf，可实现预览。②多张图片到文档中再转化为一个pdf)</span>
                    </el-upload>
                </el-col>
                <el-col :span="4">
                    <el-button @click="querytable" style="margin-left: 30px" type="primary"
                               size="mini">刷新
                    </el-button>
                </el-col>
            </el-row>
            <el-divider></el-divider>

        </el-header>
        <!--
        https://view.officeapps.live.com/op/view.aspx&src=http://192.168.0.25:8083/file/%E4%BA%A7%E5%93%81%E6%B8%85%E5%8D%95.xlsx
        -->
        <el-main style="padding-top: 0;padding-bottom: 0;">
            <el-table
                ref="materialTable"
                :data="fileTable"
                :stripe="true"
                :highlight-current-row="true"
                row-key="id"
                :header-cell-style="{'text-align':'center','background-color':'rgba(193, 206, 214, 1)','fontSize':'14px',color:'black',fontWeight:600}"
                :cell-style="{'text-align':'center'}"
                :tooltip-effect="'light'"
                border
                max-height="700px"
                :empty-text="emptyText"
            >
                <el-table-column label="编号" prop="id" width="80"></el-table-column>
                <el-table-column label="上传时间" prop="uploadtime" width="160"></el-table-column>
                <el-table-column label="上传人" prop="operator" width="120"></el-table-column>
                <el-table-column label="文件名" prop="fileName"></el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="prop">
                        <template v-if="prop.row.fileType==='mp3'">
                            <el-button icon="el-icon-caret-right" circle size="mini" type="success"
                                       @click="lookBig('mp3',prop.row.fileUrl,prop.row.fileName)"></el-button>
                        </template>
                        <template
                            v-if="['jpg','png','gif','pdf'].indexOf(prop.row.fileType) !== -1">
                            <el-button icon="el-icon-view" circle size="mini" type="success"
                                       @click="lookBig(prop.row.fileType,prop.row.fileUrl,prop.row.fileName)"></el-button>
                        </template>
                        <template>
                            <el-button icon="el-icon-download" circle size="mini" type="primary"
                                       @click="lookBig('download',prop.row.fileUrl,prop.row.fileName)"></el-button>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>

    </el-container>
</template>

<script>
    import {mapState} from "vuex"
    import item from "../../../../../../common/components/table_page/item";

    export default {
        name: "four",
        props: {
            options: {
                Object,
                default() {
                    return {
                        workid: "",
                        index: "",
                        scope: null,
                        type: '',
                        pageList: null
                    }
                }
            }
        },
        computed: {
            ...mapState({
                userInfo: s => s.userInfo
            })
        },
        data() {
            return {
                uploadFileBox: {
                    file: {
                        list: [],
                        data: {}
                    },
                },
                fileTable: [],
                emptyText: "暂无数据"
            }
        },
        mounted() {
            this.querytable();
        },
        methods: {
            querytable() {
                this.emptyText = "暂无数据"
                this.$axios.post("uploads_queryUpload", {}, {
                    params: {
                        wid: this.options.workid
                    },
                    showLoading: false,
                    showMessage: false
                }).then(({list}) => {
                    this.fileTable = list;
                    this.emptyText = "暂无数据"
                }).catch(reason => {
                    this.fileTable = [];
                    this.emptyText = reason.message
                })
            },
            uploadFile({action, file, data}) {
                let formData = new FormData();
                formData.append('uploadFile', file);
                formData.append('wid', this.options.workid);
                formData.append('uploadname', this.userInfo.username);
                console.log(data);
                this.$file.post(action, formData).then(({code, entry, message, status, totalCount}) => {
                    this.$message({
                        type: (code === 1 || code === 2) ? "success" : 'error',
                        message: (code === 1 || code === 2) ? "上传成功" : (entry || message),
                        duration: 1500
                    })
                    this.querytable();
                }).catch(err => {
                    this.$message({
                        duration: 1000,
                        type: "error",
                        message: `文件上传失败${err.message}`
                    });
                })
            },
            beforeUpload(file) {
                const isJPG = file.type === 'image/jpg';
                const isPNG = file.type === 'image/png';
                const isLt20M = file.size / 1024 / 1024 <= 20;
                if (!isLt20M) {
                    this.$message({
                        duration: 2000,
                        type: "warning",
                        message: "文件大小不能超过20MB"
                    })
                }
                return isLt20M;
            },
            submitUpload() {
                if (this.$refs.uploadExcel.uploadFiles.length) {
                    const {name} = this.$refs.uploadExcel.uploadFiles[0]
                    this.$alert(`是否上传<strong style="font-weight: bold">${name}</strong> `, "提示", {
                        dangerouslyUseHTMLString: true
                    }).then(value => {
                        this.$refs.uploadExcel.submit()
                        this.querytable();
                    })
                } else {
                    this.$message({
                        type: "warning",
                        duration: 1500,
                        message: "请选择文件"
                    })
                }
            },
            UploadSuccess(response, file, fileList) {
                this.$message({
                    message: response.code === 1 ? "上传成功" : "上传失败",
                    type: response.code === 1 ? "success" : "warning",
                    duration: 2000
                })
            },
            UploadError(err, file, fileList) {
                this.$message({
                    message: err.toString(),
                    type: "error",
                    duration: 2000
                })
            },
            lookBig(method, url, name) {
                method = method && method.toLowerCase()
                if (method === "mp3") {
                    this.$root.main.index && this.$root.main.index.music_open(url, {
                        name: name,
                        id: this.options.workid
                    })
                } else if (['jpg', 'png', 'gif'].indexOf(method) !== -1) {
                    const urlArr = [];
                    this.fileTable.forEach(item => {
                        if (['jpg', 'png', 'gif'].indexOf(item.fileType) !== -1) {
                            urlArr.push(item.fileUrl)
                        }
                    });
                    this.$root.main.index && this.$root.main.index.pic_open(url, [...urlArr])
                } else if (['pdf', 'txt'].indexOf(method) !== -1) {
                    this.$DLFile(url)
                } else if (method === "download") {
                    this.$DAFile(url, name)
                }
            }
        }

    }
</script>

<style lang="less">
    .lookGig.el-message-box {
        background-color: transparent !important;
        box-shadow: none !important;
        border: 0 !important;
        overflow: visible;
        width: auto;

        .el-message-box__header, .el-message-box__btns {
            display: none;
        }

        .el-message-box__content {
            padding: 0;

            video {
                height: 100px;
                width: 100%;
            }
        }
    }
</style>
