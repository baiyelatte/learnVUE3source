import { effect, isArray } from "@vue/reactivity";
import { isObject, shapeFlags } from "@vue/shared";
import { apiCreateApp } from "./apiCreateApp";
import { createComponentInstance, setupComponent } from "./component";
import { CVnode, TEXT } from "./vnode";

export const createdRender = (renderOptionDom) => {// 将组件变为vnode 再通过render函数进行渲染
    console.log(renderOptionDom);

    const { createElement,
        createText,
        inset,
        patchProp,
        querySelector,
        remove,
        setElementText,
        setText }
        = renderOptionDom
    // 创建effect执行render函数
    const setupRenderEffect = (instance, dom) => {
        // 创建effect
        effect(() => {
            // 判断组件是否是第一次加载
            if (!instance.isMounted) {
                // 执行render，接下来创建渲染节点，h函数
                let subTree = instance.subTree = instance.render.call(instance.proxy, instance.proxy) // h函数的返回值为dom转化的vnode
                console.log(subTree);
                // 组件处理完毕，处理元素 调用patch
                patch(null, subTree, dom)
                instance.isMounted = true
            } else {
                console.log('跟新123');
                // 进行比对
                let proxy = instance.proxy
                // 旧的
                const prevTree = instance.subTree
                // 新的
                const newTree = instance.render.call(proxy, proxy)
                instance.subTree = newTree
                patch(prevTree, newTree, dom)
            }
        }, {})
    }
    //---------------------------------------------------------处理组件---------------------------------------------------------------
    const mountComponent = (n2, dom) => {
        // 组件渲染流程
        /**
         * 1.先有一个组件的实例对象
         * 2.解析数据到这个实例对象中
         * 3.执行render
         */
        const instance = n2.component = createComponentInstance(n2)
        setupComponent(instance)
        setupRenderEffect(instance, dom)
    }
    // 对组件的第一次加载以及更新进行操作
    const processComponent = (n1, n2, dom) => {
        if (n1 === null) { // 第一次加载
            mountComponent(n2, dom)
        } else { // 更新操作

        }
    }
    //---------------------------------------------------------处理元素---------------------------------------------------------------
    const mountChilrenComonent = (el, children) => {
        // 循环
        for (let i = 0; i < children.length; i++) {
            // 如果是数组文本则转为vnode 如果是h函数则直接返回 ['text','text']  [h(),h()]
            let child = CVnode(children[i])
            patch(null, child, el)
        }
    }
    // 挂载元素
    const mountElement = (n2, dom) => {
        // 递归渲染 =》dom操作 =》放到对应的地方
        const { children, props, type, shapeFlag } = n2
        // 创建元素
        let el = n2.el = createElement(type)
        // 设置属性
        if (props) {
            for (let key in props) {
                patchProp(el, key, null, props[key])
            }
        }
        if (children) {
            if (shapeFlag & shapeFlags.TEXT_CHILDREN) {
                // 设置文本内容
                setElementText(el, children)
            } else if (shapeFlag & shapeFlags.ARRAY_CHILDREN) {
                // 递归渲染子集
                mountChilrenComonent(el, children)
            }
        }
        inset(el, dom)
    }
    //---------------------------------------------------------处理文本---------------------------------------------------------------
    const processText = (n1, n2, dom) => {
        if (n1 === null) { // 第一次加载
            inset(createText(n2.children), dom)
        }
    }
    // 对组件的第一次加载以及更新进行操作 
    const processElement = (n1, n2, dom) => {
        if (n1 === null) { // 第一次加载
            mountElement(n2, dom)
        } else { // 更新操作

        }
    }
    // 是否是同一个元素
    const isSomeVnode = (n1, n2) => {
        return n1.type === n2.type && n1.key === n2.key
    }
    // 是同一个元素的情况下进行替换
    const unMount = (n1)=>{
        remove(n1.el)
    }
    const patch = (n1, n2, dom) => {
        // 比对/更新元素
        /**
         * 1。判断是否是同一个元素？比对每个属性：直接替换
         * 2.
         */
        if (n1 && !isSomeVnode(n1, n2)) {
            unMount(n1)
            // 避免更新之后调用patch 渲染不出来已更新的dom元素
            n1 = null
        }
        // 针对不同的类型 组件或元素 做不同的处理
        let { shapeFlag, type } = n2

        switch (type) {
            case TEXT:
                processText(n1, n2, dom)
                break;
            default:
                if (shapeFlag & shapeFlags.ELEMENT) {
                    // 对元素进行初始化
                    console.log('元,12素', shapeFlags.ELEMENT);
                    processElement(n1, n2, dom)
                } else if (shapeFlag & shapeFlags.COMPONENT) {
                    // 对组件进行初始化
                    processComponent(n1, n2, dom)
                }
        }

    }
    let render = (vnode, dom) => {
        // 组件初始化
        // 渲染第一次 三个参数分别是旧的,最新的，挂载位置
        patch(null, vnode, dom)
    }
    return {
        creatApp: apiCreateApp(render) // 创建vnode
    }
}