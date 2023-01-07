import { nodeOps } from "./nodeOps";
import { patchProp } from "./patchProp";

export const renderOptionDom = Object.assign({ patchProp }, nodeOps)
