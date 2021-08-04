<template>
    <el-container v-show="showPage" style="height: calc(100vh - 90px)">
        <el-header height="40px" style="margin-bottom: 0;">
            <!--
             todo 20210114 去除 仅订单含有受理员才能操作订单的限制
            -->
            <!--  <el-alert
                  v-if="!fromData.assigneeName"
                  style="margin-top: 2px"
                  title="请先分配受理员再进行操作！"
                  show-icon
                  :closable="false"
                  type="warning"
              >
              </el-alert>
              <el-row v-else>
                  <el-col :offset="22" style="margin-top: 6px">
                      <el-button type="primary" size="mini" @click="query_id(()=>{
                          $message({
                          message:'刷新成功',
                          type:'success',
                          duration:1500
                          });
                      })">刷新
                      </el-button>
                  </el-col>
              </el-row>-->
            <el-row>
                <el-col :offset="22" style="margin-top: 6px">
                    <el-button type="primary" size="mini" @click="query_id(()=>{
                        $message({
                        message:'刷新成功',
                        type:'success',
                        duration:1500
                        });
                    })">刷新
                    </el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-main style="padding: 0;">
            <el-collapse :value="2" style="height: 100%">
                <el-collapse-item class="listBox" :name="1">
                    <template #title>
                        <h5>用户信息</h5>
                    </template>
                    <div class="listCard">
                        <el-card shadow="hover"
                                 :body-style="{ padding: '20px',display:'flex',flexWrap:'wrap' }">
                            <template v-for="(item,index) of userBoxList">
                                <template v-if="item[0]==='备注'">
                                    <div class="item mytextarea" :key="index">
                                        <span>{{item[0]}}：</span>
                                        <div class="itemInfo">
                                            <el-input
                                                type="textarea"
                                                :autosize="{ minRows: 2}"
                                                readonly
                                                :value="fromData[item[1]]"></el-input>
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="item" :key="index">
                                        <span>{{item[0]}}：</span>
                                        <span><i>{{fromData[item[1]]}}</i></span>
                                    </div>
                                </template>
                            </template>

                        </el-card>
                    </div>
                </el-collapse-item>
                <el-collapse-item class="listBox" :name="2">
                    <template #title><h5>工单信息</h5></template>
                    <div class="listCard">
                        <el-card shadow="hover"
                                 :body-style="{ padding: '20px',display:'flex',flexWrap:'wrap' }">
                            <el-container>
                                <el-main style="padding: 0;display: flex;flex-wrap: wrap">
                                    <template v-for="(item,index) of orderBoxList">
                                        <div class="item" :key="index" v-if="fromData[item[1]]">
                                            <span>{{item[0]}}：</span>
                                            <span> <i>{{fromData[item[1]]}}</i>
                                                </span>
                                        </div>
                                    </template>
                                    <div class="item mytextarea">
                                        <span>备注</span>
                                        <div class="itemInfo">
                                            <!--
                                            v-if=""
                                            -->
                                            <el-input
                                                :placeholder="options.type==='orderList'?'请填写工单备注信息':''"
                                                type="textarea"
                                                :autosize="{ minRows: 4}"
                                                :readonly="options.type!=='orderList'"
                                                v-model.trim="fromData.remark"></el-input>
                                        </div>
                                    </div>
                                </el-main>
                                <el-footer height="40px">
                                    <el-button style="margin-top: 10px" size="medium"
                                               @click="changeRemark(fromData.remark)"
                                               type="success"
                                               v-if="options.type==='orderList'"
                                    >修改工单备注
                                    </el-button>
                                </el-footer>
                            </el-container>

                        </el-card>
                    </div>
                </el-collapse-item>

                <!--
                受理信息  仅带有受理员的才能进行
                -->

                <el-collapse-item class="listBox" :name="3"
                                  v-if="fromData.assigneeName || accountInfo.accountList.length">
                    <template #title><h5>受理信息</h5></template>
                    <div class="listCard">
                        <el-card shadow="hover" :body-style="{ padding: '0 0 0 6px'}">
                            <el-container style="margin: 0;padding: 0;" direction="vertical">
                                <el-header height="60px"
                                           v-if="options.type==='orderList' && fromData.assigneeName">
                                    <el-row :gutter="24">
                                        <el-col :span="8">
                                            <div class="item" style="width: 100%">
                                                <span style="line-height: 40px;font-size: 16px">受理工单填写：</span>
                                                <div style="width: calc(100% - 150px)">
                                                    <el-input
                                                        v-model.trim="fromData.bss7" :disabled="fromData.bss7.length>=21"></el-input>
                                                </div>
                                            </div>
                                        </el-col>
                                        <!-- <el-col :span="6" v-if="false">
                                             <div class="item" style="width: 100%">
                                                 <span style="line-height: 40px;font-size: 16px">反刷工号：</span>
                                                 <div class="itemInfo">
                                                     <el-select v-model.trim="fromData.bssPhone" clearable>
                                                         <template v-for="(item,index) in bssBoxList">
                                                             <el-option :label="item.label" :value="item.value"
                                                                        :key="item.id"></el-option>
                                                         </template>
                                                     </el-select>
                                                 </div>
                                             </div>
                                         </el-col>-->
                                        <el-col :span="4" :offset="4">
                                            <el-button style="margin-top: 7px" size="medium"
                                                       type="success"
                                                       @click="brush7(fromData.bss7)"
                                            >提交受理订单号
                                            </el-button>
                                            <el-button
                                                style="margin-top: 7px" size="medium"
                                                type="warning"
                                                :disabled="!fromData.no7"
                                                @click="deleteorder7(fromData.bss7)"
                                            >清空
                                            </el-button>
                                        </el-col>

                                    </el-row>
                                </el-header>
                                <el-main v-if="fromData.no7" style="margin: 0;padding: 0;">
<!--                                    v-if="accountInfo.accountList.length"-->
                                    <el-container style="width: 100%"
                                                  >
                                        <el-main style="padding: 0;">
                                            <!--
                                            todo 多资产    :data="accountInfo.accountList"
                                            -->
                                            <el-table
                                                ref="accountTable"
                                                :data="accountInfo.accountList"
                                                :stripe="true"
                                                :highlight-current-row="true"
                                                :header-cell-style="{'text-align':'left','background-color':'#ecf0f4','fontSize':'14px',color:'black',fontWeight:600}"
                                                :cell-style="{'text-align':'left','background':'#fff'}"
                                                :tooltip-effect="'light'"
                                                border
                                                size="mini"
                                                max-height="180px"

                                            >
<!--                                                 @row-click="show97Status"-->
                                                <el-table-column label="资产号码"
                                                                 prop="accNum"></el-table-column>
                                                <el-table-column label="行为" prop="serviceOfferName"
                                                                 width="110"></el-table-column>
                                                <el-table-column label="当前状态" prop="statusName"
                                                                 width="90"></el-table-column>
                                                <el-table-column label="产品名称" prop="prodName"
                                                                 width="150"></el-table-column>
                                                <el-table-column label="当前负责人"
                                                                 prop="staffInfo"></el-table-column>
                                            </el-table>
                                        </el-main>
                                        <el-aside style="padding: 0;" width="50%">
                                            <el-table
                                                :data="accountInfo.accountItem.list"
                                                :stripe="true"
                                                :header-cell-style="{'text-align':'left','background-color':'#eee','fontSize':'14px',color:'black',fontWeight:600}"
                                                :cell-style="{'text-align':'left','background':'#fff'}"
                                                :tooltip-effect="'light'"
                                                border
                                                size="mini"
                                                max-height="180px"
                                                :empty-text="accountInfo.accountItem.text"
                                                :span-method="arraySpanMethod"
                                            >
                                                <el-table-column label="处理环节" prop="workPosition"
                                                                 width="180"></el-table-column>
                                                <el-table-column label="工单状态" prop="status2"
                                                                 width="120"></el-table-column>
                                                <el-table-column label="处理时间">
                                                    <template slot-scope="prop">
                                                        {{prop.row.startDate}} -
                                                        {{prop.row.endDate}}
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                        </el-aside>
                                    </el-container>
                                    <el-container
                                        v-if="accountInfo.accountList instanceof Array && accountInfo.accountList.length"
                                        style="width: 100%">
                                        <el-main style="margin: 0;padding: 0;">
                                            <el-tabs value="first">
                                                <el-tab-pane label="基本信息" name="first">
                                                    <div
                                                        style="padding: 0;display: flex;flex-wrap: wrap">
                                                        <template
                                                            v-for="(item,index) of bssBoxList">
                                                            <template v-if="item[0] === 'crm订单状态'">
                                                                <div class="item" :key="index"
                                                                     v-if="fromData[item[1]]">
                                                                    <span>{{item[0]}}：</span>
                                                                    <span>
                                                                    <i>{{fromData[item[1]]}}</i></span>
                                                                    <el-link type="primary" :underline="false" style="padding: 0 0 10px 10px;" @click="dialogTableVisible = true">查看行项目</el-link>
                                                                </div>

                                                            </template>
                                                            <template v-else>
                                                            <div class="item" :key="index"
                                                                 v-if="fromData[item[1]]">
                                                                <span>{{item[0]}}：</span>
                                                                <span>
                                                                    <i>{{fromData[item[1]]}}</i></span>
                                                            </div>
                                                            </template>
                                                        </template>
                                                    </div>
                                                </el-tab-pane>
                                                <template>
                                                    <el-tab-pane class="productList"
                                                                 label="详情"
                                                                 name="second">
                                                        <el-container>
                                                            <el-aside style="padding: 0;margin: 0;"
                                                                      width="250px">

                                                                <el-table
                                                                    ref="accountTable2"
                                                                    :data="accountInfo.accountList"
                                                                    :stripe="true"
                                                                    :highlight-current-row="true"
                                                                    :cell-style="{'text-align':'left','background':'#fff'}"
                                                                    :tooltip-effect="'light'"
                                                                    size="mini"
                                                                    @row-click="show97Status2"
                                                                    :show-header="false"
                                                                >
                                                                    <el-table-column label="资产号码"
                                                                                     prop="accNum">
                                                                        <template slot-scope="prop">
                                                                            <div
                                                                                class="productListSide">
                                                                                <span
                                                                                    class="accNum">{{prop.row.accNum}}</span>
                                                                                <span
                                                                                    class="serviceOfferName">{{prop.row.serviceOfferName}}</span>
                                                                            </div>
                                                                        </template>
                                                                    </el-table-column>
                                                                </el-table>
                                                            </el-aside>
                                                            <el-main
                                                                style="padding: 0;margin: 0;margin-left: 6px"
                                                                v-if="accountInfo.prodOrderItem">
                                                                <el-collapse
                                                                    :value="['1','2','3','4','5','6']">
                                                                    <el-collapse-item name="1">
                                                                        <template #title><span
                                                                            style="font-size: 18px">基本信息</span>
                                                                        </template>
                                                                        <div
                                                                            v-if="accountInfo.prodOrderItem.prodInforVo.otherInfoAttrVos instanceof Array && accountInfo.prodOrderItem.prodInforVo.otherInfoAttrVos.length"
                                                                            style="padding: 0;display: flex;flex-wrap: wrap">
                                                                            <template
                                                                                v-for="(item,index) of accountInfo.prodOrderItem.prodInforVo.otherInfoAttrVos">
                                                                                <div class="item"
                                                                                     :key="index"
                                                                                     v-if="item.attrValue">
                                                                                    <span>{{item.name}}：</span>
                                                                                    <span>
                                                                                <i>{{item.attrValue}}</i></span>
                                                                                </div>
                                                                            </template>
                                                                        </div>
                                                                    </el-collapse-item>
                                                                    <el-collapse-item name="2">
                                                                        <template #title><span
                                                                            style="font-size: 18px">小户名</span>
                                                                        </template>
                                                                        <div
                                                                            style="padding: 0;display: flex;flex-wrap: wrap">
                                                                            <template
                                                                                v-for="(item,index) of [['certNum','证件号码'],['useCertAddr','证件地址'],['useCustName','小户名'],['useCertTypeName','证件类型']]">
                                                                                <div class="item"
                                                                                     :key="index"
                                                                                     v-if="accountInfo.prodOrderItem.orderOwnCustVo[item[0]]">
                                                                                    <span>{{item[1]}}：</span>
                                                                                    <span>
                                                                                <i>{{accountInfo.prodOrderItem.orderOwnCustVo[item[0]]}}</i></span>
                                                                                </div>
                                                                            </template>
                                                                        </div>
                                                                    </el-collapse-item>
                                                                    <el-collapse-item name="3">
                                                                        <template #title><span
                                                                            style="font-size: 18px">产品属性</span>
                                                                        </template>
                                                                        <div
                                                                            style="padding: 0;display: flex;flex-wrap: wrap">
                                                                            <template
                                                                                v-for="(item,index) of accountInfo.prodOrderItem.orderMainProdAttrVos">
                                                                                <div class="item"
                                                                                     :key="item.attrId"
                                                                                     v-if="item.attrValue">
                                                                                    <span>{{item.attrName}}：</span>
                                                                                    <span>
                                                                                <i>{{item.attrValue}}</i>
                                                                                <i v-if="item.old && item.old.attrValue"
                                                                                   style="color: #7a7a7a">（旧值：{{item.old.attrValue}}）</i>
                                                                            </span>
                                                                                </div>
                                                                            </template>
                                                                        </div>
                                                                    </el-collapse-item>
                                                                    <el-collapse-item
                                                                        class="orderSubProdWithOutAttrVos"
                                                                        name="4">
                                                                        <template #title><span
                                                                            style="font-size: 18px">子产品</span>
                                                                        </template>
                                                                        <template
                                                                            v-if="accountInfo.prodOrderItem.orderSubProdWithOutAttrVos instanceof Array">
                                                                            <ul style="display: flex;flex-wrap: wrap;border-bottom: 1px dashed #333333;margin-bottom: 6px;">
                                                                                <template
                                                                                    v-for="(item,index) of accountInfo.prodOrderItem.orderSubProdWithOutAttrVos">
                                                                                    <li :key="index"
                                                                                        style="position: relative;display: inline-block;line-height: 28px; background: #f1f1f1;  margin: 0 10px 7px 0;padding: 0 12px;border-radius: 4px;font-size: 12px;">
                                                                                        {{item.prodName}}
                                                                                        <span
                                                                                            style="color: #fa0012">({{item.operDisplayName}})</span>
                                                                                    </li>
                                                                                </template>
                                                                            </ul>
                                                                        </template>
                                                                        <template
                                                                            v-if="(accountInfo.prodOrderItem.orderSubProdVos instanceof Array)&& accountInfo.prodOrderItem.orderSubProdVos.length">
                                                                            <el-tabs
                                                                                :active-name="String(accountInfo.prodOrderItem.orderSubProdVos[0].prodInstId)">
                                                                                <template
                                                                                    v-for="(item,index) of accountInfo.prodOrderItem.orderSubProdVos">
                                                                                    <el-tab-pane
                                                                                        :key="item.prodInstId"
                                                                                        :name="String(item.prodInstId)"
                                                                                        :label="`${item.prodName} (${item.operDisplayName})`">
                                                                                        <div
                                                                                            style="display: flex;flex-wrap: wrap">
                                                                                            <template
                                                                                                v-for="(item2,index) of item.orderSubProdAttrVos">
                                                                                                <div
                                                                                                    class="item"
                                                                                                    :key="item2.attrId"
                                                                                                    v-if="item2.attrValue">
                                                                                                    <span>{{item2.attrName}}：</span>
                                                                                                    <span>
                                                                                               <i>{{item2.attrValue}}</i>
                                                                                            </span>
                                                                                                </div>
                                                                                            </template>
                                                                                        </div>
                                                                                    </el-tab-pane>
                                                                                </template>
                                                                            </el-tabs>
                                                                        </template>
                                                                    </el-collapse-item>
                                                                    <el-collapse-item
                                                                        v-show="accountInfo.prodOrderItem.subPackSize"
                                                                        class="orderSubPackVos"
                                                                        name="5">
                                                                        <template #title><span
                                                                            style="font-size: 18px">可选包 ({{accountInfo.prodOrderItem.subPackSize}}) </span>
                                                                        </template>
                                                                        <div
                                                                            style="padding: 0;display: flex;flex-wrap: wrap">
                                                                            <template
                                                                                v-if="accountInfo.prodOrderItem.orderSubPackVos instanceof Array && accountInfo.prodOrderItem.orderSubPackVos.length">
                                                                                <el-collapse
                                                                                    style="width: 100%;">
                                                                                    <template
                                                                                        v-for="(item,index) of accountInfo.prodOrderItem.orderSubPackVos">
                                                                                        <el-collapse-item
                                                                                            :key="item.offerInstId"
                                                                                            style="margin-bottom: 2px">
                                                                                            <template
                                                                                                #title>
                                                                                                <div>
                                                                                                    <span>{{item.offerName}}</span>
                                                                                                    <span>{{item.effDate}}&ensp;&emsp;{{item.expDate}}</span>
                                                                                                </div>
                                                                                            </template>
                                                                                            <div
                                                                                                style="display: flex;flex-wrap: wrap">
                                                                                                <template
                                                                                                    v-for="(item2,index) of item.orderSubPackAttrVos">
                                                                                                    <div
                                                                                                        class="item"
                                                                                                        :key="index"
                                                                                                        v-if="item2.attrValue">
                                                                                                        <span>{{item2.attrName}}：</span>
                                                                                                        <span>
                                                                                               <i>{{item2.attrValue}}</i>  <i
                                                                                                            style="color: rgb(122, 122, 122);"
                                                                                                            v-if="item2.old && item2.old.attrValue">（旧值：{{item2.old.attrValue}}）</i>
                                                                                            </span>
                                                                                                    </div>
                                                                                                </template>
                                                                                            </div>
                                                                                        </el-collapse-item>

                                                                                    </template>
                                                                                </el-collapse>

                                                                            </template>
                                                                        </div>
                                                                    </el-collapse-item>
                                                                    <el-collapse-item name="6">
                                                                        <template #title><span
                                                                            style="font-size: 18px">地址信息</span>
                                                                        </template>
                                                                        <div
                                                                            style="padding: 0;display: flex;flex-wrap: wrap">
                                                                            <template
                                                                                v-for="(item,index) of accountInfo.prodOrderItem.addrAttrVos">
                                                                                <div class="item"
                                                                                     :key="index"
                                                                                     v-if="item.attrValue">
                                                                                    <span>{{item.name}}：</span>
                                                                                    <span><i>{{item.attrValue}}</i>
                                                                            <i style="color: rgb(122, 122, 122);"
                                                                               v-if="item.old && item.old.attrValue">（旧值：{{item.old.attrValue}}）</i>
                                                                            </span>
                                                                                </div>
                                                                            </template>
                                                                        </div>
                                                                    </el-collapse-item>
                                                                </el-collapse>
                                                            </el-main>
                                                        </el-container>
                                                    </el-tab-pane>
                                                </template>
                                            </el-tabs>
                                        </el-main>
                                    </el-container>
                                </el-main>
                            </el-container>
                        </el-card>
                    </div>
                </el-collapse-item>
                <el-collapse-item class="listBox" :name="4">
                    <template #title><h5>产品信息</h5></template>
                    <div class="cardBox">
                        <el-card shadow="hover"
                                 :body-style="{ paddingBottom:'14px' ,display:'flex',flexWrap:'wrap' }">
                            <div style="padding:0 14px;width: 100%;box-sizing: border-box">
                                <h3>产品名称</h3>
                                <span class="deduct">{{fromData.productBox.name}}</span>
                            </div>
                            <div style="padding:0 14px;width: 100%;box-sizing: border-box">
                                <h3>产品描述</h3>
                                <el-input readonly type="textarea"
                                          :autosize="{ minRows:5, maxRows: 10 }"
                                          :value="fromData.productBox.slname"></el-input>
                                <div class="bottom clearfix">
                                    <time class="time">生效时间：{{ fromData.productBox.otime }}</time>
                                    <time class="time">失效时间：{{ fromData.productBox.ptime }}</time>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-collapse-item>

                <el-collapse-item class="listBox" :name="5">
                    <template #title><h5>处理流程</h5></template>
                    <template v-if="fromData.workflowstateName.length">
                        <el-card shadow="hover"
                                 :body-style="{ paddingBottom:'14px' ,display:'flex',flexWrap:'wrap' }">
                            <el-steps direction="vertical" :space="100">
                                <el-step v-for="(item,index) of fromData.workflowstateName"
                                         :key="index"
                                         :title="item.title"
                                         :description="item.description"
                                         :status="item.title===fromData.status?'success':'process'"
                                ></el-step>
                            </el-steps>
                        </el-card>
                    </template>
                    <template v-else>
                        <div style="text-indent: 2em;font-size: 16px;font-weight: bold">未获取到处理流程信息
                        </div>
                    </template>
                </el-collapse-item>
            </el-collapse>
        </el-main>
        <!--
        todo 20210114 去除  仅订单含有受理员才能 流转的限制
        -->
        <!-- <el-footer v-if="options.type==='orderList' && fromData.assigneeName"
                    height="60px"
                    style="padding: 0;position: relative">-->
        <el-footer v-if="options.type==='orderList'"
                   height="60px"
                   style="padding: 0;position: relative">
            <el-row type="flex" justify="space-between" align="center">
                <el-col class="btnCardBox" v-if="buttons.length">
                    <template v-for="(item,index) of buttons">
                        <template v-if="item.button">
                            <template v-if="item.label==='受理员挂起'">
                                <el-button
                                    v-if="fromData.assigneeName"
                                    :key="index"
                                    type="primary"
                                    @click="stateFlow($event,item.label)"
                                    plain
                                >{{item.label}}
                                </el-button>
                            </template>
                            <template v-else>
                                <el-button
                                    :key="index"
                                    type="primary"
                                    @click="stateFlow($event,item.label)"
                                    plain
                                >{{item.label}}
                                </el-button>
                            </template>
                        </template>
                    </template>
                </el-col>
                <el-col class="btnCardBox" style="justify-content: center">
                    <el-button
                        type="error"
                        plain
                        v-show="false"
                        v-if="!!~userInfo.role.indexOf('管理员')"
                    > 退费
                    </el-button>
                    <el-button @click="editInfoFn"
                               v-if="!~userInfo.role.indexOf('受理员') && fromData.status ==='待核实'"
                               type="primary">
                        修改信息
                    </el-button>
                </el-col>
            </el-row>
        </el-footer>
        <edit-info @open="editOpen"
                   v-if="!~userInfo.role.indexOf('受理员') && fromData.status ==='待核实'"
                   :info-prop="editInfoData" :scope="this"
                   ref="editInfo"></edit-info>

        <el-dialog title="行项目信息" :visible.sync="dialogTableVisible">

        </el-dialog>

    </el-container>
</template>

<script>
    import {orderStatus} from "../../../../../../data/status.data.js"
    import {mapState} from "vuex"
    import {orderBoxList, userBoxList, bssBoxList} from "./data/first.data.js"
    import EditInfo from "./component/editInfo";

    export default {
        name: "first",
        components: {EditInfo},
        props: {
            options: {
                Object,
                default() {
                    return {
                        workid: "",
                        index: "",
                        scope: null,
                        type: '',
                        pageList: null,
                        status: ''
                    }
                }
            }
        },
        data() {
            return {
                dialogTableVisible: false,
                showPage: false,
                userBoxList,
                orderBoxList,
                bssBoxList,
                fromData: {
                    cid: "",
                    workid: "",
                    workname: "",
                    workmodle: "",
                    phone: "",
                    name: "",
                    interior: "",

                    // 两级地市
                    areas: "",
                    address: "",

                    c_remark: "",
                    servicename: "",
                    remark: "",
                    product: "",
                    amount: "",
                    createTime: "",
                    idcard: '',
                    broadband: '',
                    status: "",
                    statos: "",
                    reason: '',
                    appointmenttime: "",
                    assigneeName: "",
                    payment: '',
                    // order7
                    orderid: "",
                    // todo 2020-11-23 反刷手机号
                    bssPhone: "",
                    bss7: "",
                    no7: "",
                    st7: "",
                    ydno7: "",
                    ydst7: "",
                    cwno7: "",
                    cwst7: "",
                    gwno7: "",
                    gwst7: "",
                    sc7: "",

                    tmallId: "",
                    chargemethod: '',
                    acceptchannal: '',
                    workserved: "",
                    region: "",  // 地区
                    businessnumber: "", // 宽带账号
                    existingpreferential: "", // 现有优惠
                    existingPackageTypes: "", // 现有套餐类型
                    terminaltype: "", // 终端类型
                    terminalNumber: "", //终端串号
                    changedPackagetype: "", // 需更改套餐类型
                    vicecardnumber: "", // 副卡号码
                    prodacceptthemethod: "",// 产品受理方案
                    workflowName: "",
                    workflowid: "",
                    workflowstateName: [],

                    // todo 2021-03-22 新增 OOCP扣费金额 补贴金额
                    oocp: '',
                    paymentDiff: "",


                    productBox: {
                        slname: '',
                        name: '',
                        otime: '',
                        ptime: ''
                    },

                },
                /*
                * 状态按钮
                * */
                buttons: [],
                bssPhoneList: [],

                accountInfo: {
                    leftList: [],
                    accountList: [],
                    accountItem: {
                        list: [],
                        text: ""
                    },
                    prodOrderItem: undefined,
                },

            }
        },
        mounted() {
            this.init();
        },
        methods: {
            async init() {
                /*
                *
                * */
                await this.query_id();
                // this.queryBss()
            },
            //todo 查询流
            async queryWorkserved() {
                try {
                    const {data} = await this.$axios.post("work_chaliu", {}, {
                        params: {
                            id: this.fromData.workserved
                        },
                        showLoading: false,
                        showMessage: false
                    })
                    this.fromData.workflowName = data.flowName
                    this.fromData.workflowid = data.id
                    this.fromData.workflowstateName = data.stateName
                } catch (e) {
                }
                /*this.$axios.post("work_chaliu", {}, {
                    params: {
                        id: this.fromData.workserved
                    },
                    showLoading: false,
                    showMessage: false
                }).then(({data}) => {
                    /!*
                     workflowName: "",
                    workflowid: undefined,
                    workflowstateName: [],
                    * *!/
                    this.fromData.workflowName = data.flowName
                    this.fromData.workflowid = data.id
                    this.fromData.workflowstateName = data.stateName
                })*/
            },
            // todo 2020-12-1
            // 资产的97信息 的切换
            show97Status(row, column) {
                this.accountInfo.accountItem.list = [];
                this.accountInfo.accountItem.list.push(...row.account97.list)
                this.accountInfo.accountItem.text = row.account97.mess
            },
            // todo 2020-12-4
            // 资产的产品信息 的切换
            show97Status2(row, column) {
                // console.log(row.prodOrderItem)
                this.accountInfo.prodOrderItem = row.prodOrderItem
            },
            /*
            * todo 2020-12-03
            * 合并表格 联系方式
            *  */
            arraySpanMethod({row, column, rowIndex, columnIndex}) {
                if (row.workPosition === "外线施工人") {
                    if (columnIndex === 1) {
                        return [1, 2]
                    } else if (columnIndex === 2) {
                        return [2, 0]
                    }
                }
            },
            // todo 2020-11-23
            // 查询 工单反刷各个工号
            query_bssPhone() {
                this.bssBoxList = []
                // todo test.m 获取 反刷单号
                this.$axios.post('ss').then(value => {

                }).catch(reason => {
                    this.bssBoxList = []
                })
            },
            queryBss() {
                this.$axios.post("crm_crmorder",{},{
                    params: {
                        crmOrder: this.fromData.bss7
                    }
                }).then(({entry}) => {
                    console.log(entry)
                }).catch(reason => {

                })
            },
            async query_id(callback = () => {
            }) {
                try {
                    // console.log(this.right.channel)
                    const {oneInfo} = await this.$axios.post("work_cha", {
                        id: this.options.workid,
                        random: this.right.encrypt,
                        userInfo: this.userInfo,
                        status: this.options.status,
                        lqudao: this.right.channel
                    }, {
                        showLoading: false,
                        showMessage: false
                    })

                    const {
                        cid,
                        workid,
                        phone,
                        name,
                        interior,
                        address,
                        c_remark,
                        servicename,
                        remark,
                        product,
                        amount,
                        createTime,
                        idcard,
                        channel, // 渠道
                        /* accept: "300MB 宽带", // 受理业务*/
                        uploginno, // 创建工号
                        status, // 状态
                        statos,
                        reason,
                        ordertime, // 下单时间
                        payment, // 付款金额
                        toproomotelinks, // 订单url
                        appointmenttime, //  预约时间
                        ok, //
                        trackingtime, //跟踪时间
                        broadband,
                        uplogintime, // 更新时间
                        cui,
                        assigneeName,
                        tmallId,
                        orderid,
                        bss7,
                        no7,
                        st7,
                        cwno7,
                        cwst7,
                        gwno7,
                        gwst7,
                        ydno7,
                        ydst7,
                        sc7,
                        chargemethod,
                        acceptchannal,
                        productBox,
                        workserved,
                        bssPhone,
                        accountList,
                        leftList,
                        paymentstate,
                        region,  // 地区
                        businessnumber, // 宽带证号
                        existingpreferential, // 现有优惠
                        existingPackageTypes, // 现有套餐类型
                        terminaltype, // 终端类型
                        changedPackagetype, // 需更改套餐类型
                        vicecardnumber, // 副卡号码
                        prodacceptthemethod,// 产品受理方案
                        terminalNumber,
                        areas,
                        oocp,
                        paymentDiff,
                        isAuto,
                        acceptMethod
                    } = oneInfo

                    let sgdh = ""
                    try {
                        let a1 = JSON.parse(sc7);
                        sgdh = a1.join("-")
                    } catch (e) {
                        sgdh = sc7
                    }

                    this.fromData = {
                        cid,
                        workid,
                        /*workname: "工单名称",
                        workmodle: "工单模板",*/
                        phone,
                        name,
                        status, // 状态
                        statos,
                        reason,
                        interior,
                        address,
                        payment,
                        c_remark,
                        servicename,
                        remark,
                        product,
                        amount,
                        createTime,
                        idcard,
                        broadband,
                        appointmenttime,
                        assigneeName,
                        paymentstate,
                        // 7工单信息
                        orderid,
                        // todo 2020-11-23 反刷手机号
                        bssPhone,
                        bss7,
                        no7,
                        st7,
                        cwno7,
                        cwst7,
                        gwno7,
                        gwst7,
                        ydno7,
                        ydst7,
                        sc7: sgdh,
                        tmallId,
                        chargemethod,
                        acceptchannal,
                        workserved,
                        region,  // 地区
                        businessnumber, // 宽带证号
                        existingpreferential, // 现有优惠
                        existingPackageTypes, // 现有套餐类型
                        terminaltype, // 终端类型
                        changedPackagetype, // 需更改套餐类型
                        vicecardnumber, // 副卡号码
                        prodacceptthemethod,// 产品受理方案
                        areas,
                        oocp,
                        paymentDiff,
                        productBox: {
                            slname: productBox.slname,
                            name: productBox.name,
                            otime: productBox.otime,
                            ptime: productBox.ptime
                        },
                        workflowName: "",
                        workflowid: undefined,
                        workflowstateName: [],
                        terminalNumber,
                        isAuto,
                        acceptMethod
                    }

                    // console.log(this.fromData.isAuto)
                    this.accountInfo.accountList = []
                    this.accountInfo.accountList = accountList
                    this.accountInfo.leftList = leftList
                    this.accountInfo.accountItem = {
                        list: [],
                        text: ""
                    };
                    this.accountInfo.prodOrderItem = undefined;
                    await this.queryWorkserved()
                    // todo 2021-2-5 按钮的展示
                    this.buttons = orderStatus.button(this.userInfo, this.fromData.status, this);
                    callback();
                    this.showPage = true
                    /* this.$nextTick(() => {
                         setTimeout(v => {
                             try {
                                 let node = this.$refs.accountTable.$el.querySelector('tbody tr');
                                 let node2 = this.$refs.accountTable2.$el.querySelector('tbody tr');
                                 node.click()
                                 setTimeout(() => {
                                     node2.click()
                                 }, 10)
                             } catch (e) {
                             }
                         }, 500)
                     });*/
                } catch (e) {

                }
                /*this.$axios.post("work_cha", {
                    id: this.options.workid,
                    random: this.right.encrypt,
                    userInfo: this.userInfo,
                    lqudao: this.right.channel
                }, {
                    showLoading: false,
                    showMessage: false
                }).then(({oneInfo}) =>
                {
                    const {
                        cid,
                        workid,
                        phone,
                        name,
                        interior,
                        address,
                        c_remark,
                        servicename,
                        remark,
                        product,
                        amount,
                        createTime,
                        idcard,
                        channel, // 渠道
                        /!* accept: "300MB 宽带", // 受理业务*!/
                        uploginno, // 创建工号
                        status, // 状态
                        statos,
                        reason,
                        ordertime, // 下单时间
                        payment, // 付款金额
                        toproomotelinks, // 订单url
                        appointmenttime, //  预约时间
                        ok, //
                        trackingtime, //跟踪时间
                        broadband,
                        uplogintime, // 更新时间
                        cui,
                        assigneeName,
                        tmallId,
                        orderid,
                        bss7,
                        no7,
                        st7,
                        cwno7,
                        cwst7,
                        gwno7,
                        gwst7,
                        ydno7,
                        ydst7,
                        sc7,
                        chargemethod,
                        acceptchannal,
                        productBox,
                        workserved,
                        bssPhone,
                        accountList,
                        paymentstate,
                        region,  // 地区
                        businessnumber, // 宽带证号
                        existingpreferential, // 现有优惠
                        existingPackageTypes, // 现有套餐类型
                        terminaltype, // 终端类型
                        changedPackagetype, // 需更改套餐类型
                        vicecardnumber, // 副卡号码
                        prodacceptthemethod,// 产品受理方案
                        terminalNumber,
                    } = oneInfo
                    let sgdh = ""
                    try {
                        let a1 = JSON.parse(sc7);
                        sgdh = a1.join("-")
                    } catch (e) {
                        sgdh = sc7
                    }
                    this.fromData = {
                        cid,
                        workid,
                        /!*workname: "工单名称",
                        workmodle: "工单模板",*!/
                        phone,
                        name,
                        status, // 状态
                        statos,
                        reason,
                        interior,
                        address,
                        payment,
                        c_remark,
                        servicename,
                        remark,
                        product,
                        amount,
                        createTime,
                        idcard,
                        broadband,
                        appointmenttime,
                        assigneeName,
                        paymentstate,
                        // 7工单信息
                        orderid,
                        // todo 2020-11-23 反刷手机号
                        bssPhone,
                        bss7,

                        no7,
                        st7,
                        cwno7,
                        cwst7,
                        gwno7,
                        gwst7,
                        ydno7,
                        ydst7,
                        sc7: sgdh,
                        tmallId,
                        chargemethod,
                        acceptchannal,
                        workserved,
                        region,  // 地区
                        businessnumber, // 宽带证号
                        existingpreferential, // 现有优惠
                        existingPackageTypes, // 现有套餐类型
                        terminaltype, // 终端类型
                        changedPackagetype, // 需更改套餐类型
                        vicecardnumber, // 副卡号码
                        prodacceptthemethod,// 产品受理方案
                        productBox: {
                            slname: productBox.slname,
                            name: productBox.name,
                            otime: productBox.otime,
                            ptime: productBox.ptime
                        },
                        workflowName: "",
                        workflowid: undefined,
                        workflowstateName: [],
                        terminalNumber
                    }
                    this.accountInfo.accountList = []
                    this.accountInfo.accountList.push(...accountList)
                    this.accountInfo.accountItem = {
                        list: [],
                        text: ""
                    };
                    this.accountInfo.prodOrderItem = undefined;
                    this.queryWorkserved()
                    callback();
                    this.showPage = true
                    this.$nextTick(() => {
                        setTimeout(v => {
                            try {
                                let node = this.$refs.accountTable.$el.querySelector('tbody tr');
                                let node2 = this.$refs.accountTable2.$el.querySelector('tbody tr');
                                node.click()
                                setTimeout(() => {
                                    node2.click()
                                }, 10)
                            } catch (e) {
                            }
                        }, 500)
                    });
                })*/
            },
            // todo 修改工单备注
            changeRemark(remark = "") {
                if (remark || remark.trim()) {
                    this.$alert('是否修改工单备注', "提示", {
                        type: "info"
                    }).then(value => {
                        this.$axios.post("work_remarks", {}, {
                            params: {
                                remark,
                                workid: this.fromData.workid
                            }
                        }).then(({message}) => {
                            this.$message({
                                message,
                                duration: 1500,
                                type: "success"
                            });
                        })
                    })
                } else {
                    this.$message({
                        type: "warning",
                        message: "请填写工单备注",
                        duration: 1500
                    })
                }
            },
            /*
            *
            * 状态原因的流转
            * */
            stateFlow(event, state) {

                /*this.fromData.assigneeName
                this.$message*/
                // console.log(this.fromData)
                if(this.fromData.acceptMethod === 0 && state === '待自动受理'){
                    this.$message({
                        message: '非自动单',
                        duration: 1500,
                        type: 'error'
                        })

                }else {
                this.$prompt(`请输入${state}的原因`, '提示', {
                    type: "info",
                    closeOnPressEscape: false,
                    closeOnClickModal: false,
                    inputErrorMessage: '原因不能为空',
                    inputPlaceholder: `请输入${state}的原因`,
                    inputType: "textarea",
                    inputValue: state === '重复工单' ? '重复订单' : '',
                    inputValidator: (value) => {
                        value = value ? value : ''
                        return !!value.trim();
                    },
                    beforeClose: (action, {inputValue}, done) => {
                        if (action === 'confirm') {
                            this.$axios.post('work_remark', {}, {
                                params: {
                                    orderid: this.fromData.orderid, // 工单id
                                    workid: this.fromData.workid, // 工单id
                                    statosname: this.fromData.status, // 旧状态
                                    servicename: this.userInfo.username, // 操作人
                                    oldname: this.fromData.assigneeName || '', // 受理员
                                    status: state, // 新状态
                                    historys: inputValue.trim(), // 原因
                                    statos: this.fromData.st7 || '', // 7工单状态
                                    isitright: 0,
                                    product:this.fromData.product
                                }
                            }).then(({message}) => {
                                this.$message({
                                    message,
                                    duration: 1500,
                                    type: 'success'
                                });
                                this.fromData.status = state;
                                this.fromData.reason = inputValue.trim();
                                // todo 2021-2-5 按钮的展示
                                this.buttons = orderStatus.button(this.userInfo, this.fromData.status, this);
                                /*
                                * 改变表格中的数据
                                * */
                                (this.options.type === "orderList") && (this.options.scope.tableData[this.options.index].status = state);
                                done();
                            })
                        } else {
                            done();
                        }
                    }
                })/*.then(({value, action}) => {

                }).catch(reason => {

                })*/
                }
            },
            /*
            * todo 受理工单填写
            * */

            brush7(text = "") {
                if (text && text.trim() && this.$reg.bss3order.all.test(text.trim())) {
                    this.$alert("是否提交受理工单", "提示", {
                        type: "info",
                        showCancelButton: true,
                        confirmButtonText: "确定",
                        cancelButtonText: "取消"
                    }).then(() => {
                        this.$axios.post("cust_cha", {}, {
                            params: {
                                bss7: text.trim(),
                                workid: this.fromData.workid
                            }
                        }).then(value => {
                            this.$message({
                                type: 'success',
                                duration: 1500,
                                message: "填写成功",
                            });
                            this.init();
                        })
                    }).catch(reason => {

                    })
                } else {
                    this.$message({
                        message: "受理工单的格式有误",
                        duration: 1500,
                        type: "warning"
                    })
                }
            },

            /*
            * todo 2020-12-15 删除掉7工单
            * */
            deleteorder7(bss7) {
                this.$alert("是否删除受理信息", {
                    type: "success",
                    title: "提示"
                }).then(value => {
                    this.$axios.post("cust_deleteorder", {}, {
                        params: {
                            bss7: bss7,
                            workid: this.fromData.workid
                        }
                    }).then(value1 => {
                        this.fromData.bss7 = ''
                        this.init()
                    })
                })
            },
            // todo 2020-05-05 订单信息的修改
            editInfoFn() {
                this.$refs['editInfo'].visible = true;
            },
            editOpen() {

            }
        },
        computed: {
            ...mapState({
                right: s => s.right,
                userInfo: s => s.userInfo
            }),
            editInfoData() {
                return {
                    workid: this.fromData.workid,
                    custid: this.fromData.cid,
                    businessnumber: this.fromData.businessnumber,
                    broadband: this.fromData.broadband,
                    custname: this.fromData.name,
                    custphone: this.fromData.phone,
                    custidcard: this.fromData.idcard && String(this.fromData.idcard).toUpperCase(),
                    oldMessage: Object.freeze({
                        businessnumber: this.fromData.businessnumber,
                        broadband: this.fromData.broadband,
                        custname: this.fromData.name,
                        custphone: this.fromData.phone,
                        custidcard: this.fromData.idcard && String(this.fromData.idcard).toUpperCase(),
                    }),
                    uploginno: this.userInfo.username
                }
            }
        },
        watch: {
            "accountInfo.accountList"() {
                this.$nextTick(() => {
                    if (this.$refs.accountTable && this.$refs.accountTable2) {
                        this.$refs.accountTable.setCurrentRow(this.accountInfo.accountList[0]);
                        this.$refs.accountTable2.setCurrentRow(this.accountInfo.accountList[0]);
                        this.show97Status(this.accountInfo.accountList[0]);
                        this.show97Status2(this.accountInfo.accountList[0]);
                    }
                })
            }
        }
    }
</script>
<style lang="less">
    .listCard {
        .current-row {
            td {
                background-color: #fff2ef !important;
            }
        }
    }

    .productList {
        .el-tabs__nav-scroll {
            .el-tabs__nav {
                display: flex;
                flex-wrap: wrap;


                .el-tabs__item {
                    position: relative;
                    display: inline-block;
                    line-height: 28px;
                    height: 28px;
                    background: #f1f1f1;
                    margin: 0 10px 7px 0;
                    padding: 0 22px;
                    border-radius: 4px;
                    font-size: 12px;
                }
            }
        }

        .el-collapse-item__header {
            & > span {
                color: #8c9333;
            }
        }

        .el-collapse-item__content {
            /*background-color: #e6e6e6;*/
            border-radius: 8px;
            padding: 0 6px;
        }

        .orderSubProdWithOutAttrVos {
            .el-tabs__active-bar {
                display: none;
            }
        }

        .orderSubPackVos {
            .el-collapse-item__content {
                .el-collapse-item__header {
                    background-color: #f5f9fb;
                    padding: 0 20px;
                    height: 30px !important;
                    line-height: 30px !important;
                }

                .el-collapse-item__wrap {
                    /*background-color: #e6e6e6;*/
                }

                .el-collapse-item__header {
                    & > div {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                    }

                    & > i {
                        display: none;
                    }
                }
            }

            .el-collapse-item__wrap {
                border-bottom: none;
            }

        }
    }
</style>
<style scoped lang="less">

    .productListSide {
        .accNum {
            display: block;
            font-size: 16px;
            line-height: 20px;
        }

        .serviceOfferName {
            display: inline-block;
            padding: 0 6px;
            background-color: #ed795a;
            color: #fff;
            border-radius: 10px;
            margin-top: 4px;
            margin-left: 10px
        }
    }

    .listBox {
        h5 {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 10px;
            cursor: pointer;
            line-height: 48px;
            color: #303133;
        }

        .btnBox {
            display: flex;
            position: relative;
            z-index: 999;
            flex-wrap: wrap;
            margin: 5px 0;

            & > button {
                margin: 5px 10px;
            }
        }

    }

    .listCard {
        .current-row {
            background-color: #fff2ef !important;
        }

        .item {
            width: 33.333%;
            padding: 5px;
            display: flex;
            box-sizing: border-box;

            h6 {
                font-size: 18px;
                font-weight: bolder;
                margin: 0;
                line-height: 2em;
            }

            .itemInfo {
                display: block;

                .el-select {
                    width: 100%;
                }
            }

            & > span {
                box-sizing: border-box;
                display: inline-block;

                &:first-child {
                    font-size: 14px;
                    line-height: 24px;
                    color: #606266;
                    padding: 0 4px 0 0;
                    text-align: right;
                    white-space: nowrap;
                }

                &:nth-child(2) {
                    font-size: 0;
                    line-height: 24px;

                    & > i {
                        font-size: 14px;

                        &:first-child {
                            /*background-color: #e6e6e6;*/
                            display: inline-block;
                            /*font-family: "黑体";*/
                            white-space: normal;
                            /*-webkit-background-clip: text;
                            -webkit-text-fill-color:  #e6e6e6;*/

                        }

                        &:nth-child(2) {
                            color: rgb(122, 122, 122);
                            background-color: #e6e6e6;
                        }
                    }
                }
            }
        }

        .mytextarea {
            width: 100%;
            margin-top: 10px;
            flex-wrap: wrap;

            .itemInfo {
                text-align: right;
                width: 100%;
            }
        }

    }

    .cardBox {
        .time {
            display: block;
            font-size: 13px;
            color: #999;
            line-height: 20px;
        }

        h3 {
            font-size: 16px;
            line-height: 40px;
            font-weight: 800;
        }

        .bottom {
            margin-top: 13px;
            line-height: 12px;
        }

        .button {
            padding: 0;
            float: right;
        }

        .deduct {
            width: 100%;
            display: block;
        }

        .clearfix:before,
        .clearfix:after {
            display: table;
            content: "";
        }

        .clearfix:after {
            clear: both
        }
    }

    .btnCardBox {
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-start;
        margin-top: 10px;

        & > button {
            margin: 0 10px;
            margin-bottom: 10px;
        }
    }
</style>
