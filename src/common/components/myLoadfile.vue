<template>
    <el-button :type="type" :size="size" :disabled="disabled" :plain="plain" :round="round"
               :icon="icon"
               @click="downLoad"
               :circle="circle">
        <slot name="default"></slot>
    </el-button>
</template>
<!--下载文件封装  a链接-->
<script>
    export default {
        name: "myLoadfile",
        props: {
            type: {
                type: String,
                default: "primary"
            },
            size: {
                type: String,
                default: "medium"
            },
            disabled: {
                type: Boolean,
                default: false
            },
            plain: {
                type: Boolean,
                default: false
            },
            circle: {
                type: Boolean,
                default: false
            },
            round: {
                type: Boolean,
                default: false
            },
            icon: {
                type: String,
                default: ""
            },
            href: {
                type: String,
                required: true
            }
        },
        methods: {
            downLoad() {
                const box = document.querySelector("#downloadFileBox");
                box.innerHTML = "";
                const elink = document.createElement("a");
                elink.href = this.href;
                elink.style.display = "none";
                box.appendChild(elink);
                elink.click();
                setTimeout(() => {
                    box.innerHTML = "";
                });
            }
        }
    }
</script>

<style scoped>

</style>
