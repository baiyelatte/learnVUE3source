import { apiCreateApp } from "./apiCreateApp";

export const createdRender = (renderOptionDom) => {// 将组件变为vnode 再通过render函数进行渲染
    // 渲染函数
    let render = (vnode, dom) => {

    }
    return {
        creatApp: apiCreateApp(render) // 创建vnode
    }
}