
<template>
    <el-container style="margin-top: 30px; background-color: rgb(248, 248, 248);">
<!--     :value="['a','b']"   /-->
        <el-collapse :value="['b']">
            <el-collapse-item name="a">
                <template #title>
                    <el-button class="btn">在用资产</el-button>
<!--                    <hr />-->
                </template>
                <div style="height: calc(100vh - 400px);display: flex" class="cab">
                <el-scrollbar style="height: 100%">
                <el-container>
                    <el-aside style="padding: 15px 0;margin: 0; background-color: rgb(248, 248, 248)"
                              width="350px">
                        <el-table
                            ref="leftTable"
                            :data="leftList"
                            :stripe="true"
                            :highlight-current-row="true"
                            :cell-style="{'text-align':'left','background':'#fff'}"
                            :tooltip-effect="'light'"
                            size="mini"
                            @row-click="showRight"
                            :show-header="false"
                        >
                            <el-table-column label="有线宽带"
                                             prop="a">

                                <template slot-scope="prop">
                                    <div style="font-size: 20px;font-weight: 500; margin: 10px 0">
                                        <i class="iconfont icon-kuandai"></i>
                                        <span>{{prop.row.a}}-{{prop.row.b}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-aside>
                    <el-main style="background-color: rgb(248, 248, 248);padding: 0 0 0 20px; width: calc(100vw - 370px)">
                        <el-card style="margin-top:10px;padding: 0; width: 100%">
                            <!--                 v-if="accountInfo.prodOrderItem.prodInforVo.otherInfoAttrVos instanceof Array && accountInfo.prodOrderItem.prodInforVo.otherInfoAttrVos.length"-->

                            <div
                                style="padding: 0;display: flex;flex-wrap: wrap;width: 100%">

                                <template
                                    v-for="(item,index) of accountInfo.accountList.prodOrderItem.prodInforVo.otherInfoAttrVos">
                                    <div class="item"
                                         :key="index"
                                         v-if="item.attrValue">
                                        <!--                            <i class="iconfont icon-kuandai"></i>-->
                                        <span>{{item.name}}：</span>
                                        <span>{{item.attrValue}}</span>
                                    </div>
                                </template>
                            </div>
                        </el-card>
                        <el-card style="margin-top: 10px;" shadow="hover" :body-style="{ padding: '0 0 0 6px'}">


                            <div>
                                <span style="font-size: 18px;font-weight: 600; width: 100%;"><i class="iconfont icon-hetong"></i>123456789</span>
                            </div>

                            <el-collapse :value="['1','2','3','4','5']" >
                                <el-collapse-item name="1" style="width: 100%">
                                    <template #title>
                                        <span><i class="iconfont icon-credentials_icon"></i>小户名</span></template>
                                    <div style="display: flex;flex-wrap: wrap;padding: 0">
                                        <template v-for="(item,index) of [['certNum','证件号码'],['useCertAddr','证件地址'],['useCustName','小户名'],['useCertTypeName','证件类型']]">
                                            <div :key="index" class="item1" v-if="accountInfo.accountList.prodOrderItem.orderOwnCustVo[item[0]]">
                                                <span class="leftI">{{item[1]}}: </span>
                                                <span>{{accountInfo.accountList.prodOrderItem.orderOwnCustVo[item[0]]}}</span>
                                            </div>
                                        </template>
                                    </div>
                                </el-collapse-item>
                                <el-collapse-item name="2" style="width: 100%">
                                    <template #title>
                                        <span><i class="iconfont icon-chanpin"></i>产品信息</span></template>
                                    <div style="display: flex;flex-wrap: wrap;padding: 0">
                                        <template v-for="(item,index) of [['productsName','产品名称'],['deleteFlag','业务号码'],['attrValue','网络号']
                            ,['ceeffDate','账户'],['operDisplayName','地址局向'],['offerId','专线编号'],['a','营业区'],['offerInstId','接入管道编号']
                            ,['offerName','产品状态'],['expDate','开通时间'],['useCertTypeName','付费方式'],['useCustName','对应的销售品']
                            ,['useCertAddr','装机地址']]">
                                            <div :key="index" class="item1" v-if="accountInfo.accountList.prodOrderItem.products[item[0]]">
                                                <span class="leftI">{{item[1]}}:</span>
                                                <span>{{accountInfo.accountList.prodOrderItem.products[item[0]]}}</span>
                                            </div>
                                        </template>
                                    </div>
                                </el-collapse-item>
                                <el-collapse-item name="3">
                                    <template #title>
                                        <span><i class="iconfont icon-duohangwenben"></i>产品属性</span></template>
                                    <div style="display: flex;flex-wrap: wrap;padding: 0">
                                        <template v-for="(item,index) of [['productsName','产品名称'],['deleteFlag','业务号码'],['attrValue','网络号']
                            ,['ceeffDate','账户'],['operDisplayName','地址局向'],['offerId','专线编号'],['a','营业区'],['offerInstId','接入管道编号']
                            ,['offerName','产品状态'],['expDate','开通时间'],['useCertTypeName','付费方式'],['useCustName','对应的销售品']
                            ,['useCertAddr','装机地址']]">
                                            <div :key="index" class="item1" v-if="accountInfo.accountList.prodOrderItem.products[item[0]]">
                                                <span class="leftI">{{item[1]}}:</span>
                                                <span>{{accountInfo.accountList.prodOrderItem.products[item[0]]}}</span>
                                            </div>
                                        </template>
                                    </div>
                                </el-collapse-item>
                                <el-collapse-item name="4">
                                    <template #title>
                                        <span><i class="iconfont icon-tubiaolunkuo-"></i> 可选包({{accountInfo.accountList.prodOrderItem.subPackSize}})</span></template>
                                    <div style="display: flex;flex-wrap: wrap;padding: 0">
                                        <template
                                            v-if="accountInfo.accountList.prodOrderItem.orderSubPackVos instanceof Array && accountInfo.accountList.prodOrderItem.orderSubPackVos.length">
                                            <el-collapse class="collapse"
                                                style="width: 100%;">
                                                <template
                                                    v-for="(item,index) of accountInfo.accountList.prodOrderItem.orderSubPackVos">
                                                    <el-collapse-item
                                                        :key="item.offerInstId"
                                                        style="margin-bottom: 2px">
                                                        <template #title>
                                                            <div style="margin-left: 15px">
                                                                <span>{{item.offerName}}</span>
                                                                <span>{{item.effDate}}&ensp;&emsp;{{item.expDate}}</span>
                                                            </div>
                                                        </template>
                                                        <div
                                                            style="display: flex;flex-wrap: wrap">
                                                            <template
                                                                v-for="(item2,index) of item.orderSubPackAttrVos">
                                                                <div
                                                                    style="margin-top: 10px;width: 25%"
                                                                    :key="index"
                                                                    v-if="item2.attrValue">
                                                                    <span style="font-size: 16px; margin-left: 10px">{{item2.attrName}}：</span>
                                                                    <span>
                                                                        <span>{{item2.attrValue}}</span>
                                                                        <span style="color: rgb(122, 122, 122);"
                                                                             v-if="item2.old && item2.old.attrValue">（旧值：{{item2.old.attrValue}}）</span>
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



                            </el-collapse>
                            <!--                    </el-collapse-item>-->
                            <!--                </el-collapse>-->
                            <!--                </el-scrollbar>-->
                            <!--              </div>-->
                        </el-card>
                    </el-main>
                </el-container>
                </el-scrollbar></div>
            </el-collapse-item>
        </el-collapse>

    </el-container>
</template>

<script>

    import {orderStatus} from "../../../../../data/status.data";
    import {mapState} from "vuex";

    export default {
        name: "firstOne",
        props: {
            id: undefined,
            status: undefined
        },
        data() {
            return {
                activeNames: ['1'],
                leftList: [
                    {a:'有线宽带',
                        b:'123456789'},
                ],
                accountInfo: {
                    accountList:
                        {refreshFlag: false, // false
                            serviceOfferName: '新装', // 新装
                            staffInfo: '你你（123）',
                            statusCd: '401400',
                            statusName: '已经',
                            accNum: '057170826556',   // 057170826556
                            cancelFlag: false,  // false
                            catgType: '30',
                            custOrderId: '789',
                            orderProdItemId: '456',
                            prodId: '465',
                            prodName: '有线宽带',
                            prodOrderItem: {
                                addrAttrVos: [
                                    {name: '标准地址',},
                                    {name: '预约时段'},
                                    {name: '预约时间'},
                                    {name: '局向编码'},
                                    {  name: '标准地址',
                                        attrValue: '1564'
                                    },{
                                        name: '联系人',
                                        attrValue: '1564'
                                    }
                                ],
                                products: {
                                    deleteFlag: true,
                                    effDate: "2016-04-2700: 00: 00",
                                    operDisplayName: "失效",
                                    offerName: "指定套餐老用户网龄优惠提速至100M",
                                    useCertAddr: "嘉兴市海宁市一品侨福2幢一单元2704室",
                                    offerId: 283976,
                                    offerInstId: 1623878122,
                                    name: '标准地址',
                                    attrValue: '1564',
                                    useCertTypeName: "身份证",
                                    useCustName: "尚茹枫",
                                    a: '杭州市',
                                    expDate: "2018-11-1700: 00: 00"
                                },
                                orderMainProdAttrVos: [
                                    { attrId: '123456789',
                                        old:{
                                            attrValue:'是',
                                        },
                                        attrValue:'是',
                                        attrName: '必须桥接'
                                    },
                                ],
                                invalidOrderSubPackVos: [
                                    {  deleteFlag: true,
                                        effDate: "2016-04-2700: 00: 00",
                                        operDisplayName: "失效",
                                        offerName: "指定套餐老用户网龄优惠提速至100M",
                                        offerId: 283976,
                                        offerInstId: 1623878122,
                                        expDate: "2018-11-1700: 00: 00"}
                                ],
                                orderOwnCustVo: {
                                    certNum: "330382198707284021",
                                    custNumber: "173200032215349",
                                    useCertAddr: "嘉兴市海宁市一品侨福2幢一单元2704室",
                                    useCertType: "1",
                                    useCertTypeName: "身份证",
                                    useCustName: "尚茹枫",
                                    userCustId: 1006595512834
                                },
                                orderSubPackVos: [{
                                    deleteFlag: false,offerId: 305072817,offerInstId: 1006567241212,offerName: "201907有线宽带包年1000元", operDisplayName: "新建",
                                    orderSubPackAttrVos:[{attrName: "生失效方式",attrValue: "立即生效"},
                                        {attrId: 20000125001,attrName: "携转服务影响",attrValue: "无携出限制"},
                                        {attrId: 20000059001,attrName: "宽带包年到期处理方式", attrValue: "到期转包月"},
                                        {attrId: 20000086001,attrName: "宽带（其他）业务定价类型", attrValue: "包年"}],
                                    pakOrderItemId: 472917371331
                                },{
                                    deleteFlag: false,offerId: 305072817,offerInstId: 10065672412,offerName: "201907有线宽带包年1000元", operDisplayName: "新建",
                                    orderSubPackAttrVos:[{attrName: "生失效方式",attrValue: "立即生效"},
                                        {attrId: 20000125001,attrName: "携转服务影响",attrValue: "无携出限制"},
                                        {attrId: 20000059001,attrName: "宽带包年到期处理方式", attrValue: "到期转包月"},
                                        {attrId: 20000086001,attrName: "宽带（其他）业务定价类型", attrValue: "包年"}],
                                    pakOrderItemId: 472917371331
                                },{
                                    deleteFlag: false,offerId: 305852817,offerInstId: 1006596241212,offerName: "201907有线宽带包年1000元", operDisplayName: "新建",
                                    orderSubPackAttrVos:[{attrName: "生失效方式",attrValue: "立即生效"},
                                        {attrId: 20000125001,attrName: "携转服务影响",attrValue: "无携出限制"},
                                        {attrId: 20000059001,attrName: "宽带包年到期处理方式", attrValue: "到期转包月"},
                                        {attrId: 20000086001,attrName: "宽带（其他）业务定价类型", attrValue: "包年"}],
                                    pakOrderItemId: 472917371331
                                },{
                                    deleteFlag: false,offerId: 305022817,offerInstId: 1046567241212,offerName: "201907有线宽带包年1000元", operDisplayName: "新建",
                                    orderSubPackAttrVos:[{attrName: "生失效方式",attrValue: "立即生效"},
                                        {attrId: 20000125001,attrName: "携转服务影响",attrValue: "无携出限制"},
                                        {attrId: 20000059001,attrName: "宽带包年到期处理方式", attrValue: "到期转包月"},
                                        {attrId: 20000086001,attrName: "宽带（其他）业务定价类型", attrValue: "包年"}],
                                    pakOrderItemId: 472917371331
                                },{
                                    deleteFlag: false,offerId: 346372817,offerInstId: 1526567241212,offerName: "201907有线宽带包年1000元", operDisplayName: "新建",
                                    orderSubPackAttrVos:[{attrName: "生失效方式",attrValue: "立即生效"},
                                        {attrId: 20000125001,attrName: "携转服务影响",attrValue: "无携出限制"},
                                        {attrId: 20000059001,attrName: "宽带包年到期处理方式", attrValue: "到期转包月"},
                                        {attrId: 20000086001,attrName: "宽带（其他）业务定价类型", attrValue: "包年"}],
                                    pakOrderItemId: 472917371331
                                },{
                                    deleteFlag: false,offerId: 328072817,offerInstId: 1096567241212,offerName: "201907有线宽带包年1000元", operDisplayName: "新建",
                                    orderSubPackAttrVos:[{attrName: "生失效方式",attrValue: "立即生效"},
                                        {attrId: 20000125001,attrName: "携转服务影响",attrValue: "无携出限制"},
                                        {attrId: 20000059001,attrName: "宽带包年到期处理方式", attrValue: "到期转包月"},
                                        {attrId: 20000086001,attrName: "宽带（其他）业务定价类型", attrValue: "包年"}],
                                    pakOrderItemId: 472917371331
                                }],
                                // orderSubProdVos: newObj.orderSubProdVos,
                                prodInforVo: {
                                    acctCd: '',
                                    otherInfoAttrVos: [
                                        {
                                            old: {
                                                name: '杭州杭州',
                                                attrValue: '2731013250966'
                                            },
                                            name: '杭州杭州',
                                            attrValue: '2731013250966'
                                        },{
                                            old: {
                                                name: '杭州杭州',
                                                attrValue: '2731013250966'
                                            },
                                            name: '杭州杭州',
                                            attrValue: '2731013250966'
                                        },{
                                            name: '杭州杭州',
                                            attrValue: '2731013250966'
                                        },{
                                            name: '杭州杭州',
                                            attrValue: '2731013250966'
                                        }
                                    ]

                                },
                                subPackSize: 6
                            },
                            account97: {
                                // mess: newObj.statusList ? "已获取97信息" : "97信息为空",
                                // list: newObj.statusList
                            },
                        },
                    accountItem: {
                        list: [],
                        text: ""
                    },

                },
                fromData: {}
                // columnList,
                // tableData: [],
                // emptyText: "暂无数据"
            }
        },
        mounted() {
            this.init();
            console.log(this.accountInfo.accountList)
        },
        computed: {
            ...mapState({
                right: s => s.right,
                userInfo: s => s.userInfo
            }),
        },
        methods: {
            async init() {
                await this.query_id();
                // console.log(this.parentScope.editBoxData.id)
                // await this.getTableData();
            },
            showRight() {

            },
            async query_id() {

                // const {oneInfo} = await this.$axios.post("work_cha", {
                //     id: this.id,
                //     random: this.right.encrypt,
                //     userInfo: this.userInfo,
                //     status: this.status,
                //     lqudao: this.right.channel
                // }, {
                //     showLoading: false,
                //     showMessage: false
                // })
                // console.log(oneInfo)

            },

            async getTableData() {
                try {
                    // const {data, total} = await this.parentScope.queryHistory()
                    // this.emptyText = "暂无数据";
                    // this.tableData = data;
                } catch (e) {
                    // this.tableData = [];
                    // this.emptyText = e.message;
                }
            },
        }

    }
</script>
<style lang="less">
    .collapse {
        .el-collapse-item__header {
            background-color: rgb(213, 220, 213) !important;

        }
        .el-collapse-item__content {

            .el-collapse-item__wrap {
                border-bottom: none;
                /*background-color: red; // 可选包item下*/
            }
        }
    }
    .cab .is-horizontal{
        display: none;
    }

    .cab .el-scrollbar__wrap {
        overflow-x: hidden;
    }
</style>

<style lang="less" scoped>

    .item {
        width: 20%;
        display: flex;
        box-sizing: border-box;
        font-size: 15px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        margin-bottom: 10px;
    }
    .item1 {
        width: 33.333%;
        display: flex;
        box-sizing: border-box;
        margin-bottom: 10px;
    }


    .leftI {
        font-size: 15px;
        color: rgb(67,67,67);
        margin-right: 10px;
        margin-left: 10px;
    }
    .el-collapse-item__header {
        & > span {
            color: rgb(67,67,67);
            font-size: 20px;
            font-weight: 600;
        }

    }

    .btn {
        background: #ED876B;
        border-color: #ED876B;
        color: #fff;
    }

    i {
        margin-right: 5px;
        font-size: 20px;
    }
</style>
