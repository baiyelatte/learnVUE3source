import { creatVnode } from "./vnode";
export function apiCreateApp(render) {
    return function creatApp(rootComponent, rootProps) { // 将组件变为vnode
        let app = {
            // 一些其他属性
            _component: rootComponent,
            _props: rootProps,
            _container: null,
            mount(dom) {
                // 根据组件创建vnode节点
                console.log(rootComponent, rootProps, app._container);

                let vnode = creatVnode(rootComponent, rootProps)
                // 渲染vnode
                render(vnode, dom)
                app._container = dom
            }
        }
        return app
    }
}