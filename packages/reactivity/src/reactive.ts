import { shallowReadonlyHandlers, readonlyHandlers, shallowReactiveHandlers, reactiveHandlers } from "./baseHandlers";


const reactiveWeakMap = new WeakMap() //存储源对象和代理过后的值
const readonlyWeakMap = new WeakMap()
function createObj(target, isReadonly, baseHandlers) {
    const proxyWeakMap = isReadonly ? readonlyWeakMap : reactiveWeakMap
    // 是否以及代理过了, 避免reactive嵌套多次代理
    const proxyObj = proxyWeakMap.get(target)
    if (proxyObj) {
        return proxyObj
    } else {
        const proxy = new Proxy(target, baseHandlers)
        proxyWeakMap.set(target, proxy)
        return proxy
    }
}
export function reactive(target) {
    return createObj(target, false, reactiveHandlers)
}
export function shallowReactive(target) {
    return createObj(target, false, shallowReactiveHandlers)
}
export function readonly(target) {
    return createObj(target, true, readonlyHandlers)
}
export function shallowReadonly(target) {
    return createObj(target, true, shallowReadonlyHandlers)
}