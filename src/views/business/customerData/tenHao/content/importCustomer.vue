<!--
 --@IDE      : WebStorm
 --@time     : 2020/12/25 15:59
 --@author   : 李艳鹏
 --@Software : app
 --@File     : importCustomer
 --@describe : 1w号商机单导入
-->
<template>
  <el-tabs v-model.trim="activeName">
    <el-tab-pane name="first" label>
      <el-container direction="horizontal" v-if="activeName==='first'">
        <el-main style="padding: 0;padding-left: 10px;">
          <template v-if="proArray.length">
            <el-button-group class="whout_buttonBox">
              <el-button
                v-for="(item,index) of proArray"
                @click="addOne(item)"
                :key="item.id"
                style="margin-top: 6px"
              >
                {{item.product + '（' + item.area + '）'+
                (pageRight==='management'?'/'+item.department:'')}}
              </el-button>
            </el-button-group>
          </template>
          <template v-else>
            <el-alert title="无产品信息" type="warning" center :closable="false" show-icon></el-alert>
          </template>
        </el-main>
        <el-dialog
          :visible.sync="insertOrder.visible"
          append-to-body
          destroy-on-close
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          ref="dialog"
          custom-class="myDialog"
        >
          <el-container style="height: 600px;padding: 0;">
            <el-main style="padding: 0;overflow-x: hidden">
              <el-form
                class="tenHaoForm"
                style="display: flex;flex-wrap: wrap;justify-content: space-between"
                ref="tenHaoForm"
                label-position="top"
                label-width="auto"
                :model="insertOrder.data"
                :rules="insertOrder.rules"
              >
                <el-form-item label="产品名称" style="width: 49%">
                  <el-input :value="insertOrder.data.product" disabled></el-input>
                </el-form-item>

                <el-form-item label="业务号码" style="width: 49%">
                  <el-input v-model.trim="insertOrder.data.mainCard"></el-input>
                </el-form-item>

                <el-form-item label="客户姓名" style="width: 49%" prop="username">
                  <el-input v-model.trim="insertOrder.data.username"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" style="width: 49%" prop="phone">
                  <el-input v-model.trim="insertOrder.data.phone"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" style="width: 49%">
                  <el-input v-model.trim="insertOrder.data.idCard"></el-input>
                </el-form-item>
                <el-form-item label="渠道(一级)" prop="channels" style="width: 49%">
                  <el-select
                    style="width: 100%"
                    v-model.trim="insertOrder.data.channels"
                    placeholder="请选择"
                  >
                    <template v-for="(item,index) in channelsDict">
                      <el-option :key="index" :label="item.label" :value="item.value"></el-option>
                    </template>
                  </el-select>
                </el-form-item>

                <el-form-item label="渠道(二级)" prop="channel" style="width: 49%">
                  <el-select
                    style="width: 100%"
                    v-model.trim="insertOrder.data.channel"
                    placeholder="请选择"
                  >
                    <template v-for="(item,index) in channelObj[insertOrder.data.channels]">
                      <el-option :key="index" :label="item.label" :value="item.value"></el-option>
                    </template>
                  </el-select>
                </el-form-item>
<!--                <el-form-item label="订单地市" style="width: 49%">-->
<!--                  <el-input disabled :value="insertOrder.data.areas+ '-' + insertOrder.data.area  "></el-input>                    -->
<!--                </el-form-item>-->
                  <el-form-item label="订单地市" style="width: 49%" prop="city">
                      <el-cascader style="width: 100%" :props="{expandTrigger:'hover'}"  clearable
                                   :options="cityDict" v-model="insertOrder.data.city"
                                   separator="-" placeholder="请选择地市"></el-cascader>

                  </el-form-item>

                <el-form-item label="宽带账号" style="width: 49%">
                  <el-input v-model.trim="insertOrder.data.broadband"></el-input>
                </el-form-item>

                <el-form-item label="商品模板" style="width: 49%" prop="template">
                  <el-select style="width: 100%" v-model.trim="insertOrder.data.template">
                    <template v-for="(item,index) of orderTemplate">
                      <el-option :key="index" :label="item.label" :value="item.id"></el-option>
                    </template>
                  </el-select>
                </el-form-item>

                <el-form-item label="副卡号码" style="width: 49%">
                  <el-input v-model.trim="insertOrder.data.secondaryCard"></el-input>
                </el-form-item>

                <el-form-item v-show="false" label="行销结果" style="width: 49%">
                  <el-input disabled :value="insertOrder.data.marketing"></el-input>
                </el-form-item>
                <template v-if="pageRight === 'management'">
                  <!--<el-form-item label="业务员" style="width: 49%">
                                        <el-select style="width: 100%" key="serviceName1"
                                                   v-model.trim.trim="insertOrder.data.serviceName">
                                            <template v-for="(item,index) in serverSelect">
                                                <el-option :value="item.value" :label="item.label"
                                                           :key="index"></el-option>
                                            </template>
                                        </el-select>
                  </el-form-item>-->
                </template>
                <template v-else-if="pageRight === 'oneself'">
                  <el-form-item label="业务员" style="width: 49%" prop="serviceName">
                    <el-input key="serviceName2" disabled :value="insertOrder.data.serviceName"></el-input>
                  </el-form-item>
                </template>
                <template v-else></template>
                <el-form-item label="备注" style="width: 100%">
                  <el-input type="textarea" v-model.trim="insertOrder.data.remark"></el-input>
                </el-form-item>
              </el-form>
            </el-main>
            <el-footer height="50">
              <el-row :gutter="24">
                <el-col :span="24" style="text-align: center">
                  <el-button type="primary" @click="submitInfo('tenHaoForm')">确认信息</el-button>
                </el-col>
              </el-row>
            </el-footer>
          </el-container>
        </el-dialog>
      </el-container>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapState } from "vuex";
import {
  businessDefaultChannel,
  businessDefaultFlow,
} from "../../../../../data/status.data.js";
import {cityDict} from "../../../../businessImportSetting/tenHao/index.data";

export default {
  name: "importCustomer",
  props: ["pageRight", "api"],
  data() {
    return {
      cityDict: [],
      activeName: "first",
      proArray: [],
      proDict: {},
      orderTemplate: [],
      insertOrder: {
        visible: false,
        data: {
          product: "", // 产品名称      *
          area: "", // 地市            *
          areas: "", //
          marketing: "", // 行销结果    *
          serviceName: "", // 业务员    *
          broadband: "", // 宽带号
          mainCard: "", // 业务主号
          username: "", // 客户姓名
          idCard: "", // 身份证号
          phone: "", // 联系电话
          template: "", // 商品模板
          secondaryCard: "", //副卡
          remark: "", // 备注
          channels: businessDefaultChannel.tenHao.default, // 一级渠道
          channel: "", // 二级
          city: []
        },
        rules: {
          // product: [{required: true,message:"产品名称必填",trigger: 'blur'}]
          username: [
            { required: true, message: "客户姓名不能为空", trigger: "blur" },
          ],
          template: [
            { required: true, message: "商品模板不能为空", trigger: "blur" },
          ],
          serviceName: [
            { required: true, message: "业务员不能为空", trigger: "blur" },
          ],
          channels: [
            { required: true, message: "请选择渠道", trigger: "blur" },
          ],
          channel: [{ required: true, message: "请选择渠道", trigger: "blur" }],
          city: [{ required: true, message: "请选择地市", trigger: "blur"}],
          phone: [
            { required: true, message: "请填写联系电话", trigger: "blur" },
          ],
        },
      },
      serverDict: {},
      serverSelect: [],

      channelsDict: [],
      channelObj: {},
    };
  },
  mounted() {
    this.insertProArr();
    this.queryLiu();
    this.init();
    this.queryCity()
  },
  methods: {
      async queryCity() {
          this.cityDict = await this.$root.query_city()
      },
    //   添加 ... 数组
    async insertProArr() {
      this.proArray = [];
      try {
        const { proList, proDict } = await this.$axios.post(
          "tent_setSelect",
          {},
          {
            showLoading: false,
          }
        );
        if (this.pageRight === "oneself" || this.pageRight === "all") {
          proDict[this.userInfo.department.trim()].forEach((v) => {
            this.proArray.push({
              product: v.product, // 产品名称  *
              area: v.area, // 地市 *
              areas: v.areas,
              marketing: "营销成功", // 行销结果 *
              serviceName: "",
              department: "", // 部门名 *
            });
          });
            console.log(this.proArray)
        } else if (this.pageRight === "management") {
          this.proDict = proDict;
          let { serviceSelect } = await this.$axios.post(
            "staff_queryemply",
            {},
            {
                params: {
                    deparname: ""
                },
              showLoading: false,
            }
          );
          this.serverDict = serviceSelect;
          proList.forEach((v) => {
            this.proArray.push({
              product: v.product, // 产品名称  *
              area: v.area, // 地市 *
              areas: v.areas,
              marketing: "营销成功", // 行销结果 *
              department: v.department, // 部门名 *
              serviceName: "", //
            });
          });
            console.log(this.proArray)
        }
      } catch (e) {}
    },
    async queryLiu() {
      this.orderTemplate = [];
      try {
        this.orderTemplate = (
          await this.$axios.post(
            "fley_liu_liu",
            {},
            {
              params: {
                enble: 1,
              },
              showMessage: false,
              showLoading: false,
            }
          )
        ).select;
      } catch (e) {}
    },

    async init() {
      try {
        const { dataObj, channelDict } = await this.$root.query_channel(
          true,
          businessDefaultChannel.tenHao.channelArr
        );
        this.channelsDict = channelDict;
        this.channelObj = dataObj;
      } catch (e) {
        console.log(e);
      }

    },
    addOne(item) {
      this.insertOrder.visible = true;
      this.pageRight === "management" &&
        (this.serverSelect = this.serverDict[item.department] || []);
      this.$set(this.insertOrder, "data", {
        product: item.product, // 产品名称  *
        area: item.area, // 地市 *
        areas: item.areas,
        marketing: item.marketing, // 行销结果 *
        serviceName: this.pageRight === "oneself" ? this.userInfo.username : "", // 业务员 *
        broadband: "", // 宽带号
        mainCard: "", // 业务主号
        username: "",
        channel: "",
        channels: businessDefaultChannel.tenHao.default,
        idCard: "",
        phone: "", // 联系电话
        template: "", // 商品模板
        secondaryCard: "", //副卡
        remark: "", // 备注
        city: [item.areas , item.area]
      });
    },
    submitInfo(form) {
      this.$refs[form].validate((v) => {
        if (v) {
          this.$axios
            .post(
              this.api.insertOneFi,
              {},
              {
                params: {
                  ...this.insertOrder.data,
                  idcard:
                    this.insertOrder.data.idcard &&
                    String(this.insertOrder.data.idcard).toUpperCase(),
                },
              }
            )
            .then(({ message }) => {
              this.$message({
                type: "success",
                message,
                duration: 1500,
              });
              // this.insertOrder.visible = false;
              this.insertOrder.data.channer = "";
              this.insertOrder.data.broadband = "";
              this.insertOrder.data.secondaryCard = "";
              this.insertOrder.data.username = "";
              this.insertOrder.data.idCard = "";
              this.insertOrder.data.mainCard = "";
              this.insertOrder.data.phone = "";
              this.insertOrder.data.remark = "";

            })
            .catch((reason) => {});
        }
        return v;
      });
    },
  },
  computed: {
    ...mapState({
      userInfo: (Z) => Z.userInfo,
    }),
  },
  watch: {
    "insertOrder.data.channels"() {
      this.insertOrder.data.channel = "";
    },
  },
};
</script>

<style lang="less">
.whout_buttonBox {
  margin: 0 10px;

  &.el-button-group > .el-button:not(:last-child) {
    margin-right: 10px;
  }
}

.tenHaoForm {
  .el-form-item__label {
    line-height: 20px;
  }
}
</style>

