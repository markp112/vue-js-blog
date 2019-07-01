// controlProps.js
// holds the component properties that can be editied per control on the users page
//  for example the toolBar the user can set the colour, the height etc
// each control should have its own object within the default state to avoid conflicts and 
// understanding as to which control the property belongs to
//

const defaultState = {

    props:[],

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

    
    //contains a list of different controls and components that 
    // can be edited by the user, if one has been edited its value will be true
    isControlDirty:{
        toolBarProps: false,
    },
    
    //indicates which component in the edit is active so the appropriate 
    //control can be shown in the LHS Drawer
    activeControl:"",   

    //when the control has been loaded and is still loaded we do not want to reload the control
    // set the flag to true when the control is created and false when destroyed
    isPropLoaded:{
        toolBarProps:false,
    },

    
    //flag something has been edited when set to true
    isDirty: false,
    

}

const mutations = {

    ///setProperty sets an element within one of the controls
    // takes an object with format of:
    // {
    //       control: the control(object) to act upon in state i.e. toolBarProps
    //        property: the key within the object control whose value is to be updated
    //        value: Optional if key:value is a boolean this can be omitted for all other types it is required
    //  }
    // 

    setProperty:(state,item)=>{

        console.log("setProperty Called",state["toolBarProps"][item.property], item)
        if(item.value){
            state[item.control][item.property] = item.value 
        }else{
            state[item.control][item.property] = !state[item.control][item.property]
        }
    },

    

    setProps:(state,propertyList)=>{
        console.log("setProps called",propertyList)
        state.props = [...propertyList]

    },

    setActiveControl:(state, control)=>{
        state.activeControl = control
    },

    // when loading from database set all properties with data returned from database
    setToolBarAllProps:(state, toolBarProps) =>{
        state.toolBarProps = toolBarProps
    },

    setPropIsLoaded:(state, whichPropControl) =>{
        state.isPropLoaded[whichPropControl.controlName] = whichPropControl.value
    },
    
    // set flag to indicate a control has been edited
    setIsDirtyFlag:(state, flagDetails)=>{
        state.isControlDirty[flagDetails.controlName] = flagDetails.value
        
        //assume irrespective of whether a user has set a contol and then reset we will only
        // track an edit was made and not reversed
        state.isDirty = true

    },

}

const actions = {

    updateProperty:({commit}, item)=>{

        commit("setProperty", item)
    },


    retrieveProperties:({commit,dispatch}, data)=>{

        console.log("Retrieve Properties Called -->", data)

        dispatch("LambdaretrieveMenuItems",data ,{root:true})
        .then(res =>{
            console.log("Lambda Called -->", res)
            commit("setProps",res)
       
    })

    },

    showProperties:({commit}, data) =>{

        commit ("setActiveControl", data.component)
    },

    // Update allToolBarProps -- used to update with data returned from database
    updateAllToolBarProps:({commit}, toolBarProps)=>{
        commit("setToolBarAllProps",toolBarProps)
    },
    
    // updateDirtyFlag sets the flag when a control is edited so when 
    // we come to save the data we only need to touch those controls that have been changed
    // minimising the amount of data to be to the cloud
    // expects:
    // object flagToSet - controlName - the control e.g. toolbar
    //                     value - boolean true or false true= control is dirty
    updateDirtyFlag:({commit},flagToSet) => {
        commit("setIsDirtyFlag",flagToSet)
    },

    // whichPropControl.controlName = the name of the component which we want to set the isLoaded Flag for
    // whichPropControl.value = boolean to indicate true is loaded or false it is not currently loaded
    updateIsPropLoaded:({commit}, whichPropControl) => {
        console.log("updateIsPropLoaded", whichPropControl)
        commit("setPropIsLoaded", whichPropControl)
    },

    
    //Save Changes to the componens that have been edited
    // changes can be detected by checking the isControlDirty Object
    saveChanges:()=>{
        
    }
}

const getters = {

    getProperty:(state) =>( propToGet)=>{
        console.log("getProperty Called -->", propToGet)

        if (state !== undefined){
            return state[propToGet.control][propToGet.property]
        }else {
            return false
        }

        
    },

    getProps:(state)=>{
        
        return state.props
    },

    getActiveControl:(state) => {

        return state.activeControl
    },

    getIsDirty:(state) =>{

        return state.isDirty
    },

    getIsPropLoaded:(state) => (propToGet) => {
        return state.isPropLoaded[propToGet]
    }
}

export default {

    state: defaultState,
    mutations,
    actions,
    getters
}