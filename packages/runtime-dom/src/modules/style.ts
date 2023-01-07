// 处理dom的类名更新
export const patchStyle = (el, oldValue, newValue) => {
    const style = el.style
    // 如果更新后style的值为空则删除这个属性
    if (newValue === null) {
        el.removeAttribute('style')
    } else {
        // 老的有新的没有则删除老的属性
        if (oldValue) {
            for (let k in oldValue) {
                if (newValue[k] === null) {
                    style[k] = ''
                }
            }
        }
        // 老的没有新的有
        for (let k in newValue) {
            style[k] = newValue[k]

        }

    }
}