//import dataClasses from '../dataClasses/pageSection'

const defaultState = {

   types : {
       undefined:0,
        text: 1,
        image: 2,
        video: 3
    },

    //holds all the layout components that have been defined for this page
    layouts:[],

    layout : {
        template : "", //template that this section of the page uses
        elements : [] // list of the elements that make up the template see element below
    
    },

    element:{
        number : null,          // which section does this correspond to based on numberic may need to change
        type : null,      // what type of content is this one of text, image, video
        filename : ""           // name of file that holds the content not relevant for text as text for each 
                                // page is held in a single file
    
    },


    text: "",             // holds the current text

    isTextDirty: false,      // has anything for the text changed will be true if dirty flag is set
    isDirty:false


}

const mutations = {
    // Mutations for handling the layouts

    clearLayouts(state){
        state.layouts = [];
    },

    addLayout(state,layout){
        state.layouts.push(layout)
    },

    updateLayout(state,layoutComponent){

        state.layouts[layoutComponent.index] = layoutComponent.layout

    },

    // mutations for setting elements these are the sections that make up a layout

    setElement(state,element){

        state.element = element

    },

    updateElement(state, elementComponent){
       
        state.layouts[elementComponent.index].elements[elementComponent.element.number] = elementComponent.element
    },

    //Mutations for handling text

    clearText(state){
        state.text=""
    },

    setText(state, newText){
        state.isTextDirty = true
        state.text = newText
    }


}

const actions = {

    // when a new layout is created add it to the Layouts
    updateLayouts({commit},layoutComponent){
        commit("updateLayout",layoutComponent)

    },
    
    // when the content type of the element changes update the element
    // expects an object- elementComponent containing the:
    // element:new element content 
    // index: the index of the layout where this component sits
    
    updateElement({commit,dispatch},elementComponent){
        commit("updateElement",elementComponent)
        dispatch("setDirty")
    },

    setDirty({dispatch}){
        console.log("setDirtyCalled")
        dispatch("updateDirtyFlag",true,{root:true})
    },

}

export default {
    state : defaultState,
    mutations,
    actions
}