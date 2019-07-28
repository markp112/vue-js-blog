export const getLayouts = (state)=>{
    console.log("--> getLayouts Called",state.layouts[0])
    return state.layouts
}

//key should be formatted as ###LnEn###
export const getElementContents = state => (key) =>{
    console.log("-->getElementContents Called",key)
    
    if (state.Elementcontents !== undefined){
        return state.Elementcontents[key]
    }else {
        return ""
    }
    

}