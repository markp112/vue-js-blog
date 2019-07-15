
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'

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
        type : null,            // what type of content is this one of text, image, video
        filename : ""           // name of file that holds the content not relevant for text as text for each 
                                // page is held in a single file
    
    },

    Elementcontents:{},


    text: "",             // holds the current text

    isTextDirty: false,      // has anything for the text changed will be true if dirty flag is set
    isDirty:false


}


export default {
    state : defaultState,
    mutations,
    actions,
    getters
}