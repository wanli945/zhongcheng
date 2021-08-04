<!--// 资料 组件-->
<template>
    <el-container>
    <el-header style="padding: 0; height: 120px ">
        <el-row :gutter="24" style="margin-bottom: 20px">
            <el-col :span="6" >
                <query-option-item label="资产号" type="input" style="width: 100%; margin: 0" v-model.trim="condition.data"
                                   ></query-option-item>
            </el-col>

            <el-col :span="6">
                <query-option-item label="客户姓名" type="input" style="width: 100%" v-model.trim="condition.data"
                                  ></query-option-item>
            </el-col>
            <el-col :span="6">
                <el-button type="primary">查询</el-button>
                <el-button type="danger" icon="el-icon-upload" @click="upload.visible = true" >导入</el-button>
<!--                <el-button type="warning" icon="el-icon-download" @click="exportExecl">导出</el-button>-->
            </el-col>
        </el-row>
    </el-header>
    <el-main style="padding: 0; margin-top: 10px">
<!--        <Table-page></Table-page>-->
    </el-main>
        <el-dialog :visible.sync="upload.visible" v-if="upload.visible" width="400px">
            <template #title>
                上传文件
            </template>
            <template #default>
                <el-upload
                    ref="uploadExcel"
                    class="upload-demo"
                    drag
                    action=""
                    accept=".xlsx"
                    :multiple="false"
                    :http-request="uploadFile"
                    name="empFile"
                    auto-upload
                    :show-file-list="false"
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__tip" slot="tip">只能上传xlsx</div>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </template>
        </el-dialog>
<!--        <div>-->
<!--            <p style="font-size:16px "> </p>-->
<!--            <Banner :imgList="imgList"></Banner>-->
<!--            <carousel :sliders="imgList" :imgWidth="imgWidth"></carousel>-->

            <el-card>
                <div class="content">
<!--                <v-echarts autoresize style="height: 60px!important; margin-top:10px;" :options="echartsOptions"></v-echarts>-->
                </div>
            </el-card>
<!--        </div>-->

    </el-container>

</template>

<script>
    import Table_page from "../../../common/components/table_page/index";
    import QueryOptionItem from "../../../common/components/table_page/item";
    // import Myloadfile from "../../../common/components/myLoadfile"
    import Banner from "../../../common/components/banner";
    import carousel from "../../../common/components/carousel"
    export default {
        name: "assetConfig",
        data() {
            return {
                echartsOptions: {
                    dataset: {
                        source: []
                    },
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        name: '成功',
                        data: [150, 230, 224, 218, 135, 147, 260],
                        type: 'line'
                    },{
                        name: '总量',
                        data: [150, 230, 224, 218, 135, 147, 260],
                        type: 'line'
                    }]
                },
                imgList: [
                    require('@/assets/image/dianxin.jpg'),
                    require('@/assets/image/2.jpg'),
                    require('@/assets/image/3.jpg'),
                    require('@/assets/image/4.jpg'),
                    require('@/assets/image/5.jpg'),

                ],
                imgWidth: 1700,

                upload: {
                    visible: false,
                    file: null
                },
                condition: {
                    data:'',
                    productsName: "",
                    timerange: [new Date(), new Date()],
                }
            }
        },
        beforeCreate() {
            // this.$root.dataManage.index = this;
        },
        methods: {
            uploadFile({action, file}) {
                console.log(file)
                let formData = new FormData();
                formData.append('empFile', file);
                this.$file.post(this.$fileApi.asseti, formData).then(({
                                                                           code,
                                                                           entry,
                                                                           message,
                                                                       }) => {
                    console.log(entry,code,message,)
                        this.$DAFile(entry);

                    this.$message({
                        type: (code === 1 || code === 2) ? "success" : 'error',
                        message: (code === 1 || code === 2) ? "上传成功" : (entry || message),
                        duration: 1500
                    })

                }).catch(err => {
                    this.$message({
                        duration: 1000,
                        type: "error",
                        message: `文件上传失败${err.message}`
                    });
                })
            },
        },
        components: {
            Table_page,
            QueryOptionItem,
            // Myloadfile,
            Banner,
            carousel
        }
    }
</script>

<style scoped >
.content {
    width: 100%;
    height: 42px;
    padding: 10px;
    box-sizing: border-box;
}
</style>
