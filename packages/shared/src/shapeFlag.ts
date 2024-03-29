export const enum shapeFlags {
    ELEMENT = 1,
    FUNCTION_COMPONENT = 1 << 1, // 0010
    STATEFUL_COMPONENT = 1 << 2, // 0100
    TEXT_CHILDREN = 1 << 3,
    ARRAY_CHILDREN = 1 << 4,
    SLOTS_CHILDREN = 1 << 5,
    TELEPORT = 1 << 6,
    SUSPENSE = 1 << 7,
    COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
    COMPONENT_KEPT_ALIVE = 1 << 9,
    COMPONENT = shapeFlags.STATEFUL_COMPONENT | shapeFlags.FUNCTION_COMPONENT // 0010 | 0100 =》 0110     0110包含0010和0100，0010 & 0110 返回 0010，0100 & 0110 返回 0100，其余返回0
}
