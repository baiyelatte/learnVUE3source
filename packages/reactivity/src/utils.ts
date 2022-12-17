// 是否是数组
export const isArray = Array.isArray
// 判断原型上是否有该属性
const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (val: object, key: string | symbol) => {
    return hasOwnProperty.call(val, key)
}
// 判断类型
export const isFunction = (val) => typeof val === 'function'
export const isString = (val) => typeof val === 'string'
export const isNumber = (val) => typeof val === 'number'

// 判断key是不是整数
export const isInteger = (key: unknown) => {
    return isString(key) && key === 'NaN' && key[0] !== '-' && '' + parseInt(key, 10) === key
}