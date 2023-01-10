import { shapeFlags } from "@vue/shared";
import { apiCreateApp } from "./apiCreateApp";

export const createdRender = (renderOptionDom) => {// 将组件变为vnode 再通过render函数进行渲染
    // 渲染函数
    // 组件渲染流程
    /**
     * 1.先有一个组件的实例对象
     * 2.解析数据到这个实例对象中
     * 3.执行render
     */
    const mountComponent = (n2,dom)=> {

    }
    // 对组件的第一次加载以及更新进行操作
    const processComponent = (n1, n2, dom) => {
        if(n1 === null) { // 第一次加载
            mountComponent(n2,dom)
        }else { // 更新操作
            
        }
    }
    // 针对不同的类型 组件或元素 做不同的处理
    const patch = (n1, n2, dom) => {
        let { shapeFlag } = n2
        if (shapeFlag & shapeFlags.ELEMENT) {
            // 对元素进行初始化
            console.log('元素');
        } else if (shapeFlag & shapeFlags.COMPONENT) {
            // 对组件进行初始化
            processComponent(n1, n2, dom)
        }
    }
    let render = (vnode, dom) => {
        // 组件初始化
        // 渲染第一次 三个参数分别是旧的,最新的，挂载位置
        patch(null, vnode, dom)

    }
    return {
        creatApp: apiCreateApp(render) // 创建vnode
    }
}