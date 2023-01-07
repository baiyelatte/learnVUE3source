import { patchAttrs } from "./modules/attrs";
import { patchClass } from "./modules/class";
import { patchEvent } from "./modules/event";
import { patchStyle } from "./modules/style";
// 处理属性
export const patchProp = (el, key, oldValue, newValue) => {
    switch (key) {
        case 'class':
            patchClass(el, newValue)
            break;
        case 'style':
            patchStyle(el, oldValue, newValue)
            break;
        default:
            if (/^on[^a-z]/.test(key)) { // 判断是否是事件
                patchEvent(el, key, newValue)
            } else {
                patchAttrs(el, key, newValue)
            }
            break;
    }
}