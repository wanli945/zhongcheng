// const Server = require("./server/develop")
const webpack = require("webpack")
// const path = require("path")
const CompressionWebpackPlugin = require("compression-webpack-plugin")

const productionGzipExtensions = ['js', 'css']

// 生产
const baseUrl = "http://183.129.155.90:8189/"

// 测试
// const baseUrl = "http://192.168.0.12:8089/"
// const baseUrl = "http://192.168.0.85:8089/"
// const baseUrl= "http://183.129.155.90:8189/"
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    // 可以配置CDN
    publicPath: './',
    // 打包生成的 文件名
    outputDir: 'dist',
    // 文件hash
    filenameHashing: process.env.NODE_ENV === "development",
    // 是否 eslint
    lintOnSave: "default",
    devServer: {
        host: "0.0.0.0",
        port: 8083,
        hot: true,
        watchContentBase: true,
        liveReload: true,
        disableHostCheck: true,
        compress: true,
        hotOnly: true,
        // before(app, server, compiler) {
        //     // Server(app, server, compiler)
        // },
        proxy: {
            "/a": {
                // target 要使用 Proxy 包装的目标
                target: baseUrl,
                timeout: 0,
                // secure 安全证书校验
                secure: false,
                // 是否改变域名   开启代理 不会有跨域问题
                changeOrigin: true,
            },
            "/b": {
                target: baseUrl,
                timeout: 0,
                changeOrigin: true,
                secure: false,
                //路径重写 以b 开头的定向到 /b，后面再拼接 接口路劲
                pathRewrite: {
                    '^/b': '/b'
                }
            },
            "/c": {
                target: baseUrl,
                timeout: 0,
                secure: false,
                changeOrigin: true,
            },
            "/d": {
                target: baseUrl,
                timeout: 0,
                secure: false,
                changeOrigin: true,
            },
            /* "/e": {
                 target: baseUrl2,
                 timeout: 0,
                 changeOrigin: true,
                 secure: false,
                /!* pathRewrite: {
                     '^/e': 'e'
                 },*!/
             },
             "/f": {
                 target: baseUrl ,
                 timeout: 0,
                 changeOrigin: true,
                 secure: false,
                /!* pathRewrite: {
                     '^/f': 'f'
                 },*!/
             },*/

            "/file": {
                target: 'http://192.168.0.253:8189/file/',
                // 是否启用websockets
                ws: false,
                secure: false,
                changeOrigin: true,
                timeout: 0,
                pathRewrite: {
                    '^/file': ''
                }
            },
            "/template": {
                target: 'http://192.168.0.253:8189/template/',
                ws: false,
                secure: false,
                changeOrigin: true,
                timeout: 0,
                pathRewrite: {
                    '^/template': ''
                }
            },
            "/ola": {
                target: 'http://192.168.0.253:29003/api/ola',
                ws: false,
                secure: false,
                changeOrigin: true,
                timeout: 0,
                pathRewrite: {
                    '^/ola': ''
                }
            },
            /*
            * bss3 接口的
            * */
            "/bss3": {
                target: 'http://115.233.6.84:8001/',
                timeout: 0,
                pathRewrite: {
                    '^/bss3': ''
                }
            }
        }
    },
    /*css: {
        loaderOptions: {
            less: {

            }
        }
    },*/
    configureWebpack: {
        plugins: [
            // 添加头注释
            new webpack.BannerPlugin({banner: `make 2020.09 by @李艳鹏\n @time：${new Date().toLocaleString()} `}),
            // 忽略moment.js的所有语言环境文件
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            // 配置compression-webpack-plugin压缩
            new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                //24576 24kb
                threshold: 51200,
                minRatio: 0.8,
                filename: '[path].gz[query]',
            }),
            // 去除console  这里会报错`warnings` is not a supported option  配置到babel中了
            /*new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        drop_debugger: true,
                        warnings: false,
                        drop_console: true,
                    },
                },
                sourceMap: false,
                parallel: true,
            })*/
        ],
        // debug 断点
        devtool:'source-map',
        /*
        * 导入外部文件
        * */
        externals: {
            'CrmDict': 'CrmDict',
            // 'vue':'Vue',
            // 'vue-router':'VueRouter',
            // 'vuex':'Vuex'
        },
        //     global: {
        //         // "Vue": false,
        //         // "ElementUi": false
        //     }
    },

    /*chainWebpack: config => {
        config.plugins.delete('prefetch')
        return config
    },*/

    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ],

    runtimeCompiler: true,
    productionSourceMap: false,
}
