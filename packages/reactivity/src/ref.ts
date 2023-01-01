import { TrackEnum } from './baseHandlers'
import { TriggerEnmu, Track, trigger } from './effect'
import { isArray } from './utils'
export function ref(target, shallow) {
    return creatRef(target, shallow)
}
export function shallowRef(target, shallow) {
    return creatRef(target, shallow)
}

class RefImpl {
    _value
    __v_isRef = true
    rawValue
    shallow
    constructor(rawValue, shallow) {
        this.rawValue = rawValue
        this.shallow = shallow
        this._value = rawValue
    }
    // Track收集依赖  trigger触发更新
    get value() {
        Track(this, TrackEnum.GET, 'value')
        return this._value
    }
    set value(newValue) {
        const oldValue = this._value
        if (this._value !== newValue) {
            this._value = newValue
            this.rawValue = newValue
            trigger(this, TriggerEnmu.EDIT, 'value', newValue, oldValue)
        }
    }
}
function creatRef(rawValue, shallow = false) {
    return new RefImpl(rawValue, shallow)
}

class toRefImpl {
    public target
    public key
    public __v_isRef = true
    constructor(target, key) {
        this.target = target
        this.key = key
    }
    get value() {
        Track(this, TrackEnum.GET, 'value')
        return this.target[this.key]
    }
    set value(newValue) {
        this.target[this.key] = newValue
        trigger(this, TriggerEnmu.EDIT, 'value', newValue)
    }
}

export function toRef(target, key) {
    return new toRefImpl(target, key)
}
export function toRefs(target) {
    let refs = isArray(target)?new Array(target.length):{}
    for(let k in target){
        refs[k] = toRef(target,k)
    }
    return refs
}

