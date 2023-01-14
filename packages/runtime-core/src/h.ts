import { isArray } from "@vue/reactivity"
import { isObject } from "@vue/shared"
import { creatVnode } from "./vnode"

export function h(type, propsOrChildren, children) { // 类型  props或者孩子  孩子
    const i = arguments.length // 参数个数
    if (i === 2) {
        // 元素+属性{}
        if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
            if (propsOrChildren._v_isVnode) { //h函数返回vnode，也是对象所以进行一层判断 解决此情况 h('div',h('div')) 此时嵌套的h('div')是儿子
                return creatVnode(type, null, [propsOrChildren])
            }
            creatVnode(type, propsOrChildren)
        } else {
            // 元素+children[]
            creatVnode(type, null, propsOrChildren)
        }
    } else {
        // h('div',{}，1，2，3，4，5)
        if (i > 3) {
            children = Array.prototype.slice.call(arguments, 2) // 截取第二位之后的参数
        } else if (i === 3 && children._v_isVnode) {
            // h('div',{}，h('div'))
            children = [children]
        }
        return creatVnode(type, propsOrChildren, children)
    }
}