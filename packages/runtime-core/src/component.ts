import { effect, isFunction } from "@vue/reactivity"
import { isObject, shapeFlags } from "@vue/shared"
import { componentPublicInstance } from "./componentPublic"

// 创建实例
export const createComponentInstance = (vnode) => {
    const instance = {
        vnode,
        type: vnode.type,
        props: {},// 组件属性
        attrs: {},
        ctx: {},// 存储代理之后方便取值
        proxy: {},// 代理
        setupState: {},
        render: false,
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
    // 代理
    instance.proxy = new Proxy(instance.ctx, componentPublicInstance)
    const { setup, render } = instance.type
    // 处理setup及其参数
    if (setup) {
        let setupContext = createContext(instance)
        let setupResult = setup(instance.props, setupContext)// props,context
        // 如果返回值是函数或者是对象做相应处理
        handleSetupResult(setupResult, instance)
    } else {
        // 处理render
        // finishComponentSetup(instance)
    }

}
// 处理setup的返回值
const handleSetupResult = (setupResult, instance) => {
    if (isFunction(setupResult)) {
        instance.render = setupResult // 将setup返回的函数存入实例上
    } else if (isObject(setupResult)) {
        instance.setupState = setupResult // 将setup返回的对象存入实例上
    }
    // 处理render
    finishComponentSetup(instance)
}
// 处理render
const finishComponentSetup = (instance) => {
    let component = instance.type
    // 判断组件是否有render
    if (!instance.render) { // 没有
        // 如果没有render但是又temolate则将模板转为render函数
        if (!component.render && component.templte) {

        }
        // setup中没有就把根组件中的render给到setup
        instance.render = component.render
    }
}
const createContext = (instance) => {
    return {
        attrs: instance.attrs,
        slots: instance.slots,
        emit: () => { },
        expose: () => { }
    }
}