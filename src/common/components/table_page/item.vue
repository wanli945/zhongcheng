<template>
    <div class="param" v-if="show">
        <span v-if="hasSpan">{{label}} ：</span>
        <!--
        输入框
        -->
        <template v-if="type==='input'">
            <el-input autocomplete="on" :clearable="clearable"
                      :disabled="disabled"
                      :placeholder="required?'必填项':placeholder"
                      :value="value" @input="(dd)=>{$emit('change',dd,index)}"></el-input>
        </template>
<!-- 数字 -->
        <template v-if="type==='number'">
            <el-input autocomplete="on" :clearable="clearable" type="number" :disabled="disabled"
                      :placeholder="required?'必填项':placeholder"
                      :value="value" @input="(dd)=>{$emit('change',dd,index)}" class="deal"></el-input>
        </template>

<!-- 文本域 -->
        <template v-if="type==='textarea'">
            <el-input autocomplete="on" :clearable="clearable" type="textarea" :disabled="disabled"
                      :placeholder="required?'必填项':placeholder"
                      :autosize="{ minRows: 2, maxRows: 10 }"
                      :value="value" @input="(dd)=>{$emit('change',dd,index)}"></el-input>
        </template>


        <!--
        下拉选择
        -->
        <template v-else-if="type==='select'">
            <el-select :disabled="disabled" :value="value" @change="(dd)=>$emit('change',dd,index)"
                       :clearable="clearable"
                       :placeholder="required?'必填项':placeholder" :filterable="filterable">
                <template v-for="(item,index) in selectList">
                    <el-option
                        :disabled="!!item.disabled"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                        {{item.label}}
                    </el-option>
                </template>
            </el-select>
        </template>
        <!--
        日期选择器  选择日期范围
        -->
        <template v-else-if="type==='daterange'">
            <el-date-picker
                :value="value"
                :editable="false"
                type="daterange"
                :picker-options="pickerOptions"
                range-separator="至"
                :time-arrow-control="true"
                @change="change"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
                value-format="[yyyy-MM-dd,yyyy-MM-dd]"
                :disabled="disabled"
                :clearable="clearable"
                align="center">
            </el-date-picker>
        </template>
<!-- 以 日 为基本单位 日期选择器-->
        <template v-else-if="type==='date'">
            <el-date-picker
                :value="value"
                type="date"
                @input="changeDate"
                :picker-options="hasDatepickerOptions?datepickerOptions:[]"
                :placeholder="required?'必填项':placeholder"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :clearable="clearable"
            >
            </el-date-picker>
        </template>
                 <!-- 预约时间 -->
        <template v-else-if="type==='datetimerange'">
            <el-date-picker
                :value="value"
                :editable="false"
                type="datetimerange"
                :picker-options="pickerOptions2"
                range-separator="至"
                :time-arrow-control="true"
                @change="change"
                popper-class="noShowClear"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :disabled="disabled"
                :clearable="clearable"
                align="center">
            </el-date-picker>
        </template>
<!--  年月日 时分秒 -->
        <template v-else-if="type==='datetime'">
            <el-date-picker
                :value="value"
                type="datetime"
                @input="changeDate"
                :picker-options="hasDatepickerOptions?datepickerOptions:[]"
                :placeholder="required?'必填项':'选择日期'"
                default-time="00:00:00"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                :clearable="clearable"
            >
            </el-date-picker>
        </template>
        <!--
        级联选择
        -->
        <template v-else-if="type==='cascader'">
            <el-cascader
                :options="cascaderList"
                :props="cascaderProps"
                :value="value"
                :clearable="clearable"
                :show-all-levels="showAllLevels"
                @change="changeCascader"
                :disabled="disabled"
                :placeholder="required?'必填项':'未选择'"
                separator="-"
                :filterable="filterable"
            ></el-cascader>
        </template>
                <!-- 开关  -->
        <template v-else-if="type==='switch'">
            <el-switch
                :value="value"
                @change="(dd)=>$emit('change',dd,index)"
                :inactive-value="switchBox.inactiveValue"
                :active-value="switchBox.activeValue"
                :inactive-text="switchBox.inactiveText"
                :active-text="switchBox.activeText"
                :width="switchBox.width"
                :clearable="clearable"
            >

            </el-switch>
        </template>

        <template v-else>
            <slot name="other"></slot>
        </template>
    </div>
</template>

<script>
    export default {
        name: "queryOptionItem",

        props: {
            /*
            * 字段名称
            * */
            /*        field: {
                        type: String,
                        required: true
                    },*/
            clearable: {
                type: Boolean,
                default: true
            },
            show: {
                type: Boolean,
                default: true
            },
            type: {
                type: String,
                default: "input"
            },
            placeholder: {
                type: String,
                default: "请输入"
            },
            hasSpan: {
                type: Boolean,
                default: true
            },
            index: {},
            label: {
                type: String,
            },
            value: {
                required: true,
            },
            selectList: {
                type: Array,
                default() {
                    return []
                }
            },
            filterable: {
                type: Boolean,
                default: true
            },
            isToday: {
                type: Boolean,
                default: true
            },
            cascaderArr: {
                type: Boolean,
                default: true
            },
            switchBox: {
                type: Object,
                default() {
                    return {
                        activeText: "",
                        inactiveText: "",
                        width: 40,
                        activeValue: true,
                        inactiveValue: false
                    }
                }
            },


            cascaderList: {
                type: Array,
                default() {
                    return []
                }
            },

            disabled: {
                type: Boolean,
                default: false
            },

            showAllLevels: {
                type: Boolean,
                default: false
            },

            cascaderProps: {
                type: Object,
                default() {
                    return {
                        emitPath: true,
                        expandTrigger: "hover"
                    }
                }
            },
            required: {
                type: Boolean,
                default: false
            },
            hasDatepickerOptions: {
                type: Boolean,
                default: true
            },
            pickerOption: {
                type: [Object, undefined],
                default: undefined
            }
        },
        model: {
            prop: "value",
            event: "change"
        },
        data() {
            let event = 'input'
            if (this.type === 'select') event = 'change';
            const pickerOptions2 = {
                shortcuts: [
                    {
                        text: '24小时',
                        onClick: (picker) => {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', [start, end]);
                            this.$emit("change", [start, end], this.index)
                        }
                    },
                    {
                        text: '48小时',
                        onClick: (picker) => {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
                            picker.$emit('pick', [start, end]);
                            this.$emit("change", [start, end], this.index)
                        }
                    },
                    {
                        text: '72小时',
                        onClick: (picker) => {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
                            picker.$emit('pick', [start, end]);
                            this.$emit("change", [start, end], this.index)
                        }
                    },
                    {
                        text: '96小时',
                        onClick: (picker) => {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 4);
                            picker.$emit('pick', [start, end]);
                            this.$emit("change", [start, end], this.index)
                        }
                    },
                ],
                disabledDate: (now) => {
                    return this.isToday && now.valueOf() > Date.now().valueOf();
                },
                onPick: ({maxDate, minDate}) => {
                    if (maxDate && minDate) {
                        this.$emit("change",
                            [minDate, maxDate],
                            this.index)
                    }
                }
            }

            return {
                event,
                pickerOptions2: this.pickerOption || pickerOptions2,
                pickerOptions: this.pickerOption || {
                    shortcuts: [
                        {
                            text: '今天',
                            onClick: (picker) => {
                                const end = new Date();
                                const start = new Date();
                                picker.$emit('pick', [start, end]);
                                this.$emit("change",
                                    [start, end],
                                    this.index)
                            }
                        },
                        {
                            text: '最近一周',
                            onClick: (picker) => {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', [start, end]);
                                this.$emit("change", [start, end], this.index)
                            }
                        },
                        {
                            text: '最近一个月',
                            onClick: (picker) => {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit('pick', [start, end]);
                                this.$emit("change", [start, end], this.index)
                            }
                        },
                        {
                            text: '最近三个月',
                            onClick: (picker) => {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                picker.$emit('pick', [start, end]);
                                this.$emit("change", [start, end], this.index)
                            }
                        },
                    ],
                    disabledDate: (now) => {
                        return this.isToday && now.valueOf() > Date.now().valueOf();
                    },
                    onPick: ({maxDate, minDate}) => {
                        if (maxDate && minDate) {
                            this.$emit("change",
                                [minDate, maxDate],
                                this.index)
                        }
                    }
                },
                datepickerOptions: this.pickerOption || {
                    shortcuts: [{
                        text: '今天',
                        onClick: (picker) => {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick: (picker) => {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick: (picker) => {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }],
                    disabledDate: (now) => {
                        return this.isToday && now.valueOf() > Date.now().valueOf();
                    }
                }
            }
        },
        mounted() {

        },
        methods: {
            changeDate(rest) {
                this.$emit("change", rest || '', this.index)
            },
            change(d) {
                if (!d) {
                    this.$emit("change", ["", ""], this.index)
                }
            },
            changeCascader(value) {
                if (this.cascaderArr) {
                    this.$emit("change", value, this.index)
                } else {
                    if (value && value.length) {
                        this.$emit("change", value[value.length - 1], this.index)
                    } else {
                        this.$emit("change", "", this.index)
                    }
                }
            }
        }
    }
</script>
<style lang="less">
    .noShowClear .el-picker-panel__footer {
        button:first-child {
            display: none !important;
        }
    }
    .deal::-webkit-outer-spin-button,
    .deal::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    .deal[type="number"] {
        -moz-appearance: textfield;
    }
</style>
<style scoped lang="less">
    .param {
        display: flex;
        width: 25%;
        font-size: 16px;
        align-items: center;
        margin-bottom: 10px;
        height: 40px;

        span {
            width: 28.6%;
            text-align: right;
            white-space: pre;
        }

        & > div {
            width: 71.4%;
        }
    }
</style>
