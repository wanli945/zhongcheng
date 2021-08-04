<!--
 --@IDE      : WebStorm
 --@time     : 2021/2/1 15:39
 --@author   : 李艳鹏
 --@Software : app
 --@File     : MyTitle
 --@describe : describe
   信息流
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
                <el-button-group
                    style="display: flex;justify-content: space-between;margin-left: 20px">
                    <template v-for="(item,index) in buttonArr_">
                        <el-button :type="item.type || undefined" :key="index" :style="buttonStyle"
                                   @click="clickButton(index,item)">
                            {{item.name}}
                        </el-button>
                    </template>
                </el-button-group>
                <slot name="right"></slot>
            </div>
        </div>
        <slot name="content"></slot>
    </div>
</template>

<script>
    import MyXiaZai from "./myXiaZai";

    export default {
        name: "MyPlat",
        components: {MyXiaZai},
        props: {
            title: String,
            titleStyle: {
                type: String,
                default: "font-size: 20px;line-height:50px;font-weight: bold;color:#000;align-self:flex-start"
            },
            buttonStyle: {
                type: String,
                default: "margin-right:10px"
            }
        },
        data() {
            return {
                buttonArr_: [],
            }
        },
        mounted() {
        },
        methods: {
            // 当前 按钮变样式
            generate(buttonArr = []) {
                let ms = [];
                buttonArr && buttonArr.forEach((item, index1) => {
                    ms.push(Object.assign({}, item, {
                        type: index1 === 0 ? 'primary' : undefined
                    }));
                });
                this.buttonArr_ = ms;
            },
            // 按钮 点击 改变样式
            clickButton(index, item) {
                this.buttonArr_.forEach((item, index1) => {
                    this.$set(this.buttonArr_[index1], 'type', undefined);
                });
                this.$set(this.buttonArr_[index], 'type', 'primary');
                this.$emit('choose', item);
            }
        }
    }
</script>
