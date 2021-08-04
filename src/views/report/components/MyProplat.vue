<!--
 万号 子 模块
-->
<template>
    <div style="margin-bottom: 10px">
        <div
            style="display: flex;justify-content: space-between;height: 50px;align-items: flex-start">
            <slot name="title">
                <h5 :style="titleStyle">{{title}}</h5>
            </slot>
            <slot name="center"></slot>
            <div style="display: flex;justify-content: flex-end;align-items: center">
                <slot name="left"></slot>

                <div style="display: flex;justify-content: space-between;margin-left: 20px">
                    <template>
                        <el-button type="primary"  style="margin-right:10px;"
                                   @click="clickButton">全部
                        </el-button>
                        <el-select clearable v-model="options.products" style="width: 300px" @change="selechange" placeholder="请选择">
                            <template v-for="(item,index) in productArr">
                                <el-option :value="item.value" :label="item.label" :key="index"
                                ></el-option>
                            </template>
                        </el-select>
                    </template>
                </div>
                <slot name="right"></slot>
            </div>
        </div>
        <slot name="content"></slot>
    </div>
</template>

<script>
    import MyXiaZai from "./myXiaZai";

    export default {
        name: "MyProplat",
        components: {MyXiaZai},
        props: {
            title: String,
            titleStyle: {
                type: String,
                default: "font-size: 20px;line-height:50px;font-weight: bold;color:#000;align-self:flex-start"
            },

        },
        data() {
            return {
                options: {
                    products: ''
                },
                productArr:[]
            }
        },
        mounted() {
        },
        methods: {
            generate(buttonArr = []) {
                let ms = [];
                buttonArr && buttonArr.forEach((item, index1) => {
                    ms.push(item);
                });
                this.productArr = ms;
            },
            clickButton() {
                this.options.products = ''
                this.$emit('choose');
            },
            selechange(e) {
                this.$emit('seleChange',e)
            }
        }
    }
</script>
