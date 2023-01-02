import { effect } from "./effect";

export function computed(computedObj) {
    let getter
    let setter
    // 如果传递的是一个函数
    if (typeof computedObj === 'function') {
        getter = computedObj
        setter = () => {
            console.error('is readonly');
        }
    } else {
        // 传递的是一个对象时，由用户编写get的set函数
        getter = computedObj.get
        setter = computedObj.set
    }
    return new ComputedRefImpl(getter, setter)
}

class ComputedRefImpl {
    public setter
    public getter
    public dirty = true //默认不执行
    public __v_isReadonly = true
    public __v_isRef = true
    public _value
    public effect
    constructor(getter, setter) {
        this.getter = getter
        this.setter = setter
        // 收集依赖
        this.effect = effect(getter, {
            lazy: true, // 默认不执行
            sch: () => {
                this.dirty = true // 在修改响应式属性的值时触发trigger函数然后调用此函数进行刷新缓存
            }
        })

    }
    get value() {
        if (this.dirty === true) {
            this._value = this.effect()
            this.dirty = false // 缓存机制 如果不修改值就直接返回旧值不在调用effect函数
        }
        return this._value
    }
    set value(newValue) {
        this.setter(newValue)
    }
}