/*
 * @IDE      : WebStorm
 * @time     : 2021/2/3 13:55
 * @author   : 李艳鹏
 * @Software : app
 * @File     : index
 * @describe :
*/
//  万号 产品信息
export const getInfoArr = async (that) => {
    const {proList} = await that.$axios.post("tent_setSelect");
    let proArr = []
    proList.forEach(value => {
        proArr.push({
            value:value.product,
            label:value.product
        })
    })
    console.log(proArr)
    return proArr

}



export const channelArr = [
    {
        name: "全部",
        value: '全部'
    },
    {
        name: "信息流",
        value: '信息流'
    },
    {
        name: "渠道",
        value: '渠道'
    },
    {
        name: "万号",
        value: '万号'
    },
    {
        name: "电商",
        value: '电商'
    },
];

export const pickerOptions = {
    disabledDate(time) {
        return time.getTime() > Date.now();
    },
    shortcuts: [{
        text: '今天',
        onClick(picker) {
            picker.$emit('pick', new Date());
        }
    }, {
        text: '昨天',
        onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
        }
    }, {
        text: '一周前',
        onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
        }
    }]
};

export const echertOptions = {
    legend: {
        type: 'scroll',
        left: "left",
        top: 'top'
    },
    tooltip: {
        show: true, // 必须引入 tooltip 组件
        trigger: "axis",
        axisPointer: {
            type: 'cross'
        },
    },
    toolbox: {
        feature: {
            saveAsImage: {
                show: false,
            },
            restore: {
                show: true,
                title: '重置'
            },
        }
    },
    dataZoom: [
        {
            type: 'inside',
            show: true,
            rangeMode: ['percent', 'percent'],
            start: 0,
            end: 12,
            handleSize: 8,
            xAxisIndex: 0,
            zoomLock: false,
            orient: 'horizontal',
        }, {
            type: 'slider',
            show: true,
            rangeMode: ['percent', 'percent'],
            start: 0,
            end: 12,
            handleSize: 8,
            xAxisIndex: 0,
            zoomLock: false,
            orient: 'horizontal',
        },
    ]
};
export const dataZoom = (end) => {
    if (end >= 100) {
        return undefined
    } else {
        return [
            {
                type: 'inside',
                show: true,
                rangeMode: ['percent', 'percent'],
                start: 0,
                end: end,
                handleSize: 8,
                xAxisIndex: 0,
                zoomLock: false,
                orient: 'horizontal',
                moveOnMouseMove: true,
                preventDefaultMouseMove: false,
                zoomOnMouseWheel: false,
            }, {
                type: 'slider',
                show: true,
                rangeMode: ['percent', 'percent'],
                start: 0,
                end: end,
                xAxisIndex: 0,
                zoomLock: false,
                orient: 'horizontal',
                moveOnMouseMove: true,
                preventDefaultMouseMove: false,
                zoomOnMouseWheel: false,
            },
        ]
    }
}
export default {
    channelArr,
    pickerOptions,
    echertOptions,
    dataZoom,
    getInfoArr
}


