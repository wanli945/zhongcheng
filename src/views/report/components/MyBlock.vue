<!--
 --@IDE      : WebStorm
 --@time     : 2021/2/1 15:38
 --@author   : 李艳鹏
 --@Software : app
 --@File     : block
 --@describe : 块
-->
<template>
    <el-card
        style="padding: 16px 6px;box-sizing: border-box;cursor: pointer;margin-top: 10px"
        shadow="hover"
        body-style="padding:0">
        <div class="title">{{cardData_.title}}</div>
        <div class="total">{{cardData_.total}}</div>
        <div class="bottom">
            <div style="font-size: 16px">环比</div>
            <div style="margin-right: 40px;font-size: 14px" :style="{
                color:cardData_.trend==='line' ? '#000' : (cardData_.trend ==='up'?'rgb(255,0,0)':'rgb(0,168,0)')
            }" :class="cardData_.trend">
                {{cardData_.rate}}
                <template v-if="cardData_.trend==='line'">
                    <span>--</span>
                </template>
                <template v-else>
                    <span class="iconfont icon-up"
                          style="display: inline-block"
                          :style="cardData_.trend ==='down'?'transform: rotate(180deg)':''"></span>
                </template>
            </div>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "MyBlock",
        props: {
            cardData: {
                type: Object,
                default() {
                    return {
                        title: '商机单数',
                        total: '168',
                        rate: 0.445,
                        category: "business"
                    }
                }
            },
            statisticsTime: String,
            clickCard: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            cardData_() {
                let {title, total, rate, category} = this.cardData;
                let trend = "";
                let _rate = "";
                let _total = total;
                rate = parseFloat(rate);
                if (isNaN(rate) || rate === 0) {
                    trend = 'line';
                    _rate = '--'
                } else if (rate > 0) {
                    trend = 'up';
                    _rate = Math.abs(rate).toFixed(2) + '%'
                } else {
                    trend = 'down';
                    _rate = Math.abs(rate).toFixed(2) + '%'
                }

                if (total === undefined || total === null) {
                    _total = '--'
                }
                return {
                    title,
                    total: _total,
                    rate: _rate,
                    category,
                    trend
                }
            }
        },
        methods: {},
        filters: {
            sTime(value) {
                if (value === 'day' || value === 'today') return '日';
                if (value === 'month') return '月';
                if (value === 'week') return '周';
            }
        }
    }
</script>

<style scoped lang="less">
    .title {
        font-size: 16px;
    }

    .total {
        font-size: 30px;
        line-height: 40px;
    }

    .bottom {
        display: flex;
        justify-content: space-between;

        span.up {

        }
    }
</style>
