

    ///setProperty sets an element within one of the controls
    // takes an object with format of:
    // {
    //       control: the control(object) to act upon in state i.e. toolBarProps
    //        property: the key within the object control whose value is to be updated
    //        value: Optional if key:value is a boolean this can be omitted for all other types it is required
    //  }
    // 

  export const  setProperty = (state, item)=>{

        console.log("--> setProperty Called",state["toolBarProps"][item.property], item)

        if(item.value){
            state[item.control][item.property] = item.value 
        }else{
            state[item.control][item.property] = !state[item.control][item.property]
        }
    }

    
    //setProps called when props have been loaded from database
    export const   setProps = (state,propertyList)=>{
        console.log("--> setProps called",propertyList)

        state.editorProps.push (propertyList)
       
    }

    //used to toggle between different side bar editors
    export const    setActiveControl = (state, control)=>{
        state.activeControl = control
    }

    // when loading from database set all properties with data returned from database
    export const     setAllProps = (state, props) =>{
        //state.toolBarProps = toolBarProps
        console.log("--> setAllPropsCalled",props)
        state[props.key] = props.attributes
    }

    export const    setPropIsLoaded = (state, whichPropControl) =>{
        state.isPropLoaded[whichPropControl.controlName] = whichPropControl.value
    }
    
    // set flag to indicate a control has been edited
    export const    setIsDirtyFlag = (state, flagDetails)=>{

        state.isControlDirty[flagDetails.controlName] = flagDetails.value
        
        //assume irrespective of whether a user has set a contol and then reset we will only
        // track an edit was made and not reversed
        state.isDirty = true

    }


    // update values for the toolBar buttons located on the user toolbar
    // toolbarbuttons are part of the toolBarProps object
    // they are an array with each item in the array having a key - the button this relates to 
    // and properties which are set / updated and contain the settings for the button
    // each property is a key value pair
    export const setToolBarButtonProperty = (state,property)=>{
        console.log("state=",state)
        console.log("--> setToolBarButtonProperty",property)
        try{
            state["toolBarProps"]["toolbarButtons"].find(key => key.key == property.key).properties[property.key2] = property.value
        }
        catch{Err=>{
            const err={
                msg:"Property mismatch - not found in setToolBarButtonProperty",
                parameters: property,
                error:Err
            }
            console.log("error",err)
            throw err
        }}
      
    }
