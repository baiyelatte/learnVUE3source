// 通过rollup进行打包
/**
 * 先引入相关依赖
 */
import ts from 'rollup-plugin-typescript2' // 解析ts
import json from '@rollup/plugin-json' //解析json
import rosolvePlugin from '@rollup/plugin-node-resolve' //解析第三方插件

// rollup api 获取
import path from 'path'
let packagesDir = path.resolve(__dirname,'packages')

// 获取需要打的包环境变量
let packageDir = path.resolve(packagesDir,process.env.TARGET)
console.log(packageDir,666)