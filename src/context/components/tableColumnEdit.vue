<!--
 --@IDE      : WebStorm
 --@time     : 2021/3/19 17:39
 --@author   : 李艳鹏
 --@Software : app
 --@File     : tableColumnEdit
 --@describe : describe
-->
<template>
<!--    表格内 修改信息  -->
    <div class="tableColumnEdit">
        <div v-if="!edit" class="two"
             style="height: 26px;splay:inline-block;width: 90%;overflow: hidden;text-overflow: ellipsis;white-space:nowrap">
            {{value}}
        </div>
        <label v-if="!disabled" :style="{width: edit? '100%':'10%'}">
            <el-input v-if="edit" :type="type" :value="value" @blur.stop="submit"
                      style="width: 100%"
                      @input="(e)=>$emit('input', e,value)"></el-input>
            <i @click="edit = !edit"
               v-show="!edit"
               style="width: 10%;cursor: revert;height: 100%;font-size: 16px">
                <span class="el-icon-edit"></span>
            </i>
        </label>
    </div>
</template>

<script>
    export default {
        name: "tableColumnEdit",
        props: {

            value: {
                required: true,
            },

            type: {
                type: String,
                default: "input"
            },
            disabled: {
                type: Boolean,
                default: true
            },
            num: {
                type: Number,
                default: 12
            }
        },
        methods: {
            submit() {
                this.edit = false;
                this.$emit("submit");
            }
        },
        data() {
            return {
                edit: false,
            }
        },
        /*filters: {
            ellipsis({text = "", num = 10}) {
                if (!text || String(text).length <= num) {
                    return text
                } else {
                    return text.substring(0, num) + "..."
                }
            }
        }*/
    }
</script>

<style lang="less">
    .tableColumnEdit {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
</style>
