const { log } = require('console')
const fs = require('fs')
// import execa from 'execa'
const execa = require('execa')
// 不是文件夹的不打包
const dirs = fs.readdirSync('packages').filter((p) => {
    // statSync动态拿到文件状态信息  isDirectory是否是文件
    if (!fs.statSync(`packages/${p}`).isDirectory()) {
        return false
    }
    return true
})
// 第二步进行打包
// 打包函数
async function build(dir) {
    /* 因为是并行打包所有要开启子进程实现并行打包  
        第一个参数是用什么工具打包
        第二个参数是数组 -c表示执行打包工具的配置 --environment环境变量 {stdio:'inherit'} 子进程的输出在父进程也能看得到
     */
    await execa('rollup', ['-c', '--environment', `TARGET:${dir}`], { stdio: 'inherit' })
}
async function runParaller(dirs, itemfn) {
    const result = []
    for (let k of dirs) {
        result.push(itemfn(k))
    }
    return Promise.all(result) //result 是build函数返回的promise对象的集合利用all全部执行完成all才会返回结果的机制
}
runParaller(dirs, build).then(() => {
    log('succes6')
})
log(dirs)