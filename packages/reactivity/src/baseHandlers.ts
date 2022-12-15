import { isObject } from "@vue/shared";
import { readonly, reactive } from "./reactive";
function createGet(isReadonly = false, isShallow = false) {
    return function get(target, key, prototype) {
        const res = Reflect.get(target, key, prototype)
        if (isShallow) { //浅层
            return res  //proxy默认代理浅层
        }
        if (isReadonly) { //只读
            //收集依赖
        }
        if (isObject(res)) {
            return isReadonly ? readonly(res) : reactive(res)
        }
        return res
    }
}

function createSet(isShallow = false) {
    return function get(target, key, value, prototype) {
        const res = Reflect.set(target, key, value, prototype)
        // if(isShallow){
        //     return 
        // }
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
    get: reactiveGet
}
const shallowReactiveHandlers = {
    get: shallowReactiveGet
}
const readonlyHandlers = {
    get: readonlyGet,
    set: (target, key, prototype) => {
        throw console.error('set on readonly');
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