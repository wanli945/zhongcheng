<!--
 --@IDE      : WebStorm
 --@time     : 2021/2/4 17:10
 --@author   : 李艳鹏
 --@Software : app
 --@File     : canvasGetCode
 --@describe : describe
-->
<template>
    <canvas ref="canvas" style="background-color: transparent"></canvas>
</template>

<script>
    export default {
        name: "canvasGetCode",
        props: {},
        data() {
            return {
                canvas: null,
                show_num: []
            }
        },
        mounted() {
            this.canvas = this.$refs["canvas"];
        },
        methods: {
            randomColor() {
                const r = Math.floor(Math.random() * 256);
                const g = Math.floor(Math.random() * 256);
                const b = Math.floor(Math.random() * 256);
                return "rgb(" + r + "," + g + "," + b + ") "
            },
            draw(code) {
                this.show_num = code.split("");
                let canvas_clientWidth = this.canvas.clientWidth//画布长度
                let canvas_clientHeight = this.canvas.clientHeight//画布高度
                let context = this.canvas.getContext("2d")//画布环境 创建 context 对象
                this.canvas.width = canvas_clientWidth
                this.canvas.height = canvas_clientHeight
                let sLength = code.length;//数组长度
                for (let i = 0; i < sLength; i++) {
                    let text = this.show_num[i];
                    let deg = Math.random() * 30 * Math.PI / 180;//0-30随机弧度
                    let x = 10 + i * 20//x坐标
                    let y = 20 + Math.random() * 8//y坐标
                    //位移 旋转角度 颜色 文字 样式开始位置
                    context.font = 'bold 23px 微软雅黑'
                    context.translate(x, y);
                    context.rotate(deg);
                    context.fillStyle = this.randomColor();
                    context.fillText(text, 0, 0)
                    context.rotate(-deg)
                    context.translate(-x, -y)
                }
                //验证码显示小点
                for (let i = 0; i <= 30; i++) {
                    context.strokeStyle = this.randomColor()//设置随机色用小点的颜色
                    context.beginPath();//开始一条路径
                    let m = Math.random() * canvas_clientWidth;
                    let n = Math.random() * canvas_clientHeight;
                    context.moveTo(m, n)//移动
                    context.lineTo(m + 1, n + 1);//添加一个新点，然后在画布中创建从该点到最后指定点的线条
                    context.stroke();//画上面定义好的路径
                }
                //验证码显示线条
                for (let i = 0; i < 8; i++) {
                    context.strokeStyle = this.randomColor()
                    context.beginPath()
                    context.moveTo(Math.random() * canvas_clientWidth, Math.random() * canvas_clientHeight);
                    context.lineTo(Math.random() * canvas_clientWidth, Math.random() * canvas_clientHeight)
                    context.stroke()
                }
            },
            init(code) {
                this.draw(code);
            },
        },
    }
</script>

<style scoped>

</style>
