const QueryOption = {
    field: "",
    label: "",
    type: "input" || "select" || "daterange" || "cascader",
    value: "",
    selectList: [
        {value: '舟山市', label: '舟山市'}
    ],
    isToday: false,
    format: "yyyy-MM-dd",
    valueFormat: "yyyy-MM-dd",
    cascaderList: [
        {
            value: '指南',
            label: '指南',
            children: [{
                value: '一致',
                label: '一致'
            }, {
                value: '反馈',
                label: '反馈'
            }, {
                value: '效率',
                label: '效率'
            }, {
                value: '可控',
                label: '可控'
            }]
        }
    ],
}
