import { isObject } from "@vue/shared";
import { readonly, reactive } from "./reactive";
import { Track, trigger, TriggerEnmu } from "./effect";
import { isArray, isInteger, hasOwn } from "./utils"
const enum TrackEnum {
    GET = 'get',
    HAS = 'has',
    ITERATE = 'iterate',
}


function createGet(isReadonly = false, isShallow = false) {
    return function get(target, key, prototype) {
        const res = Reflect.get(target, key, prototype)
        if (isShallow) { //浅层
            return res  //proxy默认代理浅层
        }
        if (!isReadonly) { //不是只读进
            // 在git操作下进行收集依赖
            Track(target, TrackEnum.GET, key)
        }
        if (isObject(res)) {
            return isReadonly ? readonly(res) : reactive(res)
        }
        return res
    }
}

function createSet(isShallow = false) {
    return function set(target, key, value, prototype) {
        const oldValue = target[key]
        const res = Reflect.set(target, key, value, prototype)
        // 获取老值
        // 判断是不是数组 数组的key是不是整数如果是执行数组的逻辑，如果不是执行对象的逻辑
        let isTrue = isArray(target) && isInteger(key) ? Number(key) < target.length : hasOwn(target, key)
        // 如果isTrue为true则是修改，为false则是新增
        if (!isTrue) {
            // 新增
            // 对象，新增，键，值
            trigger(target, TriggerEnmu.ADD, key, value)
        } else {
            // 对象，新增，键，新值，老值
            if (value !== oldValue) {
                trigger(target, TriggerEnmu.EDIT, key, value, oldValue)
            }
        }
        return res
    }
}
const reactiveGet = createGet()
const shallowReactiveGet = createGet(false, true)
const readonlyGet = createGet(true, false)
const shallowReadonlyGet = createGet(true, true)

const set = createSet()
const shallowSet = createSet(true)
const reactiveHandlers = {
    get: reactiveGet,
    set
}
const shallowReactiveHandlers = {
    get: shallowReactiveGet,
    set: shallowSet
}
const readonlyHandlers = {
    get: readonlyGet,
    set: (target, key, prototype) => {
        throw console.error('set on readonly!');
    }
}
const shallowReadonlyHandlers = {
    get: shallowReadonlyGet,
    set: (target, key, prototype) => {
        throw console.error('set on readonly');
    }
}
export {
    shallowReadonlyHandlers, readonlyHandlers, shallowReactiveHandlers, reactiveHandlers
}