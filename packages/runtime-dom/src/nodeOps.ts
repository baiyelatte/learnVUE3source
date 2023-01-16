// dom的增删改查
export const nodeOps = {
    createElement: (targetName: string) => document.createElement(targetName),
    remove: (targetName: HTMLElement) => {
        const parentNode = targetName.parentNode
        if (parentNode) {
            parentNode.removeChild(targetName)
        }
    },
    // 插入
    inset: (child: HTMLElement, parent: HTMLElement, ancher: HTMLElement = null) => {
        parent.insertBefore(child, ancher) // ancher为null相当于append，ancher有则相当于参照物进行追加dom元素
    },
    // 选择元素
    querySelector: (targetName: string) => {
        return document.querySelector(targetName)
    },
    // 修改元素文本
    setElementText: (el: HTMLElement, text: string) => el.textContent = text,
    // 文本操作
    createText: (text) => {
        return document.createTextNode(text)
    },
    setText: (node, text) => {
        node.nodeValue = text
    },
}