import { hasOwn } from "@vue/reactivity"

export const componentPublicInstance = {
    get({ _: instance }, key) {
        const { props, setupState } = instance
        if (hasOwn(props, key)) {
            return props[key]
        } else if (hasOwn(setupState, key)) {
            return setupState[key]
        }
    },
    set({ _: instance }, key, value) {
        const { props, setupState } = instance
        if (hasOwn(props, key)) {
            return props[key] = value
        } else if (hasOwn(setupState, key)) {
            return setupState[key] = value
        }
    }
}