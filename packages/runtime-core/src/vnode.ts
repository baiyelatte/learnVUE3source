//1，createVnode和h函数效果一样
//2.区分vnode是组件还是元素
//3.创建vnode
//4.渲染
export const creatVnode = (type, props,children=null)=>{
    // 区分是组件还是元素
    let shapeFlag
    const vnode = {
        _v_isVnode:true, // 是否是一个虚拟节点
        type,
        props,
        children,
        key:props && props.key, // diiff算法会用到
        el:null, // 真是dom和vnode 对应
        shapeFlag // 标识vnode
    }
}