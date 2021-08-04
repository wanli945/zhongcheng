import Contextmenu from "vue-contextmenujs"
import ECharts from 'vue-echarts' // refers to components/ECharts.vue in webpack

require('echarts/lib/component/grid')
require('echarts/lib/chart/line')
require("echarts/lib/chart/bar")
require("echarts/lib/chart/pie")
require('echarts/lib/component/dataset')
require('echarts/lib/component/title')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/toolbox')
require('echarts/lib/component/dataZoom')
require('echarts/lib/scale/Scale')
// 修改 vue-echarts 库 导入全 echart
/*// import ECharts modules manually to reduce bundle size
import('echarts/lib/echarts')
// 引入折线图
import('echarts/lib/chart/line')
import('echarts/lib/chart/bar')
import('echarts/lib/chart/pie')//


// 引入提示框和title组件，图例
import('echarts/lib/component/tooltip')
import('echarts/lib/component/title')
import('echarts/lib/component/axis')
import('echarts/lib/component/axisPointer')
import('echarts/lib/component/radiusAxis')
import('echarts/lib/component/legend')
import('echarts/lib/component/legendScroll')//图例翻译滚动
import('echarts/lib/component/toolbox')
import('echarts/lib/component/toolbox/feature/Restore')
import('echarts/lib/component/toolbox/feature/DataView')
import('echarts/lib/component/toolbox/feature/DataZoom')
import('echarts/lib/component/dataZoom')
import('echarts/lib/component/grid')*/


export const mainContext = (Vue) => {
    Vue.component("v-echarts", ECharts) // refers to components/ECharts.vue in webpack
    Vue.use(Contextmenu);
}
