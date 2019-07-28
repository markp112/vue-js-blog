

// controlProps.js
// holds the component properties that can be editied per control on the users page
//  for example the toolBar the user can set the colour, the height etc
// each control should have its own object within the default state to avoid conflicts and 
// understanding as to which control the property belongs to
//

import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

const defaultState = {

    editorProps:[],
    
    // list of props which can be set by the user to customise the toolbar at the top of their page

    toolBarProps:{
        hasButtons: true,
        menu: false,
        
        isDark: false,
        isExtended: false,
        isFixed: false,
        isFlat: false,
        isProminent: false,
        selectedColour: "primary",
        hasTitle:false,
        titleText:"",
        toolBarButtons:[],
    
    },

    buttonProps:{
        isRound : false,
        isOutline : false,
        caption:"",
        foreColour:"Secondary",
        backColour:"Primary"
    },
    

    //contains a list of different controls and components that 
    // can be edited by the user, if one has been edited its value will be true
    isControlDirty:{
        toolBarProps: false,
        buttonProps : false,
    },
    
    //indicates which component in the edit is active so the appropriate 
    //control can be shown in the LHS Drawer
    activeControl:"",   

    // when the control has been loaded and is still loaded we do not want to reload the control
    // set the flag to true when the control is created and false when destroyed
    // prevents repeated calls to DynamoDb to retrieve values
    isPropLoaded:{
        toolBarProps:false,
    },

    
    //Global flag - something has been edited when set to true
    isDirty: false,
    

}






export default {

    state: defaultState,
    mutations,
    actions,
    getters
}