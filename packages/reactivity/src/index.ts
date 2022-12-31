// import { ac } from "../../shared/src/index" // 可以拿到
// import { ac } from "@vue/shared" // 也可以拿到 通过tsconfig配置后 相当于路径别名
// let a = 2
// let b = ac
export { reactive, shallowReactive, readonly, shallowReadonly } from './reactive'
export { effect } from './effect'
export { ref, shallowRef } from './ref'