// 2.给收集到的依赖定义一个id确保唯一性
let uid = 0
let activeEffect // 保存当前的effect传入的函数
let effectStack = []  //定义一个栈结构结果effect的嵌套问题
function createEffect(fn, options) {
    const effect = function reactiveEffect() {
        if (!effectStack.includes(effect)) {
            try {
                effectStack.push(effect)
                activeEffect = effect
                fn()
            } finally {
                effectStack.pop()
                activeEffect = effectStack[effectStack.length - 1]
            }
        }
    }
    effect.id = uid++
    effect._isEffect = true // 这个effect是不是响应式
    effect.raw = fn // 保存传入的方法
    effect.options = options // 保存传入的配置项

    return effect
}
// 1声明effeft函数
export function effect(fn, options: any = { lazy: false }) {
    const effect = createEffect(fn, options)
    if (!options.lazy) {  // 如果不是懒收集则直接执行传入的函数
        effect()
    }

    return effect
}

// 3收集依赖函数
let targetWeakMap = new WeakMap()
export function Track(target, type, key) {
    // console.log(target, type, key, activeEffect);
    if (activeEffect === undefined) {
        return
    }
    let targetMap = targetWeakMap.get(target)
    if (!targetMap) {
        targetWeakMap.set(target, (targetMap = new Map))
    }
    let targetDepMap = targetMap.get(key)
    if (!targetDepMap) {
        targetMap.set(key, (targetDepMap = new Set))// key，key对应的方法
    }
    if (!targetDepMap.has(activeEffect)) {
        targetDepMap.add(activeEffect)
    }
    /**
     * 0
: 
{Object => Map(1)}
key: {name: 1, list: {…}}
value: Map(1) {'name' => Set(1)
     */
}

export const  enum TriggerEnmu {
    ADD = 'add',
    EDIT = 'edit'
}
export function trigger(target, type, key, newValue, oldValue?) {
    console.log(target, type, key, newValue, oldValue);
}
