
const execa = require('execa')
// 不是文件夹的不打包

// 第二步进行打包
// 打包函数
async function build(dir) {
    /* 因为是并行打包所有要开启子进程实现并行打包  
        第一个参数是用什么工具打包
        第二个参数是数组 -c表示执行打包工具的配置 -w热更新 --environment环境变量 {stdio:'inherit'} 子进程的输出在父进程也能看得到
     */
    await execa('rollup', ['-cw', '--environment', `TARGET:${dir}`], { stdio: 'inherit' })
}
build('reactivity')