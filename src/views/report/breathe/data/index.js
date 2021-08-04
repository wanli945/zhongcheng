
//  外呼 产品信息
export const getInfoArr = async (that) => {
    const {entry} = await that.$axios.post("terminal_queryByProd");
    let proArr = []
    entry.forEach(value => {
        proArr.push({
            value:value,
            label:value,
        })
    })
    // console.log(proArr)
    return proArr

}

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
    pickerOptions,
    echertOptions,
    dataZoom,
    getInfoArr
}


