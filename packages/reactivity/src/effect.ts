import { isArray, isInteger, hasOwn } from "./utils"
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
    console.log(targetWeakMap);
    
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
    const depsMap = targetWeakMap.get(target)


    if (!depsMap) {
        return
    } 
    let effectSet = new Set() // 对收集依赖的函数进行去重,并存储
    const add = (addEffect) => {
        if (addEffect) {
            addEffect.forEach(element => {
                effectSet.add(element)
            });
        }
    }
    // 当目标值是数组且key是length时
    if (key === 'length' && isArray(target)) {
        depsMap.forEach((item, key) => {
            console.log(key,newValue,item);
            // 当代理的是收集的依赖就是length 或者 收集的下标大于set的length时 此时间接（修改length会影响数组取值）的修改了收集了依赖所以需要重新执行effect依赖函数
            if (key === 'length' || key >= (newValue as Number)) {
                add(item)
            }
        })
    } else {
        // 当目标值是对象时
        if (key !== undefined) {
            add(depsMap.get(key)) // 获取收集到的依赖
        }
        // 当目标值是数组对象时
        switch (type) {
            // 通过下标修改数组
            case TriggerEnmu.ADD:
                if(isArray(target)&&isInteger(key)){
                    add(depsMap.get('length')) // 模板中的target.key是数组对象此时会收集除下标外包括tostring，length等属性，所以里面自动带有length的依赖，拿出来重新执行effect因为（修改length会影响数组取值）
                }
                break;
        }
    }
    console.log(effectSet, depsMap,targetWeakMap);
    // 执行收集到的依赖
    effectSet.forEach((item: any): void =>
        item()
    )
}
