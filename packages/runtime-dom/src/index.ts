import { createdRender } from "@vue/runtime-core";
import { nodeOps } from "./nodeOps";
import { patchProp } from "./patchProp";

export const renderOptionDom = Object.assign({ patchProp }, nodeOps)
export const creatApp = (rootComponent, rootProps) => {
    let app = createdRender(renderOptionDom).creatApp(rootComponent, rootProps)
    let { mount } = app
    app.mount = (rootDom) => {  // 挂载的位置
        let dom = renderOptionDom.querySelector(rootDom)
        dom.innerHTML = '' // 将被挂载的div内容先清空 再挂载
        mount(dom)
    }
    return app
}