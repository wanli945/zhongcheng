
<template>
    <div>
        <div class="banner" @mouseover="stop" @mouseout="play">
            <img :src="v" v-for="(v,index) in imgList" :key="index" v-show="num==index" style="width: 100%"/>

            <div class="bannerCircle">
                <ul>
                    <li :class="num === index ? 'selected' : '' " v-for="(item,index) in imgList" :key="index"></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Banner",
        data() {
            return {
                num: 0,
                timer: ''
            }
        },
        props: {
            imgList: {
                type: Array,
            }
        },
        methods: {
            back() {
                this.num--;
                if(this.num < 0) {
                    this.num = this.imgList.length
                }
            },
            next() {
                this.num++;
                if(this.num === this.imgList.length) {
                    this.num = 0
                }
            },
            play() {
                this.timer = setInterval(this.next,2000)
            },
            stop() {
                clearInterval(this.timer)
            },
        },
        mounted() {
            this.play()
        },
        destroyed() {
            clearInterval(this.timer)
        }
    }
</script>

<style lang="less" scoped>
    .banner {
        position: relative;
        .bannerCircle {
            position: absolute;
            bottom: 5px;
            left: 0px;
            right: 0px;
            color: #fff;
            li {
            display: inline-block;
            background: rgba(0,0,0,.3);
            border-radius: 50%;
            padding: 5px;
            margin: 2px;
        }
            ul {
                text-align: center;
            }
            .selected {
                background: rgba(0,0,0,.8);
            }
            .left, .right{
                position:absolute;
                top:50%;
                transform:translateY(-50%);
                width:50px;
                height:50px;
                background-color:rgba(0,0,0,.3);
                border-radius:50%;
                cursor:pointer;
            }
            .left{
                left:3%;
                padding-left:12px;
                padding-top:10px;
            }
            .right{
                right:3%;
                padding-right:12px;
                padding-top:10px;
            }

        }
    }

</style>
