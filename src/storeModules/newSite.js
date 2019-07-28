//
// newSite.js - store file for sll thr attributes/dsta required when creating a new site
//
const defaultState = {


    //holds a list of available templates
    templates:[],

    //newSiteData holds content about the new site the user has input
    newSiteData:{
            siteName:""
    },
  
}

const mutations = {

    setTemplates:(state, data)=>{
        if (data.length !==0 ){
            state.templates = [...data]
        }
    },

    clearTemplates:(state)=>{
        state.templates = [];
    }

}

export default  {

    state: defaultState,
    mutations,
}