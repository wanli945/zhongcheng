<!--
-*- coding:utf-8 -*-
@IDE      : WebStorm
@time     : 2020/10/28 10:38
@author   : 李艳鹏
@Software : app
@File     : editBox
@describe : 商机单部分的弹窗
-->
<template>
<!--    初始显示first  遍历 两个组件list  指定父级作用域this  按需导入组件-->
    <el-tabs :active-name="activeName" @tab-click="tabClick">
        <template v-for="(item,index) of tabList">
            <el-tab-pane :key="index" :name="item.name"
                         :label="item.label">
                <component :page-type="pageType"
                           :api="api"
                           :ref="item.name"
                           :is="item.name"
                           v-if="activeName===item.name"
                           :scope="options.scope"
                           :parent-scope="parentScope"
                           :root-scope="options.rootScope"></component>
            </el-tab-pane>
        </template>
    </el-tabs>
</template>
<script>
    import  {mapState} from "vuex"
    import { businessAcceptType } from "../../../../data/businessData.js"
    import {businessDefaultFlow} from "../../../../data/status.data.js"
    import first from "./editBox/first";
    import second from "./editBox/second";
    // import firstOne from "./editBox/firstOne";

    export default {
        name: "editBox",
        inject:['pageRight'],
        props: {
            options: {
                type: Object,
                default() {
                    return {
                        row: null,
                        index: undefined,
                        scope: null, // 表格得 this
                        page: 'first',
                        rootScope: null // index页面作用域
                    }
                }
            },
            api: {
                type: Object,
                default() {
                    return {
                        select: "",
                        xiugai: ""
                    }
                },
                required: true
            },
            pageType: String
        },
        components: {
            first,
            // third: () => import("./editBox/third"),
            second,
            // firstOne
        },
        data() {
            return {
                activeName: "first",
                tabList: [
                    {label: "基本信息", name: "first"},
                    // {label: "历史记录", name: "second"},
                ],
                editBoxData: {
                    id: "", // 商机单编号
                    name: "", // 姓名
                    idcard: "", // 身份证号
                    accept: "", // 产品名称
                    payment: "", // 产品金额
                    remark: "", // 备注
                    interior: "", // 安装地址
                    address: "",// 地区
                    statos: "", // 状态
                    pagestatos: "",
                    failure: "",//失败原因
                    channel: "",//渠道
                    phone: '',
                    toproomotelinks: "",
                    appointmentime: "",
                    servicename: "",
                    trackingtime: "",
                    packageType: "",
                    packageContent: "",
                    tmallId: "",
                    terminalNumber: "",
                    terminalModel: "",
                    packageChange: "",

                    secondaryCard: "",
                    kdBroadband: "",
                },
                parentScope: this,
            }
        },
        mounted() {
            this.init();
        },
        computed: {
            ...mapState({
                right: s => s.right,  // 权限 分配下载加密上传
                userInfo: s => s.userInfo // 客户信息 uname phone 部门 角色 id 密码
            })
        },
        methods: {
            init() {
                this.activeName = this.options.page
                if(this.pageRight !== 'oneBroadband') {
                    // this.tabList.push({label: "在用资产", name: "firstOne"}) === 单宽维系
                    this.tabList.push({label: "历史记录", name: "second"})
                }
            },
            /*
            * 获取 部门
            * */
            queryDepan(servicename, callback = () => {
            }) {
                this.$axios.post("empl_queryAllde", {}, {
                    params: {
                        ename: servicename
                    },
                    showLoading: false
                }).then(({
                             depaname,
                             did,
                             level,
                             lid,
                         }) => {
                    callback(depaname)
                })
            },
            tabClick(v) {
                this.activeName = v.paneName
            },
            /*
            * 查询
            * */
            queryInfo({
                          SonScope, // 子得 scope
                          callback = () => {
                          }
                      } = {}) {
                this.$axios.post(this.api.select, {}, {
                    params: {
                        id: this.options.row.id,
                        random: this.right.encrypt,
                        userInfo: this.userInfo
                    },
                    showLoading: false
                }).then(async ({list}) => {
                    let {
                        accept,
                        address,
                        amount,
                        appointmentime,
                        channel,
                        failure,
                        flow,
                        id,
                        idcard,
                        interior,
                        name,
                        nameofadvertiser,
                        ok,
                        ordertime,
                        city,
                        payment,
                        phone,
                        remark,
                        servicename,
                        statos,
                        toproomotelinks,
                        trackingtime,
                        uploginno,
                        uplogintime,
                        workid,
                        broadband,
                        pageAddress,
                        area2,
                        paymentmethod,
                        // todo 10000号 多2个业务号码  2个产品  副卡号码 宽带账号
                        accept2,
                        accept3,
                        broadband2,
                        broadband3,
                        secondaryCard,
                        kdBroadband,

                        tmallId,
                        packageContent,
                        packageType,
                        //todo 外呼  终端串号
                        terminalNumber,
                        terminalModel,
                        packageChange,
                        template,
                        c4name, // C4
                        nowDiscount, // 现有优惠
                        nowPackageType, // 现有套餐类型
                        channels,
                        areas,
                        oocp
                    } = list[0];
                    let workserved = "";

                    try {
                        const {select, selectIndex} = (await this.$root.getLiu());
                        for (let i of select) {
                            if (i.id == template) {
                                workserved = i.value;
                            }
                        }
                        workserved = workserved || selectIndex[businessDefaultFlow[this.pageType]]
                    } catch (e) {

                    }

                    this.$set(SonScope, "editBoxData", {
                        id, // 商机单编号
                        name, // 姓名
                        nameofadvertiser,
                        idcard, // 身份证号
                        accept, // 产品名称
                        payment, // 产品金额
                        remark, // 备注
                        interior, // 安装地址
                        failure: !~["营销失败", "待二次外呼"].indexOf(statos) ? "" : failure,//失败原因
                        channel,//渠道
                        phone,
                        toproomotelinks,
                        appointmentime,
                        servicename,
                        trackingtime,
                        address,  // 城市
                        areas,
                        city: [areas, address],
                        statos, // 状态
                        orderTemplate: "", // 模板
                        broadband,
                        department: "",
                        workserved,
                        pageAddress: [],
                        pagestatos: statos,
                        area2,
                        paymentmethod,
                        // todo 10000号 多2个业务号码  2个产品
                        accept2,
                        accept3,
                        broadband2,
                        broadband3,
                        packageType,
                        packageContent,
                        tmallId,
                        terminalNumber, // 终端串号
                        terminalModel,
                        packageChange,
                        secondaryCard,
                        kdBroadband,
                        c4name, // C4
                        nowDiscount, // 现有优惠
                        nowPackageType, // 现有套餐类型
                        channels,
                        oldStatus: statos,
                        oocp,
                          // 业务类型 格式 及默认
                            acceptType:businessAcceptType[this.pageType] && businessAcceptType[this.pageType].default,
                            hasJx:businessAcceptType[this.pageType] && businessAcceptType[this.pageType].selectList.some(item=>{
                                if(item.value === businessAcceptType[this.pageType].default){
                                    return item.hasJx
                                } else {
                                    return false
                                }
                            }),
                        oldMessage: Object.freeze({
                            id, // 商机单编号
                            name, // 姓名
                            nameofadvertiser,
                            idcard, // 身份证号
                            accept, // 产品名称
                            payment, // 产品金额
                            remark, // 备注
                            interior, // 安装地址
                            failure: !~["营销失败", "待二次外呼"].indexOf(statos) ? "" : failure,//失败原因
                            channel,//渠道
                            phone,
                            toproomotelinks,
                            appointmentime,
                            servicename,
                            trackingtime,
                            address,  // 城市
                            areas,
                            city: [areas, address],
                            statos, // 状态
                            orderTemplate: "", // 模板
                            broadband,
                            department: "",
                            workserved,
                            pageAddress: [],
                            pagestatos: statos,
                            area2,
                            paymentmethod,
                            // todo 10000号 多2个业务号码  2个产品
                            accept2,
                            accept3,
                            broadband2,
                            broadband3,
                            packageType,
                            packageContent,
                            tmallId,
                            terminalNumber, // 终端串号
                            terminalModel,
                            packageChange,
                            secondaryCard,
                            kdBroadband,
                            c4name, // C4
                            nowDiscount, // 现有优惠
                            nowPackageType, // 现有套餐类型
                            channels,
                            oldStatus: statos,
                            oocp
                        }),
                    });

                    const success = () => !!servicename && this.queryDepan(servicename, (department) => {
                        this.$set(SonScope.editBoxData, "department", department)
                    });
                    callback({accept, accept2, accept3, success});
                    SonScope.showPage = true
                }).catch(reason => {
                    SonScope.showPage = true
                })
            },
            /*
            * 修改信息
            * */
            editInfo({
                         SonScope,
                         hidDialog = () => {
                         },
                         isRoam = false
                     } = {}) {
                const {
                    id, // 商机单编号
                    name, // 姓名
                    idcard, // 身份证号
                    accept, // 产品名称
                    payment, // 产品金额
                    remark, // 备注
                    interior, // 安装地址
                    failure,//失败原因
                    channel,//渠道
                    phone, // 联系方式
                    toproomotelinks,
                    appointmentime,
                    servicename,
                    trackingtime,
                    address,  // 城市
                    statos, // 状态
                    orderTemplate, // 模板
                    broadband,
                    pageAddress,
                    area2,
                    // todo 10000号 多2个业务号码  2个产品
                    accept2,
                    accept3,
                    broadband2,
                    broadband3,
                    packageType,
                    packageContent,
                    secondaryCard,
                    kdBroadband,
                    channels,
                    areas,
                } = SonScope.editBoxData;
                /*
                *  对信息的修改
                * */

                const params = {
                    ...SonScope.editBoxData,
                    orderTemplate: SonScope.cascaderItem.orderTemplate.select, // 模板数组
                    userInfo: this.userInfo
                };
                console.log(params)
                return new Promise((resolve, reject) => {
                    const {diffMess, diffArr} = this.$util.businessDiff(params);
                    /*
                    * 不为提交
                    * */
                    if (!isRoam || diffArr.length) {
                        this.$axios.post(this.api.xiugai, {}, {
                            params: {
                                ...params,
                                changeObj: diffMess
                            }
                        }).then(value => {
                            resolve(value);
                            /*
                            更新 表格数据
                            * */
                            /* this.options.scope.updateTableItem({
                                 index: this.options.index,
                                 row: Object.assign({}, this.options.row, {
                                     channel, // 渠道
                                     phone, // 手机号码
                                     name, // 客户姓名
                                     idcard, // 身份证号
                                     broadband, // 业务号
                                     interior, // 安装地址
                                     accept, // 受理业务
                                     servicename, // 业务员
                                     statos, // 状态
                                     payment, // 付款金额
                                     remark, // 备注
                                     toproomotelinks, // 订单url
                                     address, // 地区
                                     appointmentime, //  预约时间
                                     trackingtime, //跟踪时间
                                     failure, // 失败原因
                                 }),
                                 callback: () => {
                                     /!*
                                     * todo 2020-11-26 选择性隐藏 dialog
                                     * *!/
                                     hidDialog();
                                 }
                             })*/
                        }).catch(reason => {
                            reject(reason)
                        })
                    } else {
                        resolve();
                    }
                })
            },
            // 查询 历史
            async queryHistory() {
                const type = {
                    infoFlow: 1,
                    tmall: 2,
                    breathe: 3,
                    tenHao: 4,
                    distribution: 5
                };
                try {
                    const data = await this.$axios.post('work_historyqueryll', {}, {
                        params: {
                            id: this.options.row.id,
                            isitright: type[this.pageType]
                        },
                        showLoading: false,
                    })
                    console.log(data)
                    return {
                        data: data.historyAll,
                    }
                } catch (e) {

                }
            }
        },
    }
</script>
<style lang="less">

</style>
<style lang="less" scoped>

</style>
