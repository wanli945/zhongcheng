"use strict";
!function (doc, win) {
    if (!(win.localStorage)) {
        alert("当前浏览器版过低建议升级！");
        win.open("https://www.google.cn/chrome/", "_self")
    }
}(document, window);

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter)
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr)
}

function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F, n: function n() {
                    if (i >= o.length) return {done: true};
                    return {done: false, value: o[i++]}
                }, e: function e(_e) {
                    throw _e;
                }, f: F
            }
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]()
        }, n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step
        }, e: function e(_e2) {
            didErr = true;
            err = _e2
        }, f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return()
            } finally {
                if (didErr) throw err;
            }
        }
    }
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen)
}

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
}

var _busSetToArr = function _busSetToArr(all) {
    var select = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    if (window.Set) {
        var _channelSelect = new Set();
        for (var _i = 0, _Object$values = Object.values(all); _i < _Object$values.length; _i++) {
            var key = _Object$values[_i];
            var _iterator = _createForOfIteratorHelper(key), _step;
            try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    var item = _step.value;
                    _channelSelect.add(item.value)
                }
            } catch (err) {
                _iterator.e(err)
            } finally {
                _iterator.f()
            }
        }
        _channelSelect.forEach(function (value) {
            select.push({label: value, value: value})
        })
    } else {
        var _channelSelect2 = [];
        for (var _i2 = 0, _Object$values2 = Object.values(all); _i2 < _Object$values2.length; _i2++) {
            var _key = _Object$values2[_i2];
            var _iterator2 = _createForOfIteratorHelper(_key), _step2;
            try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    var _item = _step2.value;
                    _channelSelect2.indexOf(_item.value) < 0 && _channelSelect2.push(_item.value)
                }
            } catch (err) {
                _iterator2.e(err)
            } finally {
                _iterator2.f()
            }
        }
        _channelSelect2.forEach(function (value) {
            select.push({label: value, value: value})
        })
    }
    return select
};

function CrmDict() {
    /*
    *  产品配置 + 自动受理
    * */
    var product_config_parsing = {
        payMethod: { // bss付款方式
            1200: '后付费',
            1201: '准实时预付费',
            2100: '预付费'
        },
        isAuto: { // 是否走自动受理
            N: '否',
            Y: '是'
        },
        enable: { // 是否启用
            0: '启用',
            1: '禁用'
        },
        acceptMethod: { // 受理方式
            0: '人工受理',
            1: '自动受理'
        }
    };
    var product_config_select = { // 产品配置下拉选择器
        payMethod: [{
            label: '后付费',
            value: "1200"
        }, {
            label: '准实时预付费',
            value: "1201"
        }, {
            label: '预付费',
            value: "2100"
        }],
        isAuto: [
            // { label: '否', value: 'N' },
            { label: '是', value: 'Y' },],
        enable: [{
            label: '启用',
            value: 0
        }, {
            label: '禁用',
            value: 1
        }],
        acceptMethod: [{
            label: '人工受理',
            value: 0
        }, {
            label: '自动受理',
            value: 1
        }]
    };
    /*
    * todo 订单商机单 收款方式
    * */
    var payMethod = {
        //
        infoFlow: [{
            label: '外线收费',
            value: '外线收费'
        }, {
            label: '支付宝',
            value: '支付宝'
        }, {
            label: '微信',
            value: '微信'
        }, {
            label: '天猫付款',
            value: '天猫付款'
        }, {
            label: '微信公众号付款',
            value: '微信公众号付款'
        }, {
            label: '现金',
            value: '现金'
        }, {
            label: '对公转账',
            value: '对公转账'
        }, {
            label: '前台不收费',
            value: '前台不收费'
        }],

        oneBroadband: [{
            label: '外线收费',
            value: '外线收费'
        }, {
            label: '支付宝',
            value: '支付宝'
        }, {
            label: '微信',
            value: '微信'
        }, {
            label: '天猫付款',
            value: '天猫付款'
        }, {
            label: '微信公众号付款',
            value: '微信公众号付款'
        }, {
            label: '现金',
            value: '现金'
        }, {
            label: '对公转账',
            value: '对公转账'
        }, {
            label: '前台不收费',
            value: '前台不收费'
        }],
        tenHao: [{
            label: '外线收费',
            value: '外线收费'
        }, {
            label: '支付宝',
            value: '支付宝'
        }, {
            label: '微信',
            value: '微信'
        }, {
            label: '天猫付款',
            value: '天猫付款'
        }, {
            label: '微信公众号付款',
            value: '微信公众号付款'
        }, {
            label: '现金',
            value: '现金'
        }, {
            label: '对公转账',
            value: '对公转账'
        }, {
            label: '前台不收费',
            value: '前台不收费'
        }],
        distribution: [{
            label: '外线收费',
            value: '外线收费'
        }, {
            label: '前台收费',
            value: '前台收费'
        }],
        tmall: [
            {label: '外线收费', value: '外线收费'},
            {label: '支付宝', value: '支付宝'},
            {label: '微信', value: '微信'},
            {label: '天猫付款', value: '天猫付款'},
            {label: '微信公众号付款', value: '微信公众号付款'},
            {label: '现金', value: '现金'},
            {label: '对公转账', value: '对公转账'},
            {label: '前台不收费', value: '前台不收费'},
            // {label: '平台支付', value: '平台支付'}
        ],
        breathe: [{
            label: '外线收费',
            value: '外线收费'
        }, {
            label: '支付宝',
            value: '支付宝'
        }, {
            label: '微信',
            value: '微信'
        }, {
            label: '天猫付款',
            value: '天猫付款'
        }, {
            label: '微信公众号付款',
            value: '微信公众号付款'
        }, {
            label: '现金',
            value: '现金'
        }, {
            label: '对公转账',
            value: '对公转账'
        }, {
            label: '前台不收费',
            value: '前台不收费'
        }, {
            label: 'POS收款',
            value: 'POS收款'
        },
        ]
    };

//业务类型  新增 存量
var businessAcceptType = {
    infoFlow: {
        selectList: [{
            label: "存量",
            value: "存量",
            hasJx: false,
        },{
            label: "新装",
            value: "新装",
            hasJx: true,
        }
    ],
        default: "新装",

    },
    tenHao: {
        selectList: [{
            label:"存量",
            value:"存量",
            hasJx:false,
        },{
            label:"新装",
            value:"新装",
            hasJx:true,
        }],
        default: "存量"
    },
    oneBroadband: {
        selectList: [{
            label: "存量",
            value: "存量",
            hasJx: false,
        },{
            label: "新装",
            value: "新装",
            hasJx: true,
        }
        ],
        default: "新装",

    },

};



    /*
    * todo 天猫可选包展示（弃用 目前使用了文本框）
    * */
    var packageChange = [
        {
            label: '5G129套餐',
            value: '5G129套餐'
        }, {
            label: '5G169套餐',
            value: '5G169套餐'
        }, {
            label: '5G199套餐',
            value: '5G199套餐'
        }, {
            label: '5G299套餐',
            value: '5G299套餐'
        }, {
            label: '5G399套餐',
            value: '5G399套餐'
        }, {
            label: '其他',
            value: '其他'
        }];
    /*
    * todo 走 套包自动受理的c3和c4
    * */
    var c3List = ['杭州市', '温州市', '舟山市', '衢州市', '湖州市', '金华市', '丽水市', '台州市', '嘉兴市', '绍兴市', '宁波市'];
    var allCity = {
        "杭州市": ['余杭区', '萧山区', '桐庐县', '富阳市', '建德市', '淳安县', '临安市', '杭州市'],
        '温州市': ['文成县', '泰顺县', '永嘉县', '平阳县', '乐清市', '苍南县', '瑞安市', '温州市', '洞头县', '龙港市'],
        "舟山市": ['普陀区', '舟山市', '岱山县', '嵊泗县'],
        "衢州市": ['开化县', '衢州市', '龙游县', '常山县', '江山市'],
        "湖州市": ['安吉县', '长兴县', '市本级', '德清县'],
        "金华市": ['义乌市', '武义市', '东阳市', '金华市', '兰溪市', '永康市', '浦江市', '磐安市'],
        "丽水市": ['龙泉市', '青田县', '景宁县', '缙云县', '遂昌县', '松阳县', '庆元县', '丽水市', '云和县'],
        "台州市": ['仙居县', '路桥区', '临海市', '三门县', '黄岩区', '玉环县', '温岭市', '天台县', '椒江区'],
        "嘉兴市": ['海宁县', '海盐县', '平湖县', '桐乡县', '嘉兴市', '嘉善县'],
        "绍兴市": ['嵊州市', '诸暨市', '绍兴市', '上虞市', '新昌县'],
        "宁波市": ['鄞州区', '宁海县', '镇海区', '余姚市', '象山县', '北仑区', '宁波市', '奉化市', '慈溪市']
    };
    /*
    *
    * todo 信息流各个不同的模块的状态
    * */
    var businessAllStatus = {
        // 信息流
        infoFlow: [{
            value: '待外呼',
            label: '待外呼'
        }, {
            value: '待二次外呼',
            label: '待二次外呼'
        }, {
            value: '营销失败',
            label: '营销失败'
        }, {
            value: '营销成功',
            label: '营销成功'
        }, {
            label: "挂起",
            value: "挂起"
        }],
        oneBroadband: [{
            value: '待外呼',
            label: '待外呼'
        }, {
            value: '待二次外呼',
            label: '待二次外呼'
        }, {
            value: '营销失败',
            label: '营销失败'
        }, {
            value: '营销成功',
            label: '营销成功'
        }, {
            label: "挂起",
            value: "挂起"
        }],
        // tm
        tmall: [{
            value: '已提交',
            label: '已提交'
        }, {
            value: '交易成功',
            label: '交易成功'
        }, {
            value: '退款',
            label: '退款'
        }],
        // 外呼
        breathe: [{
            value: '待外呼',
            label: '待外呼'
        }, {
            value: '待二次外呼',
            label: '待二次外呼'
        }, {
            value: '营销失败',
            label: '营销失败'
        }, {
            value: '营销成功',
            label: '营销成功'
        }, {
            label: "挂起",
            value: "挂起"
        }],
        //万号
        tenHao: [{
            value: '待外呼',
            label: '待外呼'
        }, {
            value: '待二次外呼',
            label: '待二次外呼'
        }, {
            value: '营销失败',
            label: '营销失败'
        }, {
            value: '营销成功',
            label: '营销成功'
        }, {
            label: "挂起",
            value: "挂起"
        }],
        //分销
        distribution: [{
            value: '待外呼',
            label: '待外呼'
        }, {
            value: '待二次外呼',
            label: '待二次外呼'
        }, {
            value: '营销失败',
            label: '营销失败'
        }, {
            value: '营销成功',
            label: '营销成功'
        }, {
            label: "挂起",
            value: "挂起"
        }]
    };
    /*
    *
    * todo  商机单模块 弹窗 基本信息  行销结果
    * */
    var businessAllMarketing = {
        // 行销结果
        // 信息流的
        infoFlow: [
            {
                label: "待外呼",
                value: '待外呼'
            }, {
                value: '待二次外呼',
                label: '待二次外呼',
                children: [{
                    label: '多次无人接听',
                    value: '多次无人接听'
                }, {
                    label: '要求稍后联系',
                    value: '要求稍后联系'
                }]
            }, {
                label: "营销成功",
                value: '营销成功'
            }, {
                value: '营销失败',
                label: '营销失败',
                children: [{
                    value: '无意向下单',
                    label: "无意向下单"
                }, {
                    value: '纯咨询',
                    label: "纯咨询"
                }, {
                    value: '老融改套',
                    label: "老融改套"
                }, {
                    value: '老宽续费',
                    label: "老宽续费"
                }, {
                    value: '商用地址',
                    label: "商用地址"
                }, {
                    value: '价格贵',
                    label: "价格贵"
                }, {
                    value: '重复提交',
                    label: "重复提交"
                }, {
                    value: '空号',
                    label: "空号"
                }, {
                    value: '多次无人接听',
                    label: "多次无人接听"
                },
                    {value: '已有优惠', label: "已有优惠"},
                ]
            }, {
                label: "挂起",
                value: "挂起"
            },
            {
                label: "废弃",
                value: "废弃"
            },
            {
                label: "旗舰店下单",
                value: "旗舰店下单"
            }
        ],

        oneBroadband: [
            {
                label: "待外呼",
                value: '待外呼'
            }, {
                value: '待二次外呼',
                label: '待二次外呼',
                children: [{
                    label: '多次无人接听',
                    value: '多次无人接听'
                }, {
                    label: '要求稍后联系',
                    value: '要求稍后联系'
                }]
            }, {
                label: "营销成功",
                value: '营销成功'
            }, {
                value: '营销失败',
                label: '营销失败',
                children: [{
                    value: '无意向下单',
                    label: "无意向下单"
                }, {
                    value: '纯咨询',
                    label: "纯咨询"
                }, {
                    value: '老融改套',
                    label: "老融改套"
                }, {
                    value: '老宽续费',
                    label: "老宽续费"
                }, {
                    value: '商用地址',
                    label: "商用地址"
                }, {
                    value: '价格贵',
                    label: "价格贵"
                }, {
                    value: '重复提交',
                    label: "重复提交"
                }, {
                    value: '空号',
                    label: "空号"
                }, {
                    value: '多次无人接听',
                    label: "多次无人接听"
                },
                    {value: '已有优惠', label: "已有优惠"},
                ]
            }, {
                label: "挂起",
                value: "挂起"
            },
            {
                label: "废弃",
                value: "废弃"
            }
        ],
        // 外呼的
        breathe: [
            {
                label: "待外呼",
                value: '待外呼'
            }, {
                value: '待二次外呼',
                label: '待二次外呼',
                children: [{
                    label: '多次无人接听',
                    value: '多次无人接听'
                }, {
                    label: '要求稍后联系',
                    value: '要求稍后联系'
                }]
            }, {
                label: "营销成功",
                value: '营销成功'
            }, {
                value: '营销失败',
                label: '营销失败',
                children: [

                    {
                        value: '无意向下单',
                        label: "无意向下单"
                    }, {
                        value: '纯咨询',
                        label: "纯咨询"
                    }, {
                        value: '老融改套',
                        label: "老融改套"
                    }, {
                        value: '老宽续费',
                        label: "老宽续费"
                    }, {
                        value: '商用地址',
                        label: "商用地址"
                    }, {
                        value: '价格贵',
                        label: "价格贵"
                    }, {
                        value: '重复提交',
                        label: "重复提交"
                    }, {
                        value: '空号',
                        label: "空号"
                    }, {
                        value: '多次无人接听',
                        label: "多次无人接听"
                    },
                    {value: '已有优惠',
                    label: "已有优惠"},
                ]
            }, {
                label: "挂起",
                value: "挂起"
            },
            {
                label: "废弃",
                value: "废弃"
            },
        ],
        // 分销的
        distribution: [
            {
                label: "营销成功",
                value: '营销成功'
            },
            {
                label: "废弃",
                value: "废弃"
            },
        ],
        tenHao: [
            {
                label: "营销成功",
                value: '营销成功'
            }, {
                label: "废弃",
                value: "废弃"
            },
        ],
        // 天猫的为按钮
        tmall: [{
            value: '待确认',
            label: '待确认',
            button: false,
            type: false
        }, {
            value: '交易关闭',
            label: '交易关闭',
            button: "退费",
            type: "success"
        }, {
            value: '提交成功',
            label: '提交成功',
            button: "提交",
            type: "primary",
            toOrder: true
        },
            {
                value: '挂起',
                label: '挂起',
                button: "挂起",
                type: "warning"
            },
            {
                value: '废弃',
                label: '废弃',
                button: false,
                type: "warning"
            },
        ]
    };
    /*
    *
    * todo 商机单模块的 各个渠道 系统配置了
    * */

    /*var businessAllChannel = {
        infoFlow: [{
            value: '信息流',
            label: '信息流'
        }, {
            value: '信息流_百度',
            label: '信息流_百度'
        }, {
            value: '信息流_飞鱼',
            label: '信息流_飞鱼'
        }, {
            value: '信息流_其他',
            label: '信息流_其他'
        }],
        breathe: [{
            value: '终端外呼',
            label: '终端外呼'
        }],
        distribution: [{
            value: '分销',
            label: '分销'
        }],
        tenHao: [{
            value: '万号',
            label: '万号'
        }],
        tmall: [{
            value: '电商平台',
            label: '电商平台'
        }]
    };*/
    /*
    * todo 商机单模块的 各个广告主
    * */
    var businessAllAdvertiser = {
        infoFlow: [
            {label: '百度呼入', value: '百度呼入'},
            {label: '百度杭州合讯', value: '百度杭州合讯'},
            {label: '百度浙江睿通', value: '百度浙江睿通'},
            {label: '百度宁波睿通', value: '百度宁波睿通'},
            {label: '杭州合讯科技有限公司-5', value: '杭州合讯科技有限公司-5'},
            {label: '浙江睿通通讯2021-1', value: '浙江睿通通讯2021-1'},
            {label: '睿通通信A', value: '睿通通信A'},
            {label: '浙江博基通信设备有限公司', value: '浙江博基通信设备有限公司'},
            {label: '网站', value: '网站'}
        ],
        // 终端外呼、分销、万号 无广告主
        oneBroadband: [],
        breathe: [],
        distribution: [],
        tenHao: [],
        tmall: [/*{
            value: '众诚天猫',
            label: '众诚天猫'
        }, {
            value: '众诚京东',
            label: '众诚京东'
        }, {
            value: '众诚拼多多',
            label: '众诚拼多多'
        }, {
            value: '闲鱼',
            label: '闲鱼'
        }*/]
    };
    /*
    * todo 商机单的 处理状态
    * */
    var businessStatus = {
        select: [{
            value: '待外呼',
            label: '待外呼'
        }, {
            value: '待二次外呼',
            label: '待二次外呼'
        }, {
            value: '营销失败',
            label: '营销失败'
        }, {
            value: '营销成功',
            label: '营销成功'
        }, {
            label: "挂起",
            value: "挂起"
        }],
        failure: [{
            value: '营销失败',
            label: '营销失败',
            children: [{
                value: '无意向下单',
                label: "无意向下单"
            }, {
                value: '纯咨询',
                label: "纯咨询"
            }, {
                value: '老融改套',
                label: "老融改套"
            }, {
                value: '老宽续费',
                label: "老宽续费"
            }, {
                value: '商用地址',
                label: "商用地址"
            }, {
                value: '价格贵',
                label: "价格贵"
            }, {
                value: '重复提交',
                label: "重复提交"
            }, {
                value: '空号',
                label: "空号"
            }, {
                value: '多次无人接听',
                label: "多次无人接听"
            }]
        }, {
            value: '待二次外呼',
            label: '待二次外呼',
            children: [{
                label: '多次无人接听',
                value: '多次无人接听'
            }, {
                label: '要求稍后联系',
                value: '要求稍后联系'
            }]
        }, {
            label: "营销成功",
            value: '营销成功'
        }, {
            label: "待外呼",
            value: '待外呼'
        }, {
            label: "挂起",
            value: "挂起"
        }]
    };

    /*
    * todo 广告主  废弃
    * */
    /*
    * todo 默认 信息流的流
    * */
    var businessDefaultFlow = {
        "infoFlow": "信息流工单", // 信息流
        "oneBroadband": "信息流工单", // 单宽维系
        "breathe": "终端外呼订单流", // 终端外呼
        "distribution": "分销商机单工单模板", // 分销商
        "tmall": "天猫工单模板", // 天猫
        "tenHao": "10000号订单流（无需质检）" // 万号
    };
    /*
    * todo 信息流 渠道 设置
    * */
    var businessDefaultChannel = {
        "infoFlow": { // 信息流
            default: "信息流",     // 导入数据 默认的一级渠道
            channelArr: ["信息流"]  // 展示的一级渠道
        },
        "oneBroadband": {
            default: "存量维系",
            channelArr: ["存量维系"]
        },
        // 终端外呼
        "breathe": {
            default: "终端外呼",
            channelArr: ["终端外呼"]
        },
        // 分销商
        "distribution": {
            default: "分销",
            channelArr: ["分销"]
        },
        // 电商平台
        "tmall": {
            default: "电商平台",
            channelArr: ["电商平台"]
        },
        // 万号
        "tenHao": {
            default: "万号",
            channelArr: ["万号"]
        }
    }
    /*
    * todo 工单状态 及其 流转按钮
    * */

    var publicOrderStatus = [
        /*
        *
        * 待核实
        * 待受理
        * 已受理（修改为  待反刷）
        * 待处理
        * 已提交
        * 成功订单
        * 竣工异常
        * 处理失败
        * 业务员挂起
        * 受理员挂起
        * 待财务质检
        * 待图片质检
        * 待录音质检
        * 已清空
        * 废弃
        * */
        {
            value: '待核实',
            label: '待核实',
            button: true,
            role: undefined
        },
        {
            value: '待受理',
            label: '待受理',
            button: true,
            role: undefined
        },
        {
            value: '待反刷',
            label: '待反刷',
            button: false,
            role: undefined
        },

        {
            value: '待处理',
            label: '待处理',
            button: false,
            role: undefined
        },
        {
            value: '已提交',
            label: '已提交',
            button: true,
            role: undefined
        },
        {
            value: '成功订单',
            label: '成功订单',
            button: true,
            role: undefined
        },

        {
            value: '竣工异常',
            label: '竣工异常',
            button: false,
            role: undefined
        },

        {
            value: '处理失败',
            label: '处理失败',
            button: false,
            role: undefined
        },
        {
            value: '业务员挂起',
            label: '业务员挂起',
            button: true,
            role: undefined
        },
        {
            value: '受理员挂起',
            label: '受理员挂起',
            button: true,
            role: undefined
        },


        {
            value: '待财务质检',
            label: '待财务质检',
            button: true,
            role: undefined
        },
        {
            value: '待图片质检',
            label: '待图片质检',
            button: true,
            role: undefined
        },
        {
            value: '待录音质检',
            label: '待录音质检',
            button: true,
            role: undefined
        },
        {
            value: '待自动受理',
            label: '待自动受理',
            button: true,
            role: undefined
        },
        {
            value: '已清空',
            label: '已清空',
            button: true,
            role: undefined
        },
        {
            value: '废弃',
            label: '废弃',
            button: true,
            role: undefined
        },
        {
            value: '重复工单',
            label: '重复工单',
            button: true,
            role: undefined
        },
    ];

    var getButton = function getButton() {
        var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var allButton = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : publicOrderStatus;
        var buttonArr = [];
        allButton.forEach(function (value) {
            if (~array.indexOf(value.value)) {
                buttonArr.push(value);
            }
        });
        return buttonArr;
    };

    var removeButton = function removeButton(notArr, allButton) {
        var buttonArr = [];
        allButton.forEach(function (value) {
            if (!~notArr.indexOf(value.value)) {
                buttonArr.push(value);
            }
        });
        return buttonArr;
    };

    var publicOrderStatusButton = function publicOrderStatusButton() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            username = _ref.username,
            phone = _ref.phone,
            department = _ref.department,
            role = _ref.role;

        var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
        var that = arguments.length > 2 ? arguments[2] : undefined;
        var button = [];

        if (~role.indexOf("受理员")) {
            // 受理员的按钮
            button = ["待核实", "成功订单", "受理员挂起"];
        } else if (~role.indexOf("业务员")) {
            // 业务员的按钮
            button = ["待财务质检", "待图片质检", "待录音质检", "待受理", "业务员挂起", "废弃", "重复工单"];
        } else {
            // 其他
            button = ['待核实', '待受理', '废弃', '成功订单', '待录音质检', "业务员挂起", "受理员挂起", '待财务质检', '待图片质检','待自动受理'];
        }

        var button2 = [];
        /*if (status !== "待核实") {
            button2 = ["废弃"]
        }*/

        if (!~["业务员挂起", "待核实"].indexOf(status)) {
            button2 = ["废弃"];
        }

        return removeButton(button2, getButton(button));
    };
    // 订单状态
    var orderStatus = {
        /*
        * 下拉状态
        * */
        select: publicOrderStatus, // 查询下拉 状态 及 流转

        /*
        * 流转按钮
        * */
        button: publicOrderStatusButton // 二级弹窗按钮
    };
    /*
    * todo 订单流下拉
    * */

    var orderFlow = {
        list: publicOrderStatus
    };

    // todo 综合 渠道和广告主
    /*var channelSelect = _busSetToArr(businessAllChannel),*/
    var advertiserList = _busSetToArr(businessAllAdvertiser);
    //todo  新增 渠道
    /*channelSelect.push({
        label: '天猫旗舰店',
        value: '天猫旗舰店',
    });
    channelSelect.push({
        label: '万号_导入',
        value: '万号_导入',
    });
    channelSelect.push({
        label: '短信',
        value: '短信',
    });*/
    return {
        c3List: c3List,
        allCity: allCity,
        product_config_parsing: product_config_parsing,
        product_config_select: product_config_select,
        // todo 商机单
        businessAllAdvertiser: businessAllAdvertiser,
        businessAllChannel: [],
        businessAllStatus: businessAllStatus,
        businessAllMarketing: businessAllMarketing,
        businessStatus: businessStatus,
        orderStatus: orderStatus,
        orderFlow: orderFlow,
        channelSelect: [],
        advertiserList: advertiserList,
        payMethod: payMethod,
        packageChange: packageChange,
        /*todo 商机单信息*/
        businessData: {
            queryOption: function queryOption() {
                var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                    that = _ref.that,
                    _ref$cityDict = _ref.cityDict,
                    cityDict = _ref$cityDict === void 0 ? [] : _ref$cityDict,
                    _ref$serviceSelect = _ref.serviceSelect2,
                    serviceSelect2 = _ref$serviceSelect === void 0 ? [] : _ref$serviceSelect,
                    _ref$type = _ref.type,
                    type = _ref$type === void 0 ? '' : _ref$type,
                    _ref$Channel = _ref.channelDict,
                    channelDict = _ref$Channel === void 0 ? [] : _ref$Channel;
                var queryArr = [
                    {
                        label: "商机单编号",
                        type: "input",
                        field: "id",
                        value: "",
                        show: true
                    },
                    {
                        label: "客户姓名",
                        field: "customerName",
                        type: "input",
                        value: "",
                        show: true
                    }, {
                        label: "身份证号",
                        field: "idCard",
                        type: "input",
                        value: "",
                        show: true
                    }, {
                        label: "联系电话",
                        field: "phone",
                        type: "input",
                        value: "",
                        show: true
                    }, {
                        label: "业务员",
                        type: "select",
                        field: "servicename",
                        value: that.pageData.type === 'breathe' ? "所有人" : "",
                        show: that.pageRight === 'management' || that.pageRight === 'managementB' || that.pageRight === 'oneBroadband',
                        selectList: serviceSelect2
                    }, {
                        label: "业务号码",
                        field: "broadband",
                        type: "input",
                        value: "",
                        show: true
                    }, {
                        label: "地市",
                        field: "area",
                        type: "cascader",
                        value: [],
                        show: true,
                        cascaderList: cityDict,
                        cascaderProps: {
                            emitPath: true,
                            expandTrigger: "hover",
                            checkStrictly: true
                        }
                    }, {
                        label: "营销结果",
                        field: "statos",
                        type: "select",
                        value: "",
                        // show: !(type === 'tenHao' || type === 'distribution'),
                        show: true,
                        selectList: businessAllMarketing[type]
                    }, {
                        label: "渠道",
                        field: "channel",
                        type: "cascader",
                        value: [],
                        show: true,
                        cascaderList: channelDict,
                        cascaderProps: {
                            emitPath: true,
                            expandTrigger: "hover",
                            checkStrictly: true
                        }
                    }, {
                        label: "广告主",
                        field: "nameofadvertiser",
                        type: "select",
                        value: '',
                        show: !!businessAllAdvertiser[type].length,
                        selectList: businessAllAdvertiser[type]
                    }, {
                        label: type === 'infoFlow' || type === 'distribution' || type === 'oneBroadband' ? "下单时间" : "创建时间",
                        field: "orderTime",
                        type: "daterange",
                        value: [new Date(), new Date()],
                        isToday: true,
                        show: true
                    }, {
                        label: "二级营销",
                        field: "failure",
                        type: "select",
                        value: '',
                        show: !!~['infoFlow', 'breathe', 'oneBroadband'].indexOf(type) && that.pageRight !== 'all' && that.pageRight !== 'allB',
                        selectList: [
                            {
                                label: '多次无人接听',
                                value: '多次无人接听'
                            }, {
                                label: '要求稍后联系',
                                value: '要求稍后联系'
                            }
                        ]
                    }, {
                        label: "订单状态",
                        field: "isOrder",
                        type: "select",
                        value: "",
                        show: that.pageRight !== 'all' && that.pageRight !== 'allB',
                        selectList: [
                            {
                                label: '待提交',
                                value: 9
                            }
                        ]
                    },
                    {
                        label: "预约时间",
                        field: "appointment",
                        type: "daterange",
                        value: [],
                        isToday: false,
                        show: (type === 'infoFlow' || type === 'oneBroadband') && that.pageRight !== 'all' && that.pageRight !== 'allB'
                    },
                    {
                        label: "跟踪时间",
                        field: "tailafter",
                        type: "daterange",
                        value: [],
                        isToday: false,
                        show: (type === 'infoFlow' || type === 'oneBroadband') && that.pageRight !== 'all' && that.pageRight !== 'allB'
                    },
                ];
                var other = [];
                switch (type) {
                    case 'tmall':
                        other = [{
                            label: "天猫订单号",
                            field: "tmallId",
                            type: "input",
                            value: "",
                            show: true
                        }];
                        break;
                    case 'tenHao':
                        other = [{
                            label: "产品名称",
                            field: "accept",
                            type: "input",
                            value: "",
                            show: true
                        }];
                        break;
                    default:
                        break;
                }
                return [].concat(queryArr, _toConsumableArray(other));
            },
            businessDefaultFlow,
            businessDefaultChannel,
            businessAcceptType
        },
        /*
        * todo 工单信息
        * */
        orderQuery: {
            queryOption: function queryOption() {
                var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                    that = _ref2.that,
                    _ref2$cityDict = _ref2.cityDict,
                    cityDict = _ref2$cityDict === void 0 ? [] : _ref2$cityDict,
                    _ref2$serviceSelect = _ref2.serviceSelect2,
                    serviceSelect2 = _ref2$serviceSelect === void 0 ? [] : _ref2$serviceSelect,
                    _ref2$acceptSelect = _ref2.acceptSelect2,
                    acceptSelect2 = _ref2$acceptSelect === void 0 ? [] : _ref2$acceptSelect,
                    _ref2$Channel = _ref2.channelDict,
                    channelDict = _ref2$Channel === void 0 ? [] : _ref2$Channel;

                return [{
                    label: "订单编号",
                    type: "input",
                    field: "id",
                    value: ""
                }, {
                    label: "下单时间",
                    field: "orderTime",
                    type: "daterange",
                    value: [new Date(), new Date()],
                    isToday: true
                }, {
                    label: "未竣工",
                    field: "completion",
                    type: "datetimerange",
                    value: [],
                    isToday: true
                }, {
                    label: "客户名称",
                    field: "customerName",
                    type: "input",
                    value: ""
                }, {
                    label: "身份证号",
                    field: "idCard",
                    type: "input",
                    value: ""
                }, {
                    label: "联系电话",
                    field: "phone",
                    type: "input",
                    value: ""
                }, {
                    label: "业务号码",
                    field: "businessNumber",
                    type: "input",
                    value: ""
                }, {
                    label: "地市",
                    field: "area",
                    type: "cascader",
                    value: [],
                    show: true,
                    cascaderList: cityDict,
                    cascaderProps: {
                        emitPath: true,
                        expandTrigger: "hover",
                        checkStrictly: true
                    }
                }, {
                    label: "订单状态",
                    field: "states",
                    type: "select",
                    value: "",
                    selectList: publicOrderStatus
                },
                    /*
                    * todo 工单渠道
                    * */
                    {
                        label: "渠道",
                        field: "channel",
                        type: "cascader",
                        value: [],
                        show: true,
                        cascaderList: channelDict,
                        cascaderProps: {
                            emitPath: true,
                            expandTrigger: "hover",
                            checkStrictly: true
                        }
                    },
                    // {
                    //     label: "渠道",
                    //     field: "channel",
                    //     type: "select",
                    //     value: '',
                    //     show: true,
                    //     selectList: channelDict,
                    // },
                    {
                        label: "受理员",
                        field: "assignName",
                        type: "select",
                        value: '',
                        show: !that.$util.poolLimit(that.userInfo).AssignName,
                        selectList: acceptSelect2
                    }, {
                        label: "业务员",
                        field: "serverName",
                        type: "select",
                        value: '',
                        show: !that.$util.poolLimit(that.userInfo).ServerName,
                        selectList: serviceSelect2
                    }, {
                        label: "受理单号",
                        field: "orderNo7",
                        type: "input",
                        value: ''
                    }, {
                        label: '商品名称',
                        field: "productName",
                        type: "input",
                        value: ''
                    }, {
                        label: "是否导单",
                        field: "importOrder",
                        type: "select",
                        value: "",
                        show: false,
                        selectList: [{
                            value: '是',
                            label: '是'
                        }, {
                            value: '否',
                            label: '否'
                        }]
                    }, {
                        label: "是否异常",
                        field: "abnormal",
                        type: "select",
                        value: "",
                        selectList: [{
                            value: '1',
                            label: '是'
                        }, {
                            value: '0',
                            label: '否'
                        }]
                    }];
            }
        }
    };
}
