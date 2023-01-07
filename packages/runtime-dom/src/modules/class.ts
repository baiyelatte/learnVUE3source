// 处理dom的类名更新
export const patchClass = (el, newValue) => {
    // 如果新的类名没有了  则赋值为空字符串，如果有就直接赋值
    if (newValue === null) {
        newValue = ''
    }
    el.className = newValue

}