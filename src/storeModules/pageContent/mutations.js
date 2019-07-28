//=================================================================
//mutations for hanlding the layouts
//=================================================================
import dataClasses from '../../dataClasses/pageSection'

 export const   clearLayouts=(state) => {
        state.layouts = [];
    }

    export const addLayout = (state,layout) => {
        state.layouts.push(layout)
    }

    export const   updateLayout= (state,layoutComponent) => {

        state.layouts[layoutComponent.index] = layoutComponent.layout

    }


// rebuild the layouts based on the data retrieved from DynamoDb
export const setRetrievedLayouts = (state, mylayouts) => {
    
    console.log("--> setRetrievedLayouts",mylayouts.length)

    

    for (let i=0; i < mylayouts.length; i++ ){
        
        let lay = mylayouts[i];
        lay.elements.content =""
        let layout = new dataClasses.Layout(lay.template, lay.s3Bucket, lay.elements, lay.index)
        
        state.layouts.push(layout)

    }

}



//===========================================================================================
// mutations for setting elements these are the sections that make up a layout
//===========================================================================================
    export const    setElement= (state,element) => {

        state.element = element

    }

    export const    updateElement= (state, elementComponent) => {
       console.log('updateElement', elementComponent)
        state.layouts[elementComponent.index].elements[elementComponent.element.number] = elementComponent.element
    }
    // once data has been loaded from S3 update the content in the element

    export const setElementText = (state,elementData)=>{
        console.log("setElementText",elementData)
        console.log("state.layouts",state.layouts)
        state.layouts[elementData.layout-1].elements[elementData.element-1].content = elementData.content
    }
//===========================================================================================
// Mutations for handling text
//===========================================================================================
export const updateContent = (state, contentData) => {
    console.log("--> updateContents called", contentData)
   
        state.Elementcontents[contentData.key] = contentData.content

}
//
/// expects layout Component with n elements - initialise our keys in 
// ElementContents to support two way binding
//
export const addContent = (state, layoutComponent) =>{

    const index = layoutComponent.index
    const keyLayout =  "###L" + index +"E"
    for(let element of layoutComponent.elements){
        const key = keyLayout + element.number + "###"
        
        state.Elementcontents[key] = ""
    }

}
//when retrieving data from S3 we can add the content straight to contents 
// as once JSON.Parse has converted it it will be in the right format
export const addSavedContentToElementContents=(state, content)=>{

    let data = JSON.parse(JSON.parse(content))
   
//not sure why I need the double parse but a first Parse does not create a keyed object
    state.Elementcontents = JSON.parse(JSON.parse(content))
}
