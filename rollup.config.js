// 通过rollup进行打包
/**
 * 先引入相关依赖
 */
import ts from 'rollup-plugin-typescript2' // 解析ts
import json from '@rollup/plugin-json' //解析json
import rosolvePlugin from '@rollup/plugin-node-resolve' //解析第三方插件

// rollup api 获取
import path from 'path'
// 确认打包入口
let packagesDir = path.resolve(__dirname, 'packages')

// 获取需要打的包
let packageDir = path.resolve(packagesDir, process.env.TARGET)
console.log(packageDir, 666)
// 获取需要打吧的文件的函数 package.json
const resolve = p => {
    return path.resolve(packageDir, p)
}
// 调用获取文件的函数
const pkg = require(resolve('package.json'))
console.log(pkg)//打印每个包的package.json这个文件

// 获取到配置项中的 buildOptions 属性
const packageOptions = pkg.buildOptions || {}
// 包的名字(文件的名字并不是文件内部的name属性)
const name = path.basename(packageDir)
console.log(name, 888)
// 设置打包配置
const outputOptions = {
    "esm-bundler": {
        file: resolve(`dist/${name}.esm-bundler.js`),
        format: 'es'
    }, "cjs": {
        file: resolve(`dist/${name}.cjs.js`),
        format: 'cjs'
    }, "global": {
        file: resolve(`dist/${name}.global.js`),
        format: 'iife'
    },
}
const formats = packageOptions.formats
console.log(formats,66666);
// 定义打包函数‘
function createConfig(format, outputOption) {
    // 给打包配置添加一个name属性
    outputOption.name = packageOptions.name
    // 开启代码调试
    outputOption.sourcemap = true
    // 生成rollup配置
    return {
        input: resolve('src/index.ts'), // 打包入口
        output:outputOption,// 打包出口/方式配置
        plugins: [
            json(),
            ts({
                tsconfig: path.resolve(__dirname, 'tsconfig.json')
            }),
            rosolvePlugin()
        ]
    }
}
// 利用map 把打包格式对应的打包配置传入createConfig函数 然后导出
export default formats.map(format => createConfig(format, outputOptions[format]))