//1，createVnode和h函数效果一样
//2.区分vnode是组件还是元素
//3.创建vnode

import { isObject, shapeFlags } from "@vue/shared"
import { isArray, isString } from "@vue/reactivity"

//4.渲染
export const creatVnode = (type, props, children = null) => {
    // 区分是组件还是元素
    // let a = shapeFlag.ELEMENT
    let shapeFlag = isString(type) ? shapeFlags.ELEMENT : isObject(type) ? shapeFlags.STATEFUL_COMPONENT : 0
    const vnode = {
        _v_isVnode: true, // 是否是一个虚拟节点
        type,
        props,
        children,
        component:{},
        key: props && props.key, // diiff算法会用到
        el: null, // 真是dom和vnode 对应
        shapeFlag // 标识vnode
    }
    // 给子组件/元素打标记
    normalizeChildren(vnode, children)
    return vnode
}

function normalizeChildren(vnode, children) {
    // 判断是children属性是数组还是对象
    let type = 0
    if (children === null) {

    } else if (isArray(children)) {
        type = shapeFlags.ARRAY_CHILDREN
    } else {
        // 文本
        type = shapeFlags.TEXT_CHILDREN
    }
    vnode.shapeFlag = vnode.shapeFlag | type
    
}