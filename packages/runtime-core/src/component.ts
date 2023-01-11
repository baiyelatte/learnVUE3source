import { shapeFlags } from "@vue/shared"

// 创建实例
export const createComponentInstance = (vnode) => {
    const instance = {
        vnode,
        props: {},// 组件属性
        attrs: {},
        ctx: {},// 存储代理之后方便取值
        proxy: {},// 代理
        setupState: {},
        isMounted: false //是否挂载
    }
    instance.ctx = { _: instance }
    return instance
}
// 解析数据到实例对象
export const setupComponent = (instance) => {
    const { props, children } = instance.vnode
    instance.props = props
    instance.children = children
    // 组件是否有状态
    let shapeFlag = instance.vnode.shapeFlag & shapeFlags.STATEFUL_COMPONENT
    if (shapeFlag) {
        setStateComponent(instance)
    }
}
// 给实例的setupState添加值
const setStateComponent = (instance) => {
    console.log(instance);
    
    const { setup } = instance.vnode.type
    setup()
}
// 创建effect执行render函数
export const setupRenderEffect = () => {

}