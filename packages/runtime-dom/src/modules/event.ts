// @click=fn  @click=fn1 并不会替换而是在绑定一个所以定义一个缓存存储绑定的函数替换时 进行解绑
export const patchEvent = (el, key, newValue) => {
    const eventName = key.slice(2).toLowerCase()
    // 定义一个缓存
    const invokers = el._vel || (el._vel = {})
    // 当前是否有存在绑定的方法
    const exists = invokers[eventName]
    // 如果缓存中有且也有新的方法
    if (exists && newValue) {
        exists.value = newValue
    } else {// 当前缓存中没有绑定方法
        // 新值中有绑定事件 添加缓存
        if (newValue) {
            let invoker = invokers[eventName] = createdPathEvent(newValue, el)
            el.addEventListener(eventName, invoker)
        } else { // 新值中没有绑定时间则清空对应缓存
            el.removeEventListener(eventName)
            invokers[eventName] = undefined
        }
    }
}
// 返回一个函数fn，将value赋值给fn的value，在fn函数内部调用value并传递参数e
function createdPathEvent(value, el) {
    const fn = () => {
        fn.value(el)
    }
    fn.value = value
    return fn
}