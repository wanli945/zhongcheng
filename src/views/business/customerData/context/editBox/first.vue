<!--
coding:utf-8
@IDE      : WebStorm
@time     : 2020/10/28-14:15
@author   : 李艳鹏
@Software : app
@File     : first
@describe : 商机单 详情信息并进行流转  自动受理  + 人工受理
自动受理 弹窗  请选择局向
-->
<template>
<!--    style="height: calc(100vh - 200px)"-->
  <el-container v-if="showPage" :style="{height: (pageRight === 'oneBroadband' ? 'calc(100vh - 50px)' : 'calc(100vh - 200px)' ) }">

    <!-- <el-header height="40" v-if="!editBoxData.servicename">
             <el-alert
                 title="请先分配业务员再进行操作！"
                 show-icon
                 :closable="false"
                 type="warning"
             >
             </el-alert>
    </el-header>-->
    <el-main style="padding-top: 0">
      <el-form style="display: flex;flex-wrap: wrap" class="infoForm">
        <template v-for="(item,index) in formFieldArr">
          <template v-if="item.show">

            <el-form-item :label="item.label" :key="index" :class="item.className || ''"
                          :style="{'width': (item.field === 'remark' ? '100%': (pageRight === 'oneBroadband' ? '15%' : '20%'))}">
              <!--type:customize    产品名称 —— field：accept -->
              <template v-if="item.type==='customize'">
                <template v-if="item.field==='accept'">
                  <!-- 部门-->
                  <template v-if="!!editBoxData.department">
                    <!-- 产品名称 的 输入建议 框    输入后匹配输入建议-->
                      <!--@paste.native.capture.prevent="()=>{}"  禁止粘贴-->
                    <el-autocomplete
                      :value="editBoxData.accept"
                      :fetch-suggestions="(queryString, cd)=>productSearch(queryString, cd,'accept')"
                      :placeholder="!!editBoxData.department? '查询归属*'+editBoxData.department+'*的产品(重新点击输入框)':''"
                      :trigger-on-focus="true"
                      :hide-loading="false"
                      @select="v=>productSelect(v,'accept')"
                      @input="v=>productInput(v,'accept')"
                      @clear="v=>productClear('accept')"
                      popper-class="autocompleteProduct"
                      :debounce="500"
                      :popper-append-to-body="false"
                      clearable
                      @focus="productFocus('acceptOne','accept')"
                      ref="acceptOne"
                    >
                      <template slot-scope="{ item }">
                        <el-tooltip effect="light" :content="item.value" placement="top">
                          <p style="width: 400px">{{ item.value}}</p>
                        </el-tooltip>
                      </template>
                    </el-autocomplete>
                  </template>
                         <!-- 没有部门 的 显示-->
                  <template v-else>
                    <!-- editBoxData.accept 产品名称-->
                    <el-input :value="editBoxData.accept" disabled placeholder="未获取到对应的部门信息"></el-input>
                  </template>
                </template>
                <!--  跟踪时间-->
                <template v-else-if="item.field==='trackingtime'">
                  <el-date-picker
                    v-model.trim="editBoxData.trackingtime"
                    type="datetime"
                    editable
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期"
                    default-time="12:00:00"
                    :clearable="false"
                  ></el-date-picker>
                </template>
                <!-- 行销结果-->
                <template v-else-if="item.field==='pagestatos'">
                  <el-cascader
                    :props="{ expandTrigger: 'hover' }"
                    filterable
                    :options="cascaderItem.failure.select"
                    separator="-"
                    :value="editBoxData.failure?[editBoxData.pagestatos,editBoxData.failure] : [editBoxData.pagestatos]"
                    @change="statosChange"
                    :disabled="editBoxData.statos==='营销成功' ||editBoxData.statos==='交易成功' "
                  />
                </template>
                    <!-- 备注-->
                <template v-else-if="item.field==='remark'">
                  <el-input
                    clearable
                    :autosize="{ minRows: 4 }"
                    type="textarea"
                    v-model.trim="editBoxData.remark"
                  ></el-input>
                </template>
                <!-- 地市-->
                <template v-else-if="item.field === 'city'">
                  <el-cascader
                    :options="cascaderItem.city.select"
                    v-model="editBoxData.city"
                    :props="{expandTrigger:'hover'}"
                    clearable
                    separator="-"
                  ></el-cascader>
                </template>
                <!-- 预约日期-->
                  <template v-else-if="item.field === 'appointmentime'">
                          <el-date-picker
                              v-model.trim="editBoxData.appointmentime"
                              type="date"
                              editable
                              value-format="yyyy-MM-dd"
                              :picker-options="{
                                                disabledDate(value){
                                                    const now =new Date()
                                                    now.setDate(now.getDate()+1)
                                                    now.setHours(8)
                                                    now.setMinutes(0)
                                                    now.setSeconds(0,0);
                                                    return value.valueOf() <= now.valueOf();
                                                }
                                            }"
                              placeholder="选择日期"
                          ></el-date-picker>
                      </template>
              </template>
              <template v-else>
                <!-- 来源-->
                <template v-if="item.type==='input'">
                  <template v-if="item.disabled">
                    <template v-if="item.hasTooltip">
                      <el-tooltip
                        class="item"
                        style=" overflow: hidden; display: block; white-space: nowrap; text-overflow: ellipsis;"
                        effect="dark"
                        :content="editBoxData[item.field]"
                        :disabled="!editBoxData[item.field]"
                        placement="top-start"
                      >
                        <a
                          style="color: #000000;"
                          :href="editBoxData[item.field] || undefined"
                          target="_blank"
                        >
                          <el-input disabled :value="editBoxData[item.field]"></el-input>
                        </a>
                      </el-tooltip>
                    </template>
                    <template v-else>
                      <el-input disabled :value="editBoxData[item.field]"></el-input>
                    </template>
                  </template>
                  <template v-else>
                    <el-input
                      v-model.trim="editBoxData[item.field]"
                      :placeholder="item.placeholder"
                      clearable
                    ></el-input>
                  </template>
                </template>
<!--数字 -->
                <template v-else-if="item.type==='number'">
                  <el-input
                    type="number"
                    v-model.trim="editBoxData[[item.field]]"
                    clearable
                    min="0"
                    class="deal"
                  ></el-input>
                </template>
                    <!-- 收款方式  工单模板 业务类型 -->
                <template v-else-if="item.type==='select'">
                  <el-select v-model.trim="editBoxData[item.field]">
                    <el-option
                      v-for="(item2,index2) in item.selectArr"
                      :key="index2"
                      :label="item2.label"
                      :value="item2.value"
                    ></el-option>
                  </el-select>
                </template>
              </template>
            </el-form-item>
          </template>
        </template>
      </el-form>
    </el-main>
    <el-footer height="40px">
      <el-row type="flex" :gutter="24" justify="space-between">
        <el-col :span="20">
          <template v-if="!!editBoxData.servicename">
            <el-button size="medium" type="danger" @click="editOperate_edit_other">保存信息</el-button>
                    <!-- 天猫流转-->
            <template v-if="pageType==='tmall'">
              <template v-for="(item,index) in cascaderItem.failure.select">
                <el-button
                  v-if="item.button"
                  size="medium"
                  :type="item.type"
                  :key="index"
                  @click="editOperate_edit_tmall({statos:item.value,toOrder:item.toOrder})"
                >{{item.button}}</el-button>
              </template>
            </template>
            <template v-else>
              <el-button
                size="medium"
                type="success"
                v-if="(editBoxData.statos ==='营销成功')&& !!editBoxData.department"
                @click="acceptFn"
              >
                提交工单
                <!--success-->
              </el-button>
            </template>
            <el-button size="medium" type="danger" v-if="false">上传附件</el-button>
          </template>
        </el-col>
        <el-col :span="4" style="text-align: center">
          <template v-if="!!editBoxData.servicename">
            <el-button
              v-if="editBoxData.statos !=='废弃'"
              size="medium"
              type="info"
              @click="abandonedFn"
            >废弃</el-button>
          </template>
        </el-col>
      </el-row>
    </el-footer>
      <first-one
          v-if="pageRight === 'oneBroadband'"
          :id = editBoxData.id
          :status = editBoxData.statos
      ></first-one>

    <!--
        todo 自动受理弹窗  局向盒子 弹窗
    -->
    <el-dialog
      :visible.sync="jxBox.visible"
      width="800px"
      append-to-body
      destroy-on-close
      :close-on-click-modal="false"
      :close-on-press-escape="false"
             >
      <template #title>
        <span style="font-size: 16px">请选择局向 ({{jxBox.c_address}})</span>
      </template>
      <el-container style="height: 400px" v-if="jxBox.visible">
        <el-header height="80px">
          <el-row :gutter="24">
            <el-col :span="20">
              <el-form
                v-if="jxBox.visible"
                :model="jxBox"
                size="small"
                ref="jxBoxFrom"
                label-width="auto"
                :rules="jxBox.rules"
                style="display: flex;flex-wrap: wrap"
              >
                <el-form-item style="width: 250px;margin-bottom: 14px" label="C3地址" prop="c3">
                  <el-select disabled v-model.trim="jxBox.c3" @change="jxBox.c4 = ''" clearable>
                    <el-option
                      v-for="(item,index) in jxBox.c3List"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item style="width: 250px;margin-bottom: 14px" label="C4地址" prop="c4">
                  <el-select v-model.trim="jxBox.c4" clearable>
                    <el-option
                      v-for="(item,index) of jxBox.allCity[jxBox.c3]"
                      :value="item"
                      :key="index"
                      :label="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item style="width: 400px;margin-bottom: 14px" label="局向地址" prop="address">
                  <el-input v-model.trim="jxBox.address"></el-input>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="4">
              <el-button size="small" type="success" @click="searchJx(true)">局向搜索</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-main style="margin: 0;bottom: 0 !important;">
          <el-table
            ref="jxListTable"
            :data="jxBox.jxList"
            :header-cell-style="{'text-align':'center','background-color':'rgba(193, 206, 214, 1)','fontSize':'14px',color:'black',fontWeight:600}"
            :cell-style="{'text-align':'left','padding':'5px 0'}"
            :tooltip-effect="'light'"
            :show-header="false"
          >
            <el-table-column width="600px">
              <template slot-scope="prop">{{prop.row.fgfw}}</template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="prop">
                <el-button
                  type="primary"
                  size="small"
                  @click="chooseJx(prop.row.fgfw,prop.row.jxbm,prop.row.id)"
                >选择</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
        <el-footer height="80px">
          <el-row :gutter="24" style="height: 40px">
            <el-col :span="4" :offset="20">
              <el-button
                :disabled="jxBox.page===1"
                type="primary"
                size="mini"
                icon="el-icon-arrow-left"
                circle
                @click="()=>jxBox.page=jxBox.page-1"
              ></el-button>
              <el-button
                :disabled="!jxBox.canGoNext"
                type="primary"
                @click="()=>jxBox.page=jxBox.page+1"
                icon="el-icon-arrow-right"
                size="mini"
                circle
              ></el-button>
            </el-col>
          </el-row>
          <el-row :gutter="24" style="height: 40px">
            <el-col :span="20">
              <el-input readonly size="small" clearable :value="jxBox.selectJx.mess"></el-input>
            </el-col>
            <el-col :span="4" style="text-align: right">
              <el-button
                size="small"
                type="success"
                :disabled="!jxBox.selectJx.mess"
                @click="editOperate_auto(true)"
              >提交</el-button>
            </el-col>
          </el-row>
        </el-footer>
      </el-container>
    </el-dialog>

  </el-container>
</template>

<script>
// <!--    权限 及 userinfo-->
import { mapState } from "vuex";
// 行销结果
import { businessAllMarketing } from "../../../../../data/status.data.js";
import { c3List, allCity } from "../../../../../data/jxList";
// 收款方式  天猫各套餐  对应商机单搜索框  first
import {
  payMethod,
  packageChange,
  generateBusiness,
  businessAcceptType,
} from "../../../../../data/businessData.js";
import Unit from '../../../../../../unit/client.js'
let unit = new Unit();
import firstOne from "./firstOne";

export default {
  name: "first",
  inject:['editBoxDataVisible','pageRight'],
    components: {
        firstOne
    },
  props: [
    "scope", // 表格作用域
    "parentScope", // 父级作用域
    "rootScope", // index作用域
    "api",
    "pageType",  // 指定格式
  ],
  data() {
    return {
        customerVis:this.editBoxDataVisible,
      //  支付方式
      payMethodSelect: payMethod[this.pageType] || [],
      //  天猫可选 套包
      packageChange: packageChange || [],
      formFieldArr: [],
      showPage: false,
      /*
       *显示待跟踪
       * */
      editBoxData: {
        id: "", // 商机单编号
        name: "", // 姓名
        idcard: "", // 身份证号
        accept: "", // 产品名称
        payment: "", // 产品金额
        remark: "", // 备注
        interior: "", // 安装地址
        address: "", // 地区
        areas: "",
        city: [],
        failure: "", //失败原因
        channel: "", //渠道
        channels: "",
        phone: "",
        toproomotelinks: "",
        appointmentime: "",
        servicename: "",
        trackingtime: "", // 跟踪时间

        statos: "", // 状态
        /*
         * 不是 查出来的信息
         * */
        workserved: "", // 模板
        broadband: "",
        pagestatos: "",  // 行销结果 状态
        nameofadvertiser: "",
        /*
         *
         * 部门
         * */
        department: "",
        pageAddress: null,
        // todo 10000号-外呼 多2个业务号码  2个产品
        accept2: "",
        accept3: "",
        // todo 天猫订单2个业务号码
        broadband2: "",
        broadband3: "",
        // todo 天猫订单 号
        tmallId: "",
        // todo 外呼 商机单 套餐类型 套餐内容
        packageType: "",
        packageContent: "",
        // todo 外呼 终端串号  终端型号  需更改的套餐类型
        terminalNumber: "",
        terminalModel: "",
        packageChange: "",
        // todo 万号  第二副卡 + 宽带号
        secondaryCard: "",
        kdBroadband: "",
        c4name: "", // C4Name
        nowDiscount: "", // 现有优惠
        nowPackageType: "", // 现有套餐类型
        /*
         * 旧状态
         * */
        oldStatus: "",
        oldMessage: {},
        //todo 2021-03-22 新增 OOCP扣费金额
        oocp: "",
        // 业务类型
        acceptType: "",
        hasJx: true,
          lsame:"",
          prodacceptthemethod:"",

      },

      /*
       * 局向盒子
       * */
      jxBox: {
        rowData: {},
        visible: false,
        jxList: [],
        c3: "",
        c4: "",
        bureauNbr:"",
        paymentmethod:"",
        c4List: [],
        address: "",
        c_address: "",
        page: 1,
        canGoNext: false,
        selectJx: {
          address: "",
          code: "",
          mess: "",
          jxid: "",
        },
        rules: {
          c3: [{ required: true, message: "c3地址不能为空", trigger: "blur" }],
          c4: [{ required: true, message: "c4地址不能为空", trigger: "blur" }],
          address: [
            { required: true, message: "局向地址不能为空", trigger: "blur" },
          ],
        },
        c3List,
        allCity,
        // todo   2020-11-26   付款方式   和   是否自动单
        payMethod: undefined,
        isAuto: undefined,
      },
      canInput: {
        accept: true,
        /*
         * todo 10000号 3个产品的情况
         * */
        accept2: true,
        accept3: true,
      },
      /* * 待跟踪 * */
      track: {
        dialogVisible: false,
        value: {
          date: "",
          time: "",
        },
        rules: {
          date: [{ required: true, message: "请选择日期", trigger: "blur" }],
          time: [{ required: true, message: "请选择时间", trigger: "blur" }],
        },
      },
      /*
       * 信息
       * */
      cascaderItem: {
        city: {
          value: "",
          select: [],
        },
        statos: {
          select: [],
        },
        // 故障
        failure: {
          value: "",
          select: businessAllMarketing[this.pageType],
        },
        // 工单模板
        orderTemplate: {
          value: "",
          select: [],
        },
      },
      /*chooseTemplate: {
                    visible: false
                }*/
    };
  },

  mounted() {
      console.log(this.pageRight)
    this.init();
  },
  methods: {
    init() {
      /*
       * 查询城市
       * */
      /*
       * 查询流
       * */
      this.$root.getLiu().then(({ select }) => {
        this.cascaderItem.orderTemplate.select = [];
        this.cascaderItem.orderTemplate.select.push(...select);
      });
      this.$root.query_city().then((value) => {
        this.cascaderItem.city.select = value;
      });
      this.cascaderItem.orderTemplate.select = [];
      this.queryOne();
    },
    /*
     * 查询客户信息
     * */
    queryOne() {
      this.parentScope.queryInfo({
        SonScope: this,
        callback: ({ accept, accept2, accept3, success }) => {
          this.canInput.accept = !accept;
          /*
           *
           * todo 10000号 3个产品
           * */
          this.canInput.accept2 = !accept2;
          this.canInput.accept3 = !accept3;
          /*
           * todo 生成 页面对应的 商机 框 字段信息
           * */
          this.formFieldArr = generateBusiness(this.pageType, this);
          success();
        },
      });
    },
    /*
     * todo 产品部分限制 根据业务类型
     * */
    productInput(value, acceptType) {
      if (this.canInput[acceptType]) {
        this.editBoxData[acceptType] = value;
      } else {
        return false;
      }
    },
    /*
     * 产品限制下拉选择器  实现v-model效果
     * */
    productSelect(d, acceptType) {
      /*
       * 不能输入
       * */
      this.canInput[acceptType] = false;
      this.editBoxData[acceptType] = d.value;
    },
    /*
     *
     * 产品清空
     * */
    productClear(acceptType) {
      this.canInput[acceptType] = true;
      this.editBoxData[acceptType] = "";
    },
    /*
     *
     * 产品聚焦
     * */
    productFocus(v, acceptType) {},
    /*
     * todo 2020-11-25 对产品自动受理的查询   所有提交工单  模糊查询
     * */
    _productSearch(queryString) {
      return new Promise((resolve, reject) => {
        this.$axios
          .post(
            "query_chaproname",
            {},
            {
              params: {
                queryString,
                depaname: this.editBoxData.department,
              },
              showLoading: false,
            }
          )
          .then((value) => {
            resolve(value);
              console.log(value)
          })
          .catch((reason) => {
            reject(reason);
          });
      });
    },
    /*
     * 产品模糊搜索
     * */
    productSearch(queryString, cd, acceptType) {
      if (this.canInput[acceptType] && queryString) {
        this._productSearch(queryString)
          .then(({ list }) => {
            cd(list);
            if (list.length <= 0) {
              this.$message({
                type: "warning",
                duration: 1500,
                message: "未查询到产品信息",
              });
            }
          })
          .catch((reason) => {
            cd([]);
          });
      } else {
        cd([]);
      }
    },

    /*
     *
     * 行销结果  数组转为obj
     * */
    statosChange([one, two]) {
      /*
       * todo 2020-12-11  订单行销结果的选择
       * */
      this.editBoxData.pagestatos = one ? one : "";
      this.editBoxData.failure = two ? two : "";
    },

    /*
     *
     * todo 对产品限制 2020-12-25
     * */
    limit_Product() {
      const limit_Pro = (acceptType) => {
        if (this.editBoxData[acceptType] && this.canInput[acceptType]) {
          return this.$message({
            message: "请在产品搜索下拉框中选择产品",
            type: "warning",
            duration: 1500,
          });
        }
        return false;
      };
      const proArr = ["accept"];
      if (this.pageType === "tenHao") {
        proArr.push(...["accept2", "accept3"]);
      }
      for (let i of proArr) {
        if (limit_Pro(i)) {
          return true;
        }
      }
      return false;
    },
    // todo 2020/12/25 提交信息的限制
    limit_Edit() {
      const {
        id, // 商机单编号
        name, // 姓名
        idcard, // 身份证号
        accept, // 产品名称
        payment, // 产品金额
        remark, // 备注
        interior, // 安装地址
        failure, //失败原因
        channel, //渠道
        phone, // 联系方式
        toproomotelinks,
        appointmentime,
        servicename,
        trackingtime,
        address, // 城市
        statos, // 状态
        orderTemplate, // 模板
        broadband,
        pageAddress,
        workserved,
        pagestatos,
        // todo 10000 号3资产3产品
        broadband2,
        broadband3,
        accept2,
        accept3,

        tmallId,
        packageContent,
        packageType,
        terminalNumber,
        terminalModel,
        packageChange,
        activity,
      } = this.editBoxData;

      /*
       * todo 二次外呼时间限制
       * */
      if (pagestatos === "待二次外呼") {
        if (!trackingtime) {
          return this.$message({
            message: "请选择待跟踪时间",
            type: "warning",
            duration: 1500,
          });
        }
      }
      /*let isCity = this.cascaderItem.city.select.some((value1, index) => {
                    return address === value1.value
                });

                /!*
                * todo 地市限制为系统配置的地市
                * *!/
                if (!isCity) {
                    return this.$message({
                        message: "地市非系统配置的地市",
                        type: "warning",
                        duration: 1500
                    });
                }*/
      /*
       *todo  客户姓名至少为2为
       * */
      /*if (!this.$reg.name.normal2.test.m(name)) {
                    return this.$message({
                        message: "客户姓名至少为两个汉字",
                        type: "warning",
                        duration: 1500
                    });
                }*/
      /*
       *todo 身份证不为空时要验证是否符合格式
       * */
      if (idcard && !this.$reg.idCard.all.test(idcard)) {
        return this.$message({
          duration: 1500,
          message: "身份证号格式有误，请核实",
          type: "warning",
        });
      }
      /*
       * todo 产品必须为下拉选择的产品
       * */
      return this.limit_Product();
    },

    // todo 2020/12/25 提交受理的限制  警告不能为空
    limit_Accept() {
      const {
        id, // 商机单编号
        name, // 姓名
        idcard, // 身份证号
        accept, // 产品名称
        payment, // 产品金额
        remark, // 备注
        interior, // 安装地址
        address, // 地区
        failure, //失败原因
        channel, //渠道
        channels,
        phone,
        toproomotelinks,
        appointmentime, //  预约日期
        servicename, //
        city,
        statos, // 状态
        orderTemplate,
        broadband,
        department,
        pageAddress,
        workserved,
        pagestatos,
        paymentmethod,
        broadband3,
        broadband2,
        accept3,
        accept2,
        tmallId,
        packageContent,
        packageType,
        packageChange,
        activity,
      } = this.editBoxData;
      /*
       * todo 地市限制为系统配置的地市
       * */
      /*const isCity = this.cascaderItem.city.select.some((value1, index) => {
                    return address === value1.value
                })
                if (!isCity) {
                    return this.$message({
                        message: "地市非系统配置的地市",
                        type: "warning",
                        duration: 1500
                    });
                }*/
      let dd = [
        [servicename, "业务员"],
        [address, "地区"],
        [accept, "产品名称"],
        [payment, "收款金额"],
        [name, "客户姓名"],
        [phone, "联系方式"],
        [paymentmethod, "收款方式"],
      ];
      if (this.pageType === "tmall") {
        dd.push([tmallId, "天猫订单号"]);
      }
      if (!~["breathe", "tenHao"].indexOf(this.pageType)) {
        dd.push([interior, "安装地址"]);
      }
      for (let item of dd) {
        if (!item[0]) {
          return this.$message({
            message: item[1] + "不能为空",
            duration: 1000,
            type: "warning",
          });
        }
      }
      /*
       *todo 身份证不为空时要验证是否符合格式
       * */
      if (idcard && !this.$reg.idCard.all.test(idcard)) {
        return this.$message({
          duration: 1500,
          message: "身份证号格式有误，请核实",
          type: "warning",
        });
      }
      // todo 模板的 判断

      if (
        !(
          typeof parseInt(workserved) === "number" &&
          !isNaN(parseInt(workserved))
        )
      ) {
        return this.$message({
          type: "success",
          duration: 1500,
          message: "请选择工单流模板",
        });
      }

      return this.limit_Product();
    },
    /*
     * 操作  修改产品信息
     * */
    /*
     * todo 2020-11-20 editor liyp  除天猫
     *  保存信息按钮
     * */
    editOperate_edit_other() {
      const { diffArr } = this.$util.businessDiff(this.editBoxData);
      if (diffArr.length) {
        if (!this.limit_Edit()) {
          this.$alert(`是否修改信息`, { title: "提示" }).then((value) => {
            this.editOperate_edit_all();
          });
        }
      } else {
        this.$message({
          message: "未修改信息",
          type: "warning",
          duration: 1500,
        });
      }
    },

    /*
     *
     * 修改信息
     * */
    editOperate_edit_all() {
      this.parentScope
        .editInfo({
          SonScope: this,
          isRoam: false,
        })
        .then((value) => {
          this.parentScope.queryInfo({
            SonScope: this,
            callback: ({ accept, success }) => {
              this.canInput.accept = !accept;
              success();
            },
          });
          this.$message({
            type: "success",
            duration: 1000,
            message: "修改成功",
          });
        });
    },

    /*
     * todo 20210107  天猫 订单想的流转
     * */
    editOperate_edit_tmall({ statos, toOrder }) {
      if (toOrder) {
        this.editBoxData.pagestatos = statos;
        this.acceptFn();
      } else {
        if (!this.limit_Edit()) {
          this.editBoxData.pagestatos = statos;
          this.$alert(`是否${statos}`, { title: "提示", type: "info" }).then(
            (value) => {
              this.editOperate_edit_all();
            }
          );
        }
      }
    },

    /*
     * todo 2021-02-25 废弃订单
     *
     * */
    abandonedFn() {
      this.$alert(`是否废弃订单`, { title: "提示" }).then((value) => {
        // this.editBoxData
        this.editBoxData.statos = "废弃";
        this.editBoxData.pagestatos = "废弃";
        this.editBoxData.failure = "";
        this.editOperate_edit_all();
      });
    },
    /*
     *
     * todo 转 人工受理
     * */
    editOperate_submit(lsname) {
      this.$alert("", {
        message: "是否提交订单",
        title: "提示",
        type: "success",
      }).then((value) => {
        this.fley_transferorder(false, lsname).then((value) => {
          this.$message({
            message: "提交成功",
            type: "success",
            duration: 1500,
          });
        });
      });
    },
    /*
     * todo 订单流转下去
     * */
    fley_transferorder(isAuto = false, lsname) {
      /*
       * 走自动受理
       * */
      if (isAuto) {
        return new Promise((resolve, reject) => {
          const params = {
            ...this.editBoxData,
            orderTemplate: this.cascaderItem.orderTemplate.select,
            userInfo: this.userInfo,
              lsname,
            idcard:
              this.editBoxData.idcard &&
              String(this.editBoxData.idcard).toUpperCase(),
          };
          this.parentScope.editInfo({
              SonScope: this,
              hidDialog: () => {},
              isRoam: true,
            }).then((value) => {
              const { code, address, jxid } = this.jxBox.selectJx;
              const { c3, c4, c_address, isAuto, payMethod,  paymentmethod } = this.jxBox;
              console.log({jxBox: this.jxBox,
                  selectJx: this.jxBox.selectJx,
                  editBoxData: this.editBoxData,
                  orderTemplate: this.cascaderItem.orderTemplate.select,
                  idcard:
              this.editBoxData.idcard &&
              String(this.editBoxData.idcard).toUpperCase()})
              this.$axios.post(
                  this.api.autoaccept,
                  {},
                  {
                    params: {
                      Jaddress: this.jxBox.address,
                      jxBox: this.jxBox,
                      selectJx: this.jxBox.selectJx,
                      editBoxData: {
                          ...this.editBoxData,
                          lsname,
                          idcard: this.editBoxData.idcard && String(this.editBoxData.idcard).toUpperCase()},
                      orderTemplate: this.cascaderItem.orderTemplate.select,
                      // ------------------todo 虚假信息----------------------------- //
                      other: {
                        /*idcred: "320321199701263879", // 身份证号
                                        custname: "温丛丛", // 客户姓名
                                        proname: "杭州单宽300M包年1299新装含组网(调测费100)", // 模板名称
                                        phone: "18852211754", // 手机号
                                        installAddr: "和平大厦1318", // 装机地址*/
                      },
                    },
                  }
                )
                .then((value) => {
                  resolve(value);
                })
                .catch((reason) => {
                  reject(reason);
                });
            })
            .catch((reason) => {
              reject(reason);
            });
        });
      } else {
        /*
         * 走人工受理
         * */
        return new Promise((resolve, reject) => {
          this.$axios.post(
              this.api.transferorder,
              {},
              {
                params: {
                  ...this.editBoxData,
                  orderTemplate: this.cascaderItem.orderTemplate.select,
                  lsname,
                  idcard:
                    this.editBoxData.idcard && String(this.editBoxData.idcard).toUpperCase(),
                },
              }
            )
            .then((value) => {
              /*
               * 转人工
               * */
              this.parentScope
                .editInfo({
                  SonScope: this,
                  isRoam: true,
                })
                .then((value) => {
                  resolve(value);
                })
                .catch((reason) => {
                  reject(reason);
                });
            });
        });
      }
    },

    /*
     *
     * todo 搜素局向事件
     * */
    searchJx(isOne = false) {
      isOne && (this.jxBox.page = 1);
      this.jxBox.jxList = [];
      this.jxBox.canGoNext = false;
      this.jxBox.selectJx.address = "";
      this.jxBox.selectJx.code = "";
      this.jxBox.selectJx.mess = "";
      this.jxBox.selectJx.id = "";
      this.$refs.jxBoxFrom.validate(
        (value) =>
          /*
           * todo 测试 局向查询
           * */
          value &&
          this.$axios
            .post(
              "workinfo_autoaccepts",
              {},
              {
                params: {
                  c4name: this.jxBox.c4,
                  c3name: this.jxBox.c3,
                  address: this.jxBox.address,
                  page: this.jxBox.page,
                },
              }
            )
            .then(({ message, list }) => {
              this.jxBox.jxList = [];
              this.$message({
                duration: 1200,
                type: "success",
                message: message,
              });
              this.jxBox.canGoNext = list.length === 10;
              this.jxBox.jxList.push(...list);
            })
      );
    },
    /*
     * todo 选择局向
     * */
    chooseJx(jx, jxBm, id) {
      this.jxBox.selectJx.address = jx.substring(
        0,
        jx.length - jxBm.length - 2
      );
      this.jxBox.selectJx.code = jxBm;
      this.jxBox.selectJx.mess = jx;
      this.jxBox.selectJx.jxid = id;
    },

    /*
     * todo  自动受理按钮  局向 提交按钮
     * */
    editOperate_auto(ok, callback = () => {}) {
      const {
        id, // 商机单编号
        name, // 姓名
        idcard, // 身份证号
        accept, // 产品名称
        payment, // 产品金额
        remark, // 备注
        interior, // 安装地址
        address, // 地区
        failure, //失败原因
        channel, //渠道
        phone, //
        toproomotelinks,
        appointmentime, //  预约日期
        servicename, //
        city, //
        statos, // 状态
        orderTemplate,
        broadband,
        department,
        pageAddress,
        workserved,
        tmallId,
        packageContent,
        packageType,
        packageChange,
        activity,
      } = this.editBoxData;
      if (ok) {
        /*
         * 点击了自动受理
         * */
        const { code, address, jxid } = this.jxBox.selectJx;
        const { c3, c4, c_address, isAuto, payMethod } = this.jxBox;
        // 局向数据不能为空 走这里
        let alertArr = [
          [code, "局向编码"],
          [address, "局向地址"],
          [c3, "c3地址"],
          [c4, "c4地址"],
          [jxid, "局向ID"],
        ];
        for (const item of alertArr) {
          if (!item[0]) {
            return this.$message({
              message: item[1] + "不能为空",
              type: "warning",
              duration: 1500,
            });
          }
        }
        /*
         * 自动受理 遮罩
         * */
        const loading = this.$loading({
          body: true,
          text: "工单受理中",
        });

        this.fley_transferorder(true)
          .then((value) => {
            this.$message({
              duration: 1500,
              message: "自动受理已提交",
              type: "success",
            });
            loading.close();
              this.jxBox.visible = false; // ///
          })
          .catch((reason) => {
            loading.close();
          });
      } else {
          // todo 对预约时间和身份证号 限制
        let alertArr = [
          [idcard, "身份证号"],
          // [appointmentime, "预约时间"],
        ];
        for (const item of alertArr) {
          if (!item[0]) {
            return this.$message({
              message: item[1] + "不能为空",
              type: "warning",
              duration: 1500,
            });
          }
        }
        if (!this.$reg.idCard.all.exec(idcard)) {
          return this.$message({
            type: "warning",
            message: "身份证号格式不对",
          });
        }
        this.jxBox.c4List = [];
        this.jxBox.jxList = [];
        this.jxBox.address = interior.replace("}", "");
        this.jxBox.c_address = interior.replace("}", "");
        this.jxBox.c3 = address;
        this.jxBox.c4 = "";
        this.$set(this.jxBox, "rowData", this.editBoxData);
        // todo 2020-11-26 付款方式和 是否自动单 重置
        this.jxBox.payMethod = undefined;
        this.jxBox.isAuto = undefined;
          this.jxBox.page = 1;
        this.$set(this.jxBox, "selectJx", {
          address: "",
          code: "",
          mess: "",
          jxid: "",
        });
        callback();
        this.jxBox.visible = true;
      }
    },
    // 状态的dialog
    editOperate_all(obj, visBox) {
      visBox ? (this[visBox].dialogVisible = false) : void 0;
      this.$axios
        .post("", {}, {})
        .then((value) => {
          visBox ? (this[visBox].dialogVisible = false) : void 0;
          this.editBoxData.statos = obj.statos;
          this.editBoxData.trackingtime = obj.trackingtime;
          this.editBoxData.failure = obj.failure;
        })
        .catch((reason) => {});
    },
    //  提交工单按钮的精准查询接口  auto_queryByProp     精准查询接口
      JproductSearch(queryString) {
          return new Promise((resolve, reject) => {
              this.$axios
                  .post(
                      "auto_queryByProp",
                      {},
                      {
                          params: {
                              queryString,
                              depaname: this.editBoxData.department,
                          },
                          showLoading: false,
                      }
                  )
                  .then((value) => {
                      resolve(value);
                      console.log(value)
                  })
                  .catch((reason) => {
                      reject(reason);
                  });
          });
      },

    /*todo 受理方式的判断     提交工单  按钮 */
   async acceptFn() {
        console.log(this.editBoxData)
      if (!this.limit_Accept()) {
        const {
          id, // 商机单编号
          name, // 姓名
          idcard, // 身份证号
          accept, // 产品名称
          payment, // 产品金额
          remark, // 备注
          interior, // 安装地址
          address, // 地区
          failure, //失败原因
          channel, //渠道
          phone,
          toproomotelinks,
          appointmentime, //  预约日期
          servicename, //
          city,
          statos, // 状态
          orderTemplate,
          broadband,
          department,
          pageAddress,
          workserved,
          pagestatos,
          paymentmethod,
          tmallId,
          packageContent,
          packageType,
          packageChange,
          activity,
          hasJx, // 是否局向
          acceptType, // 业务类型
            // paymentstate,
        } = this.editBoxData;
        //  todo 传递产品名 查询产品
        this.JproductSearch(this.editBoxData.accept).then(({ productInfo }) => {
          if (productInfo === undefined) {
            return this.$message({
              duration: 1500,
              type: "warning",
              message: "产品查询失败",
            });
          }
            // todo 受理单 支付方式 受理方式 产品信息
            const { isAuto, payMethod, acceptMethod, lsname } = productInfo;
            if (acceptMethod === 1){
            /*
             * 走自动受理
             * */
            //    todo 传 c4 检测 警告
            if (!this.$reg.autoCityRe.test(address)) {
              return this.$message({
                message: "仅浙江11地市订单可自动受理",
                type: "warning",
                duration: 1500,
              });
            }

            if (!(isAuto === "N" || isAuto === "Y")) {
              return this.$message({
                message: "产品自动单配置错误",
                type: "warning",
                duration: 1500,
              });
            }
            if (
              !(payMethod == 2100 || payMethod == 1200 || payMethod == 1201)
            ) {
              return this.$message({
                message: "产品付款方式配置错误",
                type: "warning",
                duration: 1500,
              });
            }

            /*
             * 自动受理  打开局向搜索弹窗
             * 限制  新装 走 存量 不走
             * */
            //    todo 新增 为true
            if (hasJx) {
              this.editOperate_auto(false, (z) => {
                this.jxBox.payMethod = payMethod;
                this.jxBox.isAuto = isAuto;
              });
            } else {
              // 不走局向
              // 需要赋值  参数

              this.$alert("自动受理成功").then(() => {
                const loading = this.$loading({
                  body: true,
                  text: "工单受理中",
                });
                this.fley_transferorder(true,lsname)
                  .then((value) => {
                    this.$message({
                      duration: 1500,
                      message: "自动受理成功",
                      type: "success",
                    });
                    loading.close();
                  })
                  .catch((reason) => {
                    loading.close();
                  });
              });
            }
          } else {
            /*人工*/
            this.editOperate_submit(lsname);
            // this.editOperate_auto(false)
          }
        });
      }
    },
  },
  computed: {
    ...mapState({
      right: (s) => s.right,
      userInfo: (s) => s.userInfo,
    }),
  },
  watch: {
    "jxBox.page"() {
      this.searchJx();
    },
    // 地市改变
    "editBoxData.city"(value) {
      this.editBoxData.address = value[1];
      this.editBoxData.areas = value[0];
    },
    //  业务类型变化
    "editBoxData.acceptType"(value){

        this.editBoxData.hasJx = businessAcceptType[this.pageType].selectList.some(item=>{
            if(item.value === value) {
                return item.hasJx
            }else {
                return false
            }
        })
    }
  },
};
</script>

<style lang="less">
.infoForm {
  .el-form-item {
    width: 20%;
    margin-right: 5%;
    display: flex;
    flex-direction: column;
    text-align: left;

    label {
      text-align: left;
    }
  }

  .mytextarea {
    width: 100%;
  }

  .el-autocomplete,
  .el-cascader,
  .el-input,
  .el-select {
    width: 100%;
  }
}
</style>
