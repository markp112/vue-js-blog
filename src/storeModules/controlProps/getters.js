


  export const  getProperty = state =>  (propToGet) => {
        
    console.log("getProperty Called -->", propToGet)

        if (state[propToGet.control] !== undefined){
            console.log("Property value=",state[propToGet.control][propToGet.property])
            return state[propToGet.control][propToGet.property]
        }else {
            return ""
        }

        
    }

    export const getProps = state => (propKey) => {
        
           
            console.log("-->getPropsCalled", propKey, state.editorProps.find(prop => prop.key === propKey));

            console.log("state.editorProps", state.editorProps.length);
        const isPropAlreadyLoaded = state.editorProps.find(prop => prop.key === propKey)

        if(!isPropAlreadyLoaded){
            return []
        
        }else{
            console.log("value retrieved",state.editorProps)
            return state.editorProps.find(properties => properties.key === propKey).attributes;
        }
    }

    export const    getActiveControl = (state) => {

        return state.activeControl
    }

    export const   getIsDirty = (state) =>{

        return state.isDirty
    }

    export const    getIsPropLoaded =  (state) => (propToGet) => {
        return state.isPropLoaded[propToGet]
    }
