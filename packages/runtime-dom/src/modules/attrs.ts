export const patchAttrs = (el,key,newValue)=>{
    if(newValue === null) {
        el.removeAttribute(key)
    }else {
        el.removeAttribute(key,newValue)
    }
}